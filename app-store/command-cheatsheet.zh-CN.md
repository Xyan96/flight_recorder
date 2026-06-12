# App Store 命令速查

在项目根目录运行。

## 常用检查

```sh
npm run check:local-only
npm run appstore:status
npm run check:appstore
```

`check:appstore` 通过表示本地代码、iOS 包资源、隐私清单、图标、截图尺寸和离线防线都通过。

`appstore:status` 用于查看 Xcode、开发者 Team、真机连接、归档签名和最终提交资料缺口。

如果命令行设备检查显示不可用，但 Xcode 顶部设备选择器已经能看到你的 iPad Air 第五代，以 Xcode 界面为准继续 Run。

## Web 资源改动后同步

```sh
npm run check:appstore:sync
```

如果只是改 App Store 文档或 Xcode 配置，不需要同步 web 资源。

## Xcode 打开工程

```sh
npm run ios:open
```

如果没有自动打开，手动打开：

```text
ios/App/App.xcodeproj
```

签名或真机连接排错：

```text
app-store/xcode-signing-troubleshooting.zh-CN.md
```

开发者账号审核通过前的测试方式：

```text
app-store/testing-before-developer-approval.zh-CN.md
```

## 无签名构建预检

这些命令只用于本机预检，不能上传 App Store：

```sh
npm run ios:build:sim
npm run ios:build:device:unsigned
npm run ios:archive:unsigned
npm run ios:verify-archive
```

真正上传 App Store 仍需要在 Xcode 里选择 Apple Developer Team，并用 Product > Archive 生成已签名 archive。

正式上传前检查已签名归档：

```sh
npm run ios:verify-archive:signed -- /path/to/App.xcarchive
```

如果要直接检查 Xcode Organizer 中最新的归档：

```sh
npm run ios:verify-archive:latest:signed
```

如果 Xcode 归档路径不方便复制，也可以使用环境变量：

```sh
ARCHIVE_PATH="/path/to/App.xcarchive" npm run ios:verify-archive:signed
```

## 最终提交前

先复制模板并填写最终发布值：

```sh
cp app-store/submission-values.example.json app-store/submission-values.json
```

填写完成后应用到 App Store 材料：

```sh
npm run appstore:apply-values
```

只验证替换流程、不写文件：

```sh
npm run appstore:self-test-values
```

等支持 URL、隐私 URL、公开支持邮箱、价格、上架地区、审核联系人和 iPad Air 第五代真机测试都完成后运行：

```sh
npm run appstore:verify-device-test
npm run check:appstore:strict
```

严格检查通过后，再进入 App Store Connect 提交审核。
