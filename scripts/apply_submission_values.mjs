import fs from "node:fs";

const args = process.argv.slice(2);
const selfTest = args.includes("--self-test");
const dryRun = args.includes("--dry-run") || selfTest;
const valueFile = args.find((arg) => !arg.startsWith("--"));

if (!valueFile && !selfTest) {
  console.error("Usage: node scripts/apply_submission_values.mjs app-store/submission-values.json [--dry-run]");
  console.error("       node scripts/apply_submission_values.mjs --self-test");
  process.exit(2);
}

const requiredFields = [
  "supportEmail",
  "supportUrl",
  "privacyUrl",
  "staticHostingLocation",
  "price",
  "regions",
  "developerDisplayName",
  "reviewContactName",
  "reviewContactPhone",
  "reviewContactEmail",
  "deviceInstallStatus",
  "offlineSaveStatus",
  "archiveLoadStatus",
  "backupStatus",
  "screenshotDataStatus",
];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  if (dryRun) {
    console.log(`dry-run update ${file} (${content.length} bytes)`);
    return;
  }
  fs.writeFileSync(file, content, "utf8");
  console.log(`updated ${file}`);
}

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function validateUrl(name, value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    fail(`${name} must be a valid URL`);
  }
  if (!["http:", "https:"].includes(url.protocol)) fail(`${name} must be http or https`);
}

function validateEmail(name, value) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) fail(`${name} must be an email address`);
}

function validateNonPlaceholder(name, value) {
  if (typeof value !== "string" || !value.trim()) fail(`${name} is required`);
  if (/[<>]/.test(value)) fail(`${name} still looks like a placeholder`);
  if (/待定|待填写|example\.(com|github\.io)|000 0000/.test(value)) {
    fail(`${name} still contains example or placeholder text`);
  }
}

function replaceLine(content, regex, replacement, label) {
  if (!regex.test(content)) fail(`Could not find ${label}`);
  return content.replace(regex, replacement);
}

function replaceSection(content, heading, nextHeading, replacement) {
  const pattern = new RegExp(`(${heading}\\n)([\\s\\S]*?)(?=\\n${nextHeading}\\n)`);
  if (!pattern.test(content)) fail(`Could not find section ${heading}`);
  return content.replace(pattern, `$1\n${replacement.trim()}\n`);
}

function mailto(email) {
  return `<a href="mailto:${email}">${email}</a>`;
}

const selfTestValues = {
  supportEmail: "support@flight-recorder.invalid",
  supportUrl: "https://flight-recorder.invalid/support.html",
  privacyUrl: "https://flight-recorder.invalid/privacy.html",
  staticHostingLocation: "Public static host: https://flight-recorder.invalid/",
  price: "免费",
  regions: "所有国家和地区",
  developerDisplayName: "Flight Recorder Publisher",
  reviewContactName: "Review Contact",
  reviewContactPhone: "+86 138 0000 0001",
  reviewContactEmail: "review@flight-recorder.invalid",
  deviceInstallStatus: "已通过，2026-06-12，iPad Air 第五代，Xcode Run 成功",
  offlineSaveStatus: "已通过，飞行模式下保存提示为“已保存到 iPad”",
  archiveLoadStatus: "已通过，记录夹可载入刚保存的记录",
  backupStatus: "已通过，备份可导出并重新导入",
  screenshotDataStatus: "已通过，截图只使用虚构测试数据",
};

const values = selfTest ? selfTestValues : JSON.parse(read(valueFile));

for (const field of requiredFields) {
  validateNonPlaceholder(field, values[field]);
}
validateEmail("supportEmail", values.supportEmail);
validateEmail("reviewContactEmail", values.reviewContactEmail);
validateUrl("supportUrl", values.supportUrl);
validateUrl("privacyUrl", values.privacyUrl);

