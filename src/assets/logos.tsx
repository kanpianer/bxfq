import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

// 1. OpenRung: 官方纯矢量徽标 (来自 openrung.org / openrung-mark.svg)
export const OpenRungLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 256 256" 
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    aria-label="OpenRung Logo"
    className={className}
  >
    <rect width="256" height="256" rx="58" fill="#1d8a4f" />
    <g fill="#ffffff" transform="rotate(18 128 128)">
      <rect x="101" y="52" width="13" height="38" rx="3" />
      <rect x="101" y="94" width="13" height="47" rx="3" />
      <rect x="101" y="145" width="13" height="59" rx="3" />
      <rect x="142" y="52" width="13" height="38" rx="3" />
      <rect x="142" y="94" width="13" height="47" rx="3" />
      <rect x="142" y="145" width="13" height="59" rx="3" />
      <rect x="101" y="60" width="54" height="13" rx="3" />
      <rect x="101" y="111" width="54" height="13" rx="3" />
      <rect x="101" y="162" width="54" height="13" rx="3" />
    </g>
  </svg>
);

// 2. FreeSocks: 官方纯矢量八角星徽标 (来自 freesocks.org / favicon.svg)
export const FreeSocksLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    aria-label="FreeSocks Logo"
    className={className}
  >
    <rect x="1" y="1" width="30" height="30" rx="7" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
    <g transform="translate(16 16) scale(1.15) translate(-12 -12)">
      <path
        d="M12 2l1.53 6.3 5.54-3.37-3.37 5.54L22 12l-6.3 1.53 3.37 5.54-5.54-3.37L12 22l-1.53-6.3-5.54 3.37 3.37-5.54L2 12l6.3-1.53L4.93 4.93l5.54 3.37L12 2Z"
        fill="#fafafa"
      />
    </g>
  </svg>
);

// 3. NthLink: 官方纯矢量双环链接徽标 (来自 nthlink.com 官网顶栏母版)
export const NthLinkLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 50" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    aria-label="NthLink Logo"
    className={className}
  >
    <rect width="64" height="50" rx="12" fill="#0b1728" />
    <g transform="translate(0, 0)">
      <path
        fill="#38bdf8"
        fillRule="evenodd"
        clipRule="evenodd"
        d="m48.8 11.47-.32 2.87c0 .34.17.52.52.26l11.3-7.42c.26-.26.18-.52-.17-.52H49.34c-3.45.08-8.28.86-8.28 8.11l.08 16.4c0 3.2-1.81 5.18-4.75 5.18-3.19 0-4.91-1.81-4.91-5.18V16.4c0-1.81-.87-2.93-2.34-2.93-1.46 0-2.33 1.12-2.33 3.02v14.67c0 5.87 3.72 9.92 9.5 9.92 5.78 0 9.5-4.05 9.5-9.92l-.1-14.33c0-3.03-.07-4.9 3.1-5.37Z"
      />
      <path
        fill="#2563eb"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.11 41.18c3.45-.09 8.29-.86 8.29-8.11l-.09-16.4c0-3.2 1.81-5.18 4.75-5.18 3.2 0 4.92 1.81 4.92 5.18v14.76c0 1.81.86 2.93 2.33 2.93 1.47 0 2.33-1.12 2.33-3.02V16.67c0-5.87-3.71-9.93-9.5-9.93-5.78 0-9.49 4.06-9.49 9.93L19.74 31c0 3.03.07 4.9-3.09 5.37l.33-2.87c0-.35-.18-.52-.52-.26l-11.3 7.42c-.27.26-.18.52.16.52h10.8Z"
      />
    </g>
  </svg>
);

