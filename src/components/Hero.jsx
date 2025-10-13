import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Hero = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: ["Java Developer", "Full Stack Enthusiast", "Problem Solver"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <header className="hero text-center text-white d-flex align-items-center" id="home">
      <div className="container">
        <img 
          src="/assets/profile.jpg" 
          alt="Logesh" 
          className="rounded-circle mb-2" 
          width="150" 
        />
        <h1>Hi, I'm <span className="text-warning">Logesh S</span></h1>
        <p>Java Developer | Full Stack Enthusiast | Problem Solver</p>
        <p><span ref={typedElement}></span></p>
        <a href="#contact" className="btn btn-warning">Hire Me</a>
      </div>
    </header>
  );
};

export default Hero;