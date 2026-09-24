"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ACCENT = "#c97b3d";
const NODE_COUNT = 34;

// A small "data graph" — nodes scattered on a sphere shell, connected to
// their nearest neighbours — reads as analytical rather than decorative,
// in place of the generic glowing-wireframe-sphere every template uses.
function generateNodes(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    points.push(
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      )
    );
  }

  const edges: [THREE.Vector3, THREE.Vector3][] = [];
  points.forEach((p, i) => {
    const distances = points
      .map((q, j) => ({ j, d: i === j ? Infinity : p.distanceTo(q) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    distances.forEach(({ j }) => edges.push([p, points[j]]));
  });

  return { points, edges };
}

function DataGraph({ groupRef }: { groupRef: React.RefObject<THREE.Group | null> }) {
  const { points, edges } = useMemo(() => generateNodes(NODE_COUNT, 2.6), []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.045;
  });

  return (
    <group ref={groupRef}>
      {edges.map(([a, b], i) => (
        <Line
          key={i}
          points={[a, b]}
          color={ACCENT}
          transparent
          opacity={0.18}
          lineWidth={1}
        />
      ))}
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function Core({ meshRef }: { meshRef: React.RefObject<THREE.Mesh | null> }) {
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y -= delta * 0.06;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <Icosahedron ref={meshRef} args={[1.05, 1]}>
      <meshPhysicalMaterial
        color="#3a352c"
        roughness={0.3}
        metalness={0.2}
        clearcoat={1}
        clearcoatRoughness={0.15}
        emissive={ACCENT}
        emissiveIntensity={0.22}
        flatShading
      />
    </Icosahedron>
  );
}

function Scene({ interactive }: { interactive: boolean }) {
  const graphRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const cameraRig = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!cameraRig.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(cameraRig.current!.rotation, {
        y: Math.PI * 0.35,
        x: -0.15,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "80% top",
          scrub: 0.6,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group ref={cameraRig}>
      <Core meshRef={coreRef} />
      <DataGraph groupRef={graphRef} />
      {interactive && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          autoRotate
          autoRotateSpeed={0.4}
          rotateSpeed={0.4}
        />
      )}
    </group>
  );
}

export function HeroScene({ interactive = false }: { interactive?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent", touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 4, 5]} intensity={30} color={ACCENT} />
      <pointLight position={[-5, -3, -4]} intensity={12} color="#5b6b7a" />
      <Scene interactive={interactive} />
    </Canvas>
  );
}
