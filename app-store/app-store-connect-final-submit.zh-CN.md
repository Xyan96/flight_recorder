# App Store Connect 最终提交步骤（中国大陆 + 美国）

本文件按 App Store Connect 页面顺序整理，用于最终提交审核。当前目标是同时上架中国大陆和美国，价格免费，公开网页使用 GitHub Pages：

- Support URL: https://xyan96.github.io/flight_recorder/support.html
- Privacy Policy URL: https://xyan96.github.io/flight_recorder/privacy.html
- GitHub Pages source: public repository `Xyan96/flight_recorder`, branch `main`, path `/docs`

以上两个 URL 已在 2026-06-22 验证公网可访问并返回 HTTP 200。

## 0. 提交前本机确认

在打开 App Store Connect 前，先确认本机状态：

```sh
npm run check:appstore:strict
```

该检查应通过以下关键项：

- iPad App public assets 与 `restored_webarchive` 一致
- Capacitor native HTTP/Cookies bridge disabled
- App Store 版本没有运行域名依赖
- `Info.plist` 声明 `ITSAppUsesNonExemptEncryption = false`
- 隐私清单存在且不声明数据收集
- iPad Air 第五代真机测试结果文件存在并通过
- App icon 和 iPad 截图尺寸通过

## 1. App 信息

在 App Store Connect 创建或检查 App 记录：

| 字段 | 填写 |
| --- | --- |
| 平台 | iOS |
| 名称 | 飞行记录 |
| 主要语言 | 简体中文 |
| Bundle ID | `com.xiazhiyuan.flightrecorder` |
| SKU | `flight-recorder-ios` |
| 用户访问权限 | Full Access |
| 类别 | 效率 / Productivity |
| 年龄分级 | 建议 4+ |
| 内容权利 | 不包含第三方受版权保护内容 |
| 面向儿童 | 否 |

如果页面显示开发者名称，请确认它与账号当前显示一致。当前材料中使用：`夏志远`。

## 2. 价格与可用范围

进入 Pricing and Availability：

| 项目 | 选择 |
| --- | --- |
| Price | Free / 免费 |
| Availability | Specific Countries or Regions |
| Countries or Regions | Mainland China / 中国大陆；United States / 美国 |
| Pre-Order | 不使用 |

## 3. App 隐私

进入 App Privacy：

| 问题 | 选择 |
| --- | --- |
| Privacy Policy URL | https://xyan96.github.io/flight_recorder/privacy.html |
| Data Collection | The app does not collect data / 不收集数据 |
| Tracking | No / 不追踪 |
| Advertising | No / 无广告 |
| Third-party analytics SDK | No / 无第三方分析 SDK |
| Account required | No / 不需要账号 |

说明口径：

```text
用户填写的飞行记录只保存在 iPad 本地。用户主动导出备份时，备份文件由用户自行选择保存或分享的位置。
```

English:

```text
Flight records entered by the user are stored locally on the iPad. When the user chooses to export a backup, the backup file is saved or shared only to the location selected by the user.
```

## 4. 中文 App Store 展示信息

使用 `app-store/metadata.zh-CN.md` 复制中文主语言材料：

| 字段 | 填写 |
| --- | --- |
| 副标题 | 离线飞行联络与巡航检查记录 |
| 宣传文本 | 离线保存飞行联络与巡航检查记录，iPad 打开即可使用。 |
| 关键词 | 飞行,飞行记录,巡航检查,飞行联络,航班,UTC,机组,燃油,离线,iPad |
| Support URL | https://xyan96.github.io/flight_recorder/support.html |
| Privacy Policy URL | https://xyan96.github.io/flight_recorder/privacy.html |
| 版本更新说明 | 首次上架版本。支持 iPad 离线记录、记录夹保存与载入、机长 FN 本地档案号、备份导出与导入。 |

中文描述复制 `app-store/metadata.zh-CN.md` 中的“描述”。

## 5. English (U.S.) Localization

如果 App Store Connect 允许添加本地化，建议添加 English (U.S.)，用于美国区域展示。使用 `app-store/metadata.en-US.md`：

