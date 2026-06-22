# App Store Connect App 记录创建清单

状态更新：App Store Connect App 记录已经创建，早先的 `missingApp(bundleId: "com.xiazhiyuan.flightrecorder")` 阻塞已解决。本文件保留为 App 记录创建信息备忘。当前剩余阻塞点是 build `1.0 (2)` 上传到 Apple object-storage 时出现 checksum mismatch。

## 操作入口

打开：

https://appstoreconnect.apple.com/apps

路径：Apps -> 左上角 `+` -> New App。

Apple 官方说明：上传 build 前必须先在 App Store Connect 创建 app record；创建弹窗会填写平台、App 名称、主语言、Bundle ID、SKU 和用户访问权限。官方也提示，如果 Account Holder 尚未在 Business 区域签署最新协议，则无法添加 App。

官方文档：

https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app

## New App 弹窗填写值

| 字段 | 填写 |
| --- | --- |
| Platforms | iOS |
| Name | 飞行记录 |
| Primary Language | Simplified Chinese / 简体中文 |
| Bundle ID | com.xiazhiyuan.flightrecorder |
| SKU | flight-recorder-ios |
| User Access | Full Access |

点击 `Create` 后，App 应进入 `Prepare for Submission` 状态。

## 创建后下一步

App 记录已创建。当前可重试上传 build `1.0 (2)`：

```sh
xcodebuild -exportArchive \
  -archivePath /private/tmp/FlightRecorder-v1.0-b2.xcarchive \
  -exportPath /private/tmp/FlightRecorder-upload \
  -exportOptionsPlist /private/tmp/FlightRecorderUploadOptions.plist \
  -allowProvisioningUpdates
```

如果上传成功，下一步是在 App Store Connect 版本页面选择 build `1.0 (2)`，并按 `app-store/app-store-connect-final-submit.zh-CN.md` 填写中英双语材料。若继续出现 checksum mismatch，请换网络路径或使用 Apple Transporter/altool 上传 `/private/tmp/FlightRecorder-export-b2/App.ipa`。

## 如果 New App 按钮不可用

优先检查：

- Apple Developer Program 会员是否已生效
- Account Holder 是否已签署最新协议
- 当前账号角色是否为 Account Holder、Admin 或 App Manager
- Bundle ID 是否已经在 Certificates, IDs & Profiles 中存在并属于当前 Team `G6G6AGF8SA`
