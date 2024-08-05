// ThreeBackground.js
import React, { useEffect } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const cameraSetBackDist = 7;
    camera.position.z = cameraSetBackDist;

    const light = new THREE.PointLight(0xffffff, 2);
    light.position.set(10, 10, 10);
    scene.add(light);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.getElementById('three-background').appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1, 2); 
    const geometryPos = geometry.getAttribute('position').array;
    const mesh = [];
    const normalDirection = [];

    for (let i = 0; i < geometryPos.length; i += 9) {
      const geometry2 = new THREE.BufferGeometry();

      const vertices = new Float32Array([
        geometryPos[i],
        geometryPos[i + 1],
        geometryPos[i + 2],
        geometryPos[i + 3],
        geometryPos[i + 4],
        geometryPos[i + 5],
        geometryPos[i + 6],
        geometryPos[i + 7],
        geometryPos[i + 8],
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

    let loopSpeed = 0;
    let rot = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      rot += 0.3;
      const cameraAngle = (rot * Math.PI) / 180;
      let z = cameraSetBackDist * Math.cos(cameraAngle);
      let x = cameraSetBackDist * Math.sin(cameraAngle);
      camera.position.set(x, 0, z);
      camera.lookAt(0, 0, 0);

      const elapsedTime = clock.getElapsedTime();

      mesh.map((spheremesh, index) => {
        const coordinateAverageValue =
          (normalDirection[index].x + normalDirection[index].y + normalDirection[index].z) / 3;
        const addAngle = coordinateAverageValue * elapsedTime * 1;
        const distance = 0.5;
        loopSpeed += 0.002;
        const radians = (loopSpeed * Math.PI) / 180;
        const angle = radians + addAngle;
        const loop = (Math.sin(angle) + 1) * distance;
        const scale = (Math.sin(angle) + 1.1) * 0.1; 

        spheremesh.position.set(
          normalDirection[index].x * loop,
          normalDirection[index].y * loop,
          normalDirection[index].z * loop
        );
        spheremesh.scale.set(scale, scale, scale);

        const h = Math.abs(Math.sin(angle)) * 360;
        const s = 100;
        const l = 70;
        const color = new THREE.Color(`hsl(${h},${s}%,${l}%)`);
        spheremesh.material.color = color;

        scene.add(spheremesh);
      });
      requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div id="three-background" style={{ position: 'fixed', bottom: 250, left: 0, width: '100%', height: '50%', zIndex: -1 }}></div>;
};

export default ThreeBackground;
