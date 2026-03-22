import React from 'react';

const reviewsData = [
  {
    id: 1,
    name: 'Ольга',
    text: 'Решила собрать альбом про наш год. Удивилась, СКОЛЬКО всего было! Наше знакомство. Первые свидания. Как мы съездили в Африку, а после — сразу съехались. Внезапный отъезд и жизнь в Грузии. Бали и первая в жизни Жени съемка, которая (шок, но это правда) ему супер понравилась. Знакомство с моим папой и родными в Израиле. Когда дарила — расплакалась дважды. Хочу сделать традицией и фиксировать каждый год.'
  },
  {
    id: 2,
    name: 'Ольга',
    text: 'Решила собрать альбом про наш год. Удивилась, СКОЛЬКО всего было! Наше знакомство. Первые свидания. Как мы съездили в Африку, а после — сразу съехались. Внезапный отъезд и жизнь в Грузии. Бали и первая в жизни Жени съемка, которая (шок, но это правда) ему супер понравилась. Знакомство с моим папой и родными в Израиле. Когда дарила — расплакалась дважды. Хочу сделать традицией и фиксировать каждый год.'
  },
  {
    id: 3,
    name: 'Ольга',
    text: 'Решила собрать альбом про наш год. Удивилась, СКОЛЬКО всего было! Наше знакомство. Первые свидания. Как мы съездили в Африку, а после — сразу съехались. Внезапный отъезд и жизнь в Грузии. Бали и первая в жизни Жени съемка, которая (шок, но это правда) ему супер понравилась. Знакомство с моим папой и родными в Израиле. Когда дарила — расплакалась дважды. Хочу сделать традицией и фиксировать каждый год.'
  }
];

const Reviews: React.FC = () => {
  return (
    <section className="reviews">
      <h2 className="reviews-title">ВАШИ РЕВЬЮ</h2>

      <div className="reviews-carousel">
        <button className="review-arrow review-arrow-left" aria-label="Назад">
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none">
            <circle cx="14.5" cy="14.5" r="14.5" fill="white" />
            <path d="M14.1765 19L8 14.5L14.1765 10" stroke="#000000" />
            <path d="M8 14.5H23" stroke="#000000" />
          </svg>
        </button>

        <div className="reviews-grid">
          {reviewsData.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-photo"></div>
              <h3 className="review-name">{review.name}</h3>
              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>

        <button className="review-arrow review-arrow-right" aria-label="Вперёд">
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" style={{ transform: 'scaleX(-1)' }}>
            <circle cx="14.5" cy="14.5" r="14.5" fill="white" />
            <path d="M14.1765 19L8 14.5L14.1765 10" stroke="#000000" />
            <path d="M8 14.5H23" stroke="#000000" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Reviews;
