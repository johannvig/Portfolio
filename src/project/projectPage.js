import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../project/projectPage.css';
import { projects } from '../data/projects';

const ProjectsPage = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const innerCursor = document.querySelector('.inner-cursor');
    const outerCursor = document.querySelector('.outer-cursor');

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      innerCursor.style.left = `${x}px`;
      innerCursor.style.top = `${y}px`;
      outerCursor.style.left = `${x}px`;
      outerCursor.style.top = `${y}px`;
    };

    document.addEventListener('mousemove', moveCursor);

    const links = Array.from(document.querySelectorAll('a, li'));
    links.forEach(link => {
      link.addEventListener('mouseover', () => innerCursor.classList.add('grow'));
      link.addEventListener('mouseleave', () => innerCursor.classList.remove('grow'));
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      links.forEach(link => {
        link.removeEventListener('mouseover', () => innerCursor.classList.add('grow'));
        link.removeEventListener('mouseleave', () => innerCursor.classList.remove('grow'));
      });
    };
  }, []);

  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <div className="logo"></div>
        <button className="close-btn" onClick={() => navigate('/')}>
          <img src="/images/cross.png" alt="Close" className="close-btn img" />
        </button>
      </header>
      <main className="portfolio-main">
        <h1>PROJET</h1>
        <div className="projects-content">
          <ul className="projects-list">
            {projects.map((project, index) => (
              <li
                key={index}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => navigate(`/projects/${project.urlName}`)}
              >
                <span>{project.name}</span>
                <span>{project.year}</span>
              </li>
            ))}
          </ul>
          <div className="project-image">
            {hoveredProject && (
              <img src={hoveredProject.presentation} alt={hoveredProject.name} />
            )}
          </div>
        </div>
      </main>
      <footer className="portfolio-footer">
        <p>PORTFOLIO</p>
        <div className="year-indicator">2024</div>
      </footer>
      <div className="inner-cursor"></div>
      <div className="outer-cursor"></div>
    </div>
  );
};

export default ProjectsPage;
