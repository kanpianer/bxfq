import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import type { VPNTool } from '../types';
import { ToolLogoMap } from '../assets/logos';

interface ToolLogoProps {
  tool: VPNTool;
  className?: string;
  /** 自定义 Logo 加载失败或未设置时使用的内置图标，默认为盾牌 */
  Fallback?: React.FC<{ className?: string }>;
}

/**
 * 统一的项目 Logo 渲染：
 * 1. 优先使用 CMS 中配置的自定义 Logo（tool.logo，URL 或 data URL）；
 * 2. 回退到代码内置的 ToolLogoMap[tool.id]；
 * 3. 再回退到通用盾牌图标（或调用方指定的 Fallback）。
 * 自定义 Logo 加载失败时自动回退到内置图标。
 */
export const ToolLogo: React.FC<ToolLogoProps> = ({ tool, className = 'h-7 w-7', Fallback }) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [tool.logo]);

  const FallbackIcon = Fallback || Shield;

  if (tool.logo && !failed) {
    return (
      <img
        src={tool.logo}
        alt={`${tool.name} Logo`}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`rounded object-contain ${className}`}
      />
    );
  }

  const BuiltinLogo = ToolLogoMap[tool.id];
  if (BuiltinLogo) {
    return <BuiltinLogo className={className} />;
  }
  return <FallbackIcon className={className} />;
};
