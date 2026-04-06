import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Trail } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function CargoBox() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, pointer.y * 0.3, 0.05);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -pointer.x * 0.2, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 1.2, 1.2]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.65, 1.25, 1.25]} />
        <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.3} />
      </mesh>
    </Float>
  );
}

function GlobeRoute() {
  const globeRef = useRef<THREE.Mesh>(null);
  const curveRef = useRef<THREE.Line>(null);

  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    // China to Kyrgyzstan arc
    for (let i = 0; i <= 50; i++) {
      const t = i / 50;
      const angle = Math.PI * 0.3 + t * Math.PI * 0.4;
      const phi = Math.PI * 0.4 + t * 0.15;
      const r = 2.15 + Math.sin(t * Math.PI) * 0.3;
      points.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(angle),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(angle)
      ));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const curvePoints = useMemo(() => curve.getPoints(50), [curve]);
  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(curvePoints), [curvePoints]);

  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group position={[-3, -1, -3]}>
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#0A1628"
          emissive="#00F0FF"
          emissiveIntensity={0.05}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
      <line ref={curveRef as any} geometry={lineGeometry}>
        <lineBasicMaterial color="#00F0FF" transparent opacity={0.8} linewidth={2} />
      </line>
      {/* Route endpoints */}
      <Sphere args={[0.08]} position={curvePoints[0]}>
        <meshBasicMaterial color="#00F0FF" />
      </Sphere>
      <Sphere args={[0.08]} position={curvePoints[curvePoints.length - 1]}>
        <meshBasicMaterial color="#00FF88" />
      </Sphere>
    </group>
  );
}

function Particles() {
  const count = 60;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      speed: 0.1 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    particles.forEach((p, i) => {
      dummy.position.set(
        p.position[0] + Math.sin(time * p.speed + p.offset) * 0.5,
        p.position[1] + Math.cos(time * p.speed + p.offset) * 0.5,
        p.position[2]
      );
      const scale = 0.02 + Math.sin(time + p.offset) * 0.015;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00F0FF" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#00F0FF" />
          <pointLight position={[-5, -3, 3]} intensity={0.5} color="#0088FF" />
          <CargoBox />
          <GlobeRoute />
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
}
