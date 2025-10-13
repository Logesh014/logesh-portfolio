import { useState, useEffect, useRef } from 'react';
import { Code, Mail, Github, Linkedin, Award, MapPin, GraduationCap, ExternalLink, Briefcase, Calendar, ChevronRight, Phone } from 'lucide-react';
import profile from './assets/profile.png';

const useTypedEffect = (element, strings) => {
  useEffect(() => {
    if (!element.current) return;

    let currentString = 0;
    let currentChar = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const current = strings[currentString];
      
      if (isDeleting) {
        element.current.textContent = current.substring(0, currentChar - 1);
        currentChar--;
      } else {
        element.current.textContent = current.substring(0, currentChar + 1);
        currentChar++;
      }

      let speed = isDeleting ? 30 : 50;

      if (!isDeleting && currentChar === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentString = (currentString + 1) % strings.length;
        speed = 500;
      }

      timeout = setTimeout(type, speed);
    };

    type();

    return () => clearTimeout(timeout);
  }, [element, strings]);
};

const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

// This new hook specifically handles the skill bar width animation
const useSkillBarAnimation = (sectionRef) => {
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
          skillBars.forEach(bar => {
            const level = bar.dataset.level;
            if (level) {
              bar.style.width = `${level}%`; // This triggers the animation
            }
          });
          // Stop observing after the animation has run once
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 } // Start animation when 20% of the section is visible
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [sectionRef]);
};


