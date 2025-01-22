import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../profil/ProfilePage.css';
import ScrollingWords from '../scrolling_words/ScrollingWords';
import ReverseScrollingWords from '../reverse_scrolling_words/ReverseScrollingWords';
import cvPDF from './CV.pdf';

const ProfilePage = () => {
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

    const links = Array.from(document.querySelectorAll('a, li, .cv-button'));
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
    <div className="profile-container">
      <ScrollingWords />
      <ReverseScrollingWords />
      <header className="profile-header">
        <button className="close-btn" onClick={() => navigate('/')}>
          <img src="/images/cross.png" alt="Close" className="close-btn-img" />
        </button>
      </header>
      <main className="profile-main">
        <section className="profile-about">
          <h1>À propos</h1>
          <h2>Johanne Vigouroux</h2>
          <p>J’ai débuté mon parcours académique en informatique à l'IUT de Laval avant de poursuivre mes études à l'Université du Québec à Chicoutimi (UQAC) en tant qu'étudiante dans un programme bi-diplômant. Actuellement en 3ème année d'informatique, je m'immerge pleinement dans chaque projet en me concentrant sur un code propre et des solutions efficaces.</p>
          <p>Je conçois des solutions web en utilisant un large éventail de technologies, allant des langages de base tels que HTML, CSS et JavaScript, à PHP et divers frameworks comme Angular IONIC, Node.js et Symfony.</p>
          <p>Je maîtrise également la programmation orientée objet ainsi que les design patterns, grâce à mon expérience avec les langages Java et Python.</p>
        </section>
        <section className="profile-cv">
          <a href={cvPDF} download className="cv-button">
            <i className="download-icon"></i> CV
          </a>
        </section>
        <section className="profile-expertise">
          <h1>Expertises</h1>
          <div className="expertise-cards">
            <div className="expertise-card">
              <h2>Prototypage interactif</h2>
              <p>Lors de l’étape de conception d’un projet, je réalise une version interactive de la maquette avec Figma pour vous permettre de se projeter plus facilement à partir d'un cahier des charges.</p>
              <br/>
              <div className="tools-list-card">
                <div className="tooltip">
                  <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="Figma"/>
                  <span className="tooltiptext">Figma</span>
                </div>
              </div>
            </div>
            <div className="expertise-card">
              <h2>Réaliser et déployer une application</h2>
              <p>Une fois l’étape de web design terminée, je m’occupe du développement de l’interface graphique des différentes pages du site et de le déployer sur le web.</p>
              <br/>
              <div className="tools-list-card">
                <div className="tooltip">
                  <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="Angular" />
                  <span className="tooltiptext">Angular</span>
                </div>
                <div className="tooltip">
                  <img className="special-img" src="https://cdn.worldvectorlogo.com/logos/android-studio-1.svg" alt="Android Studio" />
                  <span className="tooltiptext">Android Studio</span>
                </div>
                <div className="tooltip">
                  <img src="/images/logo/social.png" alt="Docker" />
                  <span className="tooltiptext">Docker</span>
                </div>
                <div className="tooltip">
                  <img src="https://e7.pngegg.com/pngimages/62/13/png-clipart-microsoft-azure-software-deployment-cloud-computing-infrastructure-as-code-data-center-cloud-computing-blue-angle.png" alt="Azure DevOps" />
                  <span className="tooltiptext">"Azure DevOps</span>
                </div>
              </div>
            </div>
            <div className="expertise-card">
              <h2>Tester et optimiser une application</h2>
              <p>Je suis capable de tester et optimiser les applications pour assurer leur bon fonctionnement et améliorer leurs performances.</p>
              <br/>
              <div className="tools-list-card">
                <div className="tooltip">
                  <img src="https://raw.githubusercontent.com/detain/svg-logos/780f25886640cef088af994181646db2f6b1a3f8/svg/selenium-logo.svg" alt="Selenium" />
                  <span className="tooltiptext">Selenium</span>
                </div>
                <div className="tooltip">
                  <img src="https://seeklogo.com/images/P/postman-logo-0087CA0D15-seeklogo.com.png" alt="Postman" />
                  <span className="tooltiptext">Postman</span>
                </div>
                <div className="tooltip">
                  <img className="special-img" src="/images/logo/squashtm.png" alt="SquashTM" />
                  <span className="tooltiptext">SquashTM</span>
                </div>
                <div className="tooltip">
                  <img className="special-img" src="/images/logo/junit.png" alt="Junit" />
                  <span className="tooltiptext">Junit</span>
                </div>
              </div>
            </div>
            <div className="expertise-card">
              <h2>Conduire un projet</h2>
              <p>Je suis capable de conduire des projets de bout en bout de la conception à la livraison en assurant le respect des délais et des exigences grâce à la méthode agile.</p>
              <br/>
              <div className="tools-list-card">
                <div className="tooltip">
                  <img src="/images/logo/jira.png" alt="Jira" />
                  <span className="tooltiptext">Jira</span>
                </div>
                <div className="tooltip">
                  <img src="/images/logo/trello.png" alt="Trello" />
                  <span className="tooltiptext">Trello</span>
                </div>
                <div className="tooltip">
                  <img src="/images/logo/git.png" alt="Git" />
                  <span className="tooltiptext">Git</span>
                </div>
                <div className="tooltip">
                  <img src="/images/logo/gantt.webp" alt="Gantt" />
                  <span className="tooltiptext">Gantt</span>
                </div>
              </div>
            </div>
            <div className="expertise-card">
              <h2>Administrer des systèmes informatiques communicants complexes</h2>
              <p>Je maîtrise l'administration des systèmes informatiques complexes, garantissant la communication fluide et sécurisée des données.</p>
              <br/>
              <div className="tools-list-card">
                <div className="tooltip">
                  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="MySQL" />
                  <span className="tooltiptext">MySQL</span>
                </div>
                <div className="tooltip">
                  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
                  <span className="tooltiptext">MongoDB</span>
                </div>
                <div className="tooltip">
                  <img src="/images/logo/redis.png" alt="Redis" />
                  <span className="tooltiptext">Redis</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="profile-tools">
          <h1>Mes outils</h1>
          <div className="tools-category">
            <h2>Développement Web</h2>
            <div className="tools-list">
              <div className="tooltip">
                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" alt="PHP" />
                <span className="tooltiptext">PHP</span>
              </div>
              <div className="tooltip">
                <img src="https://symfony.com/logos/symfony_black_03.svg" alt="Symfony" />
                <span className="tooltiptext">Symfony</span>
              </div>
              <div className="tooltip">
                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="Node.js" />
                <span className="tooltiptext">Node.js</span>
              </div>
              <div className="tooltip">
                <img src="https://e7.pngegg.com/pngimages/939/2/png-clipart-flask-python-web-framework-representational-state-transfer-software-framework-flask-python-web-application-django.png" alt="Flask" />
                <span className="tooltiptext">Flask</span>
              </div>
              <div className="tooltip">
                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" />
                <span className="tooltiptext">React</span>
              </div>
              <div className="tooltip">
                <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="Angular" />
                <span className="tooltiptext">Angular</span>
              </div>
              <div className="tooltip">
                <img src="https://image.pngaaa.com/401/7820401-middle.png" alt="Next.js" />
                <span className="tooltiptext">Next.js</span>
              </div>
              <div className="tooltip">
                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="Javascript" />
                <span className="tooltiptext">Javascript</span>
              </div>
            </div>
          </div>
          <div className="tools-category">
            <h2>Développement Mobile</h2>
            <div className="tools-list">
              <div className="tooltip">
                <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="Angular" />
                <span className="tooltiptext">Angular</span>
              </div>
              <div className="tooltip">
                <img src="https://cdn.worldvectorlogo.com/logos/android-studio-1.svg" alt="Android Studio" />
                <span className="tooltiptext">Android Studio</span>
              </div>
              <div className="tooltip">
                <img src="https://i.pinimg.com/736x/9d/84/09/9d8409f31712045b9741288acef0059e.jpg" alt="Flutter" />
                <span className="tooltiptext">Flutter</span>
              </div>
            </div>
          </div>
          <div className="tools-category">
            <h2>Autres outils</h2>
            <div className="tools-list">
              <div className="tooltip">
                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="Python" />
                <span className="tooltiptext">Python</span>
              </div>
              <div className="tooltip">
                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="Java" />
                <span className="tooltiptext">Java</span>
              </div>
              <div className="tooltip">
                <img src="/images/logo/apex.png" alt="Apex" />
                <span className="tooltiptext">Apex</span>
              </div>
              <div className="tooltip">
                <img src="/images/logo/opencv.png" alt="OpenCV" />
                <span className="tooltiptext">OpenCV</span>
              </div>
              <div className="tooltip">
                <img src="/images/logo/tensorflow.png" alt="Tensorflow" />
                <span className="tooltiptext">Tensorflow</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="profile-footer">
        <div className="footer-bar"></div>
        <div className="footer-icons">
          <a href="https://github.com/johannvig" target="_blank" rel="noopener noreferrer">
            <img src="/images/logo/github.png" alt="GitHub" className="invert-colors" />
          </a>
          <a href="https://www.linkedin.com/in/johanne-vigouroux-ab8810244" target="_blank" rel="noopener noreferrer">
            <img src="/images/logo/linkedin.png" alt="LinkedIn" className="invert-colors" />
          </a>
          <a href="mailto:johanne.vigouroux.etu@univ-lemans.fr">
            <img src="/images/logo/e-mail.png" alt="Email" className="invert-colors"/>
          </a>
        </div>
        <p>© 2024 - Johanne Vigouroux - Développeuse web full-stack</p>
      </footer>
      <div className="inner-cursor"></div>
      <div className="outer-cursor"></div>
    </div>
  );
};

export default ProfilePage;
