import React from 'react';
import { X } from 'lucide-react';
import type { ToolVisibility } from '../types';

export const inputClass =
  'w-full rounded-lg border border-obsidian-800 bg-obsidian-950/70 px-3 py-2 text-sm text-obsidian-100 placeholder:text-obsidian-500 transition-colors focus:border-obsidian-600 focus:outline-none focus:ring-1 focus:ring-white/10';

export const textareaClass = `${inputClass} min-h-[84px] leading-relaxed resize-y font-sans`;

export const selectClass = `${inputClass} appearance-none cursor-pointer`;

export const labelClass = 'block text-[11px] font-mono uppercase tracking-wider text-obsidian-400 mb-1.5';

export const VISIBILITY_META: Record<
  ToolVisibility,
  { label: string; short: string; description: string; badgeClass: string; dotClass: string }
> = {
  visible: {
    label: '可见',
    short: '可见',
    description: '在网站首页正常展示',
    badgeClass: 'border-white/20 bg-white/5 text-white',
    dotClass: 'bg-white',
  },
  unavailable: {
    label: '暂不可用',
    short: '暂不可用',
    description: '灰色置灰展示，仍可打开详情查看原因',
    badgeClass: 'border-neutral-700/60 bg-neutral-800/80 text-neutral-300',
    dotClass: 'bg-neutral-400',
  },
  hidden: {
    label: '隐藏',
    short: '隐藏',
    description: '不在网站中展示，直达链接也会失效',
    badgeClass: 'border-obsidian-700 bg-obsidian-850 text-obsidian-400',
    dotClass: 'bg-obsidian-500',
  },
};

interface FieldProps {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({ label, hint, className = '', children }) => (
  <label className={`block ${className}`}>
    <span className={labelClass}>{label}</span>
    {children}
    {hint && <span className="mt-1 block text-[11px] font-sans text-obsidian-500">{hint}</span>}
  </label>
);

interface SectionCardProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  actions,
  className = '',
  children,
}) => (
  <section
    className={`rounded-xl border border-obsidian-800 bg-obsidian-900/50 p-4 sm:p-5 ${className}`}
  >
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-obsidian-850 pb-3">
      <div>
        <h3 className="font-sans text-sm font-bold text-white">{title}</h3>
        {description && (
          <p className="mt-0.5 text-[11px] font-sans leading-relaxed text-obsidian-500">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
    {children}
  </section>
);

type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'subtle';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md';
}

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-white text-black hover:bg-neutral-200 border border-white disabled:bg-obsidian-700 disabled:text-obsidian-400 disabled:border-obsidian-700',
  ghost:
    'border border-obsidian-750 bg-obsidian-900/60 text-obsidian-200 hover:bg-obsidian-850 hover:text-white disabled:opacity-50',
  danger:
    'border border-red-900/60 bg-red-950/30 text-red-300 hover:bg-red-950/60 hover:text-red-200 disabled:opacity-50',
  subtle: 'text-obsidian-400 hover:text-white hover:bg-obsidian-850',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'ghost',
  size = 'md',
  className = '',
  type = 'button',
  ...rest
}) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-colors disabled:cursor-not-allowed ${
      size === 'sm' ? 'px-2.5 py-1.5 text-[11px]' : 'px-3.5 py-2 text-xs'
    } ${BUTTON_STYLES[variant]} ${className}`}
    {...rest}
  />
);

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  danger?: boolean;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  title,
  danger = false,
  className = '',
  ...rest
}) => (
  <button
    type="button"
    title={title}
    aria-label={title}
    className={`inline-flex h-7 w-7 items-center justify-center rounded-md border border-obsidian-800 bg-obsidian-900/60 transition-colors hover:border-obsidian-700 hover:bg-obsidian-850 disabled:cursor-not-allowed disabled:opacity-30 ${
      danger ? 'text-red-400 hover:text-red-300' : 'text-obsidian-400 hover:text-white'
    } ${className}`}
    {...rest}
  />
);

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-mono font-medium ${className}`}
  >
    {children}
  </span>
);

export const VisibilityBadge: React.FC<{ visibility: ToolVisibility }> = ({ visibility }) => {
  const meta = VISIBILITY_META[visibility];
  return (
    <Badge className={meta.badgeClass}>
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dotClass}`} />
      {meta.label}
    </Badge>
  );
};

interface ModalProps {
  title: string;
  description?: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
  children?: React.ReactNode;
}

export const ConfirmModal: React.FC<ModalProps> = ({
  title,
  description,
  confirmLabel = '确认',
  danger = false,
  onConfirm,
  onClose,
  children,
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
    role="dialog"
    aria-modal="true"
    onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}
  >
    <div className="w-full max-w-md rounded-2xl border border-obsidian-750 bg-obsidian-900 p-5 shadow-2xl">
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="font-sans text-base font-bold text-white">{title}</h3>
        <IconButton title="关闭" onClick={onClose}>
          <X className="h-3.5 w-3.5" />
        </IconButton>
      </div>
      {description && (
        <p className="text-xs font-sans leading-relaxed text-obsidian-400">{description}</p>
      )}
      {children}
      <div className="mt-5 flex justify-end gap-2 border-t border-obsidian-850 pt-4">
        <Button variant="ghost" onClick={onClose}>
          取消
        </Button>
        <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  </div>
);

interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => (
  <div className="rounded-xl border border-dashed border-obsidian-800 bg-obsidian-950/40 px-5 py-8 text-center">
    <p className="font-sans text-sm font-semibold text-obsidian-300">{title}</p>
    {description && (
      <p className="mt-1 text-[11px] font-sans text-obsidian-500">{description}</p>
    )}
  </div>
);
