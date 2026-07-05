import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreeBackground from './ThreeBackground';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const cardsRef = useRef([]);

  const projectsData = [
    {
      id: "parklech",
      title: "Parklec'h",
      tags: "Développement Backend / Design UX-UI",
      desc: "Application web éco-conçue permettant de connaître en temps réel la disponibilité des places de parkings à travers la France."
    },
    {
      id: "bookscape",
      title: "BookScape",
      tags: "UI Design / Concept Web",
      desc: "Création d'une plateforme immersive d'exploration et de recommandation littéraire centrée sur l'expérience utilisateur."
    },
    {
      id: "pictocomm",
      title: "PictoComm",
      tags: "UX Research / Accessibilité",
      desc: "Application d'aide à la communication par pictogrammes conçue pour fluidifier les interactions."
    }
  ];

  useEffect(() => {
    const innerCursor = document.querySelector('.inner-cursor');
    const outerCursor = document.querySelector('.outer-cursor');

    const moveCursor = (e) => {
      if (innerCursor && outerCursor) {
        gsap.to(innerCursor, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(outerCursor, { x: e.clientX, y: e.clientY, duration: 0.15 });
      }
    };

    window.addEventListener('mousemove', moveCursor);

    // Initialisation de la timeline de Scroll GSAP
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Évanouissement du titre principal
    if (heroRef.current) {
      masterTimeline.to(heroRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1
      }, 0);
    }

    // Animation du carrousel de projets au scroll
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const startTime = 1 + index * 2.5;

      masterTimeline.fromTo(card, 
        { opacity: 0, scale: 0.5, visibility: 'hidden' },
        { opacity: 1, scale: 1, visibility: 'visible', duration: 1 },
        startTime
      )
      .to(card, { opacity: 1, scale: 1, duration: 1 })
      .to(card, { opacity: 0, scale: 1.5, visibility: 'hidden', duration: 1 }, startTime + 2);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: '500vh', backgroundColor: '#000' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* Le fond en particules 3D */}
        <ThreeBackground />

        {/* Hero Section Épurée */}
        <div ref={heroRef} style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, textAlign: 'center', color: '#fff', fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: '3.5em', margin: '0.1em 0', fontWeight: '800', letterSpacing: '2px' }}>JOHANNE VIGOUROUX</h1>
          <p style={{ fontSize: '1.1em', margin: '0.5em 0', letterSpacing: '4px', color: '#aaa' }}>UI/UX DESIGNER | CREATIVE ENGINEER</p>
        </div>

        {/* Overlay des cartes projets */}
        <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none', zIndex: 5 }}>
          {projectsData.map((project, index) => (
            <div 
              key={project.id}
              ref={el => cardsRef.current[index] = el}
              style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '90%', maxWidth: '500px', background: 'rgba(5, 5, 5, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px',
                textAlign: 'center', backdropFilter: 'blur(10px)', pointerEvents: 'auto', opacity: 0
              }}
            >
              <h2 style={{ fontSize: '2.2em', margin: '0 0 10px 0', color: '#fff' }}>{project.title}</h2>
              <h3 style={{ fontSize: '0.9em', color: '#00f3ff', margin: '0 0 15px 0', letterSpacing: '2px', textTransform: 'uppercase' }}>{project.tags}</h3>
              <p style={{ color: '#ccc', fontSize: '0.95em', lineHeight: '1.6', marginBottom: '25px' }}>{project.desc}</p>
              <Link to={`/projects/${project.id}`} style={{ display: 'inline-block', padding: '10px 25px', background: '#fff', color: '#000', textDecoration: 'none', borderRadius: '30px', fontWeight: '700' }}>
                Découvrir le projet
              </Link>
            </div>
          ))}
        </div>

        {/* Curseurs Custom */}
        <div className="inner-cursor" style={{ position: 'fixed', top: 0, left: 0, width: '8px', height: '8px', backgroundColor: '#fff', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference' }}></div>
        <div className="outer-cursor" style={{ position: 'fixed', top: 0, left: 0, width: '24px', height: '24px', border: '1px solid #fff', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference' }}></div>

      </div>
    </div>
  );
};

export default HomePage;