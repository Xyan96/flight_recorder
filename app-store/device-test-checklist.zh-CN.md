# iPad Air 第五代真机测试清单

目标设备：iPad Air 第五代，10.9 英寸。

测试前准备：

- 在 Xcode 中选择开发者 Team。
- 连接 iPad Air 第五代。
- 解锁 iPad，并在 iPad 上信任这台 Mac。
- 设备选择真实 iPad，而不是模拟器。
- 如果 Xcode 提示注册设备或创建 provisioning profile，允许自动处理。
- 使用 Xcode Run 安装 App。
- 首轮测试建议打开飞行模式。

## 基础启动

- App 可以正常启动。
- 首屏不是白屏。
- 顶部日期和右侧主题按钮完整显示。
- 页面栏、保存、清除全部、记录夹按钮完整显示。
- 右侧巡航检查区域没有明显裁切。

## 离线记录

- 关闭 Wi-Fi 和蜂窝网络。
- 填写测试机号、航班号、航段、带队机长、日期。
- 填写至少一行联络对象和联络记录。
- 填写至少一组巡航检查油量。
- 点击保存。
- 保存提示显示记录已保存到 iPad。

## 记录夹

- 打开记录夹。
- 能看到刚保存的测试记录。
- 记录来源显示为 iPad。
- 点击载入。
- 主界面字段恢复正确。

## 备份

- 打开记录夹。
- 点击导出备份。
- 可以通过 iPadOS 分享/文件流程保存备份。
- 使用导入备份选择刚导出的 JSON。
- 导入后记录仍可载入。

## 回归检查

- 重启 App 后记录仍存在。
- 切换深色/浅色模式后布局仍可用。
- 断网状态下没有登录页、Cloudflare 页面或上传失败循环。

测试数据必须使用虚构内容，不要使用真实航班、真实人员或运行数据。

## 记录测试结果

真机测试通过后，复制结果模板：

```sh
cp app-store/device-test-results.example.json app-store/device-test-results.json
```

把 `app-store/device-test-results.json` 里的测试日期、测试人、iPadOS 版本填好，并把已通过项目从 `false` 改成 `true`。

验证结果文件：

```sh
npm run appstore:verify-device-test
```

`device-test-results.json` 不提交到 Git；它用于本机最终提交前证明 iPad Air 第五代真机离线测试已经完成。
