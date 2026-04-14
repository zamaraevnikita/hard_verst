import { type FC } from 'react';
import CarouselArrow from './ui/CarouselArrow';
import SectionTitle from './ui/SectionTitle';

const reviewsData = [
  {
    id: 1,
    name: 'Ольга',
    text: 'Решила собрать альбом про наш год. Удивилась, СКОЛЬКО всего было! Наше знакомство. Первые свидания. Как мы съездили в Африку, а после — сразу съехались. Внезапный отъезд и жизнь в Грузии.\nБали и первая в жизни Жени съемка, которая (шок, но это правда) ему супер понравилась.\nЗнакомство с моим папой и родными в Израиле. Когда дарила — расплакалась дважды.\nХочу сделать традицией и фиксировать каждый год.',
  },
  {
    id: 2,
    name: 'Ольга',
    text: 'Решила собрать альбом про наш год. Удивилась, СКОЛЬКО всего было! Наше знакомство. Первые свидания. Как мы съездили в Африку, а после — сразу съехались. Внезапный отъезд и жизнь в Грузии.\nБали и первая в жизни Жени съемка, которая (шок, но это правда) ему супер понравилась.\nЗнакомство с моим папой и родными в Израиле. Когда дарила — расплакалась дважды.\nХочу сделать традицией и фиксировать каждый год.',
  },
  {
    id: 3,
    name: 'Ольга',
    text: 'Решила собрать альбом про наш год. Удивилась, СКОЛЬКО всего было! Наше знакомство. Первые свидания. Как мы съездили в Африку, а после — сразу съехались. Внезапный отъезд и жизнь в Грузии.\nБали и первая в жизни Жени съемка, которая (шок, но это правда) ему супер понравилась.\nЗнакомство с моим папой и родными в Израиле. Когда дарила — расплакалась дважды.\nХочу сделать традицией и фиксировать каждый год.',
  },
];

/*
  Figma layout (1440px ref):
  - Section padding: ~107px sides, ~134px top/bottom
  - 3 cards 284px wide, gaps ~188px between them
  - Card: square photo (284×284), name 30px below, text 37px below name
  - Arrow vertically centered on photo slot

  Scaling: max(min, vw) — no upper cap, no maxWidth container.
*/

const Reviews: FC = () => {
  return (
    <section className="w-full" id="reviews">
      <div
        className="page-container"
        style={{ padding: 'clamp(60px, 9.3vw, 179px) clamp(32px, 3.33vw, 64px)' }}
      >
        {/* Заголовок */}
        <SectionTitle
          style={{
            lineHeight: 'clamp(18px, 1.736vw, 33px)',
            marginBottom: 'clamp(30px, 4.722vw, 91px)',
            paddingLeft: 'clamp(24px, 4.097vw, 79px)',
          }}
        >
          ВАШИ РЕВЬЮ
        </SectionTitle>

        {/* Контейнер: стрелки + карточки */}
        <div className="flex items-start w-full" style={{ gap: 'clamp(8px, 1.389vw, 27px)' }}>
          {/* Стрелка «назад» */}
          <CarouselArrow
            direction="left"
            size="29px"
            style={{ marginTop: 'clamp(90px, 9.444vw, 181px)' }}
          />

          {/* 3 карточки */}
          <div className="flex justify-between flex-1 min-w-0">
            {reviewsData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col"
                style={{ width: 'clamp(150px, 19.722vw, 379px)' }}
              >
                {/* Квадратный слот для фото */}
                <div className="w-full bg-placeholder" style={{ aspectRatio: '1 / 1' }} />

                {/* Имя */}
                <p
                  className="font-inter font-normal text-black text-center"
                  style={{
                    fontSize: 'clamp(13px, 1.25vw, 24px)',
                    lineHeight: 'clamp(16px, 1.528vw, 29px)',
                    marginTop: 'clamp(15px, 2.083vw, 40px)',
                  }}
                >
                  {item.name}
                </p>

                {/* Текст отзыва */}
                <p
                  className="font-inter font-normal text-black whitespace-pre-wrap overflow-hidden"
                  style={{
                    fontSize: 'clamp(9px, 0.833vw, 16px)',
                    lineHeight: 'clamp(11px, 1.042vw, 20px)',
                    marginTop: 'clamp(10px, 1.389vw, 27px)',
                    height: 'clamp(110px, 10.417vw, 200px)',
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Стрелка «вперёд» */}
          <CarouselArrow
            direction="right"
            size="29px"
            style={{ marginTop: 'clamp(90px, 9.444vw, 181px)' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
