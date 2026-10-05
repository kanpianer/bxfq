import { VPNTool } from '../types';

export const TOOLS_DATA: VPNTool[] = [
  {
    id: 'openrung',
    name: 'OpenRung',
    aliases: ['开源梯子', 'Rung'],
    tagline: '纯开源社区驱动的抗封锁自由网络阶梯，开箱即用',
    entityType: 'non-profit',
    entityLabel: '非盈利性机构',
    entityDescription: '由非盈利性数字人权社区维护与资助。代码全开源、无商业盈利诉求、零日志记录，节点通过全球分布式自愿网络提供服务。',
    available: true,
    status: 'available',
    statusText: '稳定可用',
    pricingModel: '100% 永久免费 / 开源公益',
    platforms: ['android', 'ios', 'windows', 'macos', 'linux'],
    officialUrl: 'https://openrung.org',
    downloadLinks: [
      {
        label: 'Android 直接下载 APK',
        url: 'https://github.com/openrung/openrung-mobile-app/releases/latest/download/openrung-android.apk',
        platform: 'android',
        isDirect: true,
        note: 'GitHub 官方最新直链，小白推荐'
      },
      {
        label: 'iOS TestFlight 参与测试',
        url: 'https://testflight.apple.com/join/RMTt4UfQ',
        platform: 'ios',
        note: '免换区直接参与苹果官方公测'
      },
      {
        label: 'Windows 桌面安装版',
        url: 'https://github.com/openrung/openrung/releases',
        platform: 'windows',
        note: '官方 GitHub 预编译 Windows 客户端'
      },
      {
        label: 'macOS 苹果电脑版',
        url: 'https://github.com/openrung/openrung/releases',
        platform: 'macos',
        note: '支持 Apple Silicon 与 Intel 芯片'
      },
      {
        label: 'Linux 客户端',
        url: 'https://github.com/openrung/openrung/releases',
        platform: 'linux',
        note: '适用于 Ubuntu / Debian / Arch 等主流 Linux 系统'
      }
    ],
    quickStartSteps: [
      {
        step: 1,
        title: '下载并安装客户端',
        desc: '安卓用户直接点击下载 APK 即可安装；苹果用户通过 TestFlight 链接加入公测体验。'
      },
      {
        step: 2,
        title: '打开客户端免注册',
        desc: 'OpenRung 坚持无账号原则，无需邮箱或手机号注册，打开即可看到连接主界面。'
      },
      {
        step: 3,
        title: '一键点击连接',
        desc: '点击屏幕中央的连接大按钮，系统将自动握手混淆节点，提示“已连接”即可畅游自由网络。'
      }
    ],
    detailedGuide: [
      {
        title: '为什么推荐小白使用？',
        content: [
          '无需经历复杂的账号注册与验证码流程，保护个人隐私不受追踪。',
          '内置动态抗封锁混淆协议，能有效穿透常规的深度包检测（DPI）。',
          '完全开源（GPL 协议），代码透明，无广告且不收集浏览数据。'
        ],
        tips: [
          '遇到连不上时，点击客户端的“刷新节点”按钮更新服务器列表。',
          '若安卓安装时提示“未知来源应用”，在手机设置中允许即可安全安装。'
        ]
      }
    ],
    contacts: [
      { type: 'telegram', label: 'Telegram 官方客服/机器人', value: 'https://t.me/openrung_bot' },
      { type: 'github', label: 'GitHub 源码仓库', value: 'https://github.com/openrung/openrung' },
      { type: 'website', label: '官方站点', value: 'https://openrung.org' }
    ],
    speedRating: 'high',
    securityRating: '无日志 / 端到端加密 / 开源'
  },
  {
    id: 'freesocks',
    name: 'FreeSocks',
    aliases: ['免费机场订阅', 'Socks5/V2Ray'],
    tagline: '非盈利模式的公共代理订阅，提供类似商业机场的节点',
    entityType: 'non-profit',
    entityLabel: '非盈利性机构',
    entityDescription: '由非盈利组织发起。采用“互助共享”模式：免费用户可获取稳定基础流量，进阶用户升级会员的款项将全部用于扩容免费服务器池。',
    available: true,
    status: 'available',
    statusText: '需注册获取订阅',
    pricingModel: '免费账户提供基础节点 / 赞助可获无限流量',
    platforms: ['android', 'ios', 'windows', 'macos', 'linux'],
    officialUrl: 'https://freesocks.org',
    downloadLinks: [
      {
        label: '前往官网注册获取订阅链接',
        url: 'https://freesocks.org',
        platform: 'browser',
        note: '注册后在用户后台一键复制订阅 URL'
      }
    ],
    quickStartSteps: [
      {
        step: 1,
        title: '访问官网注册账号',
        desc: '使用任意可用邮箱在 FreeSocks 官网注册一个免费账号，登录进入控制台。'
      },
      {
        step: 2,
        title: '复制客户端订阅链接',
        desc: '在后台仪表盘找到“订阅地址”或“一键导入”，复制该通用订阅链接。'
      },
      {
        step: 3,
        title: '导入通用客户端连接',
        desc: '粘贴至你喜欢的客户端（如 v2rayN、Clash Verge、Sing-box、Shadowrocket），更新节点并连接。'
      }
    ],
    detailedGuide: [
      {
        title: '使用特点与小白建议',
        content: [
          'FreeSocks 并不是一个单独的软件，而是提供节点订阅源，因此兼容性极高，可在全平台各种主流客户端中使用。',
          '协议多样：支持 Shadowsocks、V2Ray 与 Trojan 等主流协议，适应不同网络环境。',
          '免费配额每个月都会重置，非常适合当作主力梯子的第一备用方案。'
        ],
        tips: [
          '建议使用临时邮箱或海外邮箱（如 Outlook / Gmail / ProtonMail）注册。',
          '如果某个节点突然变慢，在客户端中选择延迟测速并切换到绿色低延迟节点。'
        ]
      }
    ],
    contacts: [
      { type: 'twitter', label: '官方 X (Twitter)', value: 'https://x.com/unredacted_org' },
      { type: 'bluesky', label: 'Bluesky 官方动态', value: 'https://bsky.app/profile/unredacted.org' },
      { type: 'email', label: '技术支持邮箱', value: 'help@freesocks.org' },
      { type: 'website', label: '官方网址', value: 'https://freesocks.org' }
    ],
    speedRating: 'medium',
    securityRating: '标准加密传输'
  },
  {
    id: 'nthlink',
    name: 'NthLink',
    aliases: ['第N链接', 'OTF资助工具'],
    tagline: '极度简易的抗封锁一键连接神器，开箱即可抗干扰',
    entityType: 'non-profit',
    entityLabel: '非营利机构发起',
    entityDescription: '由知名国际非营利机构（含开源技术基金会等）支持发起的互联网自由项目。采用强混淆与自动化防阻断架构，技术实力深厚。',
    available: true,
    status: 'available',
    statusText: '一键秒连',
    pricingModel: '100% 永久免费 / 无广告',
    platforms: ['android', 'ios', 'windows', 'macos'],
    officialUrl: 'https://www.nthlink.com',
    downloadLinks: [
      {
        label: '国内备用下载镜像 1',
        url: 'https://www.downloadnth.com/download.html',
        platform: 'windows',
        isMirror: true,
        note: '国内网络直连可开，小白优先选择！'
      },
      {
        label: '亚马逊 AWS S3 备用下载镜像 2',
        url: 'https://s3.us-west-1.amazonaws.com/dwo-jar-kmf-883/download.html',
        platform: 'android',
        isMirror: true,
        note: '高可用全球 CDN 备用地址'
      },
      {
        label: 'Google Play 商店下载',
        url: 'https://play.google.com/store/apps/details?id=com.nthlink.android.client&hl',
        platform: 'android',
        note: '海外区/已装 Google 服务的设备'
      },
      {
        label: 'Apple App Store',
        url: 'https://apps.apple.com/us/app/nthlink/id1467297604',
        platform: 'ios',
        note: '需使用美区/港区 Apple ID'
      }
    ],
    mirrors: [
      {
        name: '官方直连镜像站',
        url: 'https://www.downloadnth.com/download.html',
        description: '无需翻墙即可打开，包含 Windows 和 Android 最新安装包'
      },
      {
        name: 'Amazon S3 镜像源',
        url: 'https://s3.us-west-1.amazonaws.com/dwo-jar-kmf-883/download.html',
        description: '由亚马逊 AWS 云存储强力托管的海外抗封锁分发页'
      }
    ],
    quickStartSteps: [
      {
        step: 1,
        title: '通过国内备用镜像下载',
        desc: '如果不翻墙打不开 Google Play，直接点击本页的“downloadnth.com”镜像下载 Windows 或安卓版本。'
      },
      {
        step: 2,
        title: '安装并启动应用',
        desc: '安装完成后打开软件，界面只有一个极其醒目的“连接”大按钮。'
      },
      {
        step: 3,
        title: '轻点启动翻墙',
        desc: '点击连接，软件后台自动与抗封锁服务器握手，稍等 3~5 秒即可正常浏览外网。'
      }
    ],
    detailedGuide: [
      {
        title: '小白必看亮点',
        content: [
          '零配置设计：没有任何复杂的服务器选择或参数设置，专为新手而生。',
          '自动节点轮换：当某个 IP 遭受干扰时，客户端会自动探寻其他可用链路，无需人工干预。',
          '国际非营利背景：隐私策略严格，承诺绝不留存敏感访问历史与个人数据。'
        ],
        tips: [
          '如果某次连接时间稍长，请保持界面停留 10 秒等待密钥协商。',
          '由于提供给大量公益受众，测速峰值虽不算极高，但刷推、看网页、日常即时通讯非常稳健。'
        ]
      }
    ],
    contacts: [
      { type: 'telegram', label: 'Telegram 官方群组', value: 'https://t.me/nthlinkvpn' },
      { type: 'website', label: '官方主页', value: 'https://www.nthlink.com' }
    ],
    speedRating: 'high',
    securityRating: '强混淆加密 / 严格无日志'
  },
  {
    id: 'lantern',
    name: '蓝灯 (Lantern)',
    aliases: ['Lantern', '蓝灯', 'Lantern VPN', 'GetLantern'],
    tagline: '老牌非营利抗审查网络工具，智能分流与多协议抗阻断',
    entityType: 'non-profit',
    entityLabel: '非盈利性机构',
    entityDescription: '由美国 501(c)(3) 非营利机构 Brave New Software Project, Inc. 于 2013 年发起研发（早期曾获美国国际广播局 BBG 与开放技术基金会 OTF 资助）。致力于向全球互联网审查严苛地区的人群提供无障碍、安全且快速的互联网访问。',
    available: true,
    status: 'available',
    statusText: '免费版有限额',
    badgeNote: '老牌抗封锁',
    pricingModel: '基础版永久免费（每月提供免费高速流量，用尽后限速）/ 专业版 (Pro) 付费解锁无限高速流量与全球节点挑选',
    platforms: ['android', 'ios', 'windows', 'macos', 'linux'],
    officialUrl: 'https://lantern.io/zh',
    downloadLinks: [
      {
        label: 'Windows 官方客户端下载',
        url: 'https://github.com/getlantern/lantern/releases',
        platform: 'windows',
        isDirect: true,
        note: 'GitHub 官方最新发布页，获取 .exe 安装包'
      },
      {
        label: 'macOS 官方客户端下载',
        url: 'https://github.com/getlantern/lantern/releases',
        platform: 'macos',
        isDirect: true,
        note: 'GitHub 官方最新发布页，获取 .dmg 安装包'
      },
      {
        label: 'Android 官方 APK 下载',
        url: 'https://github.com/getlantern/lantern/releases',
        platform: 'android',
        isDirect: true,
        note: 'GitHub 官方直链获取安卓 .apk 原生安装包'
      },
      {
        label: 'Google Play 商店',
        url: 'https://play.google.com/store/apps/details?id=org.getlantern.lantern',
        platform: 'android',
        note: '海外区/具备 Google Play 服务的安卓设备'
      },
      {
        label: 'Apple App Store',
        url: 'https://apps.apple.com/us/app/lantern-open-internet/id1457872372',
        platform: 'ios',
        note: '支持 iPhone 与 iPad（需海外 Apple ID）'
      },
      {
        label: 'Linux (Ubuntu/Debian) 客户端',
        url: 'https://github.com/getlantern/lantern/releases',
        platform: 'linux',
        isDirect: true,
        note: 'GitHub 官方最新发布页，获取 .deb 安装包'
      },
      {
        label: '蓝灯官方下载中心',
        url: 'https://lantern.io/zh#download',
        platform: 'browser',
        note: '官方网站多系统客户端直达下载指引'
      }
    ],
    quickStartSteps: [
      {
        step: 1,
        title: '下载并安装客户端',
        desc: '根据操作系统从 GitHub Releases 官方发布页或应用商店下载对应的安装包并完成安装。'
      },
      {
        step: 2,
        title: '启动即连，无需注册',
        desc: '打开蓝灯软件，点击中央主开关即可一键开启保护。无需注册账号或繁琐配置，基础免费版立即可用。'
      },
      {
        step: 3,
        title: '智能分流与按需使用',
        desc: '蓝灯内置智能路由分流，访问国内网站直连不消耗流量，访问受阻网站自动走加密通道代理。'
      }
    ],
    detailedGuide: [
      {
        title: '智能分流与多协议抗阻断架构',
        content: [
          '动态抗阻断协议：蓝灯集成了包括自研混淆传输、多重回退中继、域前置等一系列抗审查协议。当某种连接方式受到防火墙干扰时，客户端会自动切换备用路由通道。',
          '智能分流省流量：软件默认只对被审查封锁的域名和 IP 启用代理隧道，国内主流网站与服务依然保持本地直连，既不减慢国内网络速度，又极大节省了代理流量。',
          '去中心化与集中式混合中继：综合了集中式高性能服务器与分布式对等中继的弹性，确保即使在网络敏感期也能维持基本连通性。'
        ],
        tips: [
          '电脑端启动后系统托盘会常驻小灯笼图标，若需全局代理或更改端口，可在右键托盘菜单【设置】中进行调整。'
        ]
      },
      {
        title: '免费版 (Free) 与专业版 (Pro) 差异',
        content: [
          '免费版额度：蓝灯每月免费提供 500MB 高速抗封锁流量。高速流量用完后，连接不会中断，但速率会被限制（可用于文字阅读和即时通讯），直到次月自动重置。',
          '专业版权益：Pro 会员提供无上限的高速带宽、支持挑选指定国家/地区服务器节点，并支持在多台设备（电脑与手机）上同时登录使用。',
          '安全防范提示：官方应用没有任何弹窗诈骗或强制绑定；请认准官方 GitHub (getlantern/lantern) 和官方主站 (lantern.io)，切勿从非官方第三方破解站下载改包版。'
        ]
      }
    ],
    contacts: [
      { type: 'twitter', label: '官方 X (Twitter)', value: 'https://x.com/getlantern' },
      { type: 'github', label: 'GitHub 官方仓库', value: 'https://github.com/getlantern/lantern' },
      { type: 'email', label: '官方支持邮箱', value: 'support@lantern.io' },
      { type: 'website', label: '蓝灯官方主站', value: 'https://lantern.io/zh' }
    ],
    speedRating: 'high',
    securityRating: '多协议动态混淆 / 501(c)(3) 非营利机构背景'
  },
  {
    id: 'mahsanet',
    name: 'MahsaNet',
    aliases: ['MahsaVPN', 'MahsaNG', '玛莎网络', 'Mahsa Server'],
    tagline: '专为严苛网络审查地区研发的去中心化公益抗封锁工具，主打伊朗抗阻断',
    entityType: 'self-organized',
    entityLabel: '自组织机构',
    entityDescription: '由为纪念阿米尼（Mahsa Amini）并捍卫自由互联网的海外伊朗技术社群发起成立的非营利公益组织。构建去中心化的 Mahsa Server 平台，汇聚全球志愿者捐赠的抗封锁节点与混淆配置，主打为遭受严重断网与深度审查地区的人民提供可靠、安全的人权网络访问通道。',
    available: true,
    status: 'available',
    statusText: '主打伊朗',
    badgeNote: '主打伊朗',
    pricingModel: '100% 永久免费 / 社区公益众包',
    platforms: ['android', 'ios'],
    officialUrl: 'https://mahsanet.com',
    downloadLinks: [
      {
        label: 'MahsaVPN (Apple App Store)',
        url: 'https://apps.apple.com/us/app/mahsa-vpn/id6751109099',
        platform: 'ios',
        note: '支持 iPhone 与 iPad（需海外 Apple ID 登录下载）'
      },
      {
        label: 'MahsaNG VPN (Google Play 商店)',
        url: 'https://play.google.com/store/apps/details?id=com.MahsaNet.MahsaNG',
        platform: 'android',
        note: 'Google Play 官方商店获取（基于 v2rayNG 深度定制）'
      },
      {
        label: 'MahsaServer 官方下载中心',
        url: 'https://www.mahsaserver.com/download',
        platform: 'android',
        isDirect: true,
        note: '官方免翻墙镜像下载中心，直接获取安卓 APK 安装包'
      },
      {
        label: 'GitHub Releases 源码与发布页',
        url: 'https://github.com/mahsanet/MahsaNG/releases',
        platform: 'android',
        note: 'GitHub 官方开源代码仓库与原生编译安装包下载'
      }
    ],
    mirrors: [
      {
        name: 'Mahsa Server 官方镜像站',
        url: 'https://www.mahsaserver.com',
        description: '官方备用镜像站点，提供最新节点配置与安卓客户端下载'
      }
    ],
    quickStartSteps: [
      {
        step: 1,
        title: '下载并安装客户端',
        desc: '安卓设备推荐访问 MahsaServer 官方下载页或 Google Play 安装 MahsaNG；iOS 用户在海外区 App Store 安装 MahsaVPN。'
      },
      {
        step: 2,
        title: '自动拉取抗审查配置',
        desc: '启动软件后，客户端将自动连接 Mahsa Server 众包节点池，拉取最新验证可用的抗封锁加密配置。'
      },
      {
        step: 3,
        title: '一键开启加密连接',
        desc: '在节点列表中测速并选择延迟较低的配置，点击主界面底部或中央的连接开关，即可快速建立安全隧道。'
      }
    ],
    detailedGuide: [
      {
        title: '众包节点池与抗审查技术架构',
        content: [
          '众包节点生命周期管理：Mahsa Server 平台拥有自动化的配置测试与分发机制。来自全球志愿者的捐助节点在经过连通性、速度与安全性全自动筛查后，被动态推送至客户端。',
          '深度包检测对抗（DPI）：针对严苛审查地区的协议阻断，客户端集成了 TLS 分片（Fragment）、DoH（DNS over HTTPS）防劫持解析等先进混淆技术，破坏防火墙的指纹识别。',
          '专为断网严酷环境优化：在遇到区域性大面积丢包或限流时，软件拥有强大的快速重连机制与备用配置轮询方案，确保维持基础信息通道。'
        ],
        tips: [
          '若当前连接节点速度下降或失效，可下拉配置列表重新刷新从 Mahsa Server 获取最新的一批可用节点。',
          'MahsaNG 允许用户导入自定义 V2Ray/Xray 订阅链接，兼具简便性与高级扩展能力。'
        ]
      },
      {
        title: '数字安全与隐私原则',
        content: [
          '完全免注册：使用 MahsaNet 系列软件无需提供手机号、邮箱或任何个人身份信息。',
          '零日志收集：官方不记录任何用户访问日志与网络传输数据。',
          '节点安全考量：由于节点由社区众包提供，强烈建议仅用于打破信息封锁与正常网页浏览；处理高价值敏感事务时，请确保全程使用 HTTPS 加密或配合端到端加密通信工具。'
        ]
      }
    ],
    contacts: [
      { type: 'website', label: 'MahsaNet 官方主站', value: 'https://mahsanet.com' },
      { type: 'website', label: 'Mahsa Server 镜像站', value: 'https://www.mahsaserver.com' },
      { type: 'github', label: 'GitHub 官方开源组织', value: 'https://github.com/mahsanet' },
      { type: 'twitter', label: '官方 X (Twitter)', value: 'https://x.com/mahsanet' },
      { type: 'telegram', label: 'Telegram 官方频道', value: 'https://t.me/mahsa_net' }
    ],
    speedRating: 'moderate',
    securityRating: '去中心化众包节点 / TLS 分片混淆抗封锁'
  },
  {
    id: 'freebrowser',
    name: '自由浏览',
    aliases: ['FreeBrowser', 'GreatFire 自由浏览', '免翻墙浏览器'],
    tagline: 'GreatFire 打造的抗封锁浏览器，内置自动翻墙，打开即达开放互联网',
    entityType: 'non-profit',
    entityLabel: '非盈利性机构',
    entityDescription: '由长期致力于倡导网络言论自由与打破信息审查的非营利组织 GreatFire.org 研发与维护。基于开源 Chromium 深度定制，内置自动抗封锁代理中继，零配置无需额外 VPN，Google Play 下载量超 100 万。',
    available: true,
    status: 'available',
    statusText: '免配直连',
    badgeNote: '免配直连',
    pricingModel: '100% 永久免费 / 零配置无需注册',
    platforms: ['android', 'windows', 'macos', 'linux'],
    officialUrl: 'https://freebrowser.org/zh',
    downloadLinks: [
      {
        label: 'Android APK 官方直接下载',
        url: 'https://freebrowser.org/zh#downloadSection',
        platform: 'android',
        isDirect: true,
        note: '官方网站直链免翻墙下载原生 APK 安装包'
      },
      {
        label: 'Google Play 商店',
        url: 'https://play.google.com/store/apps/details?id=org.greatfire.freebrowser',
        platform: 'android',
        note: 'Google Play 官方商店（需海外账号或 Google 服务框架）'
      },
      {
        label: 'Windows 桌面端下载',
        url: 'https://freebrowser.org/zh#downloadSection',
        platform: 'windows',
        note: '支持 Windows 10/11，开箱即用免安装配置'
      },
      {
        label: 'macOS 苹果电脑版',
        url: 'https://freebrowser.org/zh#downloadSection',
        platform: 'macos',
        note: '适配 Intel 与 Apple Silicon 芯片的 Mac 设备'
      },
      {
        label: 'Linux 客户端下载',
        url: 'https://freebrowser.org/zh#downloadSection',
        platform: 'linux',
        note: '适用于主流 Linux 发行版的安装包'
      },
      {
        label: 'GitHub 官方开源仓库',
        url: 'https://github.com/greatfire/freebrowser',
        platform: 'android',
        note: 'GitHub 官方源码仓库与 fbproxy 核心组件'
      }
    ],
    quickStartSteps: [
      {
        step: 1,
        title: '下载对应平台的浏览器',
        desc: '访问自由浏览官网下载适用于 Android、Windows、macOS 或 Linux 的安装包，安装到您的设备中。'
      },
      {
        step: 2,
        title: '启动浏览器，自动绕过封锁',
        desc: '打开「自由浏览」，后台内置的代理服务将自动建立抗封锁加密隧道，无需手动切换开关或配置节点。'
      },
      {
        step: 3,
        title: '直接访问开放互联网',
        desc: '直接在地址栏输入 Google、YouTube、X (推特)、维基百科等网址即可顺畅浏览，体验与 Chrome 高度一致。'
      }
    ],
    detailedGuide: [
      {
        title: '内置 fbproxy 代理与抗审查机制',
        content: [
          '无需独立 VPN 软件：自由浏览内部集成了轻量级抗封锁代理守护进程（fbproxy），只针对受审查封锁的域名和资源执行动态分流与重定向，访问国内普通网站保持本地直连。',
          '原生 Chromium 体验：基于与 Google Chrome 相同的开源 Chromium 项目构建，界面熟悉、内核强劲、网页渲染标准完整。',
          '动态对抗审查阻断：GreatFire 团队拥有十余年反网络审查技术积累，运用分布式前置节点与混淆技术，即使在常见商用 VPN 协议受到严重压制的敏感时期，仍能保持高连通性。'
        ],
        tips: [
          '电脑端使用时建议将其作为专用的安全浏览窗口，免去系统全局代理对其他软件的网络干扰。'
        ]
      },
      {
        title: '视频播放与隐私保护说明',
        content: [
          '在线视频播放提示：由于开源 Chromium 默认未内置某些收费商业解码器（如 H.264），部分极早期或刚上传的 YouTube 视频可能需要等待几小时待平台转码 VP8/VP9 后方可流畅播放。',
          '完全匿名与隐私保护：自由浏览无需注册账号、无需绑定手机号或邮箱，不会收集用户的网络浏览历史与个人敏感数据。',
          '非营利背景保障：由知名网络人权组织 GreatFire.org 打造，无商业牟利意图，代码接受社区审查。'
        ]
      }
    ],
    contacts: [
      { type: 'email', label: '官方支持邮箱', value: 'support@greatfire.org' },
      { type: 'twitter', label: '官方 X (Twitter)', value: 'https://x.com/greatfirechina' },
      { type: 'github', label: 'GitHub 官方仓库', value: 'https://github.com/greatfire/freebrowser' },
      { type: 'website', label: '自由浏览官方主页', value: 'https://freebrowser.org/zh' },
      { type: 'website', label: 'GreatFire.org 官方网站', value: 'https://zh.greatfire.org' }
    ],
    speedRating: 'high',
    securityRating: 'Chromium 安全沙箱 / GreatFire 非营利组织保障'
  },
  {
    id: 'beepass',
    name: 'BeePass VPN',
    aliases: ['蜜蜂VPN', '伊朗自由梯子'],
    tagline: '基于 Shadowsocks 架构，专为受限地区人民研发的抗封锁工具',
    entityType: 'self-organized',
    entityLabel: '自组织机构',
    entityDescription: '由民间自组织机构发起成立，主要为伊朗等遭受严重断网与网络审查地区的公民提供数字人权援助。',
    available: true,
    status: 'available',
    statusText: '主攻伊朗',
    badgeNote: '主攻伊朗',
    pricingModel: '100% 永久免费 / 民间公益',
    platforms: ['android', 'ios'],
    officialUrl: 'https://beepassvpn.com/en/',
    downloadLinks: [
      {
        label: 'Google Play 商店',
        url: 'https://play.google.com/store/apps/details?id=com.beepassvpn.free.vpn.secure',
        platform: 'android',
        note: '支持 Android 手机与平板设备'
      },
      {
        label: 'Apple App Store',
        url: 'https://apps.apple.com/us/app/beepass-vpn/id1556325746',
        platform: 'ios',
        note: '支持 iPhone 与 iPad 设备'
      },
      {
        label: 'BeePass 官方电报节点机器人',
        url: 'https://telegram.me/beepassvpn_bot',
        platform: 'browser',
        note: '官方 Telegram 节点获取机器人'
      },
      {
        label: '邮件获取节点 (Email)',
        url: 'mailto:get@beepassvpn.com',
        platform: 'browser',
        note: '发送任意邮件至 get@beepassvpn.com 自动获取最新可用节点'
      }
    ],
    quickStartSteps: [
      {
        step: 1,
        title: '下载并安装客户端',
        desc: '从 Google Play 或海外 App Store 下载 BeePass VPN 客户端，或准备通用代理工具。'
      },
      {
        step: 2,
        title: '获取节点与密钥',
        desc: '通过官方 Telegram 机器人 (@beepassvpn_bot) 或发送邮件至 get@beepassvpn.com 自动获取最新抗封锁节点链接。'
      },
      {
        step: 3,
        title: '一键开启安全代理',
        desc: '打开应用点击连接或导入节点密钥，即可通过分布式加密通道安全访问网络。'
      }
    ],
    detailedGuide: [
      {
        title: '背景介绍与技术演进',
        content: [
          'BeePass 是一个极其受尊敬的民间反审查项目，在伊朗历次断网事件中为数百万民众提供了宝贵的通讯通道。',
          '其底层采用 Shadowsocks 及其衍生协议，易用性强，界面简洁，受到国际数字自由联盟的广泛关注。',
          '团队持续维护更新节点与混淆技术，支持通过官方 Telegram 机器人 (@beepassvpn_bot) 或邮件 (get@beepassvpn.com) 实时获取可用节点并导入使用，并可在官方 X (@beepassvpn) 获取第一手更新动态。'
        ]
      }
    ],
    contacts: [
      { type: 'email', label: '获取节点邮箱', value: 'get@beepassvpn.com' },
      { type: 'twitter', label: '官方 X (Twitter)', value: 'https://x.com/beepassvpn' },
      { type: 'telegram', label: 'Telegram 节点机器人', value: 'https://telegram.me/beepassvpn_bot' },
      { type: 'website', label: 'BeePass 官网', value: 'https://beepassvpn.com/en/' }
    ],
    speedRating: 'moderate',
    securityRating: 'Shadowsocks 加密 / 开源民间支持'
  },
  {
    id: 'ceno',
    name: 'Ceno',
    aliases: ['Ceno Browser', 'Censorship.No', 'P2P分布式浏览器'],
    tagline: '基于 P2P 点对点网络与分布式缓存的抗审查浏览器，断网亦能互助浏览',
    entityType: 'non-profit',
    entityLabel: '非盈利性机构',
    entityDescription: '由加拿大非盈利人权组织 eQualitie 研发与资助。基于 BitTorrent 与 Ouinet 点对点协议，将网页缓存在全球分布式网络中，即使中心服务器遭阻断或面临断网，也能通过邻近节点拼装读取。',
    available: true,
    status: 'available',
    statusText: '很慢但能用',
    badgeNote: '很慢但能用',
    pricingModel: '100% 永久免费 / 开源公益 (MPL 2.0)',
    platforms: ['android', 'ios', 'windows'],
    officialUrl: 'https://ceno.app',
    downloadLinks: [
      {
        label: 'Google Play 商店',
        url: 'https://play.google.com/store/apps/details?id=ie.equalit.ceno',
        platform: 'android',
        note: '海外区/具备 Google Play 服务的安卓设备'
      },
      {
        label: 'Apple App Store',
        url: 'https://apps.apple.com/us/app/ceno-browser/id6673915387',
        platform: 'ios',
        note: '支持 iPhone 与 iPad（需海外 Apple ID）'
      },
      {
        label: 'Windows 便携免安装版 (Portable)',
        url: 'https://ceno-download.s3.amazonaws.com/ceno-desktop/latest/ceno-win64-portable.html',
        platform: 'windows',
        isDirect: true,
        note: '官方 AWS S3 镜像下载页，解压即用'
      },
      {
        label: 'Paskoocheh 备用下载 (Android)',
        url: 'https://paskoocheh.com/tools/124/android.html',
        platform: 'android',
        isMirror: true,
        note: '知名免翻开源工具市场镜像直达'
      },
      {
        label: 'Censorship.No 官方镜像网站',
        url: 'https://censorship.no/en/index.html',
        platform: 'browser',
        isMirror: true,
        note: '项目官方备用直连镜像站点，包含文档与下载指引'
      }
    ],
    mirrors: [
      {
        name: 'Censorship.No 官方镜像站',
        url: 'https://censorship.no/en/index.html',
        description: 'Ceno Browser 原生官方直连镜像网站，提供全套抗审查原理、常见问题解答与多语言资料'
      }
    ],
    quickStartSteps: [
      {
        step: 1,
        title: '下载并安装客户端',
        desc: '安卓用户推荐通过 Google Play 或 Paskoocheh 镜像下载；苹果用户直达 App Store；Windows 用户直接下载解压便携版。'
      },
      {
        step: 2,
        title: '了解并选择运行模式',
        desc: 'Ceno 提供“公共模式 (Public)”和“个人模式 (Personal)”。公共模式利用 P2P 分布式缓存连通率最高；个人模式专注私密浏览。'
      },
      {
        step: 3,
        title: '直接输入网址浏览',
        desc: '输入目标网址后，应用会自动通过去中心化 Ouinet 协议寻址并从其他节点拼装拉取数据，初次握手加载较慢，请稍等数秒即可打开。'
      }
    ],
    detailedGuide: [
      {
        title: '为什么特点标签是“很慢但能用”？',
        content: [
          '架构差异：普通 VPN 依赖中心化服务器转发流量，一旦服务器 IP 被封便彻底瘫痪；Ceno 底层是纯粹的 P2P（点对点）分布式网络与 BitTorrent 技术。',
          '极限生存能力：即使遇到区域性大断网或国际出口阻断，只要局域网或邻近节点有人曾访问过该网页，就能从附近设备拼装缓存数据。',
          '初次加载需检索：因为需要在分布式网络中寻址对等节点，初次载入页面通常需要 15~30 秒，因而速度慢，但在严苛审查环境下是无可取代的“终极兜底利器”。'
        ],
        tips: [
          '初次打开网页时切勿频繁刷新，频繁刷新会打断 P2P 节点的检索与握手流程。',
          '公共模式下访问记录会参与分布式索引以帮助其他受限用户，切勿在此模式下登录涉及个人隐私的敏感账号。'
        ]
      },
      {
        title: '公共模式与个人模式的选用建议',
        content: [
          '公共模式 (Public Mode)：推荐用于阅读被封锁的新闻媒体、维基百科、学术资料与公开文章。你的设备也会充当桥梁，把已获取的网页缓存分享给其他受审查地区的网民。',
          '个人模式 (Personal Mode)：请求不经过公开 BitTorrent 索引，适合需要保护身份隐私的访问，但连通成功率与速度会逊于公共模式。'
        ]
      }
    ],
    contacts: [
      { type: 'twitter', label: '官方 X (Twitter)', value: 'https://x.com/cenobrowser' },
      { type: 'telegram', label: 'Telegram 官方频道', value: 'https://t.me/Ceno_Iran' },
      { type: 'gitlab', label: 'GitLab 官方开源仓库', value: 'https://gitlab.com/ceno-app' },
      { type: 'website', label: 'Ceno 官方主站', value: 'https://ceno.app' },
      { type: 'website', label: 'Censorship.No 镜像网站', value: 'https://censorship.no/en/index.html' }
    ],
    speedRating: 'moderate',
    securityRating: 'P2P 分布式缓存 / MPL 2.0 开源公益'
  },
  {
    id: 'geph',
    name: '迷雾通 Geph',
    aliases: ['Geph VPN', 'EmberSky'],
    tagline: '自主研发超强抗封锁协议，免配置、专为严苛网络审查而生',
    entityType: 'commercial',
    entityLabel: '盈利性机构',
    entityDescription: '由海外知名安全学者与隐私黑客创办的商业化抗审查实体。开发了独立的抗封锁传输层协议（Sosistab），免费层供大众公益使用，付费层补贴服务器。',
    available: true,
    status: 'available',
    statusText: '抗封锁强悍',
    pricingModel: '免费版限速 1-2Mbps，流量无限制，可无限期使用',
    platforms: ['android', 'ios', 'windows', 'macos', 'linux'],
    officialUrl: 'https://geph.io',
    downloadLinks: [
      {
        label: 'Android APK 官方直链',
        url: 'https://github.com/EmberSky99/gephVPN/releases/download/last/Android-geph-android.apk',
        platform: 'android',
        isDirect: true,
        note: '直接下载，更新最迅速'
      },
      {
        label: 'GitHub 源码与客户端发布页',
        url: 'https://github.com/EmberSky99/gephVPN',
        platform: 'windows',
        note: '包含 Windows、Mac、Linux 安装包'
      },
      {
        label: 'Google Play 商店客户端',
        url: 'https://play.google.com/store/apps/details?id=io.geph.android',
        platform: 'android'
      },
      {
        label: 'Apple App Store',
        url: 'https://apps.apple.com/us/app/geph/id1638148282?platform=iphone',
        platform: 'ios'
      }
    ],
    quickStartSteps: [
      {
        step: 1,
        title: '下载并安装迷雾通',
        desc: '安卓手机直接点击本页的 GitHub 直链下载 APK；电脑端在 GitHub Releases 中下载安装程序。'
      },
      {
        step: 2,
        title: '注册或免密登录',
        desc: '打开软件，点击注册新账号。无需手机号也无需真实邮箱，只需填写账号密码即可完成创建。'
      },
      {
        step: 3,
        title: '选择免费服务器并连接',
        desc: '选择推荐的免费服务器节点，点击“连接”开关，数秒内即可穿透严苛封锁。'
      }
    ],
    detailedGuide: [
      {
        title: '核心优势与使用体验',
        content: [
          '即便在特殊敏感时期大多数商业梯子断连时，迷雾通自研的混淆算法依然具备极强的抗封锁能力。',
          '免费版提供 1~2 Mbps 的下载速度，无限流量，非常适合阅读维基百科、刷推特、查阅学术资料和文字通讯。',
          '提供多重跳跃与自动桥接，软件启动后会自动寻找可用的入口中继。'
        ],
        tips: [
          '电脑端使用时，软件会自动配置系统代理；若浏览器无法上网，请检查迷雾通是否勾选了“全局代理”或“自动配置代理”。'
        ]
      }
    ],
    contacts: [
      { type: 'telegram', label: 'Telegram 官方中文交流群', value: 'https://t.me/gephusers' },
      { type: 'twitter', label: '官方 X (Twitter) 动态', value: 'https://x.com/GephOfficial' },
      { type: 'email', label: '官方技术支持邮箱', value: 'support@geph.io' }
    ],
    speedRating: 'medium',
    securityRating: '独创 Sosistab 协议 / 零个人信息注册'
  },
  {
    id: 'warp',
    name: '1.1.1.1',
    aliases: ['WARP', 'Cloudflare WARP', 'Cloudflare DNS/VPN'],
    tagline: '全球网络基石 Cloudflare 打造的现代 WireGuard 加密通道',
    entityType: 'commercial',
    entityLabel: '商业机构',
    entityDescription: '由纳斯达克上市全球云网络巨头 Cloudflare (NET) 运营。依托全球数千个数据中心的 Anycast 网络，免费向公众提供安全的现代加密通道。',
    available: true,
    status: 'available',
    statusText: '大陆需搭配优选 IP',
    pricingModel: '永久免费 / 可通过邀请或 Key 获取 WARP+ 流量',
    platforms: ['android', 'ios', 'windows', 'macos', 'linux'],
    officialUrl: 'https://one.one.one.one/',
    downloadLinks: [
      {
        label: '前往 1.1.1.1 官网下载对应版本',
        url: 'https://one.one.one.one/',
        platform: 'windows',
        note: '包含 Windows 与 macOS 官方客户端'
      },
      {
        label: 'Google Play 商店下载',
        url: 'https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone',
        platform: 'android'
      },
      {
        label: 'Apple App Store',
        url: 'https://itunes.apple.com/us/app/1-1-1-1-faster-internet/id1423538627',
        platform: 'ios'
      }
    ],
    quickStartSteps: [
      {
        step: 1,
        title: '安装 1.1.1.1 客户端',
        desc: '从官网或应用商店下载并安装 1.1.1.1 with WARP 客户端。'
      },
      {
        step: 2,
        title: '开启 WARP 模式',
        desc: '打开应用，在界面设置中选择开启【WARP】（不仅加密 DNS，同时加密所有互联网流量）。'
      },
      {
        step: 3,
        title: '中国大陆环境优选连接',
        desc: '由于大陆运营商对默认 IP 干扰，建议在电脑或手机上配合 WARP 优选节点工具填入可用 Endpoint。'
      }
    ],
    detailedGuide: [
      {
        title: '小白进阶配置指南',
        content: [
          '1.1.1.1 默认走 Cloudflare 遍布全球的边缘节点，速度极快且带宽充足。',
          '在国内直连可能偶发握手超时，这是由于 Cloudflare 默认分配的接入点 IP 受到干扰。',
          '可在 GitHub 搜索“Cloudflare Warp 优选 IP”小脚本，生成本省运营商延迟最低的对端 IP，在客户端设置高级选项中替换 Endpoint 即可高速秒连。'
        ],
        tips: [
          '可在客户端菜单中检查连接状态是否显示为“WARP+”或“Your network is private”。'
        ]
      }
    ],
    contacts: [
      { type: 'website', label: '官方网址', value: 'https://one.one.one.one/' }
    ],
    speedRating: 'high',
    securityRating: 'WireGuard 协议 / 全球 Anycast 加密'
  },
  {
    id: 'cloudflare-one',
    name: 'Cloudflare One',
    aliases: ['Zero Trust WARP', 'CF 零信任客户端'],
    tagline: '企业级零信任安全架构，免受常规干扰的高级通道',
    entityType: 'commercial',
    entityLabel: '商业机构',
    entityDescription: 'Cloudflare 为企业团队打造的 Zero Trust（零信任）全球安全访问客户端。个人用户可注册拥有最多 50 个免费席位的团队，享受企业级抗干扰通道。',
    available: true,
    status: 'available',
    statusText: '企业级通道',
    pricingModel: '免费计划（支持多达 50 个席位免费使用）',
    platforms: ['android', 'ios', 'windows', 'macos', 'linux'],
    officialUrl: 'https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/',
    downloadLinks: [
      {
        label: 'Cloudflare One 官方全平台客户端下载',
        url: 'https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/',
        platform: 'windows',
        note: '官方文档下载页，覆盖全部电脑与移动端'
      },
      {
        label: 'Google Play 客户端',
        url: 'https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone',
        platform: 'android'
      },
      {
        label: 'iOS Cloudflare One Agent',
        url: 'https://apps.apple.com/us/app/cloudflare-one-agent/id6443476492',
        platform: 'ios',
        note: '企业版专用 Agent'
      }
    ],
    quickStartSteps: [
      {
        step: 1,
        title: '注册 Cloudflare Zero Trust 免费团队',
        desc: '在 Cloudflare 控制台开通 Zero Trust，创建一个属于你自己的团队组织名称（Team Name）。'
      },
      {
        step: 2,
        title: '下载并打开客户端',
        desc: '下载 Cloudflare One 客户端，进入账户设置选择“登录到 Cloudflare Zero Trust”。'
      },
      {
        step: 3,
        title: '输入团队名完成授权',
        desc: '填入你的团队名称，在浏览器弹出页输入注册邮箱的 6 位验证码，即可开启企业级专属稳定通道。'
      }
    ],
    detailedGuide: [
      {
        title: '与普通 1.1.1.1 的区别',
        content: [
          '通道优先级更高：Cloudflare One 属于企业专属网络路径，受到的网络拥堵与干扰概率远低于普通消费级通道。',
          '支持自定义网关策略：可在控制台自主配置安全拦截、广告阻断及恶意网站过滤。',
          '完全免费：对于个人和家庭使用，50 席位的免费额度完全无需支付任何费用。'
        ]
      }
    ],
    contacts: [
      { type: 'website', label: '官方文档与下载', value: 'https://developers.cloudflare.com/cloudflare-one/' }
    ],
    speedRating: 'high',
    securityRating: '企业级零信任 SASE / 专属组织通道'
  },
  {
    id: 'tor',
    name: 'Tor Browser',
    aliases: ['洋葱路由器', '暗网/隐私浏览器', 'Tor Project'],
    tagline: '全球最高级别匿名与反审查利器，三层跳板加密链路',
    entityType: 'non-profit',
    entityLabel: '非盈利性机构',
    entityDescription: '由美国 501(c)(3) 非盈利机构 The Tor Project 开发维护。由全球志愿者与人权组织捐助算力，专为保护言论自由、抵御监控而生。',
    available: true,
    status: 'needs-bridge',
    statusText: '国内需配置网桥',
    pricingModel: '100% 永久免费 / 全球志愿者资助',
    platforms: ['android', 'ios', 'windows', 'macos', 'linux'],
    officialUrl: 'https://www.torproject.org/zh-CN',
    downloadLinks: [
      {
        label: 'Windows 官方镜像',
        url: 'https://mirror.math.princeton.edu/pub/tor/torbrowser/',
        platform: 'windows',
        isMirror: true,
        note: '普林斯顿大学镜像源，国内常年直连可用'
      },
      {
        label: 'macOS 官方镜像',
        url: 'https://mirror.math.princeton.edu/pub/tor/torbrowser/',
        platform: 'macos',
        isMirror: true,
        note: '普林斯顿大学镜像源，免翻墙高速直连下载 DMG'
      },
      {
        label: 'Linux 官方镜像',
        url: 'https://mirror.math.princeton.edu/pub/tor/torbrowser/',
        platform: 'linux',
        isMirror: true,
        note: '普林斯顿大学镜像源，解压即用独立包'
      },
      {
        label: 'Android 官方 APK',
        url: 'https://f-droid.org/packages/org.torproject.vpn/',
        platform: 'android',
        isDirect: true,
        note: '开源应用商店直链'
      },
      {
        label: 'iOS Orbot 官方客户端',
        url: 'https://apps.apple.com/us/app/orbot/id1609461599',
        platform: 'ios',
        note: '苹果端请搭配 Orbot 使用 Tor 网络'
      },
      {
        label: 'Apple TV Orbot 电视方案',
        url: 'https://orbot.app/en/',
        platform: 'appletv',
        note: '支持 Apple TV tvOS 与家庭影音网络代理'
      }
    ],
    mirrors: [
      {
        name: '普林斯顿大学数学系镜像',
        url: 'https://mirror.math.princeton.edu/pub/tor/torbrowser/',
        description: '国际知名学府镜像服务器，国内可高带宽直连下载各系统安装包'
      }
    ],
    bridges: {
      title: '国内突破网络封锁必须：添加 Bridges (网桥)',
      description: '在中国大陆直接连接 Tor 公共节点会被防火墙拦截，必须在 Tor 设置中填入私密网桥（推荐 Snowflake、WebTunnel 或 obfs4）。',
      methods: [
        {
          channel: '网页快速申请',
          instruction: '访问网桥分发官网（如果打不开请用其它备用梯子或邮件获取）',
          target: 'https://bridges.torproject.org',
          type: 'link'
        },
        {
          channel: '开源社区网桥源',
          instruction: '访问 vpn-configs-for-russia 开源仓库，获取自动化整理的 TOP100、WebTunnel 与 obfs4 实时可用网桥',
          target: 'https://github.com/igareck/vpn-configs-for-russia/blob/main/README-ZH-CN.md#---tor-%E7%BD%91%E6%A1%A5--',
          type: 'link'
        },
        {
          channel: '邮件自动机器人',
          instruction: '使用 Gmail 或 Riseup 邮箱发送正文为 "get bridges" 的邮件（不要用 QQ/163 邮箱）',
          target: 'bridges@torproject.org',
          type: 'email'
        },
        {
          channel: '电报 Telegram 机器人',
          instruction: '在 Telegram 中向官方网桥机器人发送 /bridges 获取最新节点',
          target: 'https://t.me/GetBridgesBot',
          type: 'telegram'
        }
      ],
      tutorialUrl: 'https://support.torproject.org/zh-CN/tor-browser/circumvention/connecting-from-censored-regions/'
    },
    quickStartSteps: [
      {
        step: 1,
        title: '从普林斯顿镜像下载并安装',
        desc: '点击本页普林斯顿大学镜像链接，下载适合你的操作系统（Windows/Mac/Linux）并解压安装。'
      },
      {
        step: 2,
        title: '在连接界面配置网桥',
        desc: '打开软件，不要点直接连接。点击“配置连接” -> “网桥” -> 选择内置网桥（Snowflake/WebTunnel）或输入获取的私密网桥。'
      },
      {
        step: 3,
        title: '启动洋葱安全浏览',
        desc: '点击“连接”，Tor 浏览器会通过 3 个全球加密中继节点转发流量，安全接入自由互联网。'
      }
    ],
    detailedGuide: [
      {
        title: '小白防坑重点提醒',
        content: [
          '不要用 Tor 进行 BT 下载或大文件迅雷挂机，以免拖垮全球志愿节点带宽。',
          '不要随意在洋葱浏览器内安装第三方 Chrome/Firefox 插件，这可能导致浏览器指纹泄露。',
          'Tor 的主打优势是“绝对抗监控与高隐私”，因为流量经过 3 跳随机中继，网速会稍慢于商业专线，属于正常现象。'
        ],
        tips: [
          '大陆用户强烈推荐内置的 Snowflake（雪花网桥），利用 WebRTC 伪装成普通视频通话流量，抗封锁效果绝佳。'
        ]
      }
    ],
    contacts: [
      { type: 'website', label: 'Tor 官方中文网', value: 'https://www.torproject.org/zh-CN' },
      { type: 'telegram', label: 'Telegram 网桥机器人', value: 'https://t.me/GetBridgesBot' }
    ],
    speedRating: 'moderate',
    securityRating: '全球军工级匿名 / 3重节点中继'
  },
  {
    id: 'proton',
    name: 'Proton VPN',
    aliases: ['质子VPN', '瑞士安全VPN'],
    tagline: '瑞士顶尖加密巨头出品，免费无限制流量，严守瑞士隐私法',
    entityType: 'non-profit-supervised',
    entityLabel: '非盈利性机构监督',
    entityDescription: '源自欧洲核子研究中心（CERN）科学家的创想，由 Proton Foundation（瑞士非盈利基金会）监督治理。无商业资本裹挟，严格遵守中立瑞士联邦数据保护法。',
    available: true,
    status: 'available',
    statusText: '需切换 Stealth 协议',
    pricingModel: '免费版提供无限流量（单设备，分配日/美/荷节点）',
    platforms: ['android', 'ios', 'windows', 'macos', 'linux', 'browser'],
    officialUrl: 'https://protonvpn.com/',
    downloadLinks: [
      {
        label: 'Android GitHub 官方 Release',
        url: 'https://github.com/ProtonVPN/android-app/releases',
        platform: 'android',
        isDirect: true,
        note: '直接下载官方 APK 文件'
      },
      {
        label: 'Android F-Droid 开源版本',
        url: 'https://f-droid.org/en/packages/ch.protonvpn.android/',
        platform: 'android'
      },
      {
        label: 'Google Play 商店',
        url: 'https://play.google.com/store/apps/details?id=ch.protonvpn.android',
        platform: 'android'
      },
      {
        label: 'Apple App Store',
        url: 'https://apps.apple.com/us/app/proton-vpn-fast-secure/id1437005085',
        platform: 'ios'
      }
    ],
    quickStartSteps: [
      {
        step: 1,
        title: '注册 Proton 免费账号',
        desc: '前往 Proton 官网注册一个免费统一通行证（支持使用海外免费邮箱，亦支持 Proton 隐私邮箱）。'
      },
      {
        step: 2,
        title: '在设置中开启 Stealth 隐形协议',
        desc: '大陆网络直连前，必须在客户端“Settings -> Protocol”中，将协议切换为【Stealth】（隐形协议）或 WireGuard TCP。'
      },
      {
        step: 3,
        title: '点击快速连接 (Quick Connect)',
        desc: '点击一键连接，系统会自动分配负载最低的荷兰、日本或美国免费优质服务器。'
      }
    ],
    detailedGuide: [
      {
        title: '中国大陆使用秘诀',
        content: [
          '默认的 Smart Protocol 可能会尝试常规 WireGuard UDP，在中国大陆大概率会被运营商 QoS 丢包。',
          '一定要在客户端设置中将协议明确指定为【Stealth】。该协议专为绕过审查防火墙设计，会将 VPN 流量伪装成正常的 TLS 网页流量。',
          '免费版提供【无限流量】，不限使用时长，是全球极少真正不限速不限流的合规 VPN。'
        ],
        tips: [
          '如遇到连不上，可尝试断开后再次点击连接，Proton 会轮询换到另一个可用服务器。'
        ]
      }
    ],
    contacts: [
      { type: 'twitter', label: '官方 X (Twitter)', value: 'https://x.com/intent/user?screen_name=ProtonVPN' },
      { type: 'telegram', label: 'Telegram 官方频道', value: 'https://t.me/proton_privacy' },
      { type: 'youtube', label: 'YouTube 官方频道', value: 'https://www.youtube.com/@ProtonPrivacy' },
      { type: 'website', label: '官方网址', value: 'https://protonvpn.com/' }
    ],
    speedRating: 'high',
    securityRating: '瑞士隐私法管辖 / 独立第三方安全审计'
  },
  {
    id: 'opentunnel',
    name: 'OpenTunnel',
    aliases: ['OpenTunnel Proxy', 'OpenTunnel 扩展', '开源隧道'],
    tagline: '轻量浏览器代理扩展，支持一键连接、内置广告拦截与每日 5GB 免费额度',
    entityType: 'commercial',
    entityLabel: '商业机构',
    entityDescription: '提供轻量高效的浏览器代理扩展服务，支持 Chrome 及 Firefox 内核浏览器。提供每日 5GB 免费高速代理流量，同时提供每月仅需 7~8 元人民币的无限流量高品质付费 VIP 节点选项。',
    available: true,
    status: 'available',
    statusText: '每日5GB免费',
    badgeNote: '每日5GB免费',
    pricingModel: '每日 5GB 免费额度 / 付费 VIP 约 7~8 元人民币/月（无限流量）',
    platforms: ['browser'],
    officialUrl: 'https://client.opentunnel.net',
    downloadLinks: [
      {
        label: 'Chrome Web Store 官方扩展',
        url: 'https://chromewebstore.google.com/detail/opentunnel/polgppfbhllbdlbgcieoencmpdbnbjbd',
        platform: 'browser',
        note: '支持 Chrome、Edge、Brave 等 Chromium 内核浏览器'
      },
      {
        label: 'Firefox Add-ons 官方附加组件',
        url: 'https://addons.mozilla.org/en-US/firefox/addon/opentunnel/',
        platform: 'browser',
        note: '支持 Mozilla Firefox 浏览器'
      },
      {
        label: 'OpenTunnel 客户中心控制台',
        url: 'https://client.opentunnel.net',
        platform: 'browser',
        note: '注册登录以获取个人扩展认证令牌与管理节点套餐'
      }
    ],
    quickStartSteps: [
      {
        step: 1,
        title: '安装扩展程序',
        desc: '从 Chrome 网上应用店或 Firefox 附加组件商店安装 OpenTunnel 扩展程序。'
      },
      {
        step: 2,
        title: '粘贴认证令牌',
        desc: '点击浏览器工具栏中的 OpenTunnel 图标，粘贴您的扩展认证令牌，然后点击连接。'
      },
      {
        step: 3,
        title: '选择并浏览',
        desc: '选择任意高级 VIP 位置或免费公共节点，点击大电源按钮开启安全隧道。'
      }
    ],
    detailedGuide: [
      {
        title: '浏览器代理模式与每日 5GB 免费额度',
        content: [
          '无需安装系统底层驱动：OpenTunnel 以纯浏览器扩展形式运行，仅对浏览器内部发起的 HTTP/HTTPS/WebSocket 请求进行加密中继，不影响其他桌面软件与游戏的本地直连。',
          '每日免费 5GB 额度：用户绑定扩展认证令牌后，每日可免费使用 5GB 高速公用代理流量，完全满足学术文献查阅、技术文档搜索及社交媒体浏览需求。',
          '超低门槛付费 VIP 选项：针对有大流量视频串流或固定专用节点需求的用户，项目提供极具性价比的付费 VIP 升级选项，每月折合仅需 7~8 元人民币，不限流量。'
        ],
        tips: [
          '初次使用请先前往 client.opentunnel.net 获取您的专属认证令牌，将其复制并粘贴到扩展弹窗中即可激活。'
        ]
      },
      {
        title: '内置防护与实时监控功能',
        content: [
          '内置 AdBlock Shield 护盾：扩展集成了广告过滤与恶意追踪屏蔽模块，在加速浏览的同时减少网页无用资源的加载。',
          '实时带宽追踪：在扩展弹出面板中可实时查看当前连接节点的延迟与本日流量消耗情况。',
          '全球多节点切换：支持在免费公共节点与高品质 VIP 节点之间随意切换，遇到单点拥堵时可轻松切换至其他可用位置。'
        ]
      }
    ],
    contacts: [
      { type: 'website', label: 'OpenTunnel 客户控制台', value: 'https://client.opentunnel.net' },
      { type: 'website', label: '隐私政策声明', value: 'https://client.opentunnel.net/page/privacy-policy' },
      { type: 'website', label: '官方支持工单', value: 'https://client.opentunnel.net/support/create' }
    ],
    speedRating: 'high',
    securityRating: '浏览器沙箱隔离代理 / 实时流量加密'
  }
];
