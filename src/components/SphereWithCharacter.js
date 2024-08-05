import React, { useRef, useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import getStarfield from './getStarfield';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen ';

const Character = React.forwardRef(({ radius, cameraRef, onProximityToDesk, onProximityToTechnical }, ref) => {
  const { scene, animations } = useGLTF('/3d/character.glb');
  const { actions } = useAnimations(animations, scene);
  const [theta, setTheta] = useState(0);
  const [phi, setPhi] = useState(Math.PI / 2);
  const keysPressed = useRef({});

  const handleKeyDown = useCallback((event) => {
    keysPressed.current[event.key] = true;
  }, []);

  const handleKeyUp = useCallback((event) => {
    keysPressed.current[event.key] = false;
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useFrame(() => {
    let newTheta = theta;
    let newPhi = phi;

    if (keysPressed.current['ArrowUp']) {
      newPhi -= 0.05;
    }
    if (keysPressed.current['ArrowDown']) {
      newPhi += 0.05;
    }
    if (keysPressed.current['ArrowLeft']) {
      newTheta += 0.05;
    }
    if (keysPressed.current['ArrowRight']) {
      newTheta -= 0.05;
    }

    newPhi = Math.max(0, Math.min(Math.PI, newPhi));

    if (newPhi === 0 || newPhi === Math.PI) {
      if (keysPressed.current['ArrowLeft'] || keysPressed.current['ArrowRight']) {
        newTheta += 0.05 * (keysPressed.current['ArrowLeft'] ? 1 : -1);
      }
    }

    setTheta(newTheta);
    setPhi(newPhi);

    const x = radius * Math.sin(newPhi) * Math.cos(newTheta);
    const y = radius * Math.cos(newPhi);
    const z = radius * Math.sin(newPhi) * Math.sin(newTheta);

    ref.current.position.set(x, y, z);
    ref.current.lookAt(0, 0, 0);

    const normal = new THREE.Vector3(x, y, z).normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    ref.current.quaternion.copy(quaternion);

    ref.current.rotateY(Math.PI);

    if (cameraRef.current) {
      const directionToCamera = new THREE.Vector3().subVectors(cameraRef.current.position, ref.current.position).normalize();
      ref.current.lookAt(ref.current.position.clone().add(directionToCamera));
    }

    const deskPosition = new THREE.Vector3(
      radius * Math.sin(Math.PI / 2) * Math.cos((120 * Math.PI) / 180),
      radius * Math.cos(Math.PI / 2),
      radius * Math.sin(Math.PI / 2) * Math.sin((120 * Math.PI) / 180)
    );
    if (ref.current.position.distanceTo(deskPosition) < 5) {
      onProximityToDesk(true);
    } else {
      onProximityToDesk(false);
    }

    const technicalPosition = new THREE.Vector3(
      radius * Math.sin(Math.PI / 2) * Math.cos(0),
      radius * Math.cos(Math.PI / 2),
      radius * Math.sin(Math.PI / 2) * Math.sin(0)
    );
    if (ref.current.position.distanceTo(technicalPosition) < 5) {
      onProximityToTechnical(true);
    } else {
      onProximityToTechnical(false);
    }
  });

  useEffect(() => {
    if (actions['Walk']) {
      actions['Walk'].play();
    }
  }, [actions]);

  return <primitive ref={ref} object={scene} scale={[0.5, 0.5, 0.5]} />;
});

const StaticModel = ({ modelPath, position, scale }) => {
  const { scene } = useGLTF(modelPath);

  scene.position.set(position.x, position.y, position.z);
  scene.scale.set(scale, scale, scale);
  const normal = new THREE.Vector3(position.x, position.y, position.z).normalize();
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
  scene.quaternion.copy(quaternion);
  scene.rotateY(Math.PI / 2);

  return <primitive object={scene} />;
};

const FollowCamera = React.forwardRef(({ targetRef, radius }, ref) => {
  const localCameraRef = useRef();

  useFrame(() => {
    if (localCameraRef.current && targetRef.current) {
      const targetPosition = targetRef.current.position;
      const direction = new THREE.Vector3().subVectors(targetPosition, new THREE.Vector3(0, 0, 0)).normalize();
      const offset = new THREE.Vector3(0, 2, -5);
      const cameraPosition = targetPosition.clone().add(direction.multiplyScalar(radius * 2)).add(offset);

      localCameraRef.current.position.copy(cameraPosition);
      localCameraRef.current.lookAt(targetRef.current.position);
    }
  });

  return <PerspectiveCamera ref={(instance) => { ref.current = instance; localCameraRef.current = instance; }} makeDefault fov={75} />;
});

function mergeRefs(refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

const SphereWithCharacter = () => {
  const radius = 20;
  const characterRef = useRef();
  const cameraRef = useRef();
  const [showDeskPrompt, setShowDeskPrompt] = useState(false);
  const [showTechnicalPrompt, setShowTechnicalPrompt] = useState(false);
  const texture = useLoader(THREE.TextureLoader, '/textures/space-texture.jpg');
  const moonTexture = useLoader(THREE.TextureLoader, '/textures/moon-texture.jpg');
  const starfield = useMemo(() => getStarfield(), []);
  const navigate = useNavigate();

  useEffect(() => {
    if (performance.getEntriesByType('navigation')[0].type !== 'reload') {
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        if (showDeskPrompt) {
          navigate('/profile');
        } else if (showTechnicalPrompt) {
          navigate('/projects');
        }
      } else if (event.key === 'q') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showDeskPrompt, showTechnicalPrompt, navigate]);

  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Canvas style={{ height: '100vh' }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls enableZoom={true} />

          <primitive object={starfield} />

          <mesh>
            <sphereGeometry args={[1500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
          </mesh>

          <mesh>
            <sphereGeometry args={[radius, 16, 16]} /> {/* Réduisez les subdivisions */}
            <meshStandardMaterial map={moonTexture} />
          </mesh>
          
          <Character
            ref={characterRef}
            radius={radius}
            cameraRef={cameraRef}
            onProximityToDesk={(proximity) => setShowDeskPrompt(proximity)}
            onProximityToTechnical={(proximity) => setShowTechnicalPrompt(proximity)}
          />
          <StaticModel modelPath="/3d/technical.glb" position={{ x: radius, y: 0, z: 0 }} scale={7} />
          <StaticModel modelPath="/3d/desk.glb" position={{ x: radius * Math.cos((120 * Math.PI) / 180), y: 0, z: radius * Math.sin((120 * Math.PI) / 180) }} scale={2} />
          <StaticModel modelPath="/3d/apollo_11.glb" position={{ x: -2.2788871119513776e-15, y: -20, z: -8.976149851853747e-16 }} scale={2} />
          <StaticModel modelPath="/3d/arcade.glb" position={{ x: 0, y: -radius, z: 0 }} scale={4} /> {/* Position ajustée pour toucher le sol */}

          <FollowCamera targetRef={characterRef} radius={radius} ref={cameraRef} />
        </Canvas>
      </Suspense>

      {showDeskPrompt && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          Appuyez sur la barre d'espace pour découvrir mon profil
        </div>
      )}
      {showTechnicalPrompt && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          Appuyez sur la barre d'espace pour découvrir mes projets
        </div>
      )}
    </>
  );
};

export default SphereWithCharacter;
