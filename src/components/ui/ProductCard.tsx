import { type FC, type ReactNode } from 'react';

export interface ProductCardProps {
  title: string;
  pages: number;
  price: string;
  image?: string;
  /** Кнопки / действия в нижней части карточки */
  actions?: ReactNode;
}

/**
 * Универсальная карточка продукта.
 * Используется в «Мои проекты» и «Корзина».
 */
const ProductCard: FC<ProductCardProps> = ({ title, pages, price, image, actions }) => (
  <div
    className="flex bg-white"
    style={{
      width: 'clamp(444px, 30.833vw, 592px)',
      height: 'clamp(227px, 15.764vw, 303px)',
    }}
  >
    {/* Превью */}
    <div
      className="shrink-0 bg-cover bg-center"
      style={{
        width: 'clamp(212px, 14.722vw, 283px)',
        height: '100%',
        background: image ? `url(${image}) center/cover no-repeat` : '#CCCCCC',
      }}
    />

    {/* Инфо */}
    <div
      className="flex flex-col justify-between border-t border-r border-b border-black"
      style={{
        padding: 'clamp(18px, 1.736vw, 33px) clamp(14px, 1.042vw, 20px)',
        flex: 1,
      }}
    >
      <div className="flex flex-col" style={{ gap: 'clamp(8px, 0.556vw, 11px)' }}>
        {/* Название */}
        <span
          className="font-syncopate font-normal uppercase"
          style={{
            fontSize: 'clamp(15px, 1.042vw, 20px)',
            lineHeight: '0.87',
            letterSpacing: '-0.03em',
            color: '#000000',
            marginBottom: 'clamp(18px, 1.25vw, 24px)',
          }}
        >
          {title}
        </span>

        {/* Страницы */}
        <span
          className="font-inter font-normal"
          style={{
            fontSize: 'clamp(13px, 0.903vw, 17px)',
            lineHeight: '1.23',
            color: '#000000',
            marginBottom: 'clamp(3px, 0.208vw, 4px)',
          }}
        >
          {pages} стр.
        </span>

        {/* Цена */}
        <span
          className="font-syncopate font-bold"
          style={{
            fontSize: 'clamp(15px, 1.042vw, 20px)',
            lineHeight: '1',
            letterSpacing: '0',
            color: '#111111',
          }}
        >
          {price}
        </span>
      </div>

      {/* Действия */}
      {actions && (
        <div className="flex flex-col" style={{ gap: 'clamp(8px, 0.694vw, 13px)' }}>
          {actions}
        </div>
      )}
    </div>
  </div>
);

export default ProductCard;
