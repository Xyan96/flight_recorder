# App Store Connect 元数据草稿

以下内容用于 App Store Connect。提交前请确认公开支持邮箱、开发者显示名称、价格和上架地区。

## 基本信息

- App 名称：飞行记录
- 副标题：离线飞行联络与巡航检查记录
- Bundle ID：`com.xiazhiyuan.flightrecorder`
- SKU：`fljght-recorder-ios`
- 类别建议：效率
- 年龄分级建议：4+
- 价格建议：免费或付费一次买断

## 描述

飞行记录是一款面向 iPad 的离线记录工具，用于填写飞行联络、巡航检查、燃油核算、机组氧气和相关备注。

应用不需要账号登录，不依赖网络服务，记录保存在本机。用户可以在记录夹中查找并载入历史记录，也可以导出或导入备份文件，便于自行保存和迁移。

主要能力：

- 飞行联络记录与 UTC 时间填写
- 巡航检查记录与燃油差值核算
- 机长 FN 档案号本地匹配与补充
- 记录夹本地保存、搜索和载入
- 备份文件导出与导入
- iPad 离线独立运行

## 关键词

飞行,飞行记录,巡航检查,飞行联络,航班,UTC,机组,燃油,离线,iPad

## 宣传文本

离线保存飞行联络与巡航检查记录，iPad 打开即可使用。

## 版本更新说明

首次上架版本。支持 iPad 离线记录、记录夹保存与载入、机长 FN 本地档案号、备份导出与导入。

## 支持 URL

待定。可以使用 GitHub Pages、App Store 专用静态站点，或你的域名。无论托管在哪里，这个 URL 只用于 App Store 审核和商店展示，应当是公开静态页面，不作为 App 后端或登录入口。

示例格式：

```text
https://<github-username>.github.io/flight-recorder/support.html
https://<your-domain>/flight-recorder/support.html
```

仓库里已有源文件：

```text
app-store/static-site/support.html
```

可以使用一个简单网页，内容包含：

- App 名称
- 支持邮箱
- 常见问题
- 隐私政策链接

## 隐私政策 URL

待定。建议与支持页放在同一个静态托管位置，可以是 GitHub Pages，也可以是你的域名。

示例格式：

```text
https://<github-username>.github.io/flight-recorder/privacy.html
https://<your-domain>/flight-recorder/privacy.html
```

仓库里已有源文件：

```text
app-store/static-site/privacy.html
```

## 审核备注

```text
这是一款离线 iPad 飞行联络与巡航检查记录工具，不需要账号登录。

审核步骤：
1. 打开 App。
2. 填写机号、航班号、航段、带队机长和日期。
3. 点击“保存”。
4. 打开“记录夹”。
5. 点击“载入”，确认刚保存的记录可以恢复到主界面。

App 的记录保存在用户 iPad 本地，不需要后端服务、Cloudflare 登录、订阅、广告或第三方分析 SDK。
```

## App 隐私填写建议

- 是否收集数据：否
- 是否使用第三方数据追踪用户：否
- 是否包含广告：否
- 是否包含第三方分析 SDK：否
- 是否需要账号登录：否

说明：用户填写的飞行记录只保存在 iPad 本地。用户主动导出备份时，备份文件由用户自行选择保存或分享的位置。

## 出口合规

建议回答方向：

- App 是否使用加密：不使用非豁免加密
- 是否包含自定义加密算法：否
- 是否专门用于加密或安全通信：否
- Info.plist 已声明：`ITSAppUsesNonExemptEncryption = false`

最终以 App Store Connect 当前页面问题为准。

## 截图内容建议

仅使用测试数据，不要出现真实运营或个人敏感信息。

- 主记录页：填写测试机号、测试航班、测试航段
- 记录夹：显示一条测试记录
- 巡航检查：显示测试油量和差值
- 备份：显示导出备份/导入备份按钮

当前已准备：

- 13 英寸 iPad 截图：`app-store/ipad-13-inch-v55.png`
- iPad Air 第五代同尺寸截图：`app-store/ipad-air-5-size-v55.png`
- 虚构演示备份：`app-store/demo-records.json`
- 截图生成指南：`app-store/screenshot-capture-guide.zh-CN.md`

## 提交前必填占位

- 公开支持邮箱
- 选择可公网访问的静态托管位置，GitHub Pages 或你的域名均可
- 确认支持 URL 已发布并可公网访问
- 确认隐私政策 URL 已发布并可公网访问
- 开发者显示名称
- 是否免费/付费
- 上架国家和地区
