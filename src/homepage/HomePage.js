// Home.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThreeBackground from './ThreeBackground';
import './HomePage.css'; 

const Home = () => {
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

    const handleMouseOver = (e) => {
      if (e.target.matches('p, h1, h2, h3, h4, h5, h6, span, a')) {
        e.target.classList.add('invert-text');
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.matches('p, h1, h2, h3, h4, h5, h6, span, a')) {
        e.target.classList.remove('invert-text');
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    const links = Array.from(document.querySelectorAll('a'));
    links.forEach(link => {
      link.addEventListener('mouseover', () => innerCursor.classList.add('grow'));
      link.addEventListener('mouseleave', () => innerCursor.classList.remove('grow'));
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      links.forEach(link => {
        link.removeEventListener('mouseover', () => innerCursor.classList.add('grow'));
        link.removeEventListener('mouseleave', () => innerCursor.classList.remove('grow'));
      });
    };
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <ThreeBackground />
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3em', margin: '0.5em 0' }}>JOHANNE VIGOUROUX</h1>
        <p style={{ fontSize: '1.3em', margin: '0.5em 0' }}>CRÉATIVE | INNOVATRICE | DÉVELOPPEUSE</p>
        <div style={{ marginTop: '1em' }}>
          <Link to="/sphere" style={{ margin: '0 10px', color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>Play</Link>
          <Link to="/profile" style={{ margin: '0 10px', color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>Qui suis-je ?</Link>
          <Link to="/projects" style={{ margin: '0 10px', color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>Projet</Link>
        </div>
      </div>
      <div className="inner-cursor"></div>
      <div className="outer-cursor"></div>
    </div>
  );
};

export default Home;
