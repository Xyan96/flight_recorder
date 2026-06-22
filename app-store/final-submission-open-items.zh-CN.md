# 最终提交前缺项表

这些项目必须在 App Store Connect 提交审核前确定。它们不是代码问题，而是发布信息或外部账号信息。

可以复制 `app-store/submission-values.example.json` 为本机私有文件 `app-store/submission-values.json`，填完后运行：

```sh
npm run appstore:apply-values
```

随时查看当前缺口：

```sh
npm run appstore:status
```

真机测试通过后，复制并填写本机私有测试结果：

```sh
cp app-store/device-test-results.example.json app-store/device-test-results.json
npm run appstore:verify-device-test
```

## 公开页面

| 项目 | 当前状态 | 填写位置 |
| --- | --- | --- |
| 公开支持邮箱 | zhiyuan_1996@outlook.com | `app-store/static-site/support.html`、`app-store/static-site/privacy.html`、App Store Connect 审核联系方式 |
| Support URL | https://xyan96.github.io/flight_recorder/support.html | `app-store/connect-fields.zh-CN.md`、`app-store/metadata.zh-CN.md`、App Store Connect |
| Privacy Policy URL | https://xyan96.github.io/flight_recorder/privacy.html | `app-store/connect-fields.zh-CN.md`、`app-store/metadata.zh-CN.md`、App Store Connect |
| 静态页面托管位置 | GitHub Pages: https://xyan96.github.io/flight_recorder/ | 已启用当前公开 GitHub 仓库的 Pages，发布源为 `main` / `docs`；只托管公开支持/隐私静态页，不作为 App 后端 |

## 商店发布

| 项目 | 当前状态 | 填写位置 |
| --- | --- | --- |
| 价格 | 免费 | App Store Connect 价格与可用范围 |
| 上架国家和地区 | 中国大陆和美国 | App Store Connect 价格与可用范围 |
| 开发者显示名称 | 夏志远 | App Store Connect 元数据确认 |
| 审核联系人姓名 | 夏志远 | App Store Connect 审核信息 |
| 审核联系电话 | +86 19934558747 | App Store Connect 审核信息 |
| 审核联系邮箱 | zhiyuan_1996@outlook.com | App Store Connect 审核信息 |

## 真机验证

| 项目 | 当前状态 | 证据 |
| --- | --- | --- |
| iPad Air 第五代真机安装 | 已通过，2026-06-22，iPad Air 第五代，Xcode Run 成功 | Xcode Run 成功 |
| 飞行模式离线保存 | 已通过，飞行模式下可离线保存，App 本体不需要网络 | `app-store/device-test-checklist.zh-CN.md` |
| 记录夹载入 | 已通过，记录夹可载入刚保存的本地记录 | `app-store/device-test-checklist.zh-CN.md` |
| 备份导出/导入 | 已通过，备份可导出并重新导入 | `app-store/device-test-checklist.zh-CN.md` |
| 截图是否使用虚构测试数据 | 已通过，截图只使用虚构测试数据 | `app-store/screenshot-capture-guide.zh-CN.md` |
| 命令行签名归档预检 | 已通过，`/private/tmp/FlightRecorder-v1.0-b1.xcarchive` | `node scripts/verify_xcode_archive.mjs --require-signed /private/tmp/FlightRecorder-v1.0-b1.xcarchive` |
| App Store Connect 本地导出预检 | 已通过，`/private/tmp/FlightRecorder-export/App.ipa` | `xcodebuild -exportArchive`，并已检查 IPA 内 Bundle ID、版本、iPad-only、隐私清单 |

严格提交检查还会要求本机存在并通过 `app-store/device-test-results.json`。

## 当前可直接使用的固定值

| 项目 | 值 |
| --- | --- |
| App 名称 | 飞行记录 |
| App Store Connect App 记录 | 待创建；2026-06-22 19:09 重新上传探测仍显示 `missingApp(bundleId: "com.xiazhiyuan.flightrecorder")`，按 `app-store/app-record-create-checklist.zh-CN.md` 创建 |
| Bundle ID | `com.xiazhiyuan.flightrecorder` |
| SKU | `flight-recorder-ios` |
| 平台 | iOS / iPad only |
| 版本 | `1.0` |
| 构建号 | `1` |
| 隐私 | 不追踪、不收集数据 |
| 登录账号 | 不需要账号 |
| 后端服务 | 不需要 |
| 域名依赖 | App 本体无域名依赖 |

运行严格检查：

```sh
npm run check:appstore:strict
```

严格检查通过后，说明提交资料中的待定项已经替换完成。GitHub Pages 公开 URL 已验证可访问；仍需以 App Store Connect 页面当前显示为准做最后确认。