function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const typedElement = useRef(null);
  const skillsSectionRef = useRef(null); // Create a ref for the skills section

  useScrollAnimation();
  useTypedEffect(typedElement, ["Java Developer", "Full Stack Enthusiast", "Problem Solver"]);
  useSkillBarAnimation(skillsSectionRef); // Call the new hook with the ref

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'resume', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { icon: "💼", title: "Content Creator", description: "Crafting engaging digital content that drives audience growth and strengthens brand presence." },
    { icon: "📱", title: "App Development", description: "Building robust Android applications with modern frameworks and best practices." },
    { icon: "🚀", title: "Web Development", description: "Creating responsive web applications using Java, Spring Boot, and modern frontend technologies." },
    { icon: "⚙️", title: "Backend Systems", description: "Designing scalable backend architectures with Java, SQL, and RESTful APIs." },
    { icon: "🎯", title: "Code Optimization", description: "Improving application performance through code refactoring and optimization techniques." },
    { icon: "📊", title: "Database Design", description: "Creating efficient database schemas and queries for optimal data management." }
  ];

  const projects = [
    { title: "Sewage Toxicity Prediction System", description: "ML & IoT-based predictive system using Random Forest algorithm with real-time sensor data processing.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", tags: ["Machine Learning", "IoT", "Flask", "Python"], category: "ML/IoT" },
    { title: "Student Management System", description: "Enterprise-level management system with Core Java backend and Oracle SQL database integration.", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop", tags: ["Java", "Oracle SQL", "JDBC"], category: "Enterprise" },
    { title: "E-Commerce Platform", description: "Full-stack e-commerce solution with user authentication, product catalog, and payment integration.", image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop", tags: ["HTML", "CSS", "React","Node"], category: "Web App" }
  ];

  const skillCategories = [
    { title: "Programming Languages", skills: [{ name: "Java", level: 88 }, { name: "SQL", level: 82 }, { name: "Python", level: 75 }] },
    { title: "Web Technologies", skills: [{ name: "HTML5", level: 90 }, { name: "CSS3", level: 85 }, { name: "JavaScript", level: 78 }] },
    { title: "Frameworks & Tools", skills: [{ name: "Spring Boot", level: 80 }, { name: "Git & GitHub", level: 85 }, { name: "JDBC", level: 82 }] }
  ];

  const education = {
    degree: "Bachelor of Engineering",
    field: "Electronics & Communication Engineering",
    institution: "SNS College of Technology",
    year: "2021 - 2025",
    cgpa: "8.18",
    description: "Focused on software development, algorithms, and system design. Active participant in coding competitions and technical workshops."
  };

  const experiences = [
    {
      title: "Web Design Intern",
      company: "EtherInfo Tech",
      period: "Jan 2024 - Feb 2024",
      description:
        "Designed responsive and user-friendly websites using HTML, CSS, and Figma. Collaborated on UI/UX design to enhance visual appeal and usability.",
    },
    {
      title: "Python Programming Intern",
      company: "FacePrep",
      period: "Jul 2024 - Aug 2024",
      description:
        "Gained hands-on experience in Python through real-world projects. Improved coding and problem-solving skills while working in collaborative development teams.",
    },
    {
      title: "Freelance Developer",
      company: "Self-Employed",
      period: "2024 - Present",
      description:
        "Developed custom web and Java-based applications for clients. Specialized in backend development, SQL integration, and responsive web design.",
    },
  ];


  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; background: #0a0a0a; color: #fff; overflow-x: hidden; }
        html { scroll-behavior: smooth; }
        .sidebar { position: fixed; left: 0; top: 0; width: 280px; height: 100vh; background: #111; border-right: 1px solid #222; padding: 2rem; z-index: 1000; overflow-y: auto; }
        .sidebar-header { margin-bottom: 3rem; }
        .sidebar-brand { font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem; }
        .sidebar-brand .name { background: linear-gradient(135deg, #ff0080 0%, #ff8c00 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .sidebar-subtitle { color: #888; font-size: 0.95rem; }
        .sidebar-nav { list-style: none; margin-bottom: 3rem; }
        .sidebar-nav li { margin-bottom: 0.5rem; }
        .sidebar-link { display: flex; align-items: center; gap: 0.8rem; color: #888; text-decoration: none; padding: 0.8rem 1rem; border-radius: 8px; transition: all 0.3s; font-weight: 500; }
        .sidebar-link:hover, .sidebar-link.active { color: #fff; background: #1a1a1a; }
        .sidebar-link.active { background: linear-gradient(135deg, rgba(255, 0, 128, 0.1), rgba(255, 140, 0, 0.1)); border-left: 3px solid #ff0080; }
        .sidebar-social { display: flex; gap: 1rem; margin-top: 2rem; }
        .social-icon { width: 40px; height: 40px; border-radius: 8px; background: #1a1a1a; display: flex; align-items: center; justify-content: center; color: #888; transition: all 0.3s; text-decoration: none; }
        .social-icon:hover { background: linear-gradient(135deg, #ff0080, #ff8c00); color: #fff; transform: translateY(-3px); }
        .main-content { margin-left: 280px; min-height: 100vh; }
        .mobile-nav { display: none; }
        .hero { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; align-items: center; padding: 4rem; gap: 4rem; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; top: 50%; right: -200px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(255, 0, 128, 0.15), transparent 70%); border-radius: 50%; filter: blur(80px); }
        .hero-content { position: relative; z-index: 1; }
        .hero-label { color: #ff0080; font-size: 0.9rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 1rem; }
        .hero-title { font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; }
        .hero-title .gradient { background: linear-gradient(135deg, #ff0080, #ff8c00); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtitle { font-size: 1.8rem; color: #fff; margin-bottom: 1rem; }
        .hero-description { font-size: 1.1rem; line-height: 1.8; color: #aaa; margin-bottom: 2rem; max-width: 500px; }
        .typed-text { display: inline-block; min-width: 300px; font-size: 1.2rem; font-weight: 600; color: #ff0080; min-height: 1.5rem; margin-bottom: 2rem; }
        .hero-buttons { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-primary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; background: linear-gradient(135deg, #ff0080, #ff8c00); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s; border: none; cursor: pointer; }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(255, 0, 128, 0.3); }
        .btn-secondary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; background: transparent; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; border: 2px solid #333; transition: all 0.3s; }
        .btn-secondary:hover { border-color: #ff0080; background: rgba(255, 0, 128, 0.1); }
        .hero-image-container { position: relative; display: flex; justify-content: center; align-items: center; }
        .hero-image-wrapper { position: relative; width: 400px; height: 500px; border-radius: 20px; overflow: hidden; background: linear-gradient(135deg, #ff0080, #ff8c00); padding: 4px; }
        .hero-image { width: 100%; height: 100%; object-fit: cover; border-radius: 18px; }
        .hero-image-wrapper::before { content: ''; position: absolute; inset: -50px; background: linear-gradient(135deg, #ff0080, #ff8c00); filter: blur(60px); opacity: 0.3; animation: pulse 3s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.5; } }
        .floating-badge { position: absolute; background: rgba(17, 17, 17, 0.9); backdrop-filter: blur(10px); padding: 1rem 1.5rem; border-radius: 12px; border: 1px solid #333; animation: float 3s ease-in-out infinite; }
        .floating-badge-1 { top: 10%; right: -10%; }
        .floating-badge-2 { bottom: 15%; left: -10%; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .section { padding: 6rem 4rem; position: relative; }
        .section-header { text-align: center; margin-bottom: 4rem; }
        .section-label { color: #ff0080; font-size: 0.9rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 0.5rem; }
        .section-title { font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; }
        .section-description { color: #888; max-width: 600px; margin: 0 auto; line-height: 1.8; }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .service-card { background: #111; padding: 2.5rem; border-radius: 16px; border: 1px solid #222; transition: all 0.3s; position: relative; overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #ff0080, #ff8c00); transform: scaleX(0); transition: transform 0.3s; }
        .service-card:hover::before { transform: scaleX(1); }
        .service-card:hover { transform: translateY(-10px); border-color: #333; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); }
        .service-icon { font-size: 3rem; margin-bottom: 1.5rem; }
        .service-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; }
        .service-description { color: #888; line-height: 1.7; }
        .skills-container { max-width: 1000px; margin: 0 auto; }
        .skills-category { margin-bottom: 3rem; }
        .skills-category-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 1.5rem; color: #ff0080; }
        .skills-list { display: grid; gap: 1.5rem; }
        .skill-item { background: #111; padding: 1.5rem; border-radius: 12px; border: 1px solid #222; }
        .skill-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .skill-name { font-weight: 600; }
        .skill-percentage { color: #ff0080; font-weight: 600; }
        .skill-bar-bg { width: 100%; height: 6px; background: #1a1a1a; border-radius: 10px; overflow: hidden; }
        .skill-bar-fill { 
            width: 0; 
            height: 100%; 
            background: linear-gradient(90deg, #ff0080, #ff8c00); 
            border-radius: 10px; 
            transition: width 1s ease-out; 
        }
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; }
        .project-card { background: #111; border-radius: 16px; overflow: hidden; border: 1px solid #222; transition: all 0.3s; cursor: pointer; }
        .project-card:hover { transform: translateY(-10px); border-color: #333; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); }
        .project-image { width: 100%; height: 250px; object-fit: cover; transition: transform 0.3s; }
        .project-card:hover .project-image { transform: scale(1.05); }
        .project-content { padding: 2rem; }
        .project-category { display: inline-block; padding: 0.4rem 1rem; background: rgba(255, 0, 128, 0.1); color: #ff0080; border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem; }
        .project-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; }
        .project-description { color: #888; line-height: 1.7; margin-bottom: 1.5rem; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .project-tag { padding: 0.4rem 0.8rem; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; font-size: 0.8rem; color: #aaa; }
        .resume-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; max-width: 1200px; margin: 0 auto; }
        .resume-column h3 { font-size: 1.8rem; font-weight: 700; margin-bottom: 2rem; color: #ff0080; }
        .education-card, .experience-card { background: #111; padding: 2rem; border-radius: 16px; border: 1px solid #222; margin-bottom: 2rem; }
        .card-header { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem; }
        .card-icon { width: 50px; height: 50px; background: linear-gradient(135deg, #ff0080, #ff8c00); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .card-info { flex: 1; }
        .card-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.3rem; }
        .card-subtitle { color: #888; font-size: 0.95rem; }
        .card-period { display: inline-flex; align-items: center; gap: 0.3rem; color: #ff0080; font-size: 0.85rem; font-weight: 600; margin-top: 0.5rem; }
        .card-description { color: #aaa; line-height: 1.7; margin-top: 1rem; }
        .cgpa-badge { display: inline-block; padding: 0.5rem 1rem; background: rgba(255, 0, 128, 0.1); border: 1px solid rgba(255, 0, 128, 0.3); border-radius: 20px; color: #ff0080; font-weight: 600; margin-top: 1rem; }
        .contact-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto; }
        .contact-card { background: #111; padding: 2rem; border-radius: 16px; border: 1px solid #222; text-align: center; transition: all 0.3s; }
        .contact-card:hover { transform: translateY(-5px); border-color: #ff0080; background: rgba(255, 0, 128, 0.05); }
        .contact-icon-wrapper { width: 70px; height: 70px; margin: 0 auto 1.5rem; background: linear-gradient(135deg, #ff0080, #ff8c00); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .contact-label { font-size: 0.9rem; color: #888; margin-bottom: 0.5rem; }
        .contact-value { color: #fff; text-decoration: none; font-weight: 600; transition: color 0.3s; word-break: break-word; }
        .contact-value:hover { color: #ff0080; }
        .footer { padding: 2rem 4rem; text-align: center; border-top: 1px solid #222; color: #888; }
        .animate-on-scroll { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
        .animate-on-scroll.animate-in { opacity: 1; transform: translateY(0); }
        @media (max-width: 1024px) {
          .sidebar { display: none; }
          .main-content { margin-left: 0; }
          .mobile-nav { display: block; position: fixed; top: 0; left: 0; right: 0; background: rgba(17, 17, 17, 0.95); backdrop-filter: blur(10px); border-bottom: 1px solid #222; padding: 1rem 2rem; z-index: 1000; }
          .mobile-nav-container { display: flex; justify-content: space-between; align-items: center; }
          .mobile-brand { font-size: 1.5rem; font-weight: 800; }
          .mobile-toggle { background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; }
          .hero { grid-template-columns: 1fr; padding: 6rem 2rem 4rem; }
          .hero-title { font-size: 2.5rem; }
          .hero-image-wrapper { width: 300px; height: 400px; }
          .services-grid { grid-template-columns: 1fr; }
          .resume-grid { grid-template-columns: 1fr; }
          .contact-grid { grid-template-columns: repeat(2, 1fr); }
          .section { padding: 4rem 2rem; }
        }
        @media (max-width: 640px) {
          .hero-title { font-size: 2rem; }
          .contact-grid, .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand">Hi, I'm <span className="name">Logesh S</span></div>
          <div className="sidebar-subtitle">Java Developer</div>
        </div>
        <ul className="sidebar-nav">
          <li><a href="#home" className={`sidebar-link ${activeSection === 'home' ? 'active' : ''}`}><ChevronRight size={20} /> Home</a></li>
          <li><a href="#about" className={`sidebar-link ${activeSection === 'about' ? 'active' : ''}`}><ChevronRight size={20} /> What I Do</a></li>
          <li><a href="#skills" className={`sidebar-link ${activeSection === 'skills' ? 'active' : ''}`}><ChevronRight size={20} /> Skills</a></li>
          <li><a href="#projects" className={`sidebar-link ${activeSection === 'projects' ? 'active' : ''}`}><ChevronRight size={20} /> Portfolio</a></li>
          <li><a href="#resume" className={`sidebar-link ${activeSection === 'resume' ? 'active' : ''}`}><ChevronRight size={20} /> Resume</a></li>
          <li><a href="#contact" className={`sidebar-link ${activeSection === 'contact' ? 'active' : ''}`}><ChevronRight size={20} /> Contact</a></li>
        </ul>
        <div className="sidebar-footer">
          <div className="sidebar-social">
            <a href="https://github.com/Logesh014" target="_blank" rel="noopener noreferrer" className="social-icon"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/logesh-senthil-kumar/" target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={20} /></a>
            <a href="https://leetcode.com/u/logeshs14/" target="_blank" rel="noopener noreferrer" className="social-icon"><Code size={20} /></a>
          </div>
        </div>
      </aside>

      <nav className="mobile-nav">
        <div className="mobile-nav-container">
          <div className="mobile-brand">Logesh</div>
          <button className="mobile-toggle" onClick={() => setIsNavOpen(!isNavOpen)}>☰</button>
        </div>
      </nav>

      <main className="main-content">
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="hero-label">WELCOME TO MY WORLD</div>
            <h1 className="hero-title">Hi, I'm <span className="gradient">Logesh S</span></h1>
            <h2 className="hero-subtitle">a Java Developer.</h2>
            <p className="hero-description">
              I build exceptional and accessible digital experiences. Passionate about creating efficient, scalable applications and solving complex problems.
            </p>
            <div className="typed-text" ref={typedElement}></div>
            <div className="hero-buttons">
              <a href="#contact" className="btn-primary">Hire Me <ExternalLink size={18} /></a>
              <a href="#projects" className="btn-secondary">View Projects</a>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <img src={profile} alt="Logesh" className="hero-image" />
          </div>
          <div className="floating-badge floating-badge-1">
            <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>10+</div>
            <div style={{ fontSize: '0.85rem', color: '#888' }}>Projects</div>
          </div>
          <div className="floating-badge floating-badge-2">
            <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>CGPA 8.18</div>
            <div style={{ fontSize: '0.85rem', color: '#888' }}>Academic</div>
          </div>
        </section>

        <section className="section animate-on-scroll" id="about">
          <div className="section-header">
            <div className="section-label">WHAT I DO</div>
            <h2 className="section-title">My Services</h2>
            <p className="section-description">I offer comprehensive software development services from concept to deployment</p>
          </div>
          <div className="services-grid">
            {services.map((service, i) => (
              <div key={i} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section animate-on-scroll" id="skills" ref={skillsSectionRef}>
          <div className="section-header">
            <div className="section-label">MY EXPERTISE</div>
            <h2 className="section-title">Technical Skills</h2>
          </div>
          <div className="skills-container">
            {skillCategories.map((category, i) => (
              <div key={i} className="skills-category">
                <h3 className="skills-category-title">{category.title}</h3>
                <div className="skills-list">
                  {category.skills.map((skill, j) => (
                    <div key={j} className="skill-item animate-on-scroll">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar-bg">
                        <div className="skill-bar-fill" data-level={skill.level}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section animate-on-scroll" id="projects">
          <div className="section-header">
            <div className="section-label">MY PORTFOLIO</div>
            <h2 className="section-title">Featured Projects</h2>
          </div>
          <div className="projects-grid">
            {projects.map((project, i) => (
              <div key={i} className="project-card">
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-content">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, j) => <span key={j} className="project-tag">{tag}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section animate-on-scroll" id="resume">
          <div className="section-header">
            <div className="section-label">MY RESUME</div>
            <h2 className="section-title">Education & Experience</h2>
          </div>
          <div className="resume-grid">
            <div className="resume-column">
              <h3>Education Quality</h3>
              <div className="education-card">
                <div className="card-header">
                  <div className="card-icon"><GraduationCap size={24} /></div>
                  <div className="card-info">
                    <h4 className="card-title">{education.degree}</h4>
                    <p className="card-subtitle">{education.field}</p>
                    <div className="card-period"><Calendar size={14} /> {education.year}</div>
                  </div>
                </div>
                <p className="card-description">{education.description}</p>
                <span className="cgpa-badge">CGPA: {education.cgpa}</span>
              </div>
            </div>

            <div className="resume-column">
              <h3>Job Experience</h3>
              {experiences.map((exp, i) => (
                <div key={i} className="experience-card">
                  <div className="card-header">
                    <div className="card-icon"><Briefcase size={24} /></div>
                    <div className="card-info">
                      <h4 className="card-title">{exp.title}</h4>
                      <p className="card-subtitle">{exp.company}</p>
                      <div className="card-period"><Calendar size={14} /> {exp.period}</div>
                    </div>
                  </div>
                  <p className="card-description">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section animate-on-scroll" id="contact">
          <div className="section-header">
            <div className="section-label">CONTACT</div>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-description">Feel free to reach out for collaborations or just a friendly hello</p>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon-wrapper"><Mail size={28} /></div>
              <div className="contact-label">Email</div>
              <a href="mailto:logeshlogesh2004@gmail.com" className="contact-value">logeshlogesh2004@gmail.com</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon-wrapper"><Phone size={28} /></div>
              <div className="contact-label">Phone</div>
              <a href="tel:+919345707679" className="contact-value">+91 9345707679</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon-wrapper"><Linkedin size={28} /></div>
              <div className="contact-label">LinkedIn</div>
              <a href="https://www.linkedin.com/in/logesh-senthil-kumar/" target="_blank" rel="noopener noreferrer" className="contact-value">logesh-senthil-kumar</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon-wrapper"><Github size={28} /></div>
              <div className="contact-label">GitHub</div>
              <a href="https://github.com/Logesh014" target="_blank" rel="noopener noreferrer" className="contact-value">Logesh014</a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>© 2025 Logesh S. All Rights Reserved.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;