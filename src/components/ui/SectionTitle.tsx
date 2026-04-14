import { type FC, type CSSProperties, type ElementType } from 'react';

export interface SectionTitleProps {
  /** Tag / semantic element: h1 | h2 | h3 | span.  Default = h2 */
  as?: ElementType;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  /** 'normal' (400) | 'bold' (700). Default = 'normal' */
  weight?: 'normal' | 'bold';
  /** Text alignment. Default = 'left' */
  align?: 'left' | 'center';
  /** Font-size preset. Default = 'md' */
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP: Record<NonNullable<SectionTitleProps['size']>, string> = {
  sm: 'clamp(11px, 0.972vw, 19px)',
  md: 'clamp(20px, 1.944vw, 37px)',
  lg: 'clamp(31px, 2.153vw, 41px)',
};

/**
 * Заголовок секции — Syncopate, uppercase, чёрный.
 * Переиспользуется по всему сайту.
 */
const SectionTitle: FC<SectionTitleProps> = ({
  as: Tag = 'h2',
  children,
  className = '',
  style,
  weight = 'normal',
  align = 'left',
  size = 'md',
}) => (
  <Tag
    className={`font-syncopate uppercase text-black m-0 ${
      align === 'center' ? 'text-center' : ''
    } ${weight === 'bold' ? 'font-bold' : 'font-normal'} ${className}`}
    style={{
      fontSize: SIZE_MAP[size],
      lineHeight: '0.9',
      ...style,
    }}
  >
    {children}
  </Tag>
);

export default SectionTitle;
