import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

// ─────────────────────────────────────────────────────────────────
// THEME PALETTES — customise colors here
// ─────────────────────────────────────────────────────────────────
const PALETTES = {
  dark: {
    // Material
    materialColor: new THREE.Color("#00f2fe"),       // cyan
    emissiveColor: new THREE.Color("#4facfe"),        // soft blue glow
    emissiveIntensity: 0.55,
    roughness: 0.15,
    metalness: 0.9,
    materialOpacity: 0.88,
    // Lighting
    ambientIntensity: 0.3,
    ambientColor: new THREE.Color("#1a0a2e"),         // deep indigo ambient
    directionalIntensity: 0.9,
    directionalColor: new THREE.Color("#4facfe"),     // cool blue key light
    pointLight1Color: new THREE.Color("#00f2fe"),     // cyan fill
    pointLight1Intensity: 0.5,
    pointLight2Color: new THREE.Color("#7f00ff"),     // purple accent
    pointLight2Intensity: 0.4,
    // Particles
    particleColor: new THREE.Color("#4facfe"),
    particleOpacity: 0.55,
  },
  light: {
    // Material
    materialColor: new THREE.Color("#ff6b35"),        // vibrant orange
    emissiveColor: new THREE.Color("#ff8c61"),         // warm orange glow
    emissiveIntensity: 0.12,
    roughness: 0.35,
    metalness: 0.3,
    materialOpacity: 0.95,
    // Lighting
    ambientIntensity: 0.8,
    ambientColor: new THREE.Color("#fff8f0"),         // warm white ambient
    directionalIntensity: 1.2,
    directionalColor: new THREE.Color("#fff0db"),     // sunny warm key
    pointLight1Color: new THREE.Color("#ffb347"),     // warm orange fill
    pointLight1Intensity: 0.6,
    pointLight2Color: new THREE.Color("#ff6b6b"),     // coral accent
    pointLight2Intensity: 0.35,
    // Particles
    particleColor: new THREE.Color("#ff8c61"),
    particleOpacity: 0.35,
  },
};

// ─── Lerp speed (higher = faster transition) ────────────────────
const LERP_SPEED = 0.04; // ≈ 0.5 s transition at 60 fps

// ─── Helper: lerp a single scalar ───────────────────────────────
function lerpScalar(current, target, alpha) {
  return current + (target - current) * alpha;
}

// ─────────────────────────────────────────────────────────────────
// FLOATING SHAPE — the hero 3D object
// A distorted icosahedron with mouse-following rotation.
// ─────────────────────────────────────────────────────────────────
function FloatingShape({ isDark }) {
  const meshRef = useRef();
  const matRef = useRef();
  const { pointer } = useThree();

  // Working THREE.Color instances for lerping (avoids GC)
  const workColor = useMemo(() => new THREE.Color(), []);
  const workEmissive = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return;

    const t = state.clock.getElapsedTime();
    const target = isDark ? PALETTES.dark : PALETTES.light;
    const mat = matRef.current;

    // ── Smooth mouse-following rotation + auto-rotate ──
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.4 + t * 0.08,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * 0.4 + t * 0.1,
      0.05
    );

    // ── Subtle position follow ──
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      pointer.x * 0.8,
      0.02
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      pointer.y * 0.5,
      0.02
    );

    // ── Smooth theme transition — material ──
    workColor.copy(mat.color).lerp(target.materialColor, LERP_SPEED);
    mat.color.copy(workColor);

    workEmissive.copy(mat.emissive).lerp(target.emissiveColor, LERP_SPEED);
    mat.emissive.copy(workEmissive);

    mat.emissiveIntensity = lerpScalar(
      mat.emissiveIntensity,
      target.emissiveIntensity,
      LERP_SPEED
    );
    mat.roughness = lerpScalar(mat.roughness, target.roughness, LERP_SPEED);
    mat.metalness = lerpScalar(mat.metalness, target.metalness, LERP_SPEED);
    mat.opacity = lerpScalar(mat.opacity, target.materialOpacity, LERP_SPEED);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          ref={matRef}
          color={PALETTES.dark.materialColor}
          emissive={PALETTES.dark.emissiveColor}
          emissiveIntensity={PALETTES.dark.emissiveIntensity}
          roughness={PALETTES.dark.roughness}
          metalness={PALETTES.dark.metalness}
          distort={0.35}
          speed={2}
          transparent
          opacity={PALETTES.dark.materialOpacity}
        />
      </mesh>
    </Float>
  );
}

// ─────────────────────────────────────────────────────────────────
// PARTICLE FIELD — ambient floating particles
// ─────────────────────────────────────────────────────────────────
function generateParticles(count) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Pseudo-random deterministic distribution based on index
    const seedX = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
    const seedY = Math.sin(i * 43.1234 + 19.456) * 23421.6312;
    const seedZ = Math.sin(i * 91.5678 + 32.891) * 65432.1234;
    pos[i * 3] = ((seedX - Math.floor(seedX)) - 0.5) * 20;
    pos[i * 3 + 1] = ((seedY - Math.floor(seedY)) - 0.5) * 20;
    pos[i * 3 + 2] = ((seedZ - Math.floor(seedZ)) - 0.5) * 20;
  }
  return pos;
}

const PARTICLE_POSITIONS = generateParticles(150);

