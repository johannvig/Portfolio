// data/projects.js
export const projects = [
    {
      name: 'Bioclipse',
      urlName: 'bioclipse', 
      year: '2023',
      type: 'Développement FullStack / Design UX-UI',
      technologies: 'PHP / MySQL / Figma / Chatbot OpenAI',
      description: "Ce projet mené sur l'ensemble du semestre S3 avec pour objectif de concevoir et développer une application web  pour les producteurs alimentaires afin de distribuer leurs produits selon des standards professionnels.Les objectifs de ce projet sont de créer une application au sein d'une équipe en utilisant une approche de développement, collecter ainsi que formaliser les besoins à partir d'une description initialement vague ou incomplète et de développer une application qui manipule des données et respecte les paradigmes de qualité.",
      presentation: '/images/project/bioclipse.png',
      link: 'https://github.com/johannvig/Bioclipse',
      gallery: [
        { src: '/images/bioclipse/bioclipse1.png', comment: 'Page d\'accueil' },
        { src: '/images/bioclipse/bioclipse2.png', comment: 'Produits commercialisés par un producteur' },
        { src: '/images/bioclipse/bioclipse3.png', comment: 'Localisation des producteurs' },
        { src: '/images/bioclipse/bioclipse4.png', comment: 'Page de connexion' },
        { src: '/images/bioclipse/bioclipse5.png', comment: 'Page de création de compte' },
        { src: '/images/bioclipse/bioclipse6.png', comment: 'Page des paramètres d\'un compte' },
        { src: '/images/bioclipse/bioclipse7.png', comment: 'Page de la messagerie' },
        { src: '/images/bioclipse/bioclipse9.png', comment: 'Page d\'un produit' },
        { src: '/images/bioclipse/bioclipse10.png', comment: 'Page de la liste des favoris' },
        { src: '/images/bioclipse/bioclipse11.png', comment: 'Page du panier' },
        { src: '/images/bioclipse/bioclipse12.png', comment: 'Page de l\'historique des commandes' },
        { src: '/images/bioclipse/bioclipse13.png', comment: 'Page des inventaires' }
      ],
      colors: {
        darktitlecol: '#ded3c7',
        lighttitlecol: '#3ddd70',
        darkshapecol: '#3ddd70',
        lightshapecol: '#ded3c7',
      },
    },
    {
      name: "Parklec'h",
      urlName: 'parklech', 
      year: '2024',
      type: 'Développement FullStack / Design UX-UI',
      technologies: 'Angular IONIC / MangoDB / API Google Map & data.gouv / Figma',
      description: "Ce site web permet de connaitre la disponibilité des places de parkings à divers endroits à travers la France ainsi que de connaitre le parking le plus proche ayant des places disponibles.",
      presentation: '/images/project/parklech.png',
      link: 'https://github.com/johannvig/Parklec-h',
      gallery: [
        { src: '/images/parklech/parklech1.png', comment: 'Page d\'accueil' },
        { src: '/images/parklech/parklech2.png', comment: "Description d'un parking" },
        { src: '/images/parklech/parklech3.png', comment: "Paramètres d'un compte" },
        { src: '/images/parklech/parklech4.png', comment: 'Visualisation des villes où il y a des parkings' },
        { src: '/images/parklech/parklech5.png', comment: 'Page de connexion' },
        { src: '/images/parklech/parklech6.png', comment: 'Page de création de compte' }
      ],
      colors: {
        darktitlecol: '#6e6ff0',
        lighttitlecol: '#0002d5',
        darkshapecol: '#3e2efe9e',
        lightshapecol: '#0074de5e',
      },
    },
    {
      name: 'BookScape',
      urlName: 'bookscape', 
      year: '2024',
      type: 'Développement FullStack',
      technologies: 'Symfony / Twig / Doctrine / SQLite / API',
      description: "Ce projet est une évolution d'un site de e-commerce existant, visant à améliorer et étendre ses fonctionnalités, sa sécurité et son ergonomie. Ce projet est réalisé dans le cadre d'une initiative académique pour approfondir les connaissances en architecture logicielle et en développement web moderne.",
      presentation: '/images/project/bookscape.png',
      link: 'https://github.com/johannvig/BookScape',
      gallery: [
        { src: '/images/bookscape/bookscape1.png', comment: 'Page d\'accueil' },
        { src: '/images/bookscape/bookscape2.png', comment: 'Produits commercialisés' },
        { src: '/images/bookscape/bookscape3.png', comment: 'Page produit' },
        { src: '/images/bookscape/bookscape4.png', comment: 'Panier' },
        { src: '/images/bookscape/bookscape5.png', comment: 'Page de connexion' },
        { src: '/images/bookscape/bookscape6.png', comment: "Profil utilisateur" },
        { src: '/images/bookscape/bookscape7.png', comment: "Dashboard d'administrateur des produits" },
        { src: '/images/bookscape/bookscape8.png', comment: "Dashboard d'administrateur des utilisateurs" }
      ],
      colors: {
        darktitlecol: '#fff',
        lighttitlecol: '#434343',
        darkshapecol: '#fcdf44',
        lightshapecol: '#ffd70082',
      },
    },
    {
      name: 'Pierre-feuille-ciseaux',
      urlName: 'pfc', 
      year: '2022',
      type: 'Développement logiciel',
      technologies: 'Python / OpenCV / CVzone ',
      description: "Ce projet est une implémentation interactive du jeu classique Pierre-Feuille-Ciseaux. Utilisant la détection de la main via la webcam et la bibliothèque OpenCV, les joueurs peuvent jouer contre l'ordinateur en montrant leur choix avec des gestes de la main. Le projet utilise également la synthèse vocale pour améliorer l'interaction en annonçant les choix et les résultats du jeu.",
      presentation: '/images/project/pierre_feuille_ciseaux.png',
      link: 'https://github.com/johannvig/pierre-feuille-ciseaux',
      gallery: [
        { src: '/images/pfc/pfc1.png', comment: 'Detecteur de mouvements' },
        { src: '/images/pfc/pfc2.png', comment: 'Résumé des parties' }
      ],
      colors: {
        darktitlecol: '#108cd3',
        lighttitlecol: '#ff008f',
        darkshapecol: '#b82199',
        lightshapecol: '#2fd8ff5c',
      },
    },
    {
      name: 'ColorSense',
      urlName: 'colorsense', 
      year: '2024',
      type: 'Développement mobile',
      technologies: 'Android Studio',
      description: "L'application Color Detector aide les personnes malvoyantes et aveugles à identifier les couleurs des objets, comme les vêtements, en utilisant la caméra de leur smartphone. Cette application vise à offrir une alternative plus abordable aux dispositifs commerciaux de détection des couleurs.",
      presentation: '/images/project/colorsense.png',
      link: 'https://github.com/johannvig/ColorSense',
      gallery: [
        { src: '/images/colorsense/colorsense.png', comment: 'Detecteur de couleurs' },
        { src: '/images/colorsense.png', comment: '' },
      ],
      colors: {
        darktitlecol: '#ded3c7',
        lighttitlecol: '#3ddd70',
        darkshapecol: '#3ddd70',
        lightshapecol: '#ded3c7',
      },
    },
    {
      name: 'GuessCountry',
      urlName: 'guesscountry', 
      year: '2024',
      type: 'Développement FullStack',
      technologies: 'PHP / RESTCountries API / MySQL',
      description: "Le Jeu Guess Country est un jeu web simple et engageant, conçu pour permettre aux utilisateurs de tester leurs connaissances sur les pays à travers diverses catégories telles que les drapeaux, les devises, les langues, les localisations et les capitales.",
      presentation: '/images/project/guesscountry.png',
      link: 'https://github.com/johannvig/guessCountry',
      gallery: [
        { src: '/images/guesscountry/guesscountry1.png', comment: 'Page de connexion' },
        { src: '/images/guesscountry/guesscountry2.png', comment: "Page d'enregistrement" },
        { src: '/images/guesscountry/guesscountry3.png', comment: 'Mode de jeu' },
        { src: '/images/guesscountry/guesscountry4.png', comment: 'Deviner le pays associé au drapeau' },
        { src: '/images/guesscountry/guesscountry5.png', comment: 'Page de statistique de jeu' },
        { src: '/images/guesscountry/guesscountry6.png', comment: 'Deviner le pays associé à la monnaie' },
        { src: '/images/guesscountry/guesscountry7.png', comment: 'Score de fin de partie' },
        { src: '/images/guesscountry/guesscountry8.png', comment: 'Deviner le pays associé à la langue' },
        { src: '/images/guesscountry/guesscountry9.png', comment: 'Deviner le pays associé à la localisation' },
        { src: '/images/guesscountry/guesscountry10.png', comment: 'Deviner le pays associé à la capitale' }
      ],
      colors: {
        darktitlecol: '#108cd3',
        lighttitlecol: '#ff008f',
        darkshapecol: '#b82199',
        lightshapecol: '#2fd8ff5c',
      },
    },
    {
      name: 'PictoComm',
      urlName: 'pictocomm', 
      year: '2023',
      type: 'Développement logiciel / Design UX-UI',
      technologies: 'JavaFX / Figma',
      description: "PictoComm est une application conçue pour permettre aux personnes autistes de s'exprimer plus facilement à travers des pictogrammes. Utilisant JavaFX, cette application propose une interface intuitive permettant aux utilisateurs de sélectionner et de communiquer via des images symboliques.",
      presentation: '/images/project/pictocomm.png',
      link: 'https://github.com/johannvig/PictoComm',
      gallery: [
        { src: '/images/pictocomm/pictocomm1.png', comment: 'Choisir un pictogramme' },
        { src: '/images/pictocomm/pictocomm2.png', comment: 'Créer un séquentiel à partir de pictogramme' },
        { src: '/images/pictocomm/pictocomm3.png', comment: 'Personnaliser un pictogramme 1' },
        { src: '/images/pictocomm/pictocomm4.png', comment: 'Personnaliser un pictogramme 2' },
        { src: '/images/pictocomm/pictocomm5.png', comment: 'Page de favoris' }
      ],
      colors: {
        darktitlecol: '#f9bd0a',
        lighttitlecol: '#0264bc',
        darkshapecol: '#0264bc',
        lightshapecol: '#ffb40340',
      },
    },
  
  ];
  
  