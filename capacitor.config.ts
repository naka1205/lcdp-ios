import type { CapacitorConfig } from "@capacitor/cli";

/**
 * LCDP 运行态 iOS 壳（M13 真机层；与 lcdp-android 同源同配置，契约 m13-mobile-contract-2026-10-17 §5）。
 * 壳只做容器 + 设备桥：呈现永远走线上运行态（server.url），不打包 Web 资产，
 * 线上发版即壳内生效。设备桥的 Web 侧入口在运行态（window.lcdpBridge），
 * 本工程只提供原生插件通道（Camera / MLKit 扫码）。
 */
const config: CapacitorConfig = {
  appId: "cc.coode.lcdp",
  appName: "LCDP 运行态",
  webDir: "www",
  server: {
    url: "https://coode.cc.cd",
    cleartext: false,
    // iOS WKWebView 导航策略：未列入的 host 会被 Capacitor 交给外部浏览器打开。
    // 入口根域会引导到 www、会员登录要跳 account 子域——整域放行壳内导航，
    // 否则壳内首跳即被弹去 Safari、壳内永停加载屏（2026-10-22 iOS 补验实证）。
    allowNavigation: ["*.coode.cc.cd", "coode.cc.cd"],
  },
};

export default config;
