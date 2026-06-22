import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ARCHIVE_PATH = path.join(ROOT, "build/Archives/FlightRecorder-v1.0-b2.xcarchive");
const TEMP_SIGNED_ARCHIVE_PATH = "/private/tmp/FlightRecorder-v1.0-b2.xcarchive";
const TEMP_EXPORT_IPA_PATH = "/private/tmp/FlightRecorder-export-b2/App.ipa";
const DEVICE_TEST_RESULTS_PATH = path.join(ROOT, "app-store/device-test-results.json");
const EXPECTED_BUNDLE_ID = "com.xiazhiyuan.flightrecorder";
const EXPECTED_VERSION = "1.0";
const EXPECTED_BUILD = "2";

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: "utf8",
    timeout: options.timeout || 30000,
    ...options,
  });
  return {
    ok: result.status === 0,
    status: result.status,
    stdout: result.stdout?.trim() || "",
    stderr: result.stderr?.trim() || "",
    error: result.error,
  };
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function statusLine(kind, label, detail = "") {
  const suffix = detail ? ` - ${detail}` : "";
  console.log(`[${kind}] ${label}${suffix}`);
}

function extractMatches(text, regex) {
  return [...text.matchAll(regex)].map((match) => match[1]?.trim()).filter(Boolean);
}

function parseSubmissionValues() {
  const valueFile = path.join(ROOT, "app-store/submission-values.json");
  if (!fs.existsSync(valueFile)) return { exists: false };
  try {
    const values = JSON.parse(fs.readFileSync(valueFile, "utf8"));
    return { exists: true, values };
  } catch (error) {
    return { exists: true, error: error.message };
  }
}

function latestDistributionIssue() {
  let entries = [];
  try {
    entries = fs.readdirSync(os.tmpdir(), { withFileTypes: true });
  } catch {
    return null;
  }

  const logs = entries
    .filter((entry) => entry.isDirectory() && entry.name.endsWith(".xcdistributionlogs"))
    .map((entry) => path.join(os.tmpdir(), entry.name))
    .filter((dir) => {
      const verboseLog = path.join(dir, "IDEDistribution.verbose.log");
      const ascLog = path.join(dir, "IDEDistributionAppStoreConnect.log");
      const contentLog = path.join(dir, "ContentDelivery.log");
      return fs.existsSync(verboseLog) || fs.existsSync(ascLog) || fs.existsSync(contentLog);
    })
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);

  for (const dir of logs.slice(0, 5)) {
    const textParts = ["ContentDelivery.log", "IDEDistribution.verbose.log", "IDEDistributionAppStoreConnect.log"]
      .map((name) => path.join(dir, name))
      .filter((file) => fs.existsSync(file))
      .map((file) => fs.readFileSync(file, "utf8"));
    const logText = textParts.join("\n");

    if (/upload succeeded|upload complete|uploaded successfully/i.test(logText)) return null;
    if (logText.includes("Checksums do not match")) return { kind: "upload-checksum", dir };
    if (logText.includes("The network connection was lost")) return { kind: "upload-network", dir };
    if (logText.includes('missingApp(bundleId: "' + EXPECTED_BUNDLE_ID + '")')) {
      return { kind: "missing-app-record", dir };
    }
  }
  return null;
}

function placeholderHits() {
  const pattern = /<github-username>|<your-domain>|公开支持邮箱将在|^[ \t]*待定[。；,，]|\|[^|]*\|[ \t]*待定([ \t]*\||，)/m;
  const files = [
    "app-store/metadata.zh-CN.md",
    "app-store/connect-fields.zh-CN.md",
    "app-store/submission-form-checklist.zh-CN.md",
    "app-store/final-submission-open-items.zh-CN.md",
    "app-store/static-site/privacy.html",
    "app-store/static-site/support.html",
    "app-store/static-site/README.md",
    "app-store/privacy-policy.zh-CN.html",
    "app-store/support.zh-CN.html",
  ];
  return files.filter((file) => pattern.test(read(file)));
}