let metadata = read("app-store/metadata.zh-CN.md");
metadata = replaceLine(metadata, /^- 价格建议：.*$/m, `- 价格：${values.price}`, "metadata price");
if (/^- 开发者显示名称：/m.test(metadata)) {
  metadata = replaceLine(
    metadata,
    /^- 开发者显示名称：.*$/m,
    `- 开发者显示名称：${values.developerDisplayName}`,
    "metadata developer display name"
  );
} else {
  metadata = metadata.replace(
    /^- 价格：.*$/m,
    (line) => `${line}\n- 开发者显示名称：${values.developerDisplayName}`
  );
}
metadata = replaceSection(
  metadata,
  "## 支持 URL",
  "## 隐私政策 URL",
  `\`\`\`text
${values.supportUrl}
\`\`\`

公开支持邮箱：${values.supportEmail}

静态页面托管位置：${values.staticHostingLocation}`
);
metadata = replaceSection(
  metadata,
  "## 隐私政策 URL",
  "## 审核备注",
  `\`\`\`text
${values.privacyUrl}
\`\`\`

与支持页放在同一套公开静态托管页面中。`
);
metadata = metadata.replace(
  /## 提交前必填占位[\s\S]*$/,
  `## 提交前确认

- 公开支持邮箱：${values.supportEmail}
- 支持 URL：${values.supportUrl}
- 隐私政策 URL：${values.privacyUrl}
- 静态页面托管位置：${values.staticHostingLocation}
- 开发者显示名称：${values.developerDisplayName}
- 价格：${values.price}
- 上架国家和地区：${values.regions}
- iPad Air 第五代真机测试：${values.deviceInstallStatus}
`
);
write("app-store/metadata.zh-CN.md", metadata);

let connect = read("app-store/connect-fields.zh-CN.md");
if (!/\| 开发者显示名称 \|/.test(connect)) {
  connect = connect.replace(/\| 面向儿童 \| 否 \|/, `| 面向儿童 | 否 |\n| 开发者显示名称 | 待定 |`);
}
connect = replaceLine(connect, /^\| 开发者显示名称 \| .* \|$/m, `| 开发者显示名称 | ${values.developerDisplayName} |`, "connect developer display name");
connect = replaceLine(connect, /^\| 价格 \| .* \|$/m, `| 价格 | ${values.price} |`, "connect price");
connect = replaceLine(connect, /^\| 上架国家和地区 \| .* \|$/m, `| 上架国家和地区 | ${values.regions} |`, "connect regions");
connect = replaceLine(connect, /^\| 支持 URL \| .* \|$/m, `| 支持 URL | ${values.supportUrl} |`, "connect support URL");
connect = replaceLine(connect, /^\| 隐私政策 URL \| .* \|$/m, `| 隐私政策 URL | ${values.privacyUrl} |`, "connect privacy URL");
connect = connect.replace(
  /## 提交前必须替换[\s\S]*$/,
  `## 提交前已确认

- 公开支持邮箱：${values.supportEmail}
- 支持 URL：${values.supportUrl}
- 隐私政策 URL：${values.privacyUrl}
- 价格：${values.price}
- 上架国家和地区：${values.regions}
- 开发者显示名称：${values.developerDisplayName}
- 审核联系人姓名、电话、邮箱：${values.reviewContactName} / ${values.reviewContactPhone} / ${values.reviewContactEmail}
- 真机 iPad Air 第五代测试结果：${values.deviceInstallStatus}
`
);
write("app-store/connect-fields.zh-CN.md", connect);

let checklist = read("app-store/submission-form-checklist.zh-CN.md");
checklist = replaceLine(checklist, /^\| 价格 \| .* \|$/m, `| 价格 | ${values.price} |`, "checklist price");
checklist = replaceLine(checklist, /^\| 上架国家和地区 \| .* \|$/m, `| 上架国家和地区 | ${values.regions} |`, "checklist regions");
checklist = replaceLine(checklist, /^\| 联系人姓名 \| .* \|$/m, `| 联系人姓名 | ${values.reviewContactName} |`, "checklist review contact name");
checklist = replaceLine(checklist, /^\| 联系电话 \| .* \|$/m, `| 联系电话 | ${values.reviewContactPhone} |`, "checklist review contact phone");
checklist = replaceLine(checklist, /^\| 联系邮箱 \| .* \|$/m, `| 联系邮箱 | ${values.reviewContactEmail} |`, "checklist review contact email");
write("app-store/submission-form-checklist.zh-CN.md", checklist);

