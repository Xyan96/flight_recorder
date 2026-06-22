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
| 公开支持邮箱 | 待定 | `app-store/static-site/support.html`、`app-store/static-site/privacy.html`、App Store Connect 审核联系方式 |
| Support URL | 待定 | `app-store/connect-fields.zh-CN.md`、`app-store/metadata.zh-CN.md`、App Store Connect |
| Privacy Policy URL | 待定 | `app-store/connect-fields.zh-CN.md`、`app-store/metadata.zh-CN.md`、App Store Connect |
| 静态页面托管位置 | 待定 | 可使用 GitHub Pages 或你的域名；只托管公开支持/隐私静态页，不作为 App 后端 |

## 商店发布

| 项目 | 当前状态 | 填写位置 |
| --- | --- | --- |
| 价格 | 待定 | App Store Connect 价格与可用范围 |
| 上架国家和地区 | 待定 | App Store Connect 价格与可用范围 |
| 开发者显示名称 | 待定 | App Store Connect 元数据确认 |
| 审核联系人姓名 | 待定 | App Store Connect 审核信息 |
| 审核联系电话 | 待定 | App Store Connect 审核信息 |
| 审核联系邮箱 | 待定 | App Store Connect 审核信息 |

## 真机验证

| 项目 | 当前状态 | 证据 |
| --- | --- | --- |
| iPad Air 第五代真机安装 | 待定 | Xcode Run 成功 |
| 飞行模式离线保存 | 待定 | `app-store/device-test-checklist.zh-CN.md` |
| 记录夹载入 | 待定 | `app-store/device-test-checklist.zh-CN.md` |
| 备份导出/导入 | 待定 | `app-store/device-test-checklist.zh-CN.md` |
| 截图是否使用虚构测试数据 | 待定 | `app-store/screenshot-capture-guide.zh-CN.md` |

严格提交检查还会要求本机存在并通过 `app-store/device-test-results.json`。

## 当前可直接使用的固定值

| 项目 | 值 |
| --- | --- |
| App 名称 | 飞行记录 |
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

严格检查通过后，说明提交资料中的待定项已经替换完成；仍需以 App Store Connect 页面当前显示为准做最后确认。
