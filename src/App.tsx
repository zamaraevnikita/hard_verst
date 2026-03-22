import React from 'react';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Topics from './components/Topics';
import HowItWorks from './components/HowItWorks';
import Designer from './components/Designer';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="main">
      <Hero />
      <Catalog />
      <Topics />
      <HowItWorks />
      <Designer />
      <Reviews />
      <Footer />
    </div>
  );
};

export default App;
