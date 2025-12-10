import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Particle System Component
const ParticleWave = ({ count = 3000 }) => {
  // Compute initial positions and colors
  const { positions, originalPositions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Theme colors: Red, White, Dark Grey
    const colorPalette = [
      new THREE.Color('#D92323'), // Band Red
      new THREE.Color('#FFFFFF'), // White
      new THREE.Color('#333333')  // Dark Grey
    ];

    for (let i = 0; i < count; i++) {
      // Create a wave-like distribution
      const x = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;
      const y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 2; // Initial wave shape

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Assign random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, originalPositions, colors };
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);
  // We need a ref to store current positions for mutation without re-render
  // but since we are modifying the attribute array directly, we use the attribute.

  useFrame((state) => {
    if (!pointsRef.current) return;

    const { mouse, clock } = state;
    const time = clock.getElapsedTime();

    // Convert normalized mouse coordinates (-1 to 1) to world coordinates (roughly)
    // Camera is at z=10, so at z=0 plane, x spans approx -8 to 8
    const mouseX = mouse.x * 10;
    const mouseY = mouse.y * 5; // Simplified projection for interaction

    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // 1. Base animation (Wave movement)
      const ox = originalPositions[i3];
      const oz = originalPositions[i3 + 2];

      // Calculate the "resting" position with animated wave
      const waveY = Math.sin(time * 2 + ox * 0.5) * 0.5 + Math.cos(time * 1.5 + oz * 0.5) * 0.5;
      const targetY = originalPositions[i3 + 1] + waveY;

      // 2. Mouse Interaction (Repulsion/Attraction)
      // Calculate distance to mouse
      const px = positionsArray[i3];
      const py = positionsArray[i3 + 1];

      const dx = mouseX - px;
      const dy = mouseY - py;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq);

      const repulsionRadius = 4;

      let forceX = 0;
      let forceY = 0;
      let forceZ = 0;

      if (dist < repulsionRadius) {
        // Calculate repulsion force - stronger when closer
        const force = (repulsionRadius - dist) / repulsionRadius;
        // Push away from mouse
        const angle = Math.atan2(dy, dx);

        // Spread out effect
        forceX = -Math.cos(angle) * force * 5;
        forceY = -Math.sin(angle) * force * 5;
        forceZ = -Math.cos(angle) * force * 5; // Push back/forward too
      }

      // 3. Update Positions (Lerp towards target + force)
      // Lerp factor
      const lerp = 0.05;

      // Apply forces to current position
      // We want to lerp current position towards (Original + Wave + Force)
      // But force is instantaneous displacement here for simplicity in this frame

      // Target position is original X + Force
      const targetXWithForce = ox + forceX;
      const targetYWithForce = targetY + forceY;
      const targetZWithForce = oz + forceZ;

      positionsArray[i3] = positionsArray[i3] + (targetXWithForce - positionsArray[i3]) * 0.1;
      positionsArray[i3 + 1] = positionsArray[i3 + 1] + (targetYWithForce - positionsArray[i3 + 1]) * 0.1;
      positionsArray[i3 + 2] = positionsArray[i3 + 2] + (targetZWithForce - positionsArray[i3 + 2]) * 0.1;
    }

    // Mark attribute as needing update
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotate the whole system slightly
    pointsRef.current.rotation.y = time * 0.05;
  });

  // Create a circular texture
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(16, 16, 14, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        map={circleTexture}
        transparent
        alphaTest={0.5}
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

const ThreeHero: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0 opacity-100" style={{ pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <color attach="background" args={['#050505']} />
        <ParticleWave />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
};

export default ThreeHero;