console.log("App Store status");
console.log("================");

const xcodeSelect = run("xcode-select", ["-p"]);
if (xcodeSelect.ok) {
  statusLine("OK", "Xcode selected", xcodeSelect.stdout);
} else {
  statusLine("TODO", "Xcode selected", xcodeSelect.stderr || xcodeSelect.error?.message);
}

const xcodeVersion = run("xcodebuild", ["-version"]);
if (xcodeVersion.ok) {
  statusLine("OK", "Xcode version", xcodeVersion.stdout.replace(/\n/g, " / "));
} else {
  statusLine("TODO", "Xcode version", xcodeVersion.stderr || xcodeVersion.error?.message);
}

const pbxproj = read("ios/App/App.xcodeproj/project.pbxproj");
const bundleIds = unique(extractMatches(pbxproj, /PRODUCT_BUNDLE_IDENTIFIER = ([^;]+);/g));
const versions = unique(extractMatches(pbxproj, /MARKETING_VERSION = ([^;]+);/g));
const builds = unique(extractMatches(pbxproj, /CURRENT_PROJECT_VERSION = ([^;]+);/g));
const deviceFamilies = unique(extractMatches(pbxproj, /TARGETED_DEVICE_FAMILY = ([^;]+);/g));
const signingStyles = unique(extractMatches(pbxproj, /CODE_SIGN_STYLE = ([^;]+);/g));
const teams = unique(extractMatches(pbxproj, /DEVELOPMENT_TEAM = ([^;]+);/g));

statusLine(
  bundleIds.length === 1 && bundleIds[0] === EXPECTED_BUNDLE_ID ? "OK" : "TODO",
  "Bundle ID",
  bundleIds.join(", ") || "missing"
);
statusLine(versions.length === 1 && versions[0] === EXPECTED_VERSION ? "OK" : "TODO", "Version", versions.join(", ") || "missing");
statusLine(builds.length === 1 && builds[0] === EXPECTED_BUILD ? "OK" : "TODO", "Build", builds.join(", ") || "missing");
statusLine(deviceFamilies.length === 1 && deviceFamilies[0] === "2" ? "OK" : "TODO", "iPad-only target", deviceFamilies.join(", ") || "missing");
statusLine(signingStyles.includes("Automatic") ? "OK" : "TODO", "Automatic signing", signingStyles.join(", ") || "missing");
statusLine(teams.length > 0 ? "OK" : "TODO", "Development Team", teams.join(", ") || "select Team in Xcode Signing & Capabilities");

const devices = run("xcrun", ["devicectl", "list", "devices"], { timeout: 5000 });
if (!devices.ok) {
  statusLine("WARN", "Connected iPad", "device check unavailable; confirm in the Xcode device picker");
} else if (/No devices found/i.test(devices.stdout)) {
  statusLine("TODO", "Connected iPad", "No devices found");
} else {
  const compact = devices.stdout.split("\n").map((line) => line.trim()).filter(Boolean).slice(0, 4).join(" / ");
  statusLine("OK", "Connected iPad/device list", compact);
}

const archiveCandidates = [
  { label: "project archive", path: ARCHIVE_PATH },
  { label: "temporary signed archive", path: TEMP_SIGNED_ARCHIVE_PATH },
].filter((candidate) => fs.existsSync(candidate.path));

let signedArchiveOk = false;
if (archiveCandidates.length === 0) {
  statusLine("TODO", "Archive", "run npm run ios:archive:unsigned or create signed archive in Xcode");
} else {
  const archive = run("node", ["scripts/verify_xcode_archive.mjs", archiveCandidates[0].path]);
  statusLine(
    archive.ok ? "OK" : "TODO",
    "Archive preflight",
    archive.ok ? `${archiveCandidates[0].label}: metadata checks passed` : archive.stderr || archive.stdout
  );

  const signedArchive = archiveCandidates
    .map((candidate) => ({ candidate, result: run("node", ["scripts/verify_xcode_archive.mjs", "--require-signed", candidate.path]) }))
    .find(({ result }) => result.ok);
  signedArchiveOk = Boolean(signedArchive);
  statusLine(
    signedArchiveOk ? "OK" : "TODO",
    "Signed archive preflight",
    signedArchiveOk ? `${signedArchive.candidate.label}: signed metadata checks passed` : "create signed archive in Xcode"
  );
}

