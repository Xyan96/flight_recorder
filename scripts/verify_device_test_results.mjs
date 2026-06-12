import fs from "node:fs";

const file = process.argv[2] || "app-store/device-test-results.json";

const requiredStrings = [
  "testDate",
  "tester",
  "device",
  "iPadOSVersion",
  "xcodeVersion",
  "bundleId",
  "appVersion",
  "buildNumber",
];

const requiredTrue = [
  "xcodeRunInstalled",
  "developerTeamSelected",
  "airplaneModeEnabled",
  "appLaunchesOffline",
  "offlineSavePromptShowsSavedToIpad",
  "recordFolderShowsIpadSource",
  "recordLoadRestoresMainForm",
  "backupExportWorks",
  "backupImportWorks",
  "restartKeepsRecords",
  "noLoginOrCloudflareScreen",
  "screenshotsUseFictionalData",
];

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function readJson(path) {
  try {
    return JSON.parse(fs.readFileSync(path, "utf8"));
  } catch (error) {
    fail(`Could not read ${path}: ${error.message}`);
  }
}

const result = readJson(file);

for (const key of requiredStrings) {
  const value = result[key];
  if (typeof value !== "string" || !value.trim()) fail(`${key} is required`);
  if (/[<>]/.test(value) || /待填写|example|0000/.test(value)) fail(`${key} still looks like a placeholder`);
}

if (result.device !== "iPad Air 第五代") fail("device must be iPad Air 第五代");
if (result.bundleId !== "com.xiazhiyuan.flightrecorder") fail("bundleId must be com.xiazhiyuan.flightrecorder");
if (result.appVersion !== "1.0") fail("appVersion must be 1.0");
if (String(result.buildNumber) !== "1") fail("buildNumber must be 1");
if (!/^\d{4}-\d{2}-\d{2}$/.test(result.testDate)) fail("testDate must use YYYY-MM-DD");

for (const key of requiredTrue) {
  if (result[key] !== true) fail(`${key} must be true after real iPad Air 5 testing`);
}

console.log(`${file}: device test results OK`);
