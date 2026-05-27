#!/usr/bin/env python3
import argparse
from datetime import datetime, timezone
import json
import os
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse


class FlightLogHandler(SimpleHTTPRequestHandler):
    data_file = None
    records_dir = None

    def end_headers(self):
        no_store_paths = ("/license-archive.json", "/flight-records")
        self.send_header("Cache-Control", "no-store" if self.path.startswith(no_store_paths) else "no-cache")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/license-archive.json":
            self.send_license_archive()
            return
        if parsed.path == "/flight-records":
            self.send_flight_records(parse_qs(parsed.query))
            return
        if parsed.path.startswith("/flight-records/"):
            self.send_flight_record(parsed.path.rsplit("/", 1)[-1])
            return
        super().do_GET()

    def do_PUT(self):
        if urlparse(self.path).path != "/license-archive.json":
            self.send_error(404, "File not found")
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            incoming = json.loads(self.rfile.read(length) or b"{}")
            if not isinstance(incoming, dict):
                raise ValueError("Archive must be a JSON object")
            cleaned = {
                str(name).strip(): str(code).strip().upper()
                for name, code in incoming.items()
                if str(name).strip() and str(code).strip()
            }
            archive = self.read_archive()
            archive.update(cleaned)
            self.write_archive(archive)
            self.send_json({"ok": True, "count": len(archive)})
        except Exception as exc:
            self.send_error(400, str(exc))

    def do_POST(self):
        if urlparse(self.path).path != "/flight-records":
            self.send_error(404, "File not found")
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            incoming = json.loads(self.rfile.read(length) or b"{}")
            if not isinstance(incoming, dict) or not isinstance(incoming.get("state"), dict):
                raise ValueError("Flight record must include a state object")
            saved = self.write_flight_record(incoming, self.current_owner())
            self.send_json({"ok": True, "record": saved})
        except Exception as exc:
            self.send_error(400, str(exc))

    def send_license_archive(self):
        self.send_json(self.read_archive())

    def send_flight_records(self, query):
        date_filter = (query.get("date", [""])[0] or "").strip()
        flight_filter = (query.get("flightNo", [""])[0] or "").strip().upper()
        owner = self.current_owner()
        records = []
        for file in self.records_dir.glob("*.json"):
            try:
                with file.open("r", encoding="utf-8") as handle:
                    record = json.load(handle)
                meta = record.get("meta", {})
                if not self.record_belongs_to_owner(meta, owner):
                    continue
                if date_filter and date_filter not in str(meta.get("dateUtc", "")):
                    continue
                if flight_filter and flight_filter != str(meta.get("flightNo", "")).upper():
                    continue
                records.append({**self.public_meta(meta), "id": file.name})
            except Exception:
                continue
        records = self.latest_records_only(records)
        records.sort(key=lambda item: item.get("savedAt", ""), reverse=True)
        self.send_json({"records": records})

    def send_flight_record(self, filename):
        safe_name = self.safe_filename(unquote(filename))
        file = self.records_dir / safe_name
        if not file.exists():
            self.send_error(404, "Record not found")
            return
        with file.open("r", encoding="utf-8") as handle:
            record = json.load(handle)
        if not self.record_belongs_to_owner(record.get("meta", {}), self.current_owner()):
            self.send_error(404, "Record not found")
            return
        record["meta"] = self.public_meta(record.get("meta", {}))
        self.send_json(record)

    def send_json(self, data):
        payload = json.dumps(data, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    @classmethod
    def read_archive(cls):
        cls.data_file.parent.mkdir(parents=True, exist_ok=True)
        if not cls.data_file.exists():
            return {}
        with cls.data_file.open("r", encoding="utf-8") as file:
            data = json.load(file)
        return data if isinstance(data, dict) else {}

    @classmethod
    def write_archive(cls, archive):
        cls.data_file.parent.mkdir(parents=True, exist_ok=True)
        temp = cls.data_file.with_suffix(".tmp")
        with temp.open("w", encoding="utf-8") as file:
            json.dump(archive, file, ensure_ascii=False, indent=2, sort_keys=True)
            file.write("\n")
        os.replace(temp, cls.data_file)

    @classmethod
    def write_flight_record(cls, incoming, owner="local"):
        cls.records_dir.mkdir(parents=True, exist_ok=True)
        state = incoming["state"]
        meta = incoming.get("meta", {})
        saved_at = datetime.now(timezone.utc).isoformat(timespec="seconds")
        date_utc = str(meta.get("dateUtc") or state.get("common", {}).get("dateUtc") or "unknown")
        flight_no = str(meta.get("flightNo") or state.get("common", {}).get("flightNo") or "unknown").upper()
        sector = str(meta.get("sector") or "").upper()
        prefix = "-".join(part for part in [date_utc, flight_no, sector] if part and part != "unknown")
        filename = cls.safe_filename(f"{prefix}-{saved_at}.json")
        record = {
            "meta": {
                **meta,
                "dateUtc": date_utc,
                "flightNo": flight_no,
                "sector": sector,
                "savedAt": saved_at,
                "owner": owner,
            },
            "state": state,
        }
        file = cls.records_dir / filename
        temp = cls.records_dir / f".{filename}.tmp"
        with temp.open("w", encoding="utf-8") as handle:
            json.dump(record, handle, ensure_ascii=False, indent=2)
            handle.write("\n")
        os.replace(temp, file)
        cls.remove_older_matching_records(file, owner, date_utc, flight_no)
        return {**cls.public_meta(record["meta"]), "id": filename}

    @classmethod
    def remove_older_matching_records(cls, keep_file, owner, date_utc, flight_no):
        for file in cls.records_dir.glob("*.json"):
            if file == keep_file:
                continue
            try:
                with file.open("r", encoding="utf-8") as handle:
                    record = json.load(handle)
                meta = record.get("meta", {})
                if (
                    cls.record_belongs_to_owner(meta, owner)
                    and str(meta.get("dateUtc", "")) == date_utc
                    and str(meta.get("flightNo", "")).upper() == flight_no
                ):
                    file.unlink()
            except Exception:
                continue

    @staticmethod
    def latest_records_only(records):
        latest = {}
        for record in records:
            key = (record.get("dateUtc", ""), str(record.get("flightNo", "")).upper())
            if key not in latest or str(record.get("savedAt", "")) > str(latest[key].get("savedAt", "")):
                latest[key] = record
        return list(latest.values())

    def current_owner(self):
        return (
            self.headers.get("Cf-Access-Authenticated-User-Email")
            or self.headers.get("CF-Access-Authenticated-User-Email")
            or self.headers.get("X-Forwarded-User")
            or "local"
        ).strip().lower()

    @staticmethod
    def record_belongs_to_owner(meta, owner):
        stored_owner = str(meta.get("owner") or "").strip().lower()
        if stored_owner:
            return stored_owner == owner
        return owner == "local"

    @staticmethod
    def public_meta(meta):
        return {key: value for key, value in meta.items() if key != "owner"}

    @staticmethod
    def safe_filename(value):
        safe = re.sub(r"[^A-Za-z0-9_.-]+", "-", value).strip(".-")
        return safe or "record.json"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--root", required=True)
    parser.add_argument("--data-file", required=True)
    parser.add_argument("--records-dir", required=True)
    args = parser.parse_args()

    FlightLogHandler.data_file = Path(args.data_file)
    FlightLogHandler.records_dir = Path(args.records_dir)
    handler = lambda *handler_args, **handler_kwargs: FlightLogHandler(
        *handler_args, directory=args.root, **handler_kwargs
    )
    server = ThreadingHTTPServer((args.host, args.port), handler)
    print(f"Serving {args.root} on http://{args.host}:{args.port}")
    print(f"License archive: {args.data_file}")
    server.serve_forever()


if __name__ == "__main__":
    main()
