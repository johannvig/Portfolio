import React, { useEffect } from 'react';
import './ScrollingWords.css';

const ScrollingWords = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollingWords = document.querySelector('.scrolling-words');
      const threshold = 10; // Ajustez cette valeur selon les besoins

      if (window.scrollY > threshold) {
        scrollingWords.classList.add('hidden');
      } else {
        scrollingWords.classList.remove('hidden');
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="scrolling-words">
      <div className="word">DYNAMIQUE</div>
      <div className="word">RÉSILIENTE</div>
      <div className="word">AUTONOME</div>
      <div className="word">IMPLIQUEE</div>
    </div>
  );
};

export default ScrollingWords;
