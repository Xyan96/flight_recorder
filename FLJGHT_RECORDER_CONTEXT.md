# fljght_recorder context

Last updated: 2026-06-12 Asia/Shanghai.

Project purpose: offline iPad flight communication/cruise-check recorder prepared for App Store submission.

## Current Version

Current app version: v62.

Current local preview URLs:
- Local: http://127.0.0.1:8765/?v=62
- Local-only preview: http://127.0.0.1:8765/?local=1

Public-domain deployment is retired from the iPad App runtime plan. The iPad App is local-only. App Store support/privacy pages may use GitHub Pages or the user's domain, but only as public static pages and not as an app backend/runtime dependency.

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
- capacitor.config.json
- ios/App/App.xcodeproj
- APP_STORE_RELEASE.md
- app-store/app-icon-ios.svg
- app-store/metadata.zh-CN.md
- app-store/connect-fields.zh-CN.md
- app-store/submission-form-checklist.zh-CN.md
- app-store/privacy-policy.zh-CN.html
- app-store/support.zh-CN.html
- app-store/static-site/
- app-store/device-test-checklist.zh-CN.md
- app-store/demo-records.json
- app-store/screenshot-capture-guide.zh-CN.md
- scripts/verify_app_store_ready.sh

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
- App Store readiness check: `scripts/verify_app_store_ready.sh`
- App Store readiness check with Capacitor sync: `scripts/verify_app_store_ready.sh --sync`
- App Store status summary: `npm run appstore:status`
- iPad Air 5 test result check: `npm run appstore:verify-device-test`
- Xcode archive metadata check: `npm run ios:verify-archive`
- Signed archive metadata check before upload: `npm run ios:verify-archive:signed`
- Latest signed Xcode Organizer archive check: `npm run ios:verify-archive:latest:signed`
- Open iOS project after Xcode is ready: `npm run ios:open`
- App Store support/privacy pages may be hosted on GitHub Pages or the user's domain. They must remain public static pages, not a login gate, sync endpoint, Cloudflare Access app, or runtime dependency for the iPad App.

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
- v54 adds an iPad App/local-only mode for Capacitor, file://, and `?local=1`: records and custom FN entries are stored locally, server fetch/upload is skipped, and pending upload state is cleared.
- Capacitor 8.4.0 iOS project exists under `ios/App`; Bundle ID is `com.xiazhiyuan.flightrecorder`, version `1.0`, build `1`, iPad-only, minimum iPadOS 15.0.
- App privacy manifest `ios/App/App/PrivacyInfo.xcprivacy` declares no tracking and no collected data.
- `ios/App/App/Info.plist` declares `ITSAppUsesNonExemptEncryption = false` for App Store export compliance.
- Capacitor `CapacitorHttp` and `CapacitorCookies` bridge overrides are explicitly disabled in both root and iOS-bundled Capacitor config.
- The iOS Cordova compatibility `config.xml` has no wildcard network access allowlist for the offline App Store build.
- `scripts/verify_local_only_guards.mjs` checks that all `fetch()` calls in the web app are inside functions with a local-only path before network use.
- iOS App Icon was replaced with the project flight-record icon, generated from `app-store/app-icon-ios.svg`; the Xcode asset is 1024x1024 RGB with no alpha.
- Xcode can list the project, resolve packages, and complete a command-line Debug simulator build for the iPad-only app with `CODE_SIGNING_ALLOWED=NO`.
- The app was installed and launched on the `iPad (A16)` simulator; screenshot saved at `app-store/ipad-simulator-launch.png`.
- The app was installed and launched on the `iPad Air 11-inch (M4)` simulator as an iPad Air fifth-generation same-size check; v55 screenshot saved at `app-store/ipad-air-5-size-v55.png` with 1640x2360 pixels.
- The app was installed and launched on the `iPad Pro 13-inch (M5)` simulator for App Store screenshot preparation; v55 screenshot saved at `app-store/ipad-13-inch-v55.png` with 2064x2752 pixels.
- Screenshot demo data is stored in `app-store/demo-records.json`; import it through the app's backup import flow to create screenshots with fictional test data.
- Xcode can complete a Release device build for the real iPad SDK with `CODE_SIGNING_ALLOWED=NO`; signing still needs the Apple Developer Team selected in Xcode before archive/upload.
- Xcode can also create an unsigned archive at `build/Archives/FlightRecorder-v1.0-b1.xcarchive`; `npm run ios:verify-archive` confirms it has Bundle ID `com.xiazhiyuan.flightrecorder`, version `1.0`, build `1`, arm64, iPad-only, no collected data, and no native HTTP/Cookies bridge. This archive is only a local preflight artifact and cannot be uploaded without Apple Developer signing.
- Apple Developer Team `G6G6AGF8SA` is now written into the Xcode project. A signed Release build with `-allowProvisioningUpdates` reached provisioning, then failed because the team has no registered devices/profiles for `com.xiazhiyuan.flightrecorder`; connect and trust the iPad Air 5 so Xcode can register it.

