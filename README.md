# fljght_recorder

飞行联络与巡航检查记录本地 Web 应用。

## 目录

- `restored_webarchive/`: 前端页面、样式、离线缓存和图标资源。
- `deployment/`: 本机服务、Cloudflare Tunnel 和 LaunchAgent 配置模板。
- `FLJGHT_RECORDER_CONTEXT.md`: 项目恢复和部署背景记录。

## 当前版本

v41：包含 iPad 主屏幕图标、记录夹队列显示、离线保存后自动同步、记录隔离和机长 FN 档案号同步逻辑。

## 本机发布

```sh
deployment/publish.sh
```

默认访问地址：

```text
http://127.0.0.1:8765/
```
