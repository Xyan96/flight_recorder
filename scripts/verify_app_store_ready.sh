#!/bin/zsh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

RUN_SYNC=0
STRICT_SUBMIT=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --sync)
      RUN_SYNC=1
      ;;
    --strict-submit)
      STRICT_SUBMIT=1
      ;;
    *)
      echo "Usage: scripts/verify_app_store_ready.sh [--sync] [--strict-submit]" >&2
      exit 2
      ;;
  esac
  shift
done

fail() {
  echo "ERROR: $1" >&2
  exit 1
}

expect_file() {
  [[ -f "$1" ]] || fail "Missing required file: $1"
}

expect_contains() {
  local file="$1"
  local pattern="$2"
  local label="$3"
  grep -q "$pattern" "$file" || fail "$label not found in $file"
}

expect_same_file() {
  local source="$1"
  local copied="$2"
  cmp -s "$source" "$copied" || fail "$copied is not synced with $source"
  echo "$copied matches $source"
}

npm run check:js
if [[ "$RUN_SYNC" == "1" ]]; then
  npm run cap:sync
else
  echo "Skipping Capacitor sync. Run scripts/verify_app_store_ready.sh --sync after web asset changes."
fi

for file in \
  restored_webarchive/index.html \
  restored_webarchive/app.js \
  restored_webarchive/styles.css \
  restored_webarchive/sw.js \
  restored_webarchive/manifest.json \
  ios/App/App/public/index.html \
  ios/App/App/public/app.js \
  ios/App/App/public/styles.css \
  ios/App/App/public/sw.js \
  ios/App/App/public/manifest.json \
  ios/App/App/Info.plist \
  ios/App/App/PrivacyInfo.xcprivacy \
  ios/App/App/config.xml \
  ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png \
  ios/App/App.xcodeproj/project.pbxproj \
  APP_STORE_RELEASE.md \
  app-store/metadata.zh-CN.md \
  app-store/connect-fields.zh-CN.md \
  app-store/submission-form-checklist.zh-CN.md \
  app-store/final-submission-open-items.zh-CN.md \
  app-store/command-cheatsheet.zh-CN.md \
  app-store/submission-values.example.json \
  app-store/device-test-results.example.json \
  app-store/privacy-policy.zh-CN.html \
  app-store/support.zh-CN.html \
  app-store/static-site/privacy.html \
  app-store/static-site/support.html \
  app-store/static-site/index.html \
  app-store/static-site/README.md \
  app-store/device-test-checklist.zh-CN.md \
  app-store/browser-smoke-test.zh-CN.md \
  app-store/xcode-app-store-next-steps.zh-CN.md \
  app-store/xcode-signing-troubleshooting.zh-CN.md \
  app-store/testing-before-developer-approval.zh-CN.md \
  app-store/demo-records.json \
  app-store/screenshot-capture-guide.zh-CN.md \
  app-store/ipad-13-inch-v55.png \
  app-store/ipad-air-5-size-v55.png \
  scripts/verify_local_only_guards.mjs \
  scripts/apply_submission_values.mjs \
  scripts/verify_xcode_archive.mjs \
  scripts/verify_device_test_results.mjs \
  scripts/report_app_store_status.mjs
do
  expect_file "$file"
done

expect_same_file restored_webarchive/index.html ios/App/App/public/index.html
expect_same_file restored_webarchive/app.js ios/App/App/public/app.js
expect_same_file restored_webarchive/styles.css ios/App/App/public/styles.css
expect_same_file restored_webarchive/sw.js ios/App/App/public/sw.js
expect_same_file restored_webarchive/manifest.json ios/App/App/public/manifest.json

