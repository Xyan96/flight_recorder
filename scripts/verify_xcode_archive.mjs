import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const EXPECTED = {
  bundleId: "com.xiazhiyuan.flightrecorder",
  displayName: "飞行记录",
  version: "1.0",
  build: "2",
  minOs: "15.0",
};

const DEFAULT_ARCHIVE = "build/Archives/FlightRecorder-v1.0-b2.xcarchive";

const args = process.argv.slice(2);
const requireSigned = args.includes("--require-signed");
const useLatest = args.includes("--latest");
const archiveArg = args.find((arg) => !arg.startsWith("--"));

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function listArchives(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name.endsWith(".xcarchive")) return [fullPath];
    if (entry.isDirectory()) return listArchives(fullPath);
    return [];
  });
}

function latestArchive() {
  const archiveRoot = process.env.XCODE_ARCHIVES_DIR || path.join(os.homedir(), "Library/Developer/Xcode/Archives");
  let archives;
  try {
    archives = listArchives(archiveRoot);
  } catch (error) {
    fail(`Could not scan Xcode archive directory ${archiveRoot}: ${error.message}`);
  }
  if (archives.length === 0) {
    fail(`No Xcode archives found in ${archiveRoot}. Create one with Xcode Product > Archive first.`);
  }
  archives.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return archives[0];
}

const archivePath = path.resolve(process.env.ARCHIVE_PATH || archiveArg || (useLatest ? latestArchive() : DEFAULT_ARCHIVE));

function readPlist(file) {
  try {
    const json = execFileSync("/usr/bin/plutil", ["-convert", "json", "-o", "-", file], {
      encoding: "utf8",
    });
    return JSON.parse(json);
  } catch (error) {
    fail(`Could not read plist ${file}: ${error.message}`);
  }
}

function plistPrint(file, key) {
  try {
    return execFileSync("/usr/libexec/PlistBuddy", ["-c", `Print :${key}`, file], {
      encoding: "utf8",
    }).trim();
  } catch (error) {
    fail(`Could not read plist key ${key} from ${file}: ${error.message}`);
  }
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`Could not read JSON ${file}: ${error.message}`);
  }
}

function expect(condition, message) {
  if (!condition) fail(message);
}

function sameString(actual, expected, label) {
  expect(actual === expected, `${label} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

function sameBool(actual, expected, label) {
  expect(actual === expected, `${label} expected ${expected}, got ${actual}`);
}

function expectEmptyArray(value, label) {
  expect(Array.isArray(value), `${label} must be an array`);
  expect(value.length === 0, `${label} must be empty`);
}

function appFile(...segments) {
  return path.join(archivePath, "Products", "Applications", "App.app", ...segments);
}

expect(fs.existsSync(archivePath), `Archive not found: ${archivePath}`);
expect(archivePath.endsWith(".xcarchive"), `Archive path must end with .xcarchive: ${archivePath}`);

const archiveInfoPath = path.join(archivePath, "Info.plist");
const appInfoPath = appFile("Info.plist");
const privacyPath = appFile("PrivacyInfo.xcprivacy");
const capacitorConfigPath = appFile("capacitor.config.json");
const configXmlPath = appFile("config.xml");
const executablePath = appFile("App");

for (const file of [archiveInfoPath, appInfoPath, privacyPath, capacitorConfigPath, configXmlPath, executablePath]) {
  expect(fs.existsSync(file), `Missing archive file: ${file}`);
}

sameString(plistPrint(archiveInfoPath, "ApplicationProperties:CFBundleIdentifier"), EXPECTED.bundleId, "Archive bundle id");
sameString(
  plistPrint(archiveInfoPath, "ApplicationProperties:CFBundleShortVersionString"),
  EXPECTED.version,
  "Archive version"
);
sameString(plistPrint(archiveInfoPath, "ApplicationProperties:CFBundleVersion"), EXPECTED.build, "Archive build");
sameString(
  plistPrint(archiveInfoPath, "ApplicationProperties:ApplicationPath"),
  "Applications/App.app",
  "Archive application path"
);
expect(plistPrint(archiveInfoPath, "ApplicationProperties:Architectures").includes("arm64"), "Archive must include arm64");

const signingIdentity = plistPrint(archiveInfoPath, "ApplicationProperties:SigningIdentity");
const team = plistPrint(archiveInfoPath, "ApplicationProperties:Team");
if (requireSigned) {
  expect(signingIdentity.length > 0, "Archive is not signed: SigningIdentity is empty");
  expect(team.length > 0, "Archive is not signed: Team is empty");
} else if (!signingIdentity || !team) {
  console.warn("WARN: Archive is unsigned. Use --require-signed before App Store upload.");
}

const appInfo = readPlist(appInfoPath);
sameString(appInfo.CFBundleIdentifier, EXPECTED.bundleId, "App bundle id");
sameString(appInfo.CFBundleDisplayName, EXPECTED.displayName, "App display name");
sameString(appInfo.CFBundleShortVersionString, EXPECTED.version, "App version");
sameString(String(appInfo.CFBundleVersion), EXPECTED.build, "App build");
sameString(appInfo.MinimumOSVersion, EXPECTED.minOs, "Minimum iPadOS version");
sameBool(appInfo.ITSAppUsesNonExemptEncryption, false, "Export compliance flag");
sameBool(appInfo.LSRequiresIPhoneOS, true, "iOS device requirement");
expect(Array.isArray(appInfo.UIDeviceFamily), "UIDeviceFamily must be an array");
expect(appInfo.UIDeviceFamily.length === 1 && appInfo.UIDeviceFamily[0] === 2, "Archive must be iPad-only");
expect(Array.isArray(appInfo.CFBundleSupportedPlatforms), "Supported platforms must be an array");
expect(appInfo.CFBundleSupportedPlatforms.includes("iPhoneOS"), "Archive must target iPhoneOS/iPadOS device platform");

const privacy = readPlist(privacyPath);
sameBool(privacy.NSPrivacyTracking, false, "Privacy tracking flag");
expectEmptyArray(privacy.NSPrivacyTrackingDomains, "Privacy tracking domains");
expectEmptyArray(privacy.NSPrivacyCollectedDataTypes, "Privacy collected data types");
expectEmptyArray(privacy.NSPrivacyAccessedAPITypes, "Privacy accessed API types");

const capConfig = readJson(capacitorConfigPath);
sameString(capConfig.appId, EXPECTED.bundleId, "Capacitor app id");
sameString(capConfig.appName, EXPECTED.displayName, "Capacitor app name");
sameBool(capConfig.plugins?.CapacitorHttp?.enabled, false, "CapacitorHttp native bridge");
sameBool(capConfig.plugins?.CapacitorCookies?.enabled, false, "CapacitorCookies native bridge");
expect(!capConfig.server, "Capacitor server config must not be bundled for offline App Store app");

const configXml = fs.readFileSync(configXmlPath, "utf8");
expect(!configXml.includes('<access origin="*"'), "Cordova wildcard network access must not be present");

console.log(`Archive OK: ${archivePath}`);
console.log(`Bundle: ${EXPECTED.bundleId}`);
console.log(`Version: ${EXPECTED.version} (${EXPECTED.build})`);
console.log(`Signing: ${signingIdentity && team ? `${signingIdentity} / ${team}` : "unsigned"}`);