// 4. Tor Browser: 官方洋葱徽标 (来自 The Tor Project / Wikimedia Commons 官方母版)
export const TorLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 512 512" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink"
    role="img" 
    aria-label="Tor Browser Logo"
    className={className}
  >
    <defs>
      <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="torGrad">
        <stop stopColor="#420C5D" offset="0%" />
        <stop stopColor="#951AD1" offset="100%" />
      </linearGradient>
      <path d="M25,29 C152.577777,29 256,131.974508 256,259 C256,386.025492 152.577777,489 25,489 L25,29 Z" id="torHalfPath" />
    </defs>
    <circle fill="#F2E4FF" cx="256" cy="256" r="246" />
    <path
      d="M256.5 465.4 L256.5 434.4 C354.8 434.1 434.4 354.4 434.4 256 C434.4 157.6 354.8 77.9 256.5 77.6 L256.5 46.6 C372 46.8 465.4 140.5 465.4 256 C465.4 371.5 372 465.2 256.5 465.4 Z M256.5 356.8 C312 356.5 356.8 311.5 356.8 256 C356.8 200.5 312 155.5 256.5 155.2 L256.5 124.1 C329.1 124.4 387.9 183.3 387.9 256 C387.9 328.7 329.1 387.6 256.5 387.8 L256.5 356.8 Z M256.5 201.7 C286.3 202 310.3 226.2 310.3 256 C310.3 285.8 286.3 310 256.5 310.3 L256.5 201.7 Z M0 256 C0 397.4 114.6 512 256 512 C397.4 512 512 397.4 512 256 C512 114.6 397.4 0 256 0 C114.6 0 0 114.6 0 256 Z"
      fill="url(#torGrad)"
    />
    <g transform="translate(140.5, 259) scale(-1, 1) translate(-140.5, -259)">
      <use fill="url(#torGrad)" xlinkHref="#torHalfPath" />
    </g>
  </svg>
);

// 5. Proton VPN: 官方三棱镜徽标 (来自 proton.me 官方品牌矢量规范)
export const ProtonLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 106 116" 
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    aria-label="Proton VPN Logo"
    className={className}
  >
    <defs>
      <linearGradient id="protonGrad0" x1="95.85" y1="110.32" x2="27.65" y2="-7.3" gradientUnits="userSpaceOnUse">
        <stop offset="0.066" stopColor="#8EFFEE" />
        <stop offset="0.45" stopColor="#C9C7FF" />
        <stop offset="1" stopColor="#7341FF" />
      </linearGradient>
      <linearGradient id="protonGrad1" x1="102.09" y1="-85.02" x2="6.58" y2="119.27" gradientUnits="userSpaceOnUse">
        <stop offset="0.48" stopColor="#6D4AFF" />
        <stop offset="0.99" stopColor="#00F0C3" />
      </linearGradient>
    </defs>
    <g transform="translate(0, -10)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m 42.5777,110.323 c 4.0286,7.242 14.3739,7.634 18.9477,0.718 L 104.173,46.5529 c 4.522,-6.8387 0.195,-16.0076 -7.9946,-16.9394 L 12.3538,20.0757 C 3.41684,19.0589 -2.94633,28.4823 1.40053,36.2969 Z"
        fill="url(#protonGrad0)"
      />
      <path
        d="M 44.9795,103.568 48.7644,97.9224 77.514,54.4946 c 2.5136,-3.7969 0.1144,-8.8904 -4.4335,-9.4125 L 1.73145,36.8906 38.6923,103.337 c 1.3489,2.378 4.7596,2.509 6.2872,0.231 z"
        fill="url(#protonGrad1)"
      />
    </g>
  </svg>
);

// 6. 迷雾通 Geph: 官方三重同轴光环 (来自 geph.io 官网及 geph-design/logo.svg)
export const GephLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    aria-label="迷雾通 Geph Logo"
    className={className}
  >
    {/* 外圈深青色 */}
    <circle cx="32" cy="32" r="30" fill="#172b2a" />
    {/* 中圈湖水绿 */}
    <circle cx="32" cy="24" r="21.5" fill="#5ec4c4" />
    {/* 内圈薄荷青 */}
    <circle cx="32" cy="17" r="14.2" fill="#b9e7e7" />
  </svg>
);