node -e 'for (const file of ["capacitor.config.json", "ios/App/App/capacitor.config.json", "package.json", "package-lock.json"]) { JSON.parse(require("fs").readFileSync(file, "utf8")); console.log(file + ": OK"); }'
node -e 'JSON.parse(require("fs").readFileSync("app-store/submission-values.example.json", "utf8")); console.log("app-store/submission-values.example.json: OK");'
node -e 'JSON.parse(require("fs").readFileSync("app-store/device-test-results.example.json", "utf8")); console.log("app-store/device-test-results.example.json: OK");'
node -e 'const pkg = JSON.parse(require("fs").readFileSync("package.json", "utf8")); for (const key of ["check:local-only", "check:appstore", "check:appstore:strict", "appstore:status", "appstore:verify-device-test", "appstore:apply-values", "appstore:self-test-values", "ios:build:device:signed", "ios:archive:signed:tmp", "ios:verify-archive", "ios:verify-archive:signed", "ios:verify-archive:latest", "ios:verify-archive:latest:signed", "ios:open"]) { if (!pkg.scripts?.[key]) throw new Error("missing npm script " + key); } console.log("npm App Store scripts: OK");'
node -e 'for (const file of ["capacitor.config.json", "ios/App/App/capacitor.config.json"]) { const cfg = JSON.parse(require("fs").readFileSync(file, "utf8")); if (cfg.plugins?.CapacitorHttp?.enabled !== false) throw new Error(file + ": CapacitorHttp must be disabled"); if (cfg.plugins?.CapacitorCookies?.enabled !== false) throw new Error(file + ": CapacitorCookies must be disabled"); console.log(file + ": native HTTP/Cookies bridge disabled"); }'
node -e 'for (const file of ["capacitor.config.json", "ios/App/App/capacitor.config.json"]) { const cfg = JSON.parse(require("fs").readFileSync(file, "utf8")); if (cfg.server) throw new Error(file + ": server config must not be set for offline iPad app"); } console.log("Capacitor server config absent: OK");'
node scripts/verify_local_only_guards.mjs restored_webarchive/app.js ios/App/App/public/app.js
node -e 'const demo = JSON.parse(require("fs").readFileSync("app-store/demo-records.json", "utf8")); if (!Array.isArray(demo.records) || !demo.records[0]?.state?.pages?.length) throw new Error("invalid demo records"); console.log("app-store/demo-records.json: OK");'
/usr/bin/plutil -lint ios/App/App/Info.plist ios/App/App/PrivacyInfo.xcprivacy

