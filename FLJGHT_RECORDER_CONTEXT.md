# fljght_recorder context

Last updated: 2026-05-28 Asia/Shanghai.

Project purpose: restored and deployed flight communication/cruise-check recorder for iPad/Mac use, with offline-first save and later upload.

## Current Version

Current app version: v53.

Current URLs:
- Local: http://127.0.0.1:8765/?v=53
- Public: https://flight.tuomakazusa.online/?v=53

Main project path:
- /Users/xiazhiyuan/Documents/Codex/fljght_recorder

Main files:
- restored_webarchive/index.html
- restored_webarchive/app.js
- restored_webarchive/styles.css
- restored_webarchive/sw.js
- restored_webarchive/manifest.json
- restored_webarchive/icon.svg
- restored_webarchive/icon-180.png
- restored_webarchive/icon-512.png
- deployment/flight_log_server.py
- deployment/publish.sh

## Runtime Deployment

Runtime paths:
- Web root: /Users/xiazhiyuan/.flight-log-web
- Server script: /Users/xiazhiyuan/.flight-log-server/flight_log_server.py
- Data dir: /Users/xiazhiyuan/.flight-log-data
- Flight records: /Users/xiazhiyuan/.flight-log-data/records
- FN archive: /Users/xiazhiyuan/.flight-log-data/license-archive.json
- LaunchAgent: com.flightlog.web

Operational commands:
- Publish frontend: `deployment/publish.sh`
- Restart server after backend changes: `launchctl kickstart -k gui/501/com.flightlog.web`
- Use short-timeout curl checks to avoid long stalls.

## Implemented Behavior

Offline and sync:
- Offline save writes pending records to browser localStorage.
- Pending uploads retry on page load, online event, focus, pageshow, foreground visibility, and every 30 seconds.
- Pending upload no longer relies only on `navigator.onLine`.

Flight records:
- Same owner + same date + same flight number keeps only the newest server record.
- History/record folder merges server records and localStorage records.
- Opening the record folder now shows the full queue by default, sorted newest first.
- Clicking Search filters by date and/or flight number only after the user explicitly searches.
- Records are owner-isolated when Cloudflare Access user headers exist.
- FN archive is shared across users.

UI and input:
- Quick input buttons currently include RCD, HSO, HD, RP, DR, climb, descend, left/right turn, RWY, P/S, L/U, T/O, L/D, QNH.
- v47 moves quick input buttons from every communication row into one bottom fixed quick input dock shown while editing a communication note, moves the dock above the iPad keyboard with VisualViewport, avoids squeezing the right-side check panel, keeps newer local pending records visible, and adds manual upload/retry for local pending records.
- v48 only auto-stamps UTC time after the communication note has actual input; focusing a row or VHF field no longer stamps time.
- v49 positions the quick input dock by VisualViewport top/height instead of a bottom offset, with repeated recalculation during the iPad keyboard animation.
- v50 replaces MT with HSO/HD quick keys, places HSO/HD in positions 2/3, uses numeric keyboard after HD, and auto-adds a trailing space after all quick keys except climb/descend/turns/RWY.
- v51 keeps the numeric keyboard mode active across continuous input after numeric quick keys instead of switching back to text after the first digit.
- v52 changed FN normalization target length from 7 to 8 total characters.
- v53 restricts FN to digits only; normalization strips non-digits, keeps the last 8 digits, and pads with leading zeros to 8 digits.
- Native keyboard behavior was restored after forced uppercase/digital keyboard bugs.
- Record folder layout was adjusted multiple times: narrower dialog, separated controls, search beside flight number under Close row.
- Top bar was adjusted: captain name input is about five Chinese characters wide, FN keeps more width, top row columns are more balanced.
- v41 adds iPad home-screen icons: `icon-180.png` and `icon-512.png`.

## Current Server Record State

Last checked on 2026-05-28:

Server record files exist:
- /Users/xiazhiyuan/.flight-log-data/records/2026-05-25-CA864-ATH-PEK-2026-05-27T06-36-48-00-00.json
- /Users/xiazhiyuan/.flight-log-data/records/2026-05-27-CA864-ATH-PEK-2026-05-27T06-37-04-00-00.json

With Cloudflare Access user header `Cf-Access-Authenticated-User-Email: zhiyuan_1996@outlook.com`, the API returns:
- 2026-05-27 CA864 ATH-PEK, B-6505, captain 陈曦, savedAt 2026-05-27T06:37:04+00:00
- 2026-05-25 CA864 ATH-PEK, B-6505, captain 陈曦, savedAt 2026-05-27T06:36:48+00:00

Without a user header, `/flight-records` returns an empty list because the records are owner-isolated.

Historical issue:
- CA863 on 2026-05-25 appeared only in old desktop Safari localStorage and was not present on server.

## Git State

Local Git repository is initialized at:
- /Users/xiazhiyuan/Documents/Codex/fljght_recorder

Current branch:
- main

Saved version commit:
- `7948447 Save flight recorder v41`

Tag:
- `v41`

GitHub:
- GitHub user seen through connector: Xyan96
- `Xyan96/fljght_recorder` did not exist when checked.
- GitHub CLI `gh` was installed, but not logged in.
- User said they cannot log into browser now and will add GitHub later.

When ready to create and push to GitHub:

```sh
cd /Users/xiazhiyuan/Documents/Codex/fljght_recorder
gh auth login
gh repo create Xyan96/fljght_recorder --private --source=. --remote=origin --push
git push origin v41
```

If the empty GitHub repo is created manually first:

```sh
cd /Users/xiazhiyuan/Documents/Codex/fljght_recorder
git remote add origin https://github.com/Xyan96/fljght_recorder.git
git push -u origin main
git push origin v41
```

## Notes For Future Recovery

- Do not trust the old project path `/Users/xiazhiyuan/Documents/Codex/2026-05-17/files-mentioned-by-the-user-backup` as the active project. The active project is `fljght_recorder`.
- `deployment/publish.sh` was fixed to publish from `/Users/xiazhiyuan/Documents/Codex/fljght_recorder/restored_webarchive/`.
- Do not delete or overwrite `/Users/xiazhiyuan/.flight-log-data/records` unless explicitly asked.
- Avoid long-running broad filesystem searches; the user prefers short checks and regular status updates.
