# lcdp-ios

LCDP（AI + 低代码平台）运行态的 iOS 壳工程（M13 移动端适配 · 真机层）。

## 定位

壳只做**容器 + 设备桥**，不承载业务呈现：

- 以 Capacitor 内嵌线上运行态（`capacitor.config.ts` 的 `server.url = https://coode.cc.cd`），不打包 Web 资产——线上发版即壳内生效，壳本身极少更新。
- 设备能力经原生插件通道提供给 Web 层：相机（@capacitor/camera，拍照/选图走平台资产链落库）、扫码（@capacitor-mlkit/barcode-scanning，结果以 `lcdp:scan` 事件回传运行态填充字段）。
- 推送、生物识别本期只留桥接口占位（Web 侧 `window.lcdpBridge` 返回 unsupported），不接服务端通道。
- 与 `lcdp-android` 同源同配置（同一 Capacitor 工程的 iOS 平台部分）；Android 壳在 lcdp-android 仓，本仓只带 iOS。

关联仓库：`lcdp-platform`（平台本体与 Schema 契约）、`lcdp-worker`（三前端 + renderer，壳内呈现来自其中的 runtime）、`lcdp-android`（Android 壳）。

## 构建（iOS 模拟器包）

**CI 构建（当前口径）**：push 到 main 或手动触发 `iOS Simulator App` workflow（macOS runner），产物 `lcdp-runtime-ios-simulator.zip` 在 Actions 运行的 Artifacts 里下载；解压得到 `App.app`，拖入 iOS 模拟器窗口即安装。

工程为 Capacitor 8 的 SPM 形态，无需 CocoaPods；`Info.plist` 已声明相机/相册用途说明（扫码与附件）。云端开发 VM 无 macOS 工具链，本地构建以 CI 为准。

真机签名与应用商店分发不在本期范围（与 Android debug APK 同口径）。

## 应用标识

- appId：`cc.coode.lcdp`
- appName：LCDP 运行态
