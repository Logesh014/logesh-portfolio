import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "Sewage Toxicity Prediction (ML + IoT)",
      description: "Developed a system using IoT sensor data & Random Forest algorithm with a web interface (HTML, CSS, JS, Flask)."
    },
    {
      title: "Student Management System (Java + SQL)",
      description: "Core Java backend with Oracle SQL via JDBC for student registration, attendance & grading."
    }
  ];

  return (
    <section id="projects" className="py-5">
      <div className="container">
        <h2 className="mb-4">Projects</h2>
        <div className="row">
          {projects.map((project, index) => (
            <div key={index} className="col-md-6">
              <h5>{project.title}</h5>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;