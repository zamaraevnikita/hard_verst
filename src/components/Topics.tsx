import React from 'react';

const topics = [
  'письмо редактора',
  'путешествия',
  'факты',
  'увлечения',
  'список желаний',
  'обзор образов'
];

const Topics: React.FC = () => {
  return (
    <section className="topics">
      <h2 className="topics-title">НЕ ПРОСТО ФОТОКНИГИ</h2>
      <p className="topics-subtitle">
        создай персональный журнал с известной обложкой, используя<br/>готовые идеи наполнения и дизайна
      </p>
      
      <div className="topics-carousel-wrapper">
        <button className="arrow arrow-left" aria-label="Назад">
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none">
            <circle cx="14.5" cy="14.5" r="14.5" fill="white" />
            <path d="M14.1765 19L8 14.5L14.1765 10" stroke="#737373" />
            <path d="M8 14.5H23" stroke="#737373" />
          </svg>
        </button>
        
        <div className="topics-carousel">
          {topics.map((topic, index) => (
            <div key={index} className="topic-column">
              <span className="topic-label">{topic}</span>
              <div className="topic-card"></div>
            </div>
          ))}
        </div>
        
        <button className="arrow arrow-right" aria-label="Вперёд">
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" style={{ transform: 'scaleX(-1)' }}>
            <circle cx="14.5" cy="14.5" r="14.5" fill="white" />
            <path d="M14.1765 19L8 14.5L14.1765 10" stroke="#737373" />
            <path d="M8 14.5H23" stroke="#737373" />
          </svg>
        </button>
      </div>
      
      <button className="btn-constructor">Перейти в конструктор</button>
    </section>
  );
};

export default Topics;
