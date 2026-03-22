import React from 'react';

const steps = [
  {
    num: 1,
    title: <>ВЫБОР<br/>ОБЛОЖКИ</>,
    text: <>Ознакомьтесь с предложенными обложками <a href="#catalog">здесь.</a> Если ничего не приглянулось – загрузите вашу обложку в пустом варианте.</>
  },
  {
    num: 2,
    title: <>ОЗНАКОМЬТЕСЬ<br/>С ТОВАРОМ</>,
    text: 'В карточке товара можно выбрать интересующее вас количество страниц, ознакомиться со сроками доставки и особенностями печати.'
  },
  {
    num: 3,
    title: <>СОБЕРИТЕ<br/>МАКЕТ</>,
    text: 'Выберите темы для наполнения и дизайн. Составьте свой персональный журнал заполнив шаблон фотографиями и текстом.'
  },
  {
    num: 4,
    title: <>ОФОРМИТЕ<br/>ЗАКАЗ</>,
    text: 'Заполните информацию для заказа и ожидайте письмо об изготовлении на почте.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="how-it-works">
      <h2 className="how-title">КАК ЭТО РАБОТАЕТ?</h2>
      
      <div className="how-content">
        <div className="how-steps">
          {steps.map((step) => (
            <div key={step.num} className="step-item">
              <span className="step-number">{step.num}</span>
              <h3 className="step-heading">{step.title}</h3>
              <p className="step-text">{step.text}</p>
            </div>
          ))}
        </div>
        
        <div className="how-image-wrapper">
          <div className="how-image"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
