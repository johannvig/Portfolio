import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SÉCURITÉ ABSOLUE : On supprime TOUT résidu (l'ancien canevas statique) avant de créer le nouveau
    mountRef.current.replaceChildren();

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505); // Ton fond d'origine

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const cameraSetBackDist = 7;
    camera.position.z = cameraSetBackDist;

    const light = new THREE.PointLight(0xffffff, 2);
    light.position.set(10, 10, 10);
    scene.add(light);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // On l'injecte proprement dans la ref isolée de React
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1, 2); 
    const geometryPos = geometry.getAttribute('position').array;
    const mesh = [];
    const normalDirection = [];

    for (let i = 0; i < geometryPos.length; i += 9) {
      const geometry2 = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        geometryPos[i], geometryPos[i + 1], geometryPos[i + 2],
        geometryPos[i + 3], geometryPos[i + 4], geometryPos[i + 5],
        geometryPos[i + 6], geometryPos[i + 7], geometryPos[i + 8],
      ]);

      geometry2.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      geometry2.setAttribute('normal', new THREE.BufferAttribute(vertices, 3));

      const normal = new THREE.Vector3(
        (geometryPos[i] + geometryPos[i + 3] + geometryPos[i + 6]) / 3,
        (geometryPos[i + 1] + geometryPos[i + 4] + geometryPos[i + 7]) / 3,
        (geometryPos[i + 2] + geometryPos[i + 5] + geometryPos[i + 8]) / 3
      );
      normal.normalize();

      const icoSphereGeometry = new THREE.IcosahedronGeometry(0.1, 0); 
      const material = new THREE.MeshBasicMaterial({
        wireframe: false,
        color: 0xc100eb,
      });

      const sphere = new THREE.Mesh(icoSphereGeometry, material);
      mesh.push(sphere);
      normalDirection.push(normal);
    }

    let rot = 0;
    let currentLoopSpeed = 0; 
    let scrollPercent = 0;
    const sceneScale = 1.4;
    const clock = new THREE.Clock();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let animationFrameId;

    const tick = () => {
      rot += 0.3 + (scrollPercent * 1.5); 
      const cameraAngle = (rot * Math.PI) / 180;
      
      const currentCameraDist = cameraSetBackDist - (scrollPercent * 5.0);
      
      let x = currentCameraDist * Math.sin(cameraAngle);
      let z = currentCameraDist * Math.cos(cameraAngle);
      camera.position.set(x, 0, z);
      camera.lookAt(0, 0, 0);

      const elapsedTime = clock.getElapsedTime();
      currentLoopSpeed += 0.003; 
      let localLoopSpeed = currentLoopSpeed;

      mesh.forEach((spheremesh, index) => {
        const coordinateAverageValue =
          (normalDirection[index].x + normalDirection[index].y + normalDirection[index].z) / 3;
        const addAngle = coordinateAverageValue * elapsedTime * 1;
        
        const baseDistance = 0.5 * sceneScale;
        localLoopSpeed += 0.002; 
        const radians = (localLoopSpeed * Math.PI) / 180;
        const angle = radians + addAngle;
        
        const scrollExpansion = scrollPercent * 4.0;
        const loop = ((Math.sin(angle) + 1) * baseDistance) + scrollExpansion;
        const scale = (Math.sin(angle) + 1.1) * 0.1 * sceneScale; 

        // Rendu en ellipse aplatie d'origine
        spheremesh.position.set(
          normalDirection[index].x * loop * 1.3 * sceneScale,
          normalDirection[index].y * loop * 0.8 * sceneScale,
          normalDirection[index].z * loop * sceneScale
        );
        spheremesh.scale.set(scale, scale, scale);

        const h = Math.abs(Math.sin(angle)) * 360;
        spheremesh.material.color.setHSL(h / 360, 1.0, 0.7);
        spheremesh.material.needsUpdate = true;

        scene.add(spheremesh);
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Nettoyage strict pour éviter les fantômes
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      geometry.dispose();
      mesh.forEach(sphere => {
        sphere.geometry.dispose();
        sphere.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'fixed',
        top: '160px',
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 160px)',
        zIndex: -1, // S'affiche strictly derrière le contenu HTML
        pointerEvents: 'none',
        margin: 0,
        padding: 0
      }}
    />
  );
};

export default ThreeBackground;