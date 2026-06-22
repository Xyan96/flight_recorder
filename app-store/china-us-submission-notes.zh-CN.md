# 中国大陆与美国区域上架说明

目标区域：

- 中国大陆 / Mainland China
- 美国 / United States

价格：免费 / Free

公开网页：

- Support URL: https://xyan96.github.io/flight_recorder/support.html
- Privacy Policy URL: https://xyan96.github.io/flight_recorder/privacy.html
- Static hosting: GitHub Pages at https://xyan96.github.io/flight_recorder/

## 核心审核口径

中文：

```text
飞行记录是离线 iPad 工具。App 本体不需要账号登录，不连接后端服务器，不提供互联网信息服务，不使用运行域名，也不会把用户记录自动上传给开发者或第三方。记录保存在用户自己的 iPad 本地。GitHub Pages 仅用于 App Store 要求的公开支持页面和隐私政策页面，不属于 App 功能服务或运行依赖。
```

English:

```text
Flight Recorder is an offline iPad utility. The app itself does not require an account, does not connect to a backend server, does not provide an internet information service, does not use a runtime domain, and does not automatically upload user records to the developer or any third party. Records are stored locally on the user's iPad. GitHub Pages is used only for the public support page and privacy policy required by App Store listing; it is not part of the app service or runtime dependency.
```

## 中国大陆备案说明口径

这不是法律意见，提交时建议只陈述事实，不主动声称“已备案”。推荐表述：

```text
本 App 为离线本地工具，不向用户提供互联网信息服务，不包含账号系统、后端服务器、同步服务、内容发布、用户生成内容平台、即时通信、论坛、新闻、支付、广告或第三方分析。App Store 公开支持/隐私网页只用于商店展示和审核沟通，不作为 App 运行服务。因此 App 运行本体无需 ICP/APP 备案。
```

English:

```text
This app is a local offline utility and does not provide an internet information service to users. It has no account system, backend server, sync service, content publishing, user-generated-content platform, messaging, forum, news, payment, advertising, or third-party analytics. The public App Store support/privacy webpages are used only for listing and review communication, not as an app runtime service. Therefore the app runtime has no internet service that requires ICP/app filing.
```

## 参考依据与论坛经验整理

官方口径：

- Apple App Store Connect 的中国大陆合规页面说明，Apple 会在中国大陆 App Store 商品页展示部分合规信息，尤其是中国大陆组织账号的身份信息。
- Apple App Store Connect 的隐私信息要求以“是否收集数据、是否追踪、是否使用广告/分析”等事实为基础。
- 本项目代码检查证明 App Store 版本的网络能力已被本地模式保护，Capacitor native HTTP/Cookies bridge 已关闭，App 本体无运行域名依赖。

开发者论坛和社区经验整理：

- 审核备注要短、直接、可复现，写清楚打开 App 后如何保存和载入一条测试记录。
- 如果 App 不需要登录，要明确写“不需要账号”，避免审核人员寻找测试账号。
- 隐私政策、App 隐私标签、审核备注必须一致：如果写“不收集数据”，页面和 App 内行为就不能出现分析 SDK、广告 SDK、自动上传或远程同步。
- 对中国大陆区域，不要把普通支持网页描述成 App 服务端。支持/隐私 URL 是商店展示资料，App 本体仍应表述为离线本地工具。
- 截图和测试记录使用虚构数据，避免真实航班运行、个人或敏感数据。

## 仍需最终外部确认

- GitHub Pages 是否已启用并可公网访问
- App Store Connect 页面中的开发者显示名称是否与账号当前显示一致

