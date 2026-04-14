import { type FC } from 'react';

interface CarouselArrowProps {
  direction: 'left' | 'right';
  onClick?: () => void;
  /** Размер кнопки. По умолчанию 'clamp(28px, 2.5vw, 48px)'. */
  size?: string;
  /**
   * Визуальный стиль:
   * - "glass" — frosted-glass кнопка с тенью и scale-эффектами (Topics)
   * - "minimal" — белый круг с шевроном + линией (Reviews, ProductPage, DesignerService)
   */
  variant?: 'glass' | 'minimal';
  className?: string;
  style?: React.CSSProperties;
}

const CarouselArrow: FC<CarouselArrowProps> = ({
  direction,
  onClick,
  size = 'clamp(28px, 2.5vw, 48px)',
  variant = 'minimal',
  className = '',
  style,
}) => {
  if (variant === 'glass') {
    return (
      <button
        type="button"
        className={`border-none cursor-pointer flex items-center justify-center p-0 rounded-full hover:scale-110 active:scale-95 ${className}`}
        style={{
          width: size,
          height: size,
          transition: 'transform 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
          ...style,
        }}
        aria-label={direction === 'left' ? 'Назад' : 'Вперёд'}
        onClick={onClick}
      >
        <svg width="50%" height="50%" viewBox="0 0 16 16" fill="none">
          {direction === 'left' ? (
            <path d="M10 3L5 8L10 13" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M6 3L11 8L6 13" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      </button>
    );
  }

  /* variant === 'minimal' */
  return (
    <button
      type="button"
      className={`relative flex items-center justify-center bg-transparent border-none cursor-pointer p-0 shrink-0 hover:opacity-70 transition-opacity ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-label={direction === 'left' ? 'Назад' : 'Вперёд'}
      onClick={onClick}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 29 29"
        fill="none"
        style={{ transform: direction === 'right' ? 'scaleX(-1)' : undefined }}
      >
        <circle cx="14.5" cy="14.5" r="14.5" fill="white" />
        <path d="M12 10L7 14.5L12 19" stroke="black" strokeWidth="1" fill="none" />
        <line x1="7" y1="14.5" x2="22" y2="14.5" stroke="black" strokeWidth="1" />
      </svg>
    </button>
  );
};

export default CarouselArrow;