| Field | Value |
| --- | --- |
| Name | Flight Recorder |
| Subtitle | Offline flight records for iPad |
| Promotional Text | Record flight communication and cruise-check information offline. Open the iPad app and use it without login or network access. |
| Keywords | flight,flight recorder,cruise check,flight communication,UTC,crew,fuel,offline,iPad |
| Support URL | https://xyan96.github.io/flight_recorder/support.html |
| Privacy Policy URL | https://xyan96.github.io/flight_recorder/privacy.html |
| What’s New | Initial App Store release. Supports offline iPad records, local record folder save/load, local captain archive numbers, and backup export/import. |

Use the English description from `app-store/metadata.en-US.md`.

## 6. 截图与构建

截图使用项目内已验证文件：

| 截图集 | 文件 |
| --- | --- |
| 13 英寸 iPad | `app-store/ipad-13-inch-v55.png` |
| iPad Air 第五代参考 | `app-store/ipad-air-5-size-v55.png` |

构建上传：

1. Xcode 打开 `ios/App/App.xcworkspace`。
2. 选择真实 Apple Developer Team。
3. 选择 Generic iOS Device 或 Any iOS Device。
4. Product > Archive。
5. Archive 完成后 Distribute App。
6. 选择 App Store Connect 并上传。
7. 等待 Apple 处理完成并在 App Store Connect 的 Build 区域选择该构建。

## 7. App Review Information

| 字段 | 填写 |
| --- | --- |
| Contact Name | 夏志远 |
| Phone | +86 19934558747 |
| Email | zhiyuan_1996@outlook.com |
| Sign-in required | No / 不需要账号 |
| Demo account | 留空 |

审核备注建议粘贴英文版，必要时可追加中文。英文版更利于美国审核人员直接阅读。

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

中文补充版：

```text
这是一款离线 iPad 飞行联络与巡航检查记录工具，不需要账号登录。

审核步骤：
1. 打开 App。
2. 填写机号、航班号、航段、带队机长和日期。
3. 点击“保存”。
4. 打开“记录夹”。
5. 点击“载入”，确认刚保存的记录可以恢复到主界面。

App 的记录保存在用户 iPad 本地，不需要后端服务、运行域名、Cloudflare 登录、订阅、广告或第三方分析 SDK。App 本体不提供互联网信息服务，不包含账号系统、同步服务、内容发布、用户生成内容平台、即时通信、论坛、新闻、支付或远程数据服务；因此 App 运行本体没有需要 ICP/APP 备案的互联网服务。GitHub Pages 仅用于 App Store 要求的公开支持页面和隐私政策页面，不是 App 功能或运行依赖。
```

## 8. 出口合规

当前 `Info.plist` 已声明：

```text
ITSAppUsesNonExemptEncryption = false
```

填写方向：

| 问题 | 选择 |
| --- | --- |
| Uses encryption | No non-exempt encryption / 不使用非豁免加密 |
| Custom/proprietary encryption | No / 否 |
| Designed for encrypted communication or security | No / 否 |

## 9. 提交审核

确认以上项目后：

1. 在版本页面选择正确 Build。
2. 点击 Add for Review。
3. 到 Draft Submissions / App Review 区域检查提交项。
4. 点击 Submit for Review。
5. 提交后状态应进入 In Review 或等待审核队列。

## 10. 如果审核询问备案

只陈述事实，不主动声称网站或其他服务已备案。推荐回复：

```text
本 App 为离线本地工具，不向用户提供互联网信息服务，不包含账号系统、后端服务器、同步服务、内容发布、用户生成内容平台、即时通信、论坛、新闻、支付、广告或第三方分析。App Store 公开支持/隐私网页只用于商店展示和审核沟通，不作为 App 运行服务。因此 App 运行本体无需 ICP/APP 备案。
```

English:

```text
This app is a local offline utility and does not provide an internet information service to users. It has no account system, backend server, sync service, content publishing, user-generated-content platform, messaging, forum, news, payment, advertising, or third-party analytics. The public App Store support/privacy webpages are used only for listing and review communication, not as an app runtime service. Therefore the app runtime has no internet service that requires ICP/app filing.
```

## 11. 官方文档对照

- Apple: before submitting an app version for review, provide required metadata and choose the build for the version: https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app
- Apple: availability must be set before submitting for review, and Specific Countries or Regions can be selected: https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/manage-availability-for-your-app-on-the-app-store
- Apple: Privacy Policy URL is required for all apps: https://developer.apple.com/help/app-store-connect/reference/app-information/app-privacy
- Apple: builds can be uploaded using Xcode, then processed before appearing in App Store Connect: https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds
