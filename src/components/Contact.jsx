import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-5 bg-dark text-white">
      <div className="container text-center">
        <h2>Contact Me</h2>
        <p>Email: <a href="mailto:logeshlogesh2004@gmail.com" className="text-warning">logeshlogesh2004@gmail.com</a></p>
        <p>Phone: +91 9345707679</p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/logesh-senthil-kumar/" className="text-warning" target="_blank" rel="noopener noreferrer">logesh-senthil-kumar</a></p>
        <p>GitHub: <a href="https://github.com/Logesh014" className="text-warning" target="_blank" rel="noopener noreferrer">Logesh014</a></p>
        <p>LeetCode: <a href="https://leetcode.com/u/logeshs14/" className="text-warning" target="_blank" rel="noopener noreferrer">logeshs14</a></p>
      </div>
    </section>
  );
};

export default Contact;