function ParticleField({ isDark }) {
  const pointsRef = useRef();
  const matRef = useRef();
  const workColor = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (!pointsRef.current || !matRef.current) return;

    const target = isDark ? PALETTES.dark : PALETTES.light;
    const mat = matRef.current;

    // Auto-rotate
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;

    // Smooth color transition
    workColor.copy(mat.color).lerp(target.particleColor, LERP_SPEED);
    mat.color.copy(workColor);
    mat.opacity = lerpScalar(mat.opacity, target.particleOpacity, LERP_SPEED);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_POSITIONS, 3]}
          count={150}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.03}
        color={PALETTES.dark.particleColor}
        transparent
        opacity={PALETTES.dark.particleOpacity}
        sizeAttenuation
      />
    </points>
  );
}

// ─────────────────────────────────────────────────────────────────
// THEME-REACTIVE LIGHTING
// ─────────────────────────────────────────────────────────────────
function ThemeLighting({ isDark }) {
  const ambientRef = useRef();
  const dirRef = useRef();
  const point1Ref = useRef();
  const point2Ref = useRef();

  const workColor = useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    const target = isDark ? PALETTES.dark : PALETTES.light;

    // ── Ambient ──
    if (ambientRef.current) {
      workColor.copy(ambientRef.current.color).lerp(target.ambientColor, LERP_SPEED);
      ambientRef.current.color.copy(workColor);
      ambientRef.current.intensity = lerpScalar(
        ambientRef.current.intensity,
        target.ambientIntensity,
        LERP_SPEED
      );
    }

    // ── Directional (key light) ──
    if (dirRef.current) {
      workColor.copy(dirRef.current.color).lerp(target.directionalColor, LERP_SPEED);
      dirRef.current.color.copy(workColor);
      dirRef.current.intensity = lerpScalar(
        dirRef.current.intensity,
        target.directionalIntensity,
        LERP_SPEED
      );
    }

    // ── Point light 1 (fill) ──
    if (point1Ref.current) {
      workColor.copy(point1Ref.current.color).lerp(target.pointLight1Color, LERP_SPEED);
      point1Ref.current.color.copy(workColor);
      point1Ref.current.intensity = lerpScalar(
        point1Ref.current.intensity,
        target.pointLight1Intensity,
        LERP_SPEED
      );
    }

    // ── Point light 2 (accent) ──
    if (point2Ref.current) {
      workColor.copy(point2Ref.current.color).lerp(target.pointLight2Color, LERP_SPEED);
      point2Ref.current.color.copy(workColor);
      point2Ref.current.intensity = lerpScalar(
        point2Ref.current.intensity,
        target.pointLight2Intensity,
        LERP_SPEED
      );
    }
  });

  return (
    <>
      <ambientLight
        ref={ambientRef}
        intensity={PALETTES.dark.ambientIntensity}
        color={PALETTES.dark.ambientColor}
      />
      <directionalLight
        ref={dirRef}
        position={[5, 5, 5]}
        intensity={PALETTES.dark.directionalIntensity}
        color={PALETTES.dark.directionalColor}
      />
      <pointLight
        ref={point1Ref}
        position={[-5, -5, -5]}
        intensity={PALETTES.dark.pointLight1Intensity}
        color={PALETTES.dark.pointLight1Color}
      />
      <pointLight
        ref={point2Ref}
        position={[3, -3, 2]}
        intensity={PALETTES.dark.pointLight2Intensity}
        color={PALETTES.dark.pointLight2Color}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// STATIC 2D FALLBACK (Mobile, Reduced Motion, & Initial Paint)
// ─────────────────────────────────────────────────────────────────
function Static2DFallback({ isDark }) {
  return (
    <div
      className="static-3d-fallback"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <div
        style={{
          width: "min(380px, 70vw)",
          height: "min(380px, 70vw)",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(0,242,254,0.18) 0%, rgba(127,0,255,0.12) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(255,107,53,0.18) 0%, rgba(255,140,97,0.12) 50%, transparent 70%)",
          filter: "blur(40px)",
          animation: "pulse 4s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN SCENE EXPORT WITH DEFERRED LOADING & PERFORMANCE OPTIMIZATION
// ─────────────────────────────────────────────────────────────────
export default function Scene3D() {
  const { isDark } = useTheme();
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [isLowPowerDevice] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (isLowPowerDevice) return;

    // Defer 3D canvas initialization until after initial DOM paint to maximize Core Web Vitals (FCP, LCP, INP)
    let idleId;
    let timerId;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(() => {
        setShouldRender3D(true);
      }, { timeout: 400 });
    } else {
      timerId = setTimeout(() => {
        setShouldRender3D(true);
      }, 150);
    }

    return () => {
      if (idleId && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timerId) clearTimeout(timerId);
    };
  }, [isLowPowerDevice]);

  return (
    <div className="canvas-container" aria-hidden="true">
      {/* Static 2D lightweight fallback shown immediately */}
      <Static2DFallback isDark={isDark} />

      {/* Deferred WebGL Canvas */}
      {shouldRender3D && !isLowPowerDevice && (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            powerPreference: "high-performance",
            antialias: true,
            alpha: true,
          }}
          style={{
            position: "absolute",
            inset: 0,
            background: "transparent",
            zIndex: 1,
          }}
        >
          <ThemeLighting isDark={isDark} />
          <FloatingShape isDark={isDark} />
          <ParticleField isDark={isDark} />
        </Canvas>
      )}
    </div>
  );
}
