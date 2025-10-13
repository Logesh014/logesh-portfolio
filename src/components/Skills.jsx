import React, { useEffect, useRef } from 'react';
import './Skills.css'; // Make sure to create and link this CSS file

const Skills = () => {
  // 1. Update your skills data to include percentage levels
  const skills = [
    { name: "Java", level: 88 },
    { name: "SQL", level: 82 },
    { name: "Python", level: 75 },
    { name: "HTML5", level: 90 },
    { name: "CSS3", level: 85 },
    { name: "JavaScript", level: 78 },
    { name: "Figma", level: 80 },
    { name: "Git & Github", level: 85 },
    { name: "JDBC", level: 82 }
  ];

  // 2. Create a ref to attach to the section
  const skillsSectionRef = useRef(null);

  // 3. Set up the Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // If the section is visible
        if (entry.isIntersecting) {
          // Find all skill bars and add the 'animate' class
          const skillBars = entry.target.querySelectorAll('.skill-level');
          skillBars.forEach(bar => {
            bar.classList.add('animate');
          });
          // Stop observing after the animation has run once
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2 // Trigger when 20% of the section is visible
      }
    );

    if (skillsSectionRef.current) {
      observer.observe(skillsSectionRef.current);
    }

    // Cleanup on component unmount
    return () => {
      if (skillsSectionRef.current) {
        observer.unobserve(skillsSectionRef.current);
      }
    };
  }, []); // Empty array ensures this effect runs only once

  return (
    // Attach the ref to your section
    <section id="skills" ref={skillsSectionRef}>
      <h2>Technical Skills</h2>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div className="skill-item" key={index}>
            <span className="skill-name">{skill.name}</span>
            <div className="skill-bar-container">
              {/* Set the final width using an inline style with a CSS custom property */}
              <div
                className="skill-level"
                style={{ '--final-width': `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;