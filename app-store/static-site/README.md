# 飞行记录 GitHub Pages 静态支持站点

这个目录和仓库根目录下的 `docs/` 用于托管 App Store Connect 需要的公开支持页和隐私政策页。网页只用于 App Store 审核和商店展示，不属于 iPad App 本体，也不作为 App 后端服务。

当前已使用 GitHub Pages，发布源为 `main` / `docs`：

```text
https://xyan96.github.io/flight_recorder/
https://xyan96.github.io/flight_recorder/support.html
https://xyan96.github.io/flight_recorder/privacy.html
```

发布状态：2026-06-22 已启用并验证 `support.html` 与 `privacy.html` 均返回 HTTP 200。

页面内容为中英双语：

- `support.html`: App Store Connect 的 Support URL
- `privacy.html`: App Store Connect 的 Privacy Policy URL
- `index.html`: 简单入口页

公开支持邮箱：zhiyuan_1996@outlook.com

重要口径：App 本体是离线 iPad App，不需要登录、服务器、同步服务、域名或网络运行环境。GitHub Pages 只是公开支持/隐私网页，不是 App 的运行依赖。
