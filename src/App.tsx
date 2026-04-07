import { type FC } from 'react';
import { Routes, Route } from 'react-router-dom';
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

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/designer-service" element={<DesignerServicePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/product/:id?" element={<ProductPage />} />
    </Routes>
  );
};

export default App;
