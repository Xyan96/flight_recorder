# App Store Release Checklist

This checklist tracks the path from the current offline iPad build to App Store submission.

Final App Store Connect copy/paste and submission runbook: `app-store/app-store-connect-final-submit.zh-CN.md`.

## Current App Build

- App name: 飞行记录
- Bundle ID: `com.xiazhiyuan.flightrecorder`
- Version: `1.0`
- Build: `2`
- Platform: iPad only
- Minimum iPadOS: 15.0
- Web assets: `restored_webarchive`
- Native wrapper: Capacitor 8.4.0 with Swift Package Manager
- Data model: local-only in Capacitor/iPad App mode
- Capacitor native HTTP and Cookies bridge overrides: explicitly disabled
- Cordova compatibility `config.xml` has no wildcard network access allowlist
- App JavaScript network-capable functions are checked by `scripts/verify_local_only_guards.mjs` to require a `LOCAL_ONLY_MODE` path before `fetch`
- App icon: `ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png`, 1024x1024 RGB with no alpha
- Target physical device priority: iPad Air (5th generation), 10.9-inch class, verified with a same-size 1640x2360 iPad Air simulator screenshot at `app-store/ipad-air-5-size-v55.png`
- Required 13-inch iPad App Store screenshot prepared at `app-store/ipad-13-inch-v55.png` with 2064x2752 pixels
- Command-line signed archive preflight passed on 2026-06-22 at `/private/tmp/FlightRecorder-v1.0-b2.xcarchive`
- App Store Connect local export preflight passed on 2026-06-22 at `/private/tmp/FlightRecorder-export-b2/App.ipa`; IPA metadata and privacy manifest were inspected after export
- App Store Connect app record exists; Xcode identified App ID `6782894756` for `com.xiazhiyuan.flightrecorder`.
- Upload attempts for build `1.0 (2)` reached Apple ContentDelivery but the current network path repeatedly failed on object-storage checksum validation. Retry from a different network path or use Apple Transporter/altool with `/private/tmp/FlightRecorder-export-b2/App.ipa`.

## Local Build Commands

Run these from the project root:

```sh
npm run check:js
npm run cap:sync
```

Or run the combined local verifier:

```sh
npm run check:appstore
```

The verifier also runs:

```sh
npm run check:local-only
```

Before final App Store Connect submission, after support/privacy URLs and support email are finalized:

```sh
npm run check:appstore:strict
```

If web assets changed and you want the verifier to sync them into the iOS project first:

```sh
npm run check:appstore:sync
```

The project has already passed a command-line iPad simulator build with Xcode:

```sh
xcodebuild -project ios/App/App.xcodeproj -scheme App -configuration Debug -sdk iphonesimulator -destination "generic/platform=iOS Simulator" CODE_SIGNING_ALLOWED=NO build
```

Equivalent npm command:

```sh
npm run ios:build:sim
```

It has also passed a Release device build for the real iPad SDK with signing disabled:

```sh
xcodebuild -project ios/App/App.xcodeproj -scheme App -configuration Release -destination "generic/platform=iOS" CODE_SIGNING_ALLOWED=NO build
```

Equivalent npm command:

```sh
npm run ios:build:device:unsigned
```

For iPad Air fifth-generation layout checks, use the 10.9/11-inch-class screenshot:

```text
app-store/ipad-air-5-size-v55.png
```

For the required 13-inch iPad screenshot set, use:

```text
app-store/ipad-13-inch-v55.png
```

For screenshots with representative test data, import:

```text
app-store/demo-records.json
```

Then follow:

```text
app-store/screenshot-capture-guide.zh-CN.md
```

Local-only browser smoke test evidence:

```text
app-store/browser-smoke-test.zh-CN.md
```

Open the iOS project after full Xcode is installed:

```sh
npm run ios:open
```

If `cap open ios` does not open a project automatically, open:

```text
ios/App/App.xcodeproj
```

## Xcode Setup

1. Install the full Xcode app from the Mac App Store or Apple Developer downloads.
2. Open Xcode once and accept licenses/components.
3. If command-line builds still report an unsigned license, run this in Terminal and enter the Mac administrator password:

```sh
sudo xcodebuild -license accept
```

4. In Xcode settings, sign in with the Apple Developer account.
5. Open `ios/App/App.xcodeproj`.
6. Select target `App`.
7. In Signing & Capabilities:
   - Enable Automatically manage signing.
   - Select your Team.
   - Confirm Bundle Identifier is `com.xiazhiyuan.flightrecorder`.
8. Choose an attached iPad or iPad simulator and run.
9. Test:
   - Launch with no network.
   - Fill a flight record.
   - Save.
   - Open 记录夹.
   - Load the saved record.
   - Export and import backup.

Use this device checklist for the target iPad:

```text
app-store/device-test-checklist.zh-CN.md
```

## Physical iPad Signing Test

Do this before App Store Connect upload:

1. Connect the iPad Air (5th generation) with USB-C.
2. Unlock the iPad and trust the Mac if prompted.
3. In Xcode, open `ios/App/App.xcodeproj`.
4. Select target `App` > Signing & Capabilities.
5. Set Team to your paid Apple Developer team.
6. Keep Automatically manage signing enabled.
7. In the top device picker, choose the connected iPad Air.
8. Press Run.
9. If Xcode asks to register the device or create a provisioning profile, allow it.
10. Complete the checklist in `app-store/device-test-checklist.zh-CN.md`.

If the iPad does not appear, check:

- Xcode > Settings > Accounts has the Apple ID signed in.
- iPad is unlocked and trusted.
- iPadOS version is supported by installed Xcode components.
- Bundle ID remains `com.xiazhiyuan.flightrecorder`.

## App Store Connect

Create a new app record before uploading the first archive:

