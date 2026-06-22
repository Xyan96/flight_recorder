# App Store Connect 填写字段

这份文件用于在 App Store Connect 页面中复制粘贴。当前已按中国大陆和美国区域、免费价格、GitHub Pages 公开网页和本人审核联系方式更新。

## App 信息

| 字段 | 内容 |
| --- | --- |
| 平台 | iOS |
| 名称 | 飞行记录 |
| 主要语言 | 简体中文 |
| Bundle ID | com.xiazhiyuan.flightrecorder |
| SKU | flight-recorder-ios |
| 用户访问权限 | Full Access |
| 类别 | 效率 |
| 年龄分级 | 建议 4+ |
| 内容权利 | 不包含第三方受版权保护内容 |
| 面向儿童 | 否 |
| 开发者显示名称 | 夏志远 |

## 价格与可用范围

| 字段 | 内容 |
| --- | --- |
| 价格 | 免费 |
| 上架国家和地区 | 中国大陆和美国 |

## App Store 展示信息

| 字段 | 内容 |
| --- | --- |
| 副标题 | 离线飞行联络与巡航检查记录 |
| 宣传文本 | 离线保存飞行联络与巡航检查记录，iPad 打开即可使用。 |
| 关键词 | 飞行,飞行记录,巡航检查,飞行联络,航班,UTC,机组,燃油,离线,iPad |
| 支持 URL | https://xyan96.github.io/flight_recorder/support.html |
| 隐私政策 URL | https://xyan96.github.io/flight_recorder/privacy.html |

## 描述

```text
飞行记录是一款面向 iPad 的离线记录工具，用于填写飞行联络、巡航检查、燃油核算、机组氧气和相关备注。

应用不需要账号登录，不依赖网络服务，记录保存在本机。用户可以在记录夹中查找并载入历史记录，也可以导出或导入备份文件，便于自行保存和迁移。

主要能力：
- 飞行联络记录与 UTC 时间填写
- 巡航检查记录与燃油差值核算
- 机长 FN 档案号本地匹配与补充
- 记录夹本地保存、搜索和载入
- 备份文件导出与导入
- iPad 离线独立运行
```

## 版本更新说明

```text
首次上架版本。支持 iPad 离线记录、记录夹保存与载入、机长 FN 本地档案号、备份导出与导入。
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

App 的记录保存在用户 iPad 本地，不需要后端服务、运行域名、Cloudflare 登录、订阅、广告或第三方分析 SDK。App 本体不提供互联网信息服务，不包含账号系统、同步服务、内容发布、用户生成内容平台、即时通信、论坛、新闻、支付或远程数据服务；因此 App 运行本体没有需要 ICP/APP 备案的互联网服务。GitHub Pages 仅用于 App Store 要求的公开支持页面和隐私政策页面，不是 App 功能或运行依赖。
```

## English Review Notes

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

## App 隐私

| 问题 | 建议填写 |
| --- | --- |
| 是否收集数据 | 否 |
| 是否使用第三方数据追踪用户 | 否 |
| 是否包含广告 | 否 |
| 是否包含第三方分析 SDK | 否 |
| 是否需要账号登录 | 否 |
| 是否使用广告标识符 IDFA | 否 |

说明文字：

```text
用户填写的飞行记录只保存在 iPad 本地。用户主动导出备份时，备份文件由用户自行选择保存或分享的位置。
```

## 出口合规

| 问题 | 建议填写 |
| --- | --- |
| 是否使用加密 | 不使用非豁免加密 |
| 是否包含自定义加密算法 | 否 |
| 是否专门用于加密或安全通信 | 否 |

最终以 App Store Connect 当前页面问题为准。

`Info.plist` 已声明：

```text
ITSAppUsesNonExemptEncryption = false
```

## 其他表单

详细清单见：

```text
app-store/submission-form-checklist.zh-CN.md
```

## 截图

| 截图集 | 文件 |
| --- | --- |
| 13 英寸 iPad | `app-store/ipad-13-inch-v55.png` |
| iPad Air 第五代同尺寸参考 | `app-store/ipad-air-5-size-v55.png` |

正式截图建议导入 `app-store/demo-records.json`，并按 `app-store/screenshot-capture-guide.zh-CN.md` 生成带虚构测试数据的截图。

## 提交前已确认

- 公开支持邮箱：zhiyuan_1996@outlook.com
- 支持 URL：https://xyan96.github.io/flight_recorder/support.html
- 隐私政策 URL：https://xyan96.github.io/flight_recorder/privacy.html
- 价格：免费
- 上架国家和地区：中国大陆和美国
- 开发者显示名称：夏志远
- 审核联系人姓名、电话、邮箱：夏志远 / +86 19934558747 / zhiyuan_1996@outlook.com
- 真机 iPad Air 第五代测试结果：已通过，2026-06-22，iPad Air 第五代，Xcode Run 成功
