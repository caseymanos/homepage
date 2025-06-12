import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSimpleFlags } from '../../utils/simpleFeatureFlags';
import * as THREE from 'three';

export const StopwatchRings = () => {
  const flags = useSimpleFlags();
  const groupRef = useRef<THREE.Group>(null!);
  const ringRefs = useRef<THREE.Mesh[]>([]);
  const { viewport, pointer } = useThree();
  
  // Don't render if disabled
  if (!flags.stopwatchRings) return null;
  
  // Create rings on mount
  useEffect(() => {
    if (!groupRef.current) return;
    
    // Clear existing rings
    ringRefs.current.forEach(ring => {
      groupRef.current.remove(ring);
    });
    ringRefs.current = [];
    
    // Create 4 concentric rings (like stopwatch face markings)
    for (let i = 0; i < 4; i++) {
      const innerRadius = 1.5 + i * 1.2;
      const outerRadius = innerRadius + 0.15;
      
      const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 32);
      
      // Vintage stopwatch colors - brass, copper, faded gold
      const hue = 0.1 + i * 0.05; // Golden to orange spectrum
      const saturation = 0.7 - i * 0.1;
      const lightness = 0.6 - i * 0.08;
      
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue, saturation, lightness),
        transparent: true,
        opacity: 0.4 - i * 0.08,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      
      const ring = new THREE.Mesh(geometry, material);
      ring.position.z = -i * 0.3;
      ring.position.x = viewport.width * 0.3; // Offset to right side
      ring.position.y = viewport.height * 0.1; // Slightly up
      
      groupRef.current.add(ring);
      ringRefs.current.push(ring);
    }
  }, [viewport]);
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    // Subtle mouse interaction - like looking at a stopwatch
    groupRef.current.rotation.x = pointer.y * 0.05;
    groupRef.current.rotation.y = pointer.x * 0.03;
    
    // Each ring rotates at different speeds like stopwatch hands
    ringRefs.current.forEach((ring, index) => {
      // Outer rings move slower (like minute vs second hands)
      const speed = 0.2 - index * 0.04;
      ring.rotation.z = clock.elapsedTime * speed;
      
      // Subtle pulsing opacity
      const baseMaterial = ring.material as THREE.MeshBasicMaterial;
      const baseOpacity = 0.4 - index * 0.08;
      baseMaterial.opacity = baseOpacity + Math.sin(clock.elapsedTime * 0.5 + index) * 0.1;
    });
    
    // Gentle floating movement
    groupRef.current.position.y += Math.sin(clock.elapsedTime * 0.8) * 0.002;
  });
  
  return <group ref={groupRef} />;
};