if (fs.existsSync(TEMP_EXPORT_IPA_PATH)) {
  statusLine("OK", "App Store Connect export preflight", TEMP_EXPORT_IPA_PATH);
} else if (signedArchiveOk) {
  statusLine("TODO", "App Store Connect export preflight", "export or upload the signed archive with Xcode Organizer");
}

const distributionIssue = latestDistributionIssue();
if (distributionIssue?.kind === "missing-app-record") {
  statusLine("TODO", "App Store Connect app record", `create app record for ${EXPECTED_BUNDLE_ID}; latest upload log reports missingApp`);
} else if (distributionIssue?.kind === "upload-checksum") {
  statusLine("TODO", "App Store Connect upload", `latest upload log reports checksum mismatch: ${distributionIssue.dir}`);
} else if (distributionIssue?.kind === "upload-network") {
  statusLine("TODO", "App Store Connect upload", `latest upload log reports network loss: ${distributionIssue.dir}`);
}

const values = parseSubmissionValues();
if (!values.exists) {
  statusLine("TODO", "Final submission values", "copy app-store/submission-values.example.json to app-store/submission-values.json");
} else if (values.error) {
  statusLine("TODO", "Final submission values", values.error);
} else {
  statusLine("OK", "Final submission values file", "app-store/submission-values.json exists");
}

if (!fs.existsSync(DEVICE_TEST_RESULTS_PATH)) {
  statusLine("TODO", "iPad Air 5 device test results", "copy app-store/device-test-results.example.json to app-store/device-test-results.json after real testing");
} else {
  const deviceTest = run("node", ["scripts/verify_device_test_results.mjs", "app-store/device-test-results.json"]);
  statusLine(deviceTest.ok ? "OK" : "TODO", "iPad Air 5 device test results", deviceTest.ok ? "verified" : deviceTest.stderr || deviceTest.stdout);
}

const placeholders = placeholderHits();
statusLine(
  placeholders.length === 0 ? "OK" : "TODO",
  "Strict metadata placeholders",
  placeholders.length === 0 ? "none" : `${placeholders.length} file(s): ${placeholders.join(", ")}`
);

console.log("");
console.log("Next likely actions:");
if (teams.length === 0) console.log("- Select your Apple Developer Team in Xcode > target App > Signing & Capabilities.");
if (!devices.ok || /No devices found/i.test(devices.stdout)) console.log("- Confirm the iPad Air 5 is connected, unlocked, trusted, and visible in Xcode's device picker.");
if (!fs.existsSync(DEVICE_TEST_RESULTS_PATH)) console.log("- After real iPad testing, copy app-store/device-test-results.example.json to app-store/device-test-results.json and mark passed checks true.");
if (placeholders.length > 0) console.log("- Fill final support/privacy URL, email, price, regions, review contact, and device test statuses.");
if (distributionIssue?.kind === "missing-app-record") console.log("- Create the App Store Connect app record for com.xiazhiyuan.flightrecorder, then retry upload.");
else if (distributionIssue?.kind === "upload-checksum" || distributionIssue?.kind === "upload-network") console.log("- Retry uploading /private/tmp/FlightRecorder-export-b2/App.ipa from a different network path, or use Apple Transporter/altool with App Store Connect credentials.");
else if (fs.existsSync(TEMP_EXPORT_IPA_PATH)) console.log("- Upload the verified App Store Connect export or use Xcode Organizer to upload/select build 1.0 (2).");
console.log("- Run npm run check:appstore for local readiness, then npm run check:appstore:strict before final submission.");
