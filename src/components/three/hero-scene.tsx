"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Generated once at module load (not during any component's render), so the
// scattering is fixed data rather than a render-time side effect.
function generateParticlePositions(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 3.4 + Math.random() * 1.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

const PARTICLE_POSITIONS = generateParticlePositions(400);

function Particles() {
  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.035;
  });

  return (
    <Points ref={ref} positions={PARTICLE_POSITIONS} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#c6ff3d"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function DistortedCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.12;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
  });

  return (
    <Icosahedron ref={meshRef} args={[1.7, 4]}>
      <MeshDistortMaterial
        color="#c6ff3d"
        wireframe
        distort={0.35}
        speed={1.4}
        emissive="#c6ff3d"
        emissiveIntensity={0.15}
      />
    </Icosahedron>
  );
}

export function HeroScene({ interactive = false }: { interactive?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent", touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#c6ff3d" />
      <DistortedCore />
      <Particles />
      {interactive && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          autoRotate
          autoRotateSpeed={0.6}
          rotateSpeed={0.5}
        />
      )}
    </Canvas>
  );
}