// 7. 1.1.1.1 (Cloudflare WARP): 官方完整渐变圆角图标 (来自 one.one.one.one 官网母版)
export const WarpLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 466 466" 
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    aria-label="1.1.1.1 Logo"
    className={className}
  >
    <defs>
      <clipPath id="warpClip">
        <rect width="465.4" height="465.4" x=".85" y=".65" rx="104.5" fill="none" />
      </clipPath>
      <linearGradient id="warpGrad0" x1="-1946.56" x2="-1218.16" y1="-5061.71" y2="-5061.71" gradientTransform="rotate(-90 1978.4 -3270.79)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ef6876" />
        <stop offset=".28" stopColor="#ef6974" />
        <stop offset=".4" stopColor="#f06c6d" />
        <stop offset=".48" stopColor="#f17261" />
        <stop offset=".56" stopColor="#f37b4f" />
        <stop offset=".62" stopColor="#f58638" />
        <stop offset=".67" stopColor="#f7931e" />
        <stop offset=".99" stopColor="#f6925b" />
      </linearGradient>
      <linearGradient id="warpGrad2" x1="42.16" x2="486.65" y1="773.41" y2="3.53" gradientTransform="rotate(180 274.4 339.58)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fcee21" />
        <stop offset=".88" stopColor="#f48120" />
      </linearGradient>
      <linearGradient id="warpGrad4" x1="101.89" x2="635.43" y1="523.23" y2="523.23" gradientTransform="rotate(180 274.4 339.58)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#29b473" />
        <stop offset=".64" stopColor="#00adee" />
        <stop offset=".78" stopColor="#738cc8" />
        <stop offset="1" stopColor="#ba78b1" />
      </linearGradient>
      <linearGradient id="warpGrad6" x1="138.4" x2="548.4" y1="663.76" y2="663.76" gradientTransform="rotate(180 274.4 339.58)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#00adee" />
        <stop offset=".46" stopColor="#1f59af" />
        <stop offset="1" stopColor="#2e3191" />
      </linearGradient>
    </defs>
    <g clipPath="url(#warpClip)">
      <path fill="url(#warpGrad0)" d="M187.75-74.23C490-74.23 735 88.83 735 290S490 654.2 187.8 654.2s-561.38-.31-547.19-364.2C-347.6-14-114.46-74.23 187.75-74.23z" />
      <path fill="url(#warpGrad2)" d="M262.4 618C698.17 434.44 636.4 37.3 607.12-8.89c-86.53-136.56-379.31-160.2-386.21-147.78-4.79 8.63 40.65 12 142.49 82.84 115.29 80.21 275 393-242 562C71.59 504.45-18.6 524-70.6 599" />
      <path fill="url(#warpGrad4)" d="M-86.62 69.47C-86.62-42.9 76.36-51 179.2-51s286.19-44.38 266.2 66.2c-45 249-194.65 409-266.2 340.74C69.09 250.88-86.62 181.84-86.62 69.47z" />
      <path fill="url(#warpGrad6)" d="M-35.6-2.83c0-112.37,169.31-87.41,252.93-87.41S431.4-85.2,431.4,27.17s-125.38,249-209,249S-35.6,109.54-35.6-2.83Z" />
    </g>
    {/* 1.1.1.1 专属纯白立体数字印标 */}
    <path
      d="M130.4 190.5V152q27.66-1.2 38.73-3.57 17.64-3.78 28.7-15.09 7.57-7.74 11.48-20.65 2.25-7.74 2.25-11.51h48.91V389h-60V190.5zM285.54 167.13v-18.7l43.72-58.68h18.27v60.55h13.37v16.83h-13.37v23.3h-19.42v-23.3zm42.14-51.78l-26 35h26.46v-35z"
      fill="#ffffff"
    />
  </svg>
);

// 8. Cloudflare One: 官方客户端专属盾牌与路由箭头徽标 (来自 Apple App Store 官方母版)
export const CloudflareOneLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 512 512" 
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    aria-label="Cloudflare One Logo"
    className={className}
  >
    <defs>
      <linearGradient id="cfOneBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#155dfc" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
      <linearGradient id="cfShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
    </defs>
    {/* 宝石蓝背景圆角矩形 */}
    <rect width="512" height="512" rx="115" fill="url(#cfOneBg)" />
    {/* 橙色安全护盾 */}
    <path
      d="M256 96 C290 148 350 156 380 158 V295 C380 376 295 418 256 430 C217 418 132 376 132 295 V158 C162 156 222 148 256 96 Z"
      fill="url(#cfShieldGrad)"
    />
    {/* 护盾中央白色交通分流交叉路由箭头 */}
    <path
      d="M132 258 H212 C228 258 228 242 228 226 V128 H244 V226 C244 258 244 258 276 258 H322 L296 232 L308 220 L354 266 L308 312 L296 300 L322 274 H276 C244 274 244 274 244 306 V410 H228 V306 C228 290 228 274 212 274 H132 V258 Z"
      fill="#ffffff"
    />
  </svg>
);

