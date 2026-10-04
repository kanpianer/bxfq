# 不想翻墙 — 备用梯子首选

收集的相对比较靠谱的、稳定的、免费的VPN/梯子🪜。

## 🌟 核心收录工具与开发主体

| 工具名称 | 资助与开发主体 | 当前状态 | 平台支持 | 核心亮点 |
| :--- | :--- | :--- | :--- | :--- |
| **1. OpenRung** | `[非盈利性机构]` | 🟢 稳定可用 | Android, iOS, Win, Mac, Linux | 开源无日志，免注册，一键握手，附 GitHub APK 直链与 TestFlight |
| **2. FreeSocks** | `[非盈利性机构]` | 🟢 稳定可用 | Android, iOS, Win, Mac, Linux | 公共互助订阅源，免费获取基础节点，兼容各大主流通用客户端 |
| **3. NthLink** | `[非营利机构发起]` | 🟢 稳定可用 | Android, iOS, Win, Mac | 极度简易一键秒连，提供国内免翻镜像 (downloadnth & AWS S3) |
| **4. 蓝灯 (Lantern)** | `[非盈利性机构]` | 🟢 免费版有限额 | Android, iOS, Win, Mac, Linux | 早期获 BBG/OTF 资助，智能分流省流量，集成自研混淆与多协议动态抗阻断，无需注册一键直连 |
| **5. BeePass VPN** | `[自组织机构]` | 🟢 主攻伊朗 | Android, iOS | Shadowsocks 架构，专为受限地区研发的抗封锁工具，支持 Telegram 与邮件自动获取节点，附官方 X |
| **6. Ceno** | `[非盈利性机构]` | 🟢 很慢但能用 | Android, iOS, Win | 加拿大 eQualitie 研发，基于 P2P 与 Ouinet 分布式缓存，附 censorship.no 备用镜像 |
| **7. 迷雾通 Geph** | `[盈利性机构]` | 🟢 稳定可用 | Android, iOS, Win, Mac, Linux | 自研 Sosistab 深度抗审查混淆，免费版无限流量，极强穿透力 |
| **8. 1.1.1.1** | `[商业机构]` | 🟢 稳定可用 | Android, iOS, Win, Mac, Linux | Cloudflare 全球 Anycast 骨干通道，提供大陆优选 IP 指导 |
| **9. Cloudflare One**| `[商业机构]` | 🟢 稳定可用 | Android, iOS, Win, Mac, Linux | 企业级零信任通道，个人享受 50 席位免费配额，通道优先级高 |
| **10. Tor Browser** | `[非盈利性机构]` | 🟡 国内需配网桥 | Android, iOS, Win, Mac, Linux | 顶尖匿名防御，普林斯顿大学直连镜像，内置 Snowflake/电报申请网桥与开源社区网桥源 |
| **11. Proton VPN** | `[非盈利性机构监督]` | 🟢 稳定可用 | Android, iOS, Win, Mac, Linux, 扩展 | 瑞士中立国法律管辖，免费无限流量，指引切换 Stealth 隐形协议 |

## 🚀 快速上手与运行

### 1. 开发模式
```bash
npm install
npm run dev
```

### 2. 生产预览
```bash
npm run preview
```
访问本地地址：`http://localhost:5173/`

### 3. 构建发布
```bash
npm run build
```
打包输出目录为 `dist/`，可一键部署至 Cloudflare Pages、Vercel、GitHub Pages 等任意静态托管平台。
