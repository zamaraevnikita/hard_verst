import React from 'react';

// Using a data array as a professional developer would rather than copy-pasting code!
const products = [
  { id: 1, name: 'Название', pages: '20/24/28/32 страниц', price: 'от 2000р.' },
  { id: 2, name: 'Название', pages: '20/24/28/32 страниц', price: 'от 2000р.' },
  { id: 3, name: 'Название', pages: '20/24/28/32 страниц', price: 'от 2000р.' },
  { id: 4, name: 'Название', pages: '20/24/28/32 страниц', price: 'от 2000р.' },
  { id: 5, name: 'Название', pages: '20/24/28/32 страниц', price: 'от 2000р.' },
  { id: 6, name: 'Название', pages: '20/24/28/32 страниц', price: 'от 2000р.' },
];

const Catalog: React.FC = () => {
  return (
    <section className="catalog" id="catalog">
      <div className="catalog-header">
        <span className="catalog-subtitle left">КОНСТРУКТОР  ГЛЯНЦА</span>
        <h2 className="catalog-title">ВЫБЕРИ ОСНОВУ</h2>
        <span className="catalog-subtitle right">СОБЕРИ СВОЙ ЖУРНАЛ</span>
      </div>
      
      <div className="catalog-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="card-image"></div>
            <div className="card-info">
              <div className="card-details">
                <div className="card-left">
                  <span className="card-name">{product.name}</span>
                  <span className="card-pages">{product.pages}</span>
                </div>
                <span className="card-price">{product.price}</span>
              </div>
              <div className="card-buttons">
                <button className="btn-details">Подробнее</button>
                <button className="btn-collect">Собрать</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Catalog;
