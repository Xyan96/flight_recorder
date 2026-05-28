# fljght_recorder

飞行联络与巡航检查记录本地 Web 应用。

## 目录

- `restored_webarchive/`: 前端页面、样式、离线缓存和图标资源。
- `deployment/`: 本机服务、Cloudflare Tunnel 和 LaunchAgent 配置模板。
- `FLJGHT_RECORDER_CONTEXT.md`: 项目恢复和部署背景记录。

## 当前版本

v53：包含 iPad 主屏幕图标、记录夹队列显示、离线保存后自动同步、记录隔离、机长 FN 档案号同步、快速输入优化，以及 FN 仅保留数字并补齐到 8 位。

发布到 GitHub 时需要同时推送 `main` 和当前版本 tag，避免代码页或 Tags/Releases 仍显示旧版本。

## 本机发布

```sh
deployment/publish.sh
```

默认访问地址：

```text
http://127.0.0.1:8765/
```
