import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useSimpleFlags, usePerformanceMode } from '../../utils/simpleFeatureFlags';
import * as THREE from 'three';

export const TrackParticlesBackground = () => {
  const flags = useSimpleFlags();
  const { particleCount, targetFPS } = usePerformanceMode();
  const ref = useRef<THREE.Points>(null!);
  const frameCount = useRef(0);
  
  // Don't render if disabled
  if (!flags.trackParticles) return null;
  
  // Generate track-lane inspired particle positions
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Vintage running track color palette
    const trackColors = [
      [0.8, 0.4, 0.3], // Rust/brick red (classic track)
      [0.9, 0.7, 0.5], // Tan/sand (weathered track)
      [0.7, 0.3, 0.3], // Deep maroon (vintage)
      [0.6, 0.5, 0.4], // Dusty brown
      [0.8, 0.6, 0.4], // Faded orange
    ];
    
    for (let i = 0; i < particleCount; i++) {
      // Create subtle lane-like distribution with some randomness
      const laneIndex = Math.floor(Math.random() * 8);
      const laneWidth = 15;
      const x = (laneIndex - 4) * laneWidth + (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 40;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Assign vintage track colors
      const color = trackColors[Math.floor(Math.random() * trackColors.length)];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];
    }
    
    return [positions, colors];
  }, [particleCount]);
  
  useFrame((state) => {
    frameCount.current++;
    
    // Throttle animation on lower-end devices
    const shouldAnimate = targetFPS === 60 || frameCount.current % 2 === 0;
    
    if (ref.current && shouldAnimate) {
      // Slow, subtle rotation like dust settling
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      
      // Gentle bobbing motion like heat waves on a track
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      
      // Subtle breathing scale effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      ref.current.scale.setScalar(scale);
    }
  });
  
  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        size={1.0}
        sizeAttenuation
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
};