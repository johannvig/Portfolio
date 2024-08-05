import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { projects } from '../data/projects';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { projectName } = useParams();
  const project = projects.find(p => p.urlName === projectName);
  const navigate = useNavigate();

  useEffect(() => {
    if (project && project.colors) {
      document.documentElement.style.setProperty('--darktitlecol', project.colors.darktitlecol);
      document.documentElement.style.setProperty('--lighttitlecol', project.colors.lighttitlecol);
      document.documentElement.style.setProperty('--darkshapecol', project.colors.darkshapecol);
      document.documentElement.style.setProperty('--lightshapecol', project.colors.lightshapecol);
    }

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

    const links = Array.from(document.querySelectorAll('a'));
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
  }, [project]);

  if (!project) return <div>Project not found</div>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const projectIndex = projects.findIndex(p => p.urlName === projectName);
  const previousProject = projects[projectIndex - 1];
  const nextProject = projects[projectIndex + 1];

  return (
    <>
      <div className="gradient-background">
        <div className="gradient-bubble"></div>
      </div>
      <div className="project-details-container">
        <button className="close-btn" onClick={() => navigate('/projects')}>
          <img style={{width:'75%'}} src="/images/cross.png" alt="Close" className="close-btn img" />
        </button>
        <div className="project-header">
          <div className="project-info">
            <div>
              <h1 className="project-title">{project.name}</h1>
              <p><strong>ANNÉE</strong> {project.year}</p>
              <p><strong>TYPE</strong> {project.type}</p>
              <p><strong>TECHNOLOGIES</strong> {project.technologies}</p>
            </div>
            <p className="project-description"><strong>DESCRIPTION</strong></p>
            <p>{project.description}</p>
            <p><strong>LIENS</strong> <a href={project.link} target="_blank" rel="noopener noreferrer">Voir le Projet</a></p>
          </div>
        </div>
        <div className="project-gallery">
          <h2>GALERIE DU PROJET</h2>
          <Slider {...sliderSettings}>
            {project.gallery.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image.src} alt={`${project.name} gallery ${index + 1}`} className="gallery-image" />
                <div className="gallery-caption">{image.comment}</div>
              </div>
            ))}
          </Slider>
        </div>
        <footer>
          <p>Liste des packages et introduction du contexte d'application, tout le code est disponible sur mon Github.</p>
          <nav className="project-nav">
            {previousProject && (
              <a href={`/projects/${previousProject.urlName}`} onClick={(e) => { e.preventDefault(); navigate(`/projects/${previousProject.urlName}`); }}>
                Projet Précédent
              </a>
            )}
            {nextProject && (
              <a href={`/projects/${nextProject.urlName}`} onClick={(e) => { e.preventDefault(); navigate(`/projects/${nextProject.urlName}`); }}>
                Projet Suivant
              </a>
            )}
          </nav>
        </footer>
      </div>
      <div className="inner-cursor"></div>
      <div className="outer-cursor"></div>
    </>
  );
};

export default ProjectDetails;
