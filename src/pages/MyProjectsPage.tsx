import { type FC } from 'react';
import PageLayout from '../components/layout/PageLayout';
import ProductCard, { type ProductCardProps } from '../components/ui/ProductCard';
import SectionTitle from '../components/ui/SectionTitle';
import ActionButton from '../components/ui/ActionButton';

/* Кнопка "добавить проект" */
const AddProjectButton: FC = () => (
  <button
    className="flex items-center justify-center rounded-full bg-[#F6F6F6] border-none cursor-pointer hover:bg-[#EBEBEB] transition-colors"
    style={{
      width: 'clamp(53px, 3.681vw, 71px)',
      height: 'clamp(53px, 3.681vw, 71px)',
    }}
  >
    <svg
      viewBox="0 0 30 30"
      fill="none"
      style={{
        width: 'clamp(30px, 2.083vw, 40px)',
        height: 'clamp(30px, 2.083vw, 40px)',
      }}
    >
      <line x1="0" y1="15" x2="30" y2="15" stroke="#000000" strokeWidth="1" />
      <line x1="15" y1="0" x2="15" y2="30" stroke="#000000" strokeWidth="1" />
    </svg>
  </button>
);

const MyProjectsPage: FC = () => {
  // Заглушка: один демо-проект
  const projects: ProductCardProps[] = [
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
        МОИ ПРОЕКТЫ
      </SectionTitle>

      {/* Сетка: карточки + кнопка добавления */}
      <div
        className="flex flex-wrap items-center"
        style={{ gap: 'clamp(30px, 5.556vw, 107px)', marginBottom: 'clamp(200px, 20.833vw, 400px)' }}
      >
        {projects.map((project, i) => (
          <ProductCard
            key={i}
            {...project}
            actions={
              <>
                <ActionButton
                  href="/product"
                  className="font-helvetica"
                  style={{
                    width: 'clamp(197px, 13.681vw, 263px)',
                    height: 'clamp(25px, 1.736vw, 33px)',
                    fontSize: 'clamp(10px, 0.694vw, 13px)',
                    lineHeight: '1',
                  }}
                >
                  Подробнее
                </ActionButton>
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
              </>
            }
          />
        ))}
        <AddProjectButton />
      </div>
    </PageLayout>
  );
};

export default MyProjectsPage;
