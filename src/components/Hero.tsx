import React from 'react';
import { Navbar } from './Navbar';
import heroBg from '../assets/hero.jpg';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }}></div>
      <Navbar />
    </section>
  );
};

export default Hero;