expect_contains capacitor.config.json '"appId": "com.xiazhiyuan.flightrecorder"' "Capacitor appId"
expect_contains ios/App/App/capacitor.config.json '"appId": "com.xiazhiyuan.flightrecorder"' "iOS Capacitor appId"
expect_contains capacitor.config.json '"CapacitorHttp"' "CapacitorHttp config"
expect_contains capacitor.config.json '"CapacitorCookies"' "CapacitorCookies config"
expect_contains capacitor.config.json '"appName": "飞行记录"' "Capacitor appName"
expect_contains restored_webarchive/index.html 'styles.css?v=64' "Web CSS version"
expect_contains restored_webarchive/index.html 'app.js?v=64' "Web JS version"
expect_contains ios/App/App/public/index.html 'styles.css?v=64' "iOS CSS version"
expect_contains ios/App/App/public/index.html 'app.js?v=64' "iOS JS version"
expect_contains restored_webarchive/sw.js 'flight-log-cache-v64' "Web service worker cache version"
expect_contains ios/App/App/public/sw.js 'flight-log-cache-v64' "iOS service worker cache version"
expect_contains restored_webarchive/index.html 'maximum-scale=1' "Viewport maximum scale lock"
expect_contains restored_webarchive/index.html 'user-scalable=no' "Viewport user scale lock"
expect_contains restored_webarchive/app.js 'const CHECK_ROWS = 4;' "Four cruise check records"
expect_contains ios/App/App/public/app.js 'const CHECK_ROWS = 4;' "iOS four cruise check records"
expect_contains restored_webarchive/app.js 'isKeyboardViewportResize' "Keyboard viewport guard"
expect_contains restored_webarchive/app.js 'viewport.height < layoutHeight - 80' "Keyboard height-only guard"
expect_contains restored_webarchive/app.js 'preventViewportZoom' "Viewport zoom guard"
expect_contains restored_webarchive/app.js 'syncQuickPhraseDockWithKeyboard' "Quick phrase keyboard sync"
expect_contains restored_webarchive/app.js 'data-delete-record' "Record folder delete action"
expect_contains restored_webarchive/app.js 'SMOKE_TEST_MODE' "Smoke test mode"
expect_contains restored_webarchive/app.js 'function notify' "Smoke-safe notification helper"
expect_contains restored_webarchive/app.js 'if (LOCAL_ONLY_MODE)' "Local-only service worker guard"
expect_contains restored_webarchive/app.js 'registration.unregister' "Local-only service worker cleanup"
expect_contains ios/App/App.xcodeproj/project.pbxproj 'PRODUCT_BUNDLE_IDENTIFIER = com.xiazhiyuan.flightrecorder;' "Bundle ID"
expect_contains ios/App/App.xcodeproj/project.pbxproj 'TARGETED_DEVICE_FAMILY = 2;' "iPad-only target"
expect_contains ios/App/App.xcodeproj/project.pbxproj 'SUPPORTED_PLATFORMS = "iphoneos iphonesimulator";' "iOS supported platforms"
expect_contains ios/App/App.xcodeproj/project.pbxproj 'SUPPORTS_MACCATALYST = NO;' "Mac Catalyst disabled"
expect_contains ios/App/App.xcodeproj/project.pbxproj 'SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;' "Mac-designed iPad app disabled"
expect_contains ios/App/App/PrivacyInfo.xcprivacy '<key>NSPrivacyTracking</key>' "Privacy tracking key"
expect_contains ios/App/App/PrivacyInfo.xcprivacy '<false/>' "Privacy tracking false"
expect_file node_modules/@capacitor/ios/Capacitor/Capacitor/PrivacyInfo.xcprivacy
expect_file node_modules/@capacitor/ios/CapacitorCordova/CapacitorCordova/PrivacyInfo.xcprivacy
expect_contains ios/App/App/Info.plist '<key>ITSAppUsesNonExemptEncryption</key>' "Export compliance encryption key"
expect_contains ios/App/App/Info.plist '<false/>' "Export compliance encryption false"
expect_contains app-store/metadata.zh-CN.md '## 支持 URL' "Support URL section"
expect_contains app-store/metadata.zh-CN.md '## 隐私政策 URL' "Privacy URL section"
expect_contains app-store/metadata.zh-CN.md 'app-store/ipad-13-inch-v55.png' "13-inch screenshot"
expect_contains app-store/metadata.zh-CN.md 'app-store/ipad-air-5-size-v55.png' "iPad Air 5 same-size screenshot"
expect_contains app-store/connect-fields.zh-CN.md '飞行记录' "Connect app name"
expect_contains app-store/connect-fields.zh-CN.md 'com.xiazhiyuan.flightrecorder' "Connect bundle id"
expect_contains app-store/connect-fields.zh-CN.md 'app-store/ipad-13-inch-v55.png' "Connect 13-inch screenshot"
expect_contains app-store/connect-fields.zh-CN.md 'app-store/demo-records.json' "Connect demo records"
expect_contains app-store/connect-fields.zh-CN.md 'app-store/submission-form-checklist.zh-CN.md' "Submission form checklist reference"
expect_contains APP_STORE_RELEASE.md 'app-store/final-submission-open-items.zh-CN.md' "Final open items checklist"
expect_contains APP_STORE_RELEASE.md 'app-store/command-cheatsheet.zh-CN.md' "Command cheatsheet"
expect_contains app-store/command-cheatsheet.zh-CN.md 'npm run check:appstore' "Command cheatsheet appstore check"
expect_contains app-store/command-cheatsheet.zh-CN.md 'npm run appstore:status' "Command cheatsheet appstore status"
expect_contains app-store/command-cheatsheet.zh-CN.md 'npm run ios:open' "Command cheatsheet Xcode open"
expect_contains app-store/command-cheatsheet.zh-CN.md 'npm run ios:verify-archive' "Command cheatsheet archive check"
expect_contains app-store/command-cheatsheet.zh-CN.md 'npm run appstore:apply-values' "Command cheatsheet apply values"
expect_contains app-store/command-cheatsheet.zh-CN.md 'npm run appstore:self-test-values' "Command cheatsheet self-test values"
expect_contains .gitignore 'app-store/submission-values.json' "Private submission values gitignore"
expect_contains .gitignore 'app-store/device-test-results.json' "Private device test results gitignore"
expect_contains app-store/final-submission-open-items.zh-CN.md 'Bundle ID | `com.xiazhiyuan.flightrecorder`' "Final open items bundle id"
expect_contains app-store/final-submission-open-items.zh-CN.md 'App 本体无域名依赖' "Final open items no domain dependency"
expect_contains app-store/submission-form-checklist.zh-CN.md '是否使用广告标识符 IDFA | 否' "IDFA answer"
expect_contains app-store/submission-form-checklist.zh-CN.md '是否使用非豁免加密 | 否' "Export compliance answer"
expect_contains APP_STORE_RELEASE.md 'app-store/device-test-checklist.zh-CN.md' "Device test checklist"
expect_contains APP_STORE_RELEASE.md 'app-store/browser-smoke-test.zh-CN.md' "Browser smoke test"
expect_contains app-store/browser-smoke-test.zh-CN.md '2026-06-12 通过' "Browser smoke test result"
expect_contains app-store/browser-smoke-test.zh-CN.md 'iPad B-9988 测试' "Browser smoke test iPad source"
expect_contains APP_STORE_RELEASE.md 'app-store/xcode-app-store-next-steps.zh-CN.md' "Xcode next steps checklist"
expect_contains APP_STORE_RELEASE.md 'app-store/xcode-signing-troubleshooting.zh-CN.md' "Xcode signing troubleshooting"
expect_contains APP_STORE_RELEASE.md 'app-store/testing-before-developer-approval.zh-CN.md' "Testing before developer approval"
expect_contains APP_STORE_RELEASE.md 'app-store/screenshot-capture-guide.zh-CN.md' "Screenshot guide"
expect_contains APP_STORE_RELEASE.md 'app-store/static-site/' "Static site source"
expect_contains app-store/static-site/support.html './privacy.html' "Static privacy link"
expect_contains app-store/static-site/privacy.html './support.html' "Static support link"
expect_contains app-store/xcode-app-store-next-steps.zh-CN.md 'com.xiazhiyuan.flightrecorder' "Xcode checklist bundle id"
expect_contains app-store/xcode-app-store-next-steps.zh-CN.md 'iPad Air 第五代' "Xcode checklist target device"
expect_contains app-store/xcode-app-store-next-steps.zh-CN.md '不要改回旧域名式 Bundle ID' "Xcode checklist no old domain"
PERSONAL_DOMAIN_TOKEN="tuoma""kazusa"
if grep -q "$PERSONAL_DOMAIN_TOKEN" capacitor.config.json restored_webarchive/index.html restored_webarchive/app.js restored_webarchive/sw.js restored_webarchive/manifest.json ios/App/App/capacitor.config.json ios/App/App.xcodeproj/project.pbxproj ios/App/App/config.xml ios/App/App/public/index.html ios/App/App/public/app.js ios/App/App/public/sw.js ios/App/App/public/manifest.json; then
  fail "iPad app runtime files must not use the old hosted-app domain or domain-based bundle identifier"