UI and input:
- Quick input buttons currently include RCD, HSO, HD, RP, DR, climb, descend, left/right turn, RWY, P/S, L/U, T/O, L/D, QNH.
- v47 moves quick input buttons from every communication row into one bottom fixed quick input dock shown while editing a communication note, moves the dock above the iPad keyboard with VisualViewport, avoids squeezing the right-side check panel, keeps newer local pending records visible, and adds manual upload/retry for local pending records.
- v48 only auto-stamps UTC time after the communication note has actual input; focusing a row or VHF field no longer stamps time.
- v49 positions the quick input dock by VisualViewport top/height instead of a bottom offset, with repeated recalculation during the iPad keyboard animation.
- v50 replaces MT with HSO/HD quick keys, places HSO/HD in positions 2/3, uses numeric keyboard after HD, and auto-adds a trailing space after all quick keys except climb/descend/turns/RWY.
- v51 keeps the numeric keyboard mode active across continuous input after numeric quick keys instead of switching back to text after the first digit.
- v52 changed FN normalization target length from 7 to 8 total characters.
- v53 restricts FN to digits only; normalization strips non-digits, keeps the last 8 digits, and pads with leading zeros to 8 digits.
- v54 switches Capacitor/iPad App usage to local-only persistence so the app can run independently offline.
- v55 tightens the top-bar minimum columns for the iPad Air fifth-generation 10.9-inch size so the date and theme button are not clipped in portrait.
- v56 makes the service worker local-only/cache-only so the packaged iPad App does not use network fallback for app shell assets.
- v57 adds `?smoke=1` browser test mode so automated local-only UI smoke tests can save records without blocking on alert dialogs; local-only/Capacitor mode skips service worker registration and unregisters old registrations when possible so the iPad App is not controlled by stale web caches.
- v58 removes duplicate WebView safe-area padding that caused visible outer margins on iPad and changes the cruise-check panel to an independently scrolling right column so the three cruise records are not clipped into equal-height compressed cards.
- v59 drives the app shell height from `visualViewport.height` with repeated startup refreshes, fixing the first-open iPad WebView bottom white overlay that disappeared only after resizing.
- v60 changes cruise-check records from 3 to 4, keeps the right-side check column scrollable, and removes the oversized fixed card height so landscape rows do not leave large blank areas under each record.
- v61 keeps the app shell at a stable full-screen height when the iPad keyboard opens, while the quick phrase dock still follows VisualViewport above the keyboard. Record folder rows now have a red Delete button before Load with a confirmation dialog; local deletion also clears matching pending records.
- v62 hides the quick phrase dock automatically when the iPad software keyboard is dismissed, while retaining enough active note state for the dock to reappear when the keyboard opens again.
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
- `90bd3cf Restrict FN to digits and bump version to v53`

Tag:
- `v53`

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
git tag v53
git push origin main
git push origin v53
```

If the empty GitHub repo is created manually first:

```sh
cd /Users/xiazhiyuan/Documents/Codex/fljght_recorder
git remote add origin https://github.com/Xyan96/fljght_recorder.git
git push -u origin main
git tag v53
git push origin v53
```

Release checklist:
- Update `restored_webarchive/index.html` query strings, `restored_webarchive/sw.js` cache name/assets, `README.md`, and this context file to the same version.
- Commit those version updates before pushing.
- Push both `main` and the matching version tag, for example `git push origin main` and `git push origin v53`.
- If replacing an existing tag, verify the intended tag state first; do not assume GitHub Tags/Releases update from branch pushes.

## Notes For Future Recovery

- Do not trust the old project path `/Users/xiazhiyuan/Documents/Codex/2026-05-17/files-mentioned-by-the-user-backup` as the active project. The active project is `fljght_recorder`.
- `deployment/publish.sh` was fixed to publish from `/Users/xiazhiyuan/Documents/Codex/fljght_recorder/restored_webarchive/`.
- Do not delete or overwrite `/Users/xiazhiyuan/.flight-log-data/records` unless explicitly asked.
- Avoid long-running broad filesystem searches; the user prefers short checks and regular status updates.
