import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import cvPDF from '../profil/CV.pdf';
import './TopNavigation.css';

const TopNavigation = () => {
  const location = useLocation();
  const pillRef = useRef(null);
  const glowRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    // 1. On cherche d'abord l'élément qui a la classe active (.is-active)
    let activeLink = pillRef.current?.querySelector('.top-navigation__link.is-active');

    // 2. SÉCURITÉ : Si aucun élément n'est encore actif au premier instant, on prend le premier lien par défaut (Work)
    if (!activeLink) {
      activeLink = pillRef.current?.querySelector('.top-navigation__link');
    }

    // 3. On lance l'animation sur l'élément ciblé
    if (activeLink && glowRef.current && sliderRef.current) {
      const { offsetLeft, offsetWidth } = activeLink;

      // Animation fluide de l'arrière-plan gris (le slider)
      gsap.to(sliderRef.current, {
        left: offsetLeft,
        width: offsetWidth,
        duration: 0.35,
        ease: 'power3.out'
      });

      // Animation fluide du petit trait blanc lumineux (le glow) centré au-dessus du bouton
      const glowWidth = glowRef.current.offsetWidth;
      const targetGlowLeft = offsetLeft + (offsetWidth / 2) - (glowWidth / 2);

      gsap.to(glowRef.current, {
        left: targetGlowLeft,
        duration: 0.35,
        ease: 'power3.out'
      });
    }
  }, [location]); // Se réaligne automatiquement dès que l'URL change

  return (
    <div className="top-navigation" aria-label="Main navigation">
      <div className="top-navigation__spacer" />

      <nav ref={pillRef} className="top-navigation__pill">
        {/* Éléments de structure glissants gérés par GSAP */}
        <div ref={sliderRef} className="top-navigation__slider" />
        <div ref={glowRef} className="top-navigation__glow" />

        <NavLink
          to="/"
          end
          className={({ isActive }) => `top-navigation__link ${isActive ? 'is-active' : ''}`}
        >
          Home
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) => `top-navigation__link ${isActive ? 'is-active' : ''}`}
        >
          Work
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => `top-navigation__link ${isActive ? 'is-active' : ''}`}
        >
          Info
        </NavLink>
      </nav>

      <div className="top-navigation__secondary">
        <a
          className="top-navigation__external"
          href="https://www.linkedin.com/in/johanne-vigouroux-ab8810244"
          target="_blank"
          rel="noreferrer"
        >
          Book <span aria-hidden="true">↗</span>
        </a>
        <a className="top-navigation__external" href={cvPDF} download>
          Resume <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
};

export default TopNavigation;