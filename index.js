document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.titreHeader').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        let targetID = this.getAttribute('href').substring(1); // Enlever le '#' du href
        let targetElement = document.getElementById(targetID);
        
        let offsetPosition = targetElement.offsetTop - 50;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const workDiv = document.getElementById("work");
    const projets = [
        {
          nom: 'Webscraping',
          description: 'Webscraping website by navigation, bypass securities, grab informations and fill form',
          image: 'projets/Webscraping.svg',
          href: 'https://github.com/johannvig/Student-data-analyse'
        },
        {
          nom: 'Geocoding',
          description: 'Geocoding adress by giving coordinates and search plenty of real adresses around thanks to Mapbox API',
          image: 'projets/Geocoding.svg',
          href: 'https://github.com/johannvig/morpion'
        },
        {
          nom: 'Computer Vision',
          description: 'Handtracking to navigate on a chrome browser only with your hands and voice',
          image: 'projets/ComputerVision.svg',
          href: 'https://github.com/johannvig/ping-pong-pygame'
        },
        {
          nom: 'Machine Learning',
          description: 'Where is Charlie? Give an image and thanks to machine learning, it will show you where he is',
          image: 'projets/MachineLearning.svg',
          href: 'https://github.com/johannvig/where_is_charlie'
        },
        {
          nom: 'Arasaac',
          description: 'Software that will help your children words and actions thanks to a sequency of pictogramms',
          image: 'projets/Arasaac.svg',
          href: 'https://github.com/johannvig/qr-barcode-reader'
        }
      ];
      
  
    projets.forEach(projet => {
      const projetDiv = document.createElement("div");
      projetDiv.classList.add("projects");
  
      const img = document.createElement("img");
      img.src = projet.image;
      img.alt = projet.nom;
  
      const descriptionDiv = document.createElement("div");
      descriptionDiv.id = "description";
  
      const a = document.createElement("a");
      a.innerText = projet.nom;
      a.href = projet.href; 
  
      const p = document.createElement("p");
      p.innerText = projet.description;
  
      descriptionDiv.appendChild(a);
      descriptionDiv.appendChild(p);
  
      projetDiv.appendChild(img);
      projetDiv.appendChild(descriptionDiv);
  
      workDiv.appendChild(projetDiv);
    });
  });
  
  
let phrases = [
    "I’m Johanne. I’m a student in 2nd year of Computer Science in France",
    "I’m passionate about software development, data and testing the security",
    "I also love art, economics, philosophy, neuroscience and shoes conception",];
  let index = 0;
  
  function changeText() {
    let element = document.querySelector("#aboutMe h1");
    
    // Cloner l'élément original
    let newElement = element.cloneNode(true);
  
    // Supprimer la classe 'animate' du nouvel élément pour être sûr
    newElement.classList.remove("animate");
  
    // Mettre à jour le texte
    newElement.textContent = phrases[index];
  
    // Remplacer l'élément original par le clone
    element.parentNode.replaceChild(newElement, element);
  
    // Forcer un reflow du DOM
    void newElement.offsetWidth;
  
    // Ajouter la classe 'animate' pour démarrer l'animation
    newElement.classList.add("animate");
    
    // Incrémenter l'index pour la prochaine itération
    index = (index + 1) % phrases.length;
  }
  
  // Appeler changeText() toutes les 4 secondes
  setInterval(changeText, 10000);
  
  // Appel initial pour démarrer le cycle
  changeText();
  
  

