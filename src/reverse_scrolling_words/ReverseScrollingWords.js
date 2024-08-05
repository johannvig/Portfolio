import React, { useEffect } from 'react';
import './ReverseScrollingWords.css';

const ReverseScrollingWords = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollingWords = document.querySelector('.reverse-scrolling-words');
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
    <div className="reverse-scrolling-words">
      <div className="word">REACT</div>
      <div className="word">ANGULAR</div>
      <div className="word">FIGMA</div>
      <div className="word">NODE.JS</div>
    </div>
  );
};

export default ReverseScrollingWords;
