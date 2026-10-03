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
    id: 'tor',
    name: 'Tor Browser',
    aliases: ['洋葱路由器', '暗网/隐私浏览器', 'Tor Project'],
    tagline: '全球最高级别匿名与反审查利器，三层跳板加密链路',
    entityType: 'non-profit',
    entityLabel: '非盈利性机构',
    entityDescription: '由美国 501(c)(3) 非盈利机构 The Tor Project 开发维护。由全球志愿者与人权组织捐助算力，专为保护言论自由、抵御监控而生。',
    status: 'needs-bridge',
    statusText: '国内需配置网桥',
    pricingModel: '100% 永久免费 / 全球志愿者资助',
    platforms: ['android', 'ios', 'windows', 'macos', 'linux', 'appletv'],
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
    id: 'vpn-configs-for-russia',
    name: 'VPN-Configs-for-Russia',
    aliases: ['俄罗斯抗封锁免费配置', '开源订阅黑名单', 'igareck'],
    tagline: '全自动测速检测的抗封锁节点合集，非俄用户（中国/伊朗等）专享黑名单高速订阅',
    entityType: 'self-organized',
    entityLabel: '自组织开源项目',
    entityDescription: '由开发者 igareck 维护的公共且免费的 VPN 配置自动化合集。系统每 2-4 小时在海外服务器上全自动测试节点的实际可达性、延迟与真实测速，自动过滤失效节点。代码与订阅全开源，包含 GitLab、Codeberg 等多重分布式镜像。',
    status: 'available',
    statusText: '自动测试更新',
    pricingModel: '100% 永久免费 / 全自动开源订阅',
    platforms: ['android', 'ios', 'windows', 'macos', 'linux'],
    officialUrl: 'https://github.com/igareck/vpn-configs-for-russia/blob/main/README-ZH-CN.md',
    downloadLinks: [
      {
        label: 'BLACK_SS+All_RUS 通用全套订阅',
        url: 'https://raw.githack.com/igareck/vpn-configs-for-russia/main/BLACK_SS%2BAll_RUS.txt',
        platform: 'windows',
        isDirect: true,
        note: '非俄/中国用户首选全套配置，白天抗封锁效果最佳，支持 v2rayN 等'
      },
      {
        label: 'BLACK_VLESS_RUS 高速订阅',
        url: 'https://raw.githack.com/igareck/vpn-configs-for-russia/main/BLACK_VLESS_RUS.txt',
        platform: 'android',
        isDirect: true,
        note: '高速 VLESS 节点订阅，自动过滤失效节点，支持 v2rayNG / Karing 等'
      },
      {
        label: 'BLACK_VLESS_RUS_mobile 移动轻量订阅',
        url: 'https://raw.githack.com/igareck/vpn-configs-for-russia/main/BLACK_VLESS_RUS_mobile.txt',
        platform: 'ios',
        isDirect: true,
        note: '专为手机移动网络优化的轻量 VLESS 订阅，适合 Streisand、Happ 等'
      },
      {
        label: 'BLACK_SS+All_RUS Clash 规则订阅',
        url: 'https://raw.githack.com/igareck/vpn-configs-for-russia/main/Export/Clash/GLOBAL/BLACK_SS%2BAll_RUS_clash_global.yaml',
        platform: 'macos',
        isDirect: true,
        note: 'Clash Verge / Clash Mi 专用的完整规则配置订阅'
      }
    ],
    mirrors: [
      {
        name: 'GitLab',
        url: 'https://gitlab.com/igareck/vpn-configs-for-russia/',
        description: 'Git 镜像 / 开放核心 SaaS（所有镜像中体验最佳，国内常年稳定直连）'
      },
      {
        name: 'Codeberg',
        url: 'https://codeberg.org/igareck/vpn-configs-for-russia',
        description: 'Git 镜像 / FOSS 自由开源软件代码托管'
      },
      {
        name: 'Gitea',
        url: 'https://gitea.com/igareck/vpn-configs-for-russia',
        description: 'Git 镜像 / 基于 FOSS 的独立 Git 代码托管平台'
      },
      {
        name: 'SourceHut',
        url: 'https://git.sr.ht/~igareck/vpn-configs-for-russia',
        description: 'Git 镜像 / FOSS 极简纯粹开源平台'
      },
      {
        name: 'Bitbucket',
        url: 'https://bitbucket.org/igareck/vpn-configs-for-russia/',
        description: 'Git 镜像 / 商业托管平台备用副本'
      },
      {
        name: 'GitHack',
        url: 'https://raw.githack.com/',
        description: '实时 RAW 代理加速，防止 IP/区域访问受限'
      },
      {
        name: 'Yandex+BB',
        url: 'https://translate.yandex.ru/translate?url=https://bitbucket.org/igareck/vpn-configs-for-russia/raw/main/WHITE-CIDR-RU-all.txt&lang=de-de',
        description: '白名单 RAW 代理 Yandex+Bitbucket，网络封锁最极端情况下的备用手段'
      }
    ],
    quickStartSteps: [
      {
        step: 1,
        title: '复制“黑名单”订阅链接',
        desc: '中国大陆等非俄罗斯用户请务必使用“黑名单”！直接复制上方 BLACK_SS+All_RUS.txt 或 BLACK_VLESS_RUS.txt 链接。'
      },
      {
        step: 2,
        title: '导入通用代理客户端',
        desc: '打开支持 VLESS/SS 的客户端（如 Clash Verge Rev、v2rayN、Sing-box、Streisand、Happ 等），添加此订阅链接并更新节点。'
      },
      {
        step: 3,
        title: '测速并开启代理',
        desc: '在客户端中运行延迟测速，选中延迟最低的绿色可用节点，开启系统代理即可畅游网络。'
      }
    ],
    detailedGuide: [
      {
        title: '🔴 非俄罗斯用户（中国/伊朗等）核心注意事项',
        content: [
          '❗ 关键使用限制：如果你不在俄罗斯（中国、伊朗或任何其他国家），请只使用“黑名单”（"BLACK_SS+All_RUS.txt"、"BLACK_VLESS_RUS.txt" 和 "BLACK_VLESS_RUS_mobile.txt"）中的配置！',
          '为什么千万不要用“白名单”？“白名单”（WHITE）仅用于绕过俄罗斯境内特定且最严苛的封锁（如仅放行俄国内部域名）。对中国等其他国家用户而言，白名单几乎不可用、极慢且完全没有意义。',
          '“黑名单”（BLACK LIST）是“国际通用的 VPN 方案”，包含互联网上可获得的最高速公共测试节点。',
          '全自动健康检查：所有配置每 2–4 小时在海外服务器自动检测实际可达性、延迟和测速，低质与失效节点全自动剔除。'
        ],
        tips: [
          '建议使用带有自动健康检查功能的客户端（如 Clash Verge Rev、v2rayN、Sing-box、Happ、Streisand）。',
          '如果原始 GitHub 链接在本地打不开，可随时使用本页提供的 GitLab、Codeberg 镜像或 GitHack 代理链接下载配置。'
        ]
      }
    ],
    contacts: [
      { type: 'telegram', label: 'Telegram 官方频道', value: 'https://t.me/igareq' },
      { type: 'github', label: 'GitHub 源码主页', value: 'https://github.com/igareck/vpn-configs-for-russia' },
      { type: 'email', label: '开发者联系邮箱', value: 'igareck@proton.me' }
    ],
    speedRating: 'high',
    securityRating: '自动化开源测速 / 订阅聚合'
  },
  {
    id: 'proton',
    name: 'Proton VPN',
    aliases: ['质子VPN', '瑞士安全VPN'],
    tagline: '瑞士顶尖加密巨头出品，免费无限制流量，严守瑞士隐私法',
    entityType: 'non-profit-supervised',
    entityLabel: '非盈利性机构监督',
    entityDescription: '源自欧洲核子研究中心（CERN）科学家的创想，由 Proton Foundation（瑞士非盈利基金会）监督治理。无商业资本裹挟，严格遵守中立瑞士联邦数据保护法。',
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
    id: 'geph',
    name: '迷雾通 Geph',
    aliases: ['Geph VPN', 'EmberSky'],
    tagline: '自主研发超强抗封锁协议，免配置、专为严苛网络审查而生',
    entityType: 'commercial',
    entityLabel: '盈利性机构',
    entityDescription: '由海外知名安全学者与隐私黑客创办的商业化抗审查实体。开发了独立的抗封锁传输层协议（Sosistab），免费层供大众公益使用，付费层补贴服务器。',
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
    id: 'beepass',
    name: 'BeePass VPN',
    aliases: ['蜜蜂VPN', '伊朗自由梯子'],
    tagline: '基于 Shadowsocks 架构，专为受限地区人民研发的抗封锁工具',
    entityType: 'self-organized',
    entityLabel: '自组织机构',
    entityDescription: '由民间自组织机构发起成立，主要为伊朗等遭受严重断网与网络审查地区的公民提供数字人权援助。',
    status: 'unavailable',
    statusText: '目前不可用',
    statusNote: '⚠️ 目前不可用：主要帮助伊朗人民突破网络封锁，由于网络环境差异，中国大陆地区当前暂无法直接连接。开发团队正在研发加入更多混淆协议，中国地区后续有望恢复使用，当前仅作技术备用观察。',
    pricingModel: '100% 永久免费 / 民间公益',
    platforms: ['android', 'ios'],
    officialUrl: 'https://beepassvpn.com/en/',
    downloadLinks: [
      {
        label: 'Google Play 商店',
        url: 'https://play.google.com/store/apps/details?id=com.beepassvpn.free.vpn.secure',
        platform: 'android',
        note: '当前暂不推荐中国大陆用户下载'
      },
      {
        label: 'Apple App Store',
        url: 'https://apps.apple.com/us/app/beepass-vpn/id1556325746',
        platform: 'ios'
      },
      {
        label: 'BeePass 官方电报节点机器人',
        url: 'https://telegram.me/beepassvpn_bot',
        platform: 'browser',
        note: '官方 Telegram 节点获取机器人'
      }
    ],
    quickStartSteps: [
      {
        step: 1,
        title: '状态警示：中国地区暂不可用',
        desc: '该工具当前服务器主要位于伊朗周边及欧美，目前未针对中国大陆 GFW 进行混淆改造，因此无法直接连通。'
      },
      {
        step: 2,
        title: '关注协议升级动态',
        desc: '关注官方 Telegram 频道或机器人，一旦新版加入 V2Ray / Reality 等防封锁协议，即可在中国大陆重新启用。'
      },
      {
        step: 3,
        title: '优先使用本站其他可用工具',
        desc: '请优先选择本站前 8 款已验证可用工具（如 OpenRung、NthLink、Tor、Proton VPN 或迷雾通）。'
      }
    ],
    detailedGuide: [
      {
        title: '背景介绍与技术演进',
        content: [
          'BeePass 是一个极其受尊敬的民间反审查项目，在伊朗历次断网事件中为数百万民众提供了宝贵的通讯通道。',
          '其底层采用 Shadowsocks 及其衍生协议，易用性强，界面简洁，受到国际数字自由联盟的广泛关注。',
          '中国大陆地区由于防火墙对原版 Shadowsocks 特征进行了深度识别，因此需等待团队发布带有深度混淆的更新版本。'
        ]
      }
    ],
    contacts: [
      { type: 'telegram', label: 'Telegram 节点机器人', value: 'https://telegram.me/beepassvpn_bot' },
      { type: 'website', label: 'BeePass 官网', value: 'https://beepassvpn.com/en/' }
    ],
    speedRating: 'moderate',
    securityRating: 'Shadowsocks 加密 / 开源民间支持'
  }
];
