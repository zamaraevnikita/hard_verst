import { type FC, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Topics from './components/Topics';
import HowItWorks from './components/HowItWorks';
import Designer from './components/Designer';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import DesignerServicePage from './pages/DesignerServicePage';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import MyProjectsPage from './pages/MyProjectsPage';
import CartPage from './pages/CartPage';

const HomePage: FC = () => (
  <div className="main flex flex-col min-h-screen bg-white">
    <Hero />
    <Catalog />
    <Topics />
    <HowItWorks />
    <Designer />
    <Reviews />
    <Footer />
  </div>
);

// Компонент для скролла к якорю при навигации между страницами
const ScrollToHash: FC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // Небольшая задержка чтобы DOM успел отрисоваться после смены маршрута
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Без хэша — скроллим наверх при переходе на новую страницу
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, pathname]);

  return null;
};

const App: FC = () => {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/designer-service" element={<DesignerServicePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product/:id?" element={<ProductPage />} />
        <Route path="/my-projects" element={<MyProjectsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
};

export default App;
