# Xcode 签名与真机排错

适用场景：Xcode 已安装并登录 Apple Developer 账号，但还不能在 iPad Air 第五代上运行或归档上传。

## Team 没有写入工程

在 Xcode 中确认：

- 左侧选择蓝色项目 `App`
- 中间选择 target `App`
- 打开 `Signing & Capabilities`
- 勾选 `Automatically manage signing`
- `Team` 选择你的付费 Apple Developer 团队
- `Bundle Identifier` 保持 `com.xiazhiyuan.flightrecorder`

保存后，项目文件中应出现 `DEVELOPMENT_TEAM`。可以运行：

```sh
npm run appstore:status
```

如果仍显示 `Development Team` 为 TODO，说明 Team 还没有应用到 target `App`。

## Xcode 看不到 iPad

在 iPad 上确认：

- iPad 已解锁
- 已点“信任这台电脑”
- 如果提示 Developer Mode，开启后重启 iPad
- USB-C 数据线支持数据传输，不只是充电

在 Xcode 顶部设备选择器确认能看到真实 iPad。命令行 `devicectl` 在沙盒里可能不可用；如果 Xcode 已能看到设备，以 Xcode 为准。

## Provisioning Profile 报错

常见处理：

- 保持 `Automatically manage signing` 开启
- Team 选择付费开发者团队
- Bundle ID 不要改成旧域名式标识
- 如果提示注册设备，允许 Xcode 自动注册
- 如果提示证书缺失，让 Xcode 自动创建 Apple Development 证书

## resource fork / Finder information 报错

如果命令行真机构建最后在 codesign 阶段失败：

```text
resource fork, Finder information, or similar detritus not allowed
```

本项目放在 `Documents` 目录下时，Xcode 的 build 产物可能被 macOS/File Provider 自动加上 `FinderInfo` 或类似扩展属性。不要把 `DerivedData` 放在项目目录下签名，改用 `/private/tmp`：

```sh
npm run ios:build:device:signed
```

等价的完整命令是：

```sh
xcodebuild -project ios/App/App.xcodeproj \
  -scheme App \
  -configuration Debug \
  -destination "generic/platform=iOS" \
  -derivedDataPath /private/tmp/flight-recorder-derived \
  -allowProvisioningUpdates \
  build
```

如果要指定当前已连接 iPad，可以把 destination 改成设备 ID，例如：

```sh
xcodebuild -project ios/App/App.xcodeproj \
  -scheme App \
  -configuration Debug \
  -destination id=00008103-000E41362629A01E \
  -derivedDataPath /private/tmp/flight-recorder-derived \
  -allowProvisioningUpdates \
  build
```

如果看到：

```text
Your team has no devices from which to generate a provisioning profile.
No profiles for 'com.xiazhiyuan.flightrecorder' were found.
```

含义是开发者团队还没有可用于开发签名的 iPad 设备。处理方式：

- 连接 iPad Air 第五代
- 解锁并信任这台 Mac
- 在 Xcode 顶部设备选择器选择真实 iPad
- 如果 Xcode 提示注册设备，允许它自动注册
- 如果仍失败，到 Apple Developer 后台的 Certificates, Identifiers & Profiles 手动添加 iPad UDID

## 真机 Run 成功后

马上按 `app-store/device-test-checklist.zh-CN.md` 做离线测试：

- 打开飞行模式
- 启动 App
- 保存一条虚构测试记录
- 打开记录夹，确认来源显示 iPad
- 载入刚保存的记录
- 重启 App 后确认记录仍在

真机测试通过后，再考虑 `Product > Archive`。不要跳过真机离线测试直接上传。
