import React from 'react';
import Navbar from './Navbar';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: 'url(/hero.jpg)' }}></div>
      <Navbar />
    </section>
  );
};

export default Hero;
