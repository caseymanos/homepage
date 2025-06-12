import { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { useSimpleFlags } from '../../utils/simpleFeatureFlags';
import * as THREE from 'three';

// Custom shader material for track patterns
const TrackMaterial = shaderMaterial(
  {
    time: 0,
    colorA: new THREE.Color('#8B4513'), // Saddle brown
    colorB: new THREE.Color('#CD853F'), // Sandy brown
    colorC: new THREE.Color('#A0522D'), // Sienna
    opacity: 0.3,
    scale: 1.0,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform vec3 colorC;
    uniform float opacity;
    uniform float scale;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec2 uv = vUv * scale;
      
      // Create track lanes pattern (vertical stripes)
      float lanes = sin(uv.x * 12.0) * 0.5 + 0.5;
      float laneEdges = step(0.85, lanes) + step(lanes, 0.15);
      
      // Moving track surface texture
      float surfaceNoise = sin((uv.y + time * 0.1) * 15.0) * 0.3 + 0.7;
      
      // Curved track effect (like viewed from above)
      float curve = sin(uv.x * 3.14159) * 0.5 + 0.5;
      
      // Combine patterns
      float pattern = lanes * surfaceNoise * curve;
      
      // Mix the vintage track colors
      vec3 baseColor = mix(colorA, colorB, pattern);
      vec3 finalColor = mix(baseColor, colorC, laneEdges * 0.3);
      
      // Distance-based fade for depth
      float distanceFade = 1.0 - length(vUv - 0.5) * 0.8;
      
      // Vintage aging effect
      float aging = sin(uv.x * 50.0) * sin(uv.y * 50.0) * 0.1 + 0.9;
      
      gl_FragColor = vec4(finalColor * distanceFade * aging, opacity);
    }
  `
);

// Extend R3F with our custom material
extend({ TrackMaterial });

// Type declaration for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      trackMaterial: any;
    }
  }
}

export const RunningTrackGeometry = () => {
  const flags = useSimpleFlags();
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<any>(null!);
  
  // Don't render if disabled
  if (!flags.geometricPatterns) return null;
  
  // Create track-like geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(25, 18, 64, 48);
    
    // Add subtle curvature to simulate track perspective
    const positions = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      
      // Gentle curve like viewing track from stands
      positions[i + 2] = Math.sin(x * 0.1) * 0.5 + Math.cos(y * 0.08) * 0.3;
    }
    
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();
    
    return geo;
  }, []);
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.elapsedTime;
      
      // Subtle scale breathing
      materialRef.current.uniforms.scale.value = 1.0 + Math.sin(clock.elapsedTime * 0.3) * 0.1;
    }
    
    if (meshRef.current) {
      // Very subtle rotation like earth's movement
      meshRef.current.rotation.z = clock.elapsedTime * 0.005;
    }
  });
  
  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry}
      position={[0, 0, -8]} 
      rotation={[-Math.PI * 0.3, 0, 0]} // Tilt for perspective
    >
      <trackMaterial 
        ref={materialRef}
        transparent 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};