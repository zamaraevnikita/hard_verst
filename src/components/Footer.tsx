import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-divider"></div>
      <div className="footer-content">
        <div className="footer-col">
          <a href="#">О нас</a>
          <a href="#">Доставка</a>
          <a href="#">Печать</a>
          <a href="#">Частые вопросы</a>
          <a href="#">Контакты</a>
        </div>
        
        <div className="footer-col">
          <a href="#">Конструктор</a>
          <a href="#">Соберем журнал за вас</a>
        </div>
        
        <div className="footer-col">
          <a href="#">Договор оферты</a>
          <a href="#">Политика конфиденциальности</a>
        </div>
        
        <div className="footer-social">
          <a href="#" className="social-btn">ВК</a>
          <a href="#" className="social-btn">Тг</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
