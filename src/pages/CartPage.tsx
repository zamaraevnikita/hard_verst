import { type FC } from 'react';
import PageLayout from '../components/layout/PageLayout';
import ProductCard, { type ProductCardProps } from '../components/ui/ProductCard';
import SectionTitle from '../components/ui/SectionTitle';
import ActionButton from '../components/ui/ActionButton';

const CartPage: FC = () => {
  // Заглушка: один демо-товар
  const items: ProductCardProps[] = [
    {
      title: 'Название',
      pages: 24,
      price: '6500₽',
    },
  ];

  return (
    <PageLayout
      mainStyle={{
        padding: `clamp(50px, 5.139vw, 99px) clamp(24px, 5.347vw, 103px)`,
      }}
    >
      {/* Заголовок */}
      <SectionTitle
        as="h1"
        size="lg"
        style={{
          marginBottom: 'clamp(30px, 4.653vw, 89px)',
        }}
      >
        КОРЗИНА
      </SectionTitle>

      {/* Товары */}
      <div
        className="flex flex-wrap items-start"
        style={{ gap: 'clamp(30px, 5.556vw, 107px)', marginBottom: 'clamp(200px, 20.833vw, 400px)' }}
      >
        {items.map((item, i) => (
          <ProductCard
            key={i}
            {...item}
            actions={
              <ActionButton
                variant="filled"
                className="font-helvetica"
                style={{
                  width: 'clamp(197px, 13.681vw, 263px)',
                  height: 'clamp(25px, 1.736vw, 33px)',
                  fontSize: 'clamp(10px, 0.694vw, 13px)',
                  lineHeight: '1',
                }}
              >
                Собрать
              </ActionButton>
            }
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default CartPage;
