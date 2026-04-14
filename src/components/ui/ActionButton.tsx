import { type FC, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface ActionButtonProps {
  children: ReactNode;
  /** 'outline' = чёрная рамка, белый фон, инвертируется при hover.
   *  'filled'  = чёрный фон, белый текст, hover:opacity-80.
   *  'accent'  = розовый фон (#CC92A5), белый текст, hover:opacity-80.
   *  'ghost'  = прозрачный фон, белый текст, белая рамка, hover:инвертируется
   */
  variant?: 'outline' | 'filled' | 'accent' | 'ghost';
  /** If provided — renders <Link to={href}> */
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  style?: CSSProperties;
}

const BASE =
  'inline-flex items-center justify-center text-center no-underline cursor-pointer transition-all';

const VARIANTS: Record<NonNullable<ActionButtonProps['variant']>, string> = {
  outline:
    'bg-white text-black border border-black hover:bg-black hover:text-white',
  filled:
    'bg-black text-white border border-black hover:opacity-80',
  accent:
    'bg-[#CC92A5] text-white border-none hover:opacity-80',
  ghost:
    'bg-transparent text-white border border-white hover:bg-white hover:text-black',
};

/**
 * Универсальная кнопка действия.
 * Рендерится как `<Link>` (если передан href) или `<button>`.
 */
const ActionButton: FC<ActionButtonProps> = ({
  children,
  variant = 'outline',
  href,
  onClick,
  type = 'button',
  className = '',
  style,
}) => {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <Link to={href} className={cls} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls} style={style}>
      {children}
    </button>
  );
};

export default ActionButton;
