# Xcode 到 App Store 下一步清单

适用状态：Xcode 正在安装或刚安装完成，已有付费 Apple Developer 账号，目标设备为 iPad Air 第五代。

## 1. Xcode 首次准备

- 打开 Xcode，等待组件安装完成。
- Xcode > Settings > Accounts 登录 Apple Developer 账号。
- 打开工程：`ios/App/App.xcodeproj`。
- 选择左侧项目 `App`，再选择 target `App`。
- Signing & Capabilities：
  - 勾选 Automatically manage signing。
  - Team 选择你的付费开发者团队。
  - Bundle Identifier 必须是 `com.xiazhiyuan.flightrecorder`。

不要改回旧域名式 Bundle ID。这个 App 是纯本地工具，Bundle ID 只作为 Apple 平台上的应用标识，不是服务器地址。

## 2. iPad Air 第五代真机运行

- 用 USB-C 连接 iPad Air 第五代。
- 解锁 iPad，点信任这台 Mac。
- Xcode 顶部设备选择真实 iPad，不选模拟器。
- 点击 Run。
- 如果 Xcode 提示注册设备或创建 provisioning profile，允许它自动处理。
- 安装完成后，把 iPad 打开飞行模式，按 `app-store/device-test-checklist.zh-CN.md` 完整测试。

也可以先跑一次命令行签名构建预检，确认账号、证书、provisioning 和 iPad SDK 都通：

```sh
npm run ios:build:device:signed
```

如果你要像本机测试一样直接指定已连接设备，使用 `xcrun xctrace list devices` 查到设备 ID 后，把命令里的 destination 改成 `id=<设备ID>`。本项目在 `Documents` 目录下时，签名构建应使用 `/private/tmp/flight-recorder-derived`，不要把 `DerivedData` 放在项目目录里。

必须确认：

- 断网可以启动。
- 保存提示为“已保存到 iPad”。
- 记录夹来源显示 iPad。
- 重启 App 后记录仍存在。
- 没有登录页、Cloudflare 页面、上传失败循环或域名相关提示。

## 3. App Store Connect 创建 App 记录

在 App Store Connect 新建 App：

- Platform：iOS
- Name：飞行记录
- Primary language：简体中文
- Bundle ID：`com.xiazhiyuan.flightrecorder`
- SKU：`flight-recorder-ios`

如果 App Store Connect 里还没有这个 Bundle ID，先在 Apple Developer 账号的 Identifiers 中创建 App ID，或让 Xcode 自动签名流程创建后再回到 App Store Connect 选择。

如果 Team、证书、provisioning profile 或 iPad 连接出现问题，先看：

```text
app-store/xcode-signing-troubleshooting.zh-CN.md
```

如果 Apple Developer Program 还没审核通过，但想先测试，先看：

```text
app-store/testing-before-developer-approval.zh-CN.md
```

## 4. 支持页和隐私页

App 本体不使用域名、不需要后端。App Store Connect 仍要求公开的 Support URL 和 Privacy Policy URL，这两个页面只用于审核和商店展示。

使用仓库里的静态页面源文件：

- `app-store/static-site/support.html`
- `app-store/static-site/privacy.html`

可以托管到 GitHub Pages，也可以托管到你的域名。使用你的域名时建议放在清晰的静态路径，例如 `/flight-recorder/support.html` 和 `/flight-recorder/privacy.html`，不要接入登录页、同步服务或 Cloudflare Access。提交前把页面里的公开支持邮箱替换为最终邮箱。

## 5. 截图

已有可用截图：

- 13 英寸 iPad：`app-store/ipad-13-inch-v55.png`
- iPad Air 第五代同尺寸参考：`app-store/ipad-air-5-size-v55.png`

正式提交前建议导入 `app-store/demo-records.json`，按 `app-store/screenshot-capture-guide.zh-CN.md` 生成带虚构测试数据的截图。不要使用真实航班、真实人员或运行数据。

## 6. Archive 和上传

真机测试通过后：

- Xcode 顶部设备选择 Any iPadOS Device。
- Product > Archive。
- Organizer 中选择最新 archive。
- 在终端运行归档检查，确认 Bundle ID、版本、iPad-only、隐私清单和签名信息：

```sh
npm run ios:verify-archive:signed -- /path/to/App.xcarchive
```

也可以直接检查 Xcode Organizer 里的最新归档：

```sh
npm run ios:verify-archive:latest:signed
```

- 先 Validate App。
- 通过后 Distribute App > App Store Connect > Upload。
- 上传处理完成后，回 App Store Connect 选择这个 build。

如果需要重新上传二进制，先把 Xcode 里的 Build 从 `1` 改成 `2`，再重新 Archive。

命令行也可以做一次临时签名归档预检：

```sh
npm run ios:archive:signed:tmp
node scripts/verify_xcode_archive.mjs --require-signed /private/tmp/FlightRecorder-v1.0-b1.xcarchive
```

这个归档用于提前验证 Release 归档能生成、Bundle ID/版本/隐私清单/签名元数据正确。正式上传仍建议用 Xcode Organizer 的 Validate App 和 Distribute App 流程完成。

## 7. 提交前本地检查

如果最终发布信息已经确定，先应用到上架材料：

```sh
npm run appstore:apply-values
```

在项目根目录运行：

```sh
npm run check:appstore
```

正式提交前，等支持 URL、隐私 URL、公开支持邮箱、价格和上架地区都确定后运行：

```sh
npm run check:appstore:strict
```

## 官方参考

- App Store Connect 创建 App 记录：https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app
- 上传构建版本：https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds
- 截图规格：https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications
- App 隐私：https://developer.apple.com/app-store/app-privacy-details