- Platform: iOS
- Name: 飞行记录
- Primary language: Simplified Chinese
- Bundle ID: `com.xiazhiyuan.flightrecorder`
- SKU: `flight-recorder-ios`
- User access: Full Access unless you need to limit team members

Before creating the app record, the Account Holder must have signed the latest agreements in App Store Connect.

Chinese metadata draft:

```text
app-store/metadata.zh-CN.md
```

Copy-ready App Store Connect fields:

```text
app-store/connect-fields.zh-CN.md
```

Form-by-form checklist:

```text
app-store/submission-form-checklist.zh-CN.md
```

Final open items before submission:

```text
app-store/final-submission-open-items.zh-CN.md
```

Command cheatsheet:

```text
app-store/command-cheatsheet.zh-CN.md
```

When final publication values are ready, copy `app-store/submission-values.example.json` to the private ignored file `app-store/submission-values.json`, fill it in, then run:

```sh
npm run appstore:apply-values
```

Step-by-step Xcode and App Store checklist:

```text
app-store/xcode-app-store-next-steps.zh-CN.md
```

Signing and device troubleshooting:

```text
app-store/xcode-signing-troubleshooting.zh-CN.md
```

Testing before Apple Developer Program approval:

```text
app-store/testing-before-developer-approval.zh-CN.md
```

## Privacy Answers

The current app is designed for the simplest privacy position:

- Tracking: No
- Data collected: No data collected
- Third-party advertising: No
- Analytics SDKs: No
- Account/login: No
- Network backend required: No
- CapacitorHttp native fetch/XMLHttpRequest override: Disabled
- CapacitorCookies document.cookie override: Disabled
- Cordova wildcard network access: Not present

Important wording: flight records are saved on the user's iPad and are not transmitted to the developer. Backup export/import happens only when the user chooses those actions.

App Store Connect still requires publicly accessible Support and Privacy Policy URLs. Because this app is a pure local/offline tool, these pages are only for review and store display; they are not part of the App runtime and must not point to a login gate or backend dependency.

The public support/privacy site is live on GitHub Pages from `main` / `docs`. These pages are only for App Store listing/review; the iPad App itself remains offline and has no runtime domain dependency.

Final URL values:

- Support URL: `https://xyan96.github.io/flight_recorder/support.html`
- Privacy Policy URL: `https://xyan96.github.io/flight_recorder/privacy.html`

Static site source:

```text
docs/
app-store/static-site/
```

Public support email: zhiyuan_1996@outlook.com. Review contact: 夏志远 / +86 19934558747 / zhiyuan_1996@outlook.com. GitHub Pages was verified live on 2026-06-22 with HTTP 200 for both support and privacy URLs.

## Export Compliance

The iOS `Info.plist` declares:

```text
ITSAppUsesNonExemptEncryption = false
```

Use this App Store Connect direction unless the app later adds custom encryption or network security features:

- Uses encryption: No non-exempt encryption.
- Custom/proprietary encryption algorithms: No.
- Specifically designed for encrypted communication or security: No.

## Review Notes Draft

```text
This is an offline iPad flight communication and cruise-check recorder. No account is required.

To review:
1. Launch the app.
2. Fill aircraft number, flight number, route, captain, and date.
3. Tap 保存.
4. Open 记录夹.
5. Tap 载入 to reload the saved record.

The app stores records locally on the iPad. It does not require a backend service, runtime domain, Cloudflare login, subscription, advertising, or third-party analytics SDK. The app itself does not provide an internet information service and has no account system, sync service, content publishing, user-generated-content platform, messaging, forum, news, payment, or remote data service. Therefore the app runtime has no internet service that requires ICP/app filing. GitHub Pages is used only for the public support and privacy-policy pages required by App Store listing; it is not part of the app functionality or runtime dependency.
```

## Screenshots Needed

For iPad App Store listing, prepare screenshots showing:

- Main recording screen with representative but non-sensitive test data.
- Record folder after a saved test record.
- Cruise-check panel with sample fuel values.
- Backup export/import controls if desired.

Use test data only. Do not include real passenger, crew, operational, or confidential details.

## Archive And Upload

After on-device testing passes:

1. In Xcode, select `Any iPadOS Device`.
2. Confirm Team is selected and signing has no red errors.
3. Product > Archive.
4. In Organizer, select the newest archive for version `1.0` build `2`.
5. Run the signed archive metadata check before uploading:

   ```sh
   npm run ios:verify-archive:signed -- /path/to/App.xcarchive
   ```

   Or check the newest archive in Xcode Organizer:

   ```sh
   npm run ios:verify-archive:latest:signed
   ```

   If you use the checked-in unsigned preflight archive path, omit the path and run `npm run ios:verify-archive` instead. The signed check must show a non-empty Team and SigningIdentity.
6. Record and verify the iPad Air 5 device test result:

   ```sh
   cp app-store/device-test-results.example.json app-store/device-test-results.json
   npm run appstore:verify-device-test
   ```

7. Click Validate App and resolve any warnings/errors.
8. Click Distribute App > App Store Connect > Upload.
9. Keep Include symbols selected unless Xcode recommends otherwise.
10. Upload.
11. Wait for App Store Connect processing.
12. Select the processed build in the app version.
13. Complete metadata, screenshots, age rating, privacy, pricing/availability, export compliance, and review notes.
14. Submit for review.

If you need to upload another build after a failed review or metadata change that requires a new binary, increment the build number to the next integer in Xcode before archiving again.

## Official References

- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- App Store Connect add a new app: https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app
- App Store Connect upload builds: https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/
- Apple app privacy details: https://developer.apple.com/app-store/app-privacy-details/
- Apple screenshot specifications: https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications/
- Capacitor iOS documentation: https://capacitorjs.com/docs/ios