let openItems = read("app-store/final-submission-open-items.zh-CN.md");
const openItemRows = {
  "公开支持邮箱": values.supportEmail,
  "Support URL": values.supportUrl,
  "Privacy Policy URL": values.privacyUrl,
  "静态页面托管位置": values.staticHostingLocation,
  "价格": values.price,
  "上架国家和地区": values.regions,
  "开发者显示名称": values.developerDisplayName,
  "审核联系人姓名": values.reviewContactName,
  "审核联系电话": values.reviewContactPhone,
  "审核联系邮箱": values.reviewContactEmail,
  "iPad Air 第五代真机安装": values.deviceInstallStatus,
  "飞行模式离线保存": values.offlineSaveStatus,
  "记录夹载入": values.archiveLoadStatus,
  "备份导出/导入": values.backupStatus,
  "截图是否使用虚构测试数据": values.screenshotDataStatus,
};
for (const [item, status] of Object.entries(openItemRows)) {
  openItems = replaceLine(
    openItems,
    new RegExp(`^\\| ${item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} \\| .* \\| (.*) \\|$`, "m"),
    `| ${item} | ${status} | $1 |`,
    `open item ${item}`
  );
}
write("app-store/final-submission-open-items.zh-CN.md", openItems);

for (const file of ["app-store/static-site/support.html", "app-store/support.zh-CN.html"]) {
  let html = read(file);
  html = html.replace(
    /<p>公开支持邮箱将在 App Store Connect 提交前填写。<\/p>/,
    `<p>支持邮箱：${mailto(values.supportEmail)}</p>`
  );
  write(file, html);
}

for (const file of ["app-store/static-site/privacy.html", "app-store/privacy-policy.zh-CN.html"]) {
  let html = read(file);
  html = html.replace(
    /<p>如需隐私相关支持，请访问( <a href="\.\/support\.html">飞行记录支持页<\/a>|飞行记录支持页)。公开支持邮箱将在 App Store Connect 提交前填写。<\/p>/,
    `<p>如需隐私相关支持，请访问飞行记录支持页，或发送邮件至 ${mailto(values.supportEmail)}。</p>`
  );
  write(file, html);
}

let staticReadme = read("app-store/static-site/README.md");
staticReadme = staticReadme.replace(
  /示例 URL：\n\n```text\n[\s\S]*?\n```/,
  `当前 URL：

\`\`\`text
${values.supportUrl}
${values.privacyUrl}
\`\`\``
);
staticReadme = staticReadme.replace(
  /提交前需要把页面中的公开支持邮箱替换为最终邮箱，或确认支持页面中的联系说明符合你的发布策略。/,
  `当前公开支持邮箱：${values.supportEmail}`
);
write("app-store/static-site/README.md", staticReadme);

let release = read("APP_STORE_RELEASE.md");
release = release.replace(
  /Example URL shapes:\n\n- Support URL: `.*support\.html`\n- Privacy Policy URL: `.*privacy\.html`\n- Or: `.*support\.html`\n- Or: `.*privacy\.html`/,
  `Final URL values:

- Support URL: \`${values.supportUrl}\`
- Privacy Policy URL: \`${values.privacyUrl}\``
);
release = release.replace(
  /The support email is intentionally not filled in yet; confirm the public address before App Store Connect submission\./,
  `Public support email: ${values.supportEmail}.`
);
write("APP_STORE_RELEASE.md", release);

console.log(
  dryRun
    ? "Submission values dry-run passed."
    : "Submission values applied. Run: npm run check:appstore:strict"
);
