# Developer Program 通过前的测试方式

适用状态：Xcode 已安装并登录 Apple ID，但 Apple Developer Program 会员审核还没有通过。

## 可以先测什么

可以先做两类测试：

- iPad 模拟器测试：验证界面、布局、保存流程和记录夹流程。
- Xcode 真机 Run 测试：如果 Xcode 允许使用 Personal Team 或普通 Apple ID 开发签名，可以把 App 安装到自己的 iPad 上测试。

这两类测试都不能代替最终上架前的正式签名归档，也不能上传 App Store 或 TestFlight。

## 推荐顺序

1. 先运行本地 readiness：

```sh
npm run check:appstore
```

2. 在 Xcode 中打开工程：

```sh
npm run ios:open
```

3. Xcode 顶部选择模拟器，点击 Run，确认 App 能启动。

4. 如果要测真实 iPad：

- 连接 iPad Air 第五代
- 解锁并信任这台 Mac
- 如有 Developer Mode 提示，开启后重启
- Xcode 顶部设备选择真实 iPad
- target `App` > `Signing & Capabilities` > Team 选择可用的 Personal Team 或开发者团队
- 点击 Run

5. 真机能 Run 后，按 `app-store/device-test-checklist.zh-CN.md` 做离线测试。

## Personal Team 的限制

如果使用的是未付费或未通过审核前的 Personal Team：

- 只能用于开发测试
- 不能上传 App Store Connect
- 不能使用 TestFlight
- provisioning profile 通常只有短期有效期
- 设备和 App ID 数量有限

所以它适合现在先确认“iPad 打开就能用、飞行模式能保存、记录夹能载入”，不适合作为最终发布步骤。

## 等 Developer Program 通过后

审核通过后再做：

- 在 Xcode `Signing & Capabilities` 中选择正式付费团队
- 让 Xcode 注册 iPad 并生成 development provisioning profile
- 完成 iPad Air 第五代真机测试
- `Product > Archive`
- 运行：

```sh
npm run ios:verify-archive:latest:signed
```

- 上传 App Store Connect
- 补齐最终 URL、邮箱、价格、地区和审核资料
- 运行：

```sh
npm run check:appstore:strict
```
