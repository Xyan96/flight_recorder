# fljght_recorder

飞行联络与巡航检查记录本地 Web 应用，并已准备为离线 iPad App。

## 目录

- `restored_webarchive/`: 前端页面、样式、离线缓存和图标资源。
- `deployment/`: 旧本机服务和 Tunnel 配置模板；离线 iPad App 不使用这些部署文件。
- `ios/App/`: Capacitor 生成的 iPad App 工程。
- `app-store/`: App Store 上架资料、截图和静态支持/隐私页面源文件。
- `FLJGHT_RECORDER_CONTEXT.md`: 项目恢复和部署背景记录。

## 当前版本

v62：修复 iPad 收起键盘后快捷输入栏仍停留在底部、遮挡下方数据的问题；快捷输入现在随键盘收起自动隐藏。

v61：修复 iPad 输入法弹起后主界面被压扁的问题；记录夹新增红色“删除”按钮，位于“载入”前并带二次确认。

v60：巡航检查记录由 3 条改为 4 条，右侧栏保留独立滚动，并去掉每条记录过大的固定高度，减少横屏下每条记录底部空白。

v59：增加 iPad WebView 启动后视口高度刷新，解决首次打开底部白框遮挡、缩放窗口后才恢复的问题。

v58：修复 iPad App WebView 外层白边和右侧巡航检查栏被压缩的问题。App 外层改为贴满 WebView，巡航检查记录改为右侧栏内独立滚动，避免三条记录被强行裁切。

v57：增加浏览器 smoke test 支持。使用 `?smoke=1` 时提示信息写入本地测试记录而不是弹窗，便于自动验证保存和记录夹流程；本地/Capacitor 模式不注册 service worker，避免 iPad App 被旧缓存控制；正常 iPad App 行为不变。

v56：service worker 改为本地缓存优先，不再对 App shell 资源做网络 fallback，贴合纯本地 iPad App 目标。

本地上架检查会验证 iPad 包不使用旧线上运行域名、Capacitor native HTTP/Cookies bridge 已关闭、Cordova 没有通配网络访问，并检查所有 `fetch()` 所在函数都有 `LOCAL_ONLY_MODE` 本地分支。App Store 的支持页和隐私页可以托管在 GitHub Pages 或你的域名上，但它们只作为公开静态页面，不是 App 运行依赖。

v55：增加 iPad Air 第五代同尺寸适配收紧，确保 10.9 英寸 1640x2360 竖屏下顶部日期和主题按钮完整显示。

v54：增加 iPad App 本地模式。打包到 Capacitor/iPad App、file:// 或使用 `?local=1` 时，飞行记录和机长 FN 档案号只保存在本机，不再依赖后端、Cloudflare 登录或上传队列。

发布到 GitHub 时需要同时推送 `main` 和当前版本 tag，避免代码页或 Tags/Releases 仍显示旧版本。

## 本机发布

```sh
deployment/publish.sh
```

默认访问地址：

```text
http://127.0.0.1:8765/
```

## iPad App 检查

```sh
npm run check:appstore
```

查看上架状态和下一步缺口：

```sh
npm run appstore:status
```

已有 `.xcarchive` 后可以检查归档元数据：

```sh
npm run ios:verify-archive
```

正式归档后可以检查 Xcode Organizer 中最新的已签名归档：

```sh
npm run ios:verify-archive:latest:signed
```

正式提交 App Store 前，在支持 URL、隐私 URL、公开支持邮箱、价格、上架地区和真机测试都完成后运行：

```sh
npm run appstore:verify-device-test
npm run check:appstore:strict
```
