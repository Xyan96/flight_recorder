# App Store Connect App 记录创建清单

当前唯一阻塞点：App Store Connect 中还没有 Bundle ID `com.xiazhiyuan.flightrecorder` 对应的 App 记录。2026-06-22 19:09 再次上传探测时，Apple 返回 0 个 App 记录并报：

```text
IDEDistribution.DistributionAppRecordProviderError.missingApp(bundleId: "com.xiazhiyuan.flightrecorder")
```

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

## 创建后立刻告诉我

创建成功后告诉我一句“已创建 App 记录”。我会继续执行：

```sh
xcodebuild -exportArchive \
  -archivePath /private/tmp/FlightRecorder-v1.0-b1.xcarchive \
  -exportPath /private/tmp/FlightRecorder-upload \
  -exportOptionsPlist /private/tmp/FlightRecorderUploadOptions.plist \
  -allowProvisioningUpdates
```

如果上传成功，下一步是在 App Store Connect 版本页面选择 build `1.0 (1)`，并按 `app-store/app-store-connect-final-submit.zh-CN.md` 填写中英双语材料。

## 如果 New App 按钮不可用

优先检查：

- Apple Developer Program 会员是否已生效
- Account Holder 是否已签署最新协议
- 当前账号角色是否为 Account Holder、Admin 或 App Manager
- Bundle ID 是否已经在 Certificates, IDs & Profiles 中存在并属于当前 Team `G6G6AGF8SA`
