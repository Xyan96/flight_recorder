# App Store 截图生成指南

截图只使用虚构测试数据，不要出现真实航班、真实人员或运行数据。

## 已准备文件

- 13 英寸 iPad 空表截图：`app-store/ipad-13-inch-v55.png`
- iPad Air 第五代同尺寸空表截图：`app-store/ipad-air-5-size-v55.png`
- 虚构演示备份：`app-store/demo-records.json`

## 推荐截图流程

1. 在 Xcode 中将 App 安装到 iPad Air 第五代或 iPad 模拟器。
2. 打开 App。
3. 打开“记录夹”。
4. 点击“导入备份”。
5. 选择 `app-store/demo-records.json`。
6. 导入后在记录夹中点击 `2026-06-12 CA9999 TST-APP` 的“载入”。
7. 返回主界面后截图。
8. 再打开记录夹，截图记录夹界面。

## 建议上传截图

- 13 英寸 iPad：至少上传一张 13 英寸截图。当前已准备 `app-store/ipad-13-inch-v55.png`，正式提交时建议替换为带演示数据的 13 英寸截图。
- iPad Air 第五代参考：保留 `app-store/ipad-air-5-size-v55.png` 作为目标设备布局验证。

## 演示数据说明

演示记录使用：

- 机号：`B-9999`
- 航班：`CA9999`
- 航段：`TST-APP`
- 机长：`测试`

这些内容均为虚构，仅用于截图和审核演示。
