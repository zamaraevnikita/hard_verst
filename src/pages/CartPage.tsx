import { type FC } from 'react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

/* Карточка товара в корзине */
interface CartItemProps {
  title: string;
  pages: number;
  price: string;
  image?: string;
}

const CartItem: FC<CartItemProps> = ({ title, pages, price, image }) => (
  <div
    className="flex bg-white"
    style={{
      width: 'clamp(444px, 30.833vw, 592px)',
      height: 'clamp(227px, 15.764vw, 303px)',
    }}
  >
    {/* Картинка-превью */}
    <div
      className="shrink-0"
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
      <div className="flex flex-col">
        {/* Название */}
        <span
          className="font-['Syncopate'] font-normal uppercase"
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
          className="font-['Inter'] font-normal"
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
          className="font-['Syncopate'] font-bold"
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

      {/* Кнопка */}
      <div>
        <button
          className="flex items-center justify-center font-['Helvetica'] font-normal text-white bg-black border border-black cursor-pointer hover:opacity-80 transition-opacity text-center"
          style={{
            width: 'clamp(197px, 13.681vw, 263px)',
            height: 'clamp(25px, 1.736vw, 33px)',
            fontSize: 'clamp(10px, 0.694vw, 13px)',
            lineHeight: '1',
            letterSpacing: '0',
          }}
        >
          Собрать
        </button>
      </div>
    </div>
  </div>
);

const CartPage: FC = () => {
  // Заглушка: один демо-товар
  const items: CartItemProps[] = [
    {
      title: 'Название',
      pages: 24,
      price: '6500₽',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar variant="light" />

      {/* spacer for fixed navbar */}
      <div style={{ height: 'clamp(50px, 4.65vw, 89px)' }} />

      {/* Контент */}
      <main
        className="page-container flex-1"
        style={{
          padding: `clamp(50px, 5.139vw, 99px) clamp(24px, 5.347vw, 103px)`,
        }}
      >
        {/* Заголовок */}
        <h1
          className="font-['Syncopate'] font-normal m-0"
          style={{
            fontSize: 'clamp(31px, 2.153vw, 41px)',
            lineHeight: '0.9',
            color: '#000000',
            marginBottom: 'clamp(30px, 4.653vw, 89px)',
          }}
        >
          КОРЗИНА
        </h1>

        {/* Товары */}
        <div
          className="flex flex-wrap items-start"
          style={{ gap: 'clamp(30px, 5.556vw, 107px)', marginBottom: 'clamp(200px, 20.833vw, 400px)' }}
        >
          {items.map((item, i) => (
            <CartItem key={i} {...item} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