// 9. BeePass VPN: 官方蜜蜂护盾徽标 (来自 ASL-19/beepassvpn-client 官方仓库母版)
export const BeePassLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 1024 1024" 
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    aria-label="BeePass VPN Logo"
    className={className}
  >
    <g transform="translate(0, 0)">
      {/* 顶部矢车菊蓝护盾皇冠 */}
      <path
        d="M182 228 C300 286 420 304 512 128 C604 304 724 286 842 228 V372 C740 310 620 300 512 300 C404 300 284 310 182 372 Z"
        fill="#4d62e5"
      />
      {/* 下方蜜蜂条纹护盾主体 */}
      <path
        d="M195 450 C300 395 410 380 512 380 C614 380 724 395 829 450 C800 520 780 560 756 610 C680 565 590 550 512 550 C434 550 344 565 268 610 C244 560 224 520 195 450 Z"
        fill="#000000"
      />
      <path
        d="M230 562 C320 515 410 500 512 500 C614 500 704 515 794 562 C760 635 730 685 696 738 C636 705 570 690 512 690 C454 690 388 705 328 738 C294 685 264 635 230 562 Z"
        fill="#fed736"
      />
      <path
        d="M280 660 C356 620 430 610 512 610 C594 610 668 620 744 660 C700 740 655 795 610 848 C575 832 540 825 512 825 C484 825 449 832 414 848 C369 795 324 740 280 660 Z"
        fill="#000000"
      />
      <path
        d="M352 755 C405 730 455 725 512 725 C569 725 619 730 672 755 C635 808 585 855 512 895 C439 855 389 808 352 755 Z"
        fill="#fed736"
      />
    </g>
  </svg>
);

// 10. VPN-Configs-for-Russia: 纯矢量高精度网络节点与反审查盾牌徽标
export const VPNConfigsForRussiaLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="VPN-Configs-for-Russia Logo"
    className={className}
  >
    <rect width="256" height="256" rx="58" fill="#0f172a" stroke="#334155" strokeWidth="6" />
    {/* Outer Shield Outline */}
    <path
      d="M128 38 L204 68 C204 150 168 196 128 222 C88 196 52 150 52 68 Z"
      fill="#1e293b"
      stroke="#38bdf8"
      strokeWidth="6"
      strokeLinejoin="round"
    />
    {/* Network Routing Nodes & Interconnect Lines */}
    <path
      d="M128 72 L88 116 L128 156 L168 116 Z"
      fill="none"
      stroke="#ffffff"
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <line x1="128" y1="72" x2="128" y2="156" stroke="#38bdf8" strokeWidth="4" strokeDasharray="3 3" />
    <line x1="88" y1="116" x2="168" y2="116" stroke="#38bdf8" strokeWidth="4" strokeDasharray="3 3" />
    <circle cx="128" cy="72" r="7" fill="#38bdf8" />
    <circle cx="88" cy="116" r="7" fill="#38bdf8" />
    <circle cx="168" cy="116" r="7" fill="#38bdf8" />
    <circle cx="128" cy="156" r="7" fill="#38bdf8" />
    {/* Center bypass core */}
    <circle cx="128" cy="116" r="5" fill="#f43f5e" />
  </svg>
);

export const ToolLogoMap: Record<string, React.FC<LogoProps>> = {
  openrung: OpenRungLogo,
  freesocks: FreeSocksLogo,
  nthlink: NthLinkLogo,
  tor: TorLogo,
  proton: ProtonLogo,
  geph: GephLogo,
  warp: WarpLogo,
  'cloudflare-one': CloudflareOneLogo,
  beepass: BeePassLogo,
  'vpn-configs-for-russia': VPNConfigsForRussiaLogo,
};
