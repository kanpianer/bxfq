import React from 'react';
import mahsanetImg from './mahsanet.png';
import openTunnelImg from './opentunnel.png';

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

// 10. Ceno: 官方纯矢量徽标 (来自 ceno.app 官方母版)
export const CenoLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    aria-label="Ceno Logo"
    className={className}
  >
    <defs>
      <clipPath id="cenoCircleClip">
        <circle cx="50" cy="50" r="49.5" />
      </clipPath>
    </defs>
    {/* 外圈 C 弧线主体 (青天蓝) */}
    <path
      d="M 93.0 25.5 A 49.5 49.5 0 1 0 93.0 74.5 L 72.4 74.5 A 33.2 33.2 0 1 1 72.4 25.5 Z"
      fill="#0ea5e9"
    />
    {/* 上方青天蓝水平数据条 */}
    <path
      d="M 59.5 33.7 H 100 V 46.2 H 59.5 Z"
      clipPath="url(#cenoCircleClip)"
      fill="#0ea5e9"
    />
    {/* 下方亮橙色水平数据条 */}
    <path
      d="M 59.5 53.8 H 100 V 66.3 H 59.5 Z"
      clipPath="url(#cenoCircleClip)"
      fill="#ea580c"
    />
  </svg>
);

// 11. 蓝灯 (Lantern): 官方天蓝圆环底色与明黄手提灯笼矢量标 (来自 lantern.io 官方母版)
export const LanternLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    aria-label="Lantern Logo"
    className={className}
  >
    {/* 青蓝圆形背景底板 */}
    <circle cx="20" cy="20" r="20" fill="#00BCD4" />
    {/* 明黄灯光辐射内部主体 */}
    <path 
      d="M27.8828 14.9744L28.0371 11.8838L24.1222 10.1844L24.2261 8.02106L22.1804 6.88496C22.3777 6.49907 22.4713 6.06852 22.452 5.63557C22.4327 5.20261 22.3012 4.78212 22.0703 4.41534C21.8395 4.04856 21.5171 3.74809 21.1351 3.54342C20.7531 3.33874 20.3245 3.23691 19.8912 3.24787C19.458 3.25883 19.035 3.38221 18.6639 3.60594C18.2927 3.82967 17.9861 4.14606 17.7741 4.52405C17.5621 4.90203 17.452 5.32863 17.4546 5.76201C17.4572 6.19539 17.5724 6.62065 17.7889 6.99607L15.7266 8.17439C15.7266 8.17439 15.9749 10.2361 15.9172 10.27C15.7433 10.3694 11.9666 11.6772 11.9666 11.6772L12.3138 14.9755L12.3389 14.9699C12.45 16.1288 14.1233 32.7889 18.1322 34.8761C18.2243 34.9383 18.326 34.9848 18.4333 35.0138V35.0094L19.2499 35.3939L20.0022 35.7827L21.7799 35.0288L21.8738 34.9849C21.9845 34.9298 22.0906 34.8659 22.191 34.7938C26.2288 32.286 27.8427 14.9755 27.8427 14.9755L22.525 13.9527V13.9455L27.8828 14.9744ZM19.9544 3.77328C20.2918 3.77244 20.6238 3.85793 20.9188 4.02163C21.2138 4.18532 21.4619 4.42176 21.6397 4.70848C21.8175 4.99519 21.919 5.32263 21.9345 5.65964C21.95 5.99665 21.879 6.332 21.7282 6.63383L20.0533 5.70328L18.2377 6.74051C18.0636 6.43958 17.972 6.09806 17.972 5.75041C17.972 5.40277 18.0638 5.06127 18.2378 4.76036C18.4119 4.45944 18.6622 4.20974 18.9636 4.03644C19.265 3.86315 19.6068 3.77238 19.9544 3.77328Z" 
      fill="#FEE600"
    />
    {/* 深蓝墨绿手提骨架 */}
    <path 
      d="M24.12 10.1866L24.2239 8.02329L22.1783 6.88715C22.3755 6.50126 22.4691 6.07075 22.4498 5.6378C22.4305 5.20484 22.2988 4.78435 22.068 4.41757C21.8371 4.05079 21.5149 3.75032 21.1329 3.54565C20.7509 3.34097 20.3223 3.23911 19.889 3.25007C19.4558 3.26103 19.0328 3.38444 18.6617 3.60817C18.2905 3.8319 17.9838 4.14826 17.7718 4.52624C17.5598 4.90423 17.4496 5.33083 17.4522 5.76421C17.4548 6.19758 17.57 6.62285 17.7866 6.99827L15.7244 8.17662C15.7244 8.17662 15.9727 10.2383 15.915 10.2722C15.7411 10.3716 11.9644 11.6794 11.9644 11.6794L12.3116 14.9777C13.6382 14.6938 17.3611 13.9494 17.3778 13.9672C17.4073 14.0052 17.4237 14.0518 17.4244 14.0999C17.4594 14.8549 18.4028 34.9605 18.4028 34.9605V34.9983L19.2477 35.396L20 35.785L21.7777 35.031L22.5238 13.9461L27.8804 14.976L28.0349 11.8855L24.12 10.1866ZM17.9699 5.75661C17.9692 5.45745 18.0361 5.16199 18.1658 4.89239C18.2955 4.62278 18.4843 4.38602 18.7185 4.19984C18.9527 4.01367 19.226 3.88292 19.5179 3.81739C19.8098 3.75185 20.1127 3.75322 20.404 3.82142C20.6953 3.88962 20.9673 4.0229 21.1998 4.2112C21.4323 4.39951 21.6191 4.63799 21.7463 4.90877C21.8734 5.17955 21.9378 5.47558 21.9342 5.77472C21.9307 6.07386 21.8596 6.36834 21.726 6.63606L20.051 5.70551L18.2355 6.74274C18.0613 6.44252 17.9696 6.10149 17.9699 5.75437V5.75661Z" 
      fill="#012D2D"
    />
  </svg>
);