fi
if grep -q 'fetch(' restored_webarchive/sw.js ios/App/App/public/sw.js; then
  fail "Service worker must stay cache-only for the local iPad app shell"
fi
if grep -q '<access origin="\*"' ios/App/App/config.xml; then
  fail "Cordova wildcard network access must not be present in the offline iPad app"
fi
if [[ -e ios/App/App/public/app-store || -e restored_webarchive/app-store ]]; then
  fail "Support/privacy hosting pages should stay outside the local App bundle"
fi
if [[ "$STRICT_SUBMIT" == "1" ]]; then
  STRICT_PLACEHOLDER_PATTERN='<github-username>|<your-domain>|公开支持邮箱将在|^[[:space:]]*待定[。；,，]|\|[^|]*\|[[:space:]]*待定([[:space:]]*\||，)'
  STRICT_PLACEHOLDER_FILES=(
    app-store/metadata.zh-CN.md
    app-store/connect-fields.zh-CN.md
    app-store/submission-form-checklist.zh-CN.md
    app-store/final-submission-open-items.zh-CN.md
    app-store/static-site/privacy.html
    app-store/static-site/support.html
    app-store/static-site/README.md
    app-store/privacy-policy.zh-CN.html
    app-store/support.zh-CN.html
  )
  STRICT_PLACEHOLDERS_FOUND=0
  for strict_file in "${STRICT_PLACEHOLDER_FILES[@]}"; do
    if grep -qE "$STRICT_PLACEHOLDER_PATTERN" "$strict_file"; then
      echo "Strict placeholder remains in $strict_file:" >&2
      grep -nE "$STRICT_PLACEHOLDER_PATTERN" "$strict_file" >&2
      STRICT_PLACEHOLDERS_FOUND=1
    fi
  done
  if [[ "$STRICT_PLACEHOLDERS_FOUND" == "1" ]]; then
    echo "Strict submission metadata placeholders remain." >&2
  fi
  STRICT_DEVICE_RESULT=0
  node scripts/verify_device_test_results.mjs app-store/device-test-results.json || STRICT_DEVICE_RESULT=1
  if [[ "$STRICT_PLACEHOLDERS_FOUND" == "1" || "$STRICT_DEVICE_RESULT" == "1" ]]; then
    fail "Strict submission check failed: replace submission placeholders and verify iPad Air 5 device test results first"
  fi
fi

ICON_INFO="$(sips -g hasAlpha -g pixelWidth -g pixelHeight ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png)"
echo "$ICON_INFO"
echo "$ICON_INFO" | grep -q "hasAlpha: no"
echo "$ICON_INFO" | grep -q "pixelWidth: 1024"
echo "$ICON_INFO" | grep -q "pixelHeight: 1024"

SCREENSHOT_13_INFO="$(sips -g pixelWidth -g pixelHeight app-store/ipad-13-inch-v55.png)"
echo "$SCREENSHOT_13_INFO"
echo "$SCREENSHOT_13_INFO" | grep -q "pixelWidth: 2064"
echo "$SCREENSHOT_13_INFO" | grep -q "pixelHeight: 2752"

SCREENSHOT_AIR_INFO="$(sips -g pixelWidth -g pixelHeight app-store/ipad-air-5-size-v55.png)"
echo "$SCREENSHOT_AIR_INFO"
echo "$SCREENSHOT_AIR_INFO" | grep -q "pixelWidth: 1640"
echo "$SCREENSHOT_AIR_INFO" | grep -q "pixelHeight: 2360"

echo "App Store readiness checks passed."
