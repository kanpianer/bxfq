# 不想翻墙 — 备用梯子首选

收集的相对比较靠谱的、稳定的、免费的VPN/梯子🪜。

## 🌟 核心收录工具与开发主体

| 工具名称 | 资助与开发主体 | 当前状态 | 平台支持 | 核心亮点 |
| :--- | :--- | :--- | :--- | :--- |
| **1. OpenRung** | `[非盈利性机构]` | 🟢 稳定可用 | Android, iOS, Win, Mac, Linux | 开源无日志，免注册，一键握手，附 GitHub APK 直链与 TestFlight |
| **2. FreeSocks** | `[非盈利性机构]` | 🟢 稳定可用 | Android, iOS, Win, Mac, Linux | 公共互助订阅源，免费获取基础节点，兼容各大主流通用客户端 |
| **3. NthLink** | `[非营利机构发起]` | 🟢 稳定可用 | Android, iOS, Win, Mac | 极度简易一键秒连，提供国内免翻镜像 (downloadnth & AWS S3) |
| **4. Tor Browser** | `[非盈利性机构]` | 🟡 国内需配网桥 | Android, iOS, Win, Mac, Linux | 顶尖匿名防御，普林斯顿大学直连镜像，内置 Snowflake/电报申请网桥与开源社区网桥源 |
| **5. VPN-Configs-for-Russia** | `[自组织开源项目]` | 🟢 自动更新 | Android, iOS, Win, Mac, Linux | 全自动测速抗封锁节点合集，非俄/国内用户专享黑名单高速订阅，收录 7 大分布式镜像与代理 |
| **6. Proton VPN** | `[非盈利性机构监督]` | 🟢 稳定可用 | Android, iOS, Win, Mac, Linux, 扩展 | 瑞士中立国法律管辖，免费无限流量，指引切换 Stealth 隐形协议 |
| **7. 迷雾通 Geph** | `[盈利性机构]` | 🟢 稳定可用 | Android, iOS, Win, Mac, Linux | 自研 Sosistab 深度抗审查混淆，免费版无限流量，极强穿透力 |
| **8. 1.1.1.1** | `[商业机构]` | 🟢 稳定可用 | Android, iOS, Win, Mac, Linux | Cloudflare 全球 Anycast 骨干通道，提供大陆优选 IP 指导 |
| **9. Cloudflare One**| `[商业机构]` | 🟢 稳定可用 | Android, iOS, Win, Mac, Linux | 企业级零信任通道，个人享受 50 席位免费配额，通道优先级高 |
| **10. BeePass VPN** | `[自组织机构]` | ⚪ **目前不可用** (灰度呈现) | Android, iOS | 专为伊朗等断网地区研发，中国大陆暂不可用，作为技术备用与观察 |

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