export const MahsaNetLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <img
    src={mahsanetImg}
    width={size}
    height={size}
    alt="MahsaNet Logo"
    className={`rounded-xl object-contain ${className}`}
  />
);

// 13. FreeBrowser (自由浏览): 官方纯矢量徽标 (来自 freebrowser.org 官方母版)
export const FreeBrowserLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 120 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    aria-label="FreeBrowser Logo"
    className={className}
  >
    <circle cx="60" cy="60" r="60" fill="#FD2D57" />
    <path 
      d="M33.794 42.2C41.192 32.436 54.992 29 60.49 29h29.492s1 0 1 .996.5 6.973-3.75 13.947c-2.88 4.726-8.7 8.716-12.7 9.214-3.198.399-10.792.25-14.541.25-1.5 0-4 .995-5 2.49-.999 1.494-1.249 3.486 0 3.486h18.246s1 0 1 .996c0 .997-.19 5.728-5.249 11.954-2.403 2.959-8.748 4.483-12.496 4.483h-6.499c-.583 0-1.85.299-2.25 1.494-.332 1.495-.649 5.38.75 8.966 1.4 3.586 2.333 5.396 2.75 5.977.357.498.75.747-.25.747-1.205 0-7.498-.747-12.746-3.985-5.43-3.35-10.166-10.503-11.45-17.93-1.25-7.223-2.25-17.683 6.997-29.886Z" 
      fill="#fff"
    />
  </svg>
);

// 14. OpenTunnel: 官方火箭徽标
export const OpenTunnelLogo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <img
    src={openTunnelImg}
    width={size}
    height={size}
    alt="OpenTunnel Logo"
    className={`rounded-xl object-contain ${className}`}
  />
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
  ceno: CenoLogo,
  lantern: LanternLogo,
  mahsanet: MahsaNetLogo,
  freebrowser: FreeBrowserLogo,
  opentunnel: OpenTunnelLogo,
};

