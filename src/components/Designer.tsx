import React from 'react';

const Designer: React.FC = () => {
  return (
    <section className="designer">
      {/* Background with inline style to fetch from public folder */}
      <div className="designer-bg" style={{ backgroundImage: 'url(/hero.jpg)' }}></div>
      <div className="designer-overlay"></div>
      
      <div className="designer-content">
        <p className="designer-text">
          У вас есть свои идеи для наполнения?<br/>
          Вы хотите индивидуальный дизайн?<br/>
          Закажите бесплатную консультацию с дизайнером!
        </p>
        <button className="btn-designer">Перейти в конструктор</button>
        <h2 className="designer-title">
          <span className="astrum-letter">Р</span>
          <span className="synco-text">АБОТА</span>
          <span className="synco-space"> С </span>
          <span className="astrum-letter">D</span>
          <span className="synco-text">ИЗАЙНЕРОМ</span>
        </h2>
      </div>
    </section>
  );
};

export default Designer;
