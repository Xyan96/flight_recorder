# 本地离线浏览器 Smoke Test

用途：在不依赖 Xcode 的情况下，用浏览器验证 iPad 单机模式的核心流程。

## 运行方式

启动一个干净端口的静态服务：

```sh
python3 -m http.server 8793 --directory restored_webarchive
```

打开：

```text
http://127.0.0.1:8793/?local=1&smoke=1
```

`local=1` 触发 iPad 单机本地模式。`smoke=1` 只用于自动测试时避免 alert 弹窗阻塞；正常 iPad App 不带这个参数，提示行为不变。

## 验证步骤

- 首屏生成 8 行联络记录和 8 个 VHF 输入框。
- 填写虚构测试数据：
  - 机号：`B-9988`
  - 航班号：`CA9876`
  - 航段：`TST-APP`
  - 带队机长：`测试`
  - FN：`00123456`
  - 日期：`2099-12-30`
  - 第一行联络记录：`RCD SMOKE TEST`
- 点击保存。
- 打开记录夹。
- 搜索日期 `2099-12-30`、航班号 `9876`。
- 确认记录来源显示 `iPad`。
- 点击载入。
- 确认主界面恢复机号、航班号、航段、机长和日期。

## 最近结果

2026-06-12 通过。

浏览器验证输出：

```json
{
  "commCount": 8,
  "vhfCount": 8,
  "archiveText": "2099-12-30 CA9876 TST-APP\\niPad B-9988 测试 2026-06-12T05:23:00.427Z\\n载入",
  "loaded": {
    "aircraftNo": "9988",
    "archiveHidden": true,
    "captain": "测试",
    "dateUtc": "2099-12-30",
    "flightNo": "9876",
    "sectorFrom": "TST",
    "sectorTo": "APP"
  }
}
```

## 注意

如果同一个端口曾经注册过旧 service worker，浏览器可能继续受旧缓存控制。v57 起，本地/Capacitor 模式会跳过 service worker 注册并尝试注销旧注册；测试时仍建议换一个干净端口。
