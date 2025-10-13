import React from 'react';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <h2 data-aos="fade-down">About Me</h2>
        <div className="about-container">
          <div className="about-photo" data-aos="fade-right"></div>
          <div className="about-text" data-aos="fade-left">
            <p>
              Hi, I'm Logesh. I'm a passionate Java Developer focused on building efficient applications and solving complex problems.
            </p>
            <div className="about-details">
              <p><i className="fa-solid fa-graduation-cap"></i> B.E. in Electronics & Communication (2025)</p>
              <p><i className="fa-solid fa-star"></i> CGPA: 8.18</p>
              <p><i className="fa-solid fa-location-dot"></i> Coimbatore, Tamil Nadu</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;