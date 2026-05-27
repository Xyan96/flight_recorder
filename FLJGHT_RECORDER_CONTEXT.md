# fljght_recorder context

Project purpose: restored and deployed flight communication/cruise-check recorder.

Current version: v33.

Main files:
- restored_webarchive/index.html
- restored_webarchive/app.js
- restored_webarchive/styles.css
- restored_webarchive/sw.js
- deployment/flight_log_server.py
- deployment/publish.sh

Runtime deployment:
- Web root: /Users/xiazhiyuan/.flight-log-web
- Server script: /Users/xiazhiyuan/.flight-log-server/flight_log_server.py
- Data dir: /Users/xiazhiyuan/.flight-log-data
- Flight records: /Users/xiazhiyuan/.flight-log-data/records
- FN archive: /Users/xiazhiyuan/.flight-log-data/license-archive.json
- LaunchAgent: com.flightlog.web
- Local URL: http://127.0.0.1:8765/?v=33
- Public URL: https://flight.tuomakazusa.online/?v=33

Important behavior:
- Offline save writes pending records to browser localStorage.
- v33 retries pending uploads on page load, online, focus, pageshow, foreground visibility, and every 30 seconds.
- Same owner + same date + same flight number keeps only the newest server record.
- FN archive is shared; flight records are owner-isolated when Cloudflare Access user headers exist.
- Historical issue: CA863 on 2026-05-25 appears to exist only in old desktop Safari localStorage, not in server records.

Current server state when last checked:
- /Users/xiazhiyuan/.flight-log-data/records was empty after test records were removed.
- FN archive contained 夏志远 and 戴颜坤.

Operational notes:
- Run deployment/publish.sh to publish frontend to /Users/xiazhiyuan/.flight-log-web.
- Copy deployment/flight_log_server.py to /Users/xiazhiyuan/.flight-log-server/flight_log_server.py and restart com.flightlog.web after backend changes.
- Use short-timeout curl checks to avoid long stalls.
