import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { useThreeJSEnabled, useSimpleFlags, getDeviceCapabilities } from '../../utils/simpleFeatureFlags';
import { TrackParticlesBackground } from './TrackParticlesBackground';
import { StopwatchRings } from './StopwatchRings';
import { RunningTrackGeometry } from './RunningTrackGeometry';
import * as THREE from 'three';

// Loading fallback component
const ThreeLoadingFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background animate-pulse" />
);

// Scene contents
const SceneContents = () => {
  const flags = useSimpleFlags();
  
  return (
    <>
      {/* Ambient lighting for subtle illumination */}
      <ambientLight intensity={0.3} color="#fff4e6" />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffd700" />
      
      {/* Background elements */}
      {flags.trackParticles && <TrackParticlesBackground />}
      {flags.geometricPatterns && <RunningTrackGeometry />}
      {flags.stopwatchRings && <StopwatchRings />}
      
      {/* Subtle stars for depth */}
      <Stars 
        radius={50} 
        depth={20} 
        count={300} 
        factor={2} 
        saturation={0.3}
        fade
      />
      
      {/* Environment lighting */}
      <Environment preset="sunset" background={false} />
      
      {/* Debug controls (only in development) */}
      {process.env.NODE_ENV === 'development' && flags.debugMode && (
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
      )}
    </>
  );
};

interface ThreeSceneProps {
  className?: string;
}

export const ThreeScene = ({ className = "" }: ThreeSceneProps) => {
  const isThreeJSEnabled = useThreeJSEnabled();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const capabilities = getDeviceCapabilities();
  
  // Don't render Three.js if not supported or disabled
  if (!isThreeJSEnabled) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background ${className}`} />
    );
  }
  
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        ref={canvasRef}
        camera={{ 
          position: [0, 0, 10], 
          fov: 60,
          near: 0.1,
          far: 100
        }}
        dpr={Math.min(capabilities.devicePixelRatio || 1, 2)} // Limit pixel ratio for performance
        performance={{ 
          min: capabilities.isMobile ? 0.3 : 0.5,
          max: capabilities.isMobile ? 0.7 : 1.0,
          debounce: 200
        }}
        gl={{
          alpha: true,
          antialias: !capabilities.isMobile, // Disable antialiasing on mobile
          powerPreference: capabilities.isMobile ? "low-power" : "high-performance",
          stencil: false,
          depth: true
        }}
        onCreated={({ gl, scene }) => {
          // Performance optimizations
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
          gl.outputColorSpace = THREE.SRGBColorSpace;
          
          // Optimize for mobile
          if (capabilities.isMobile) {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            scene.fog = new THREE.Fog(0x000000, 20, 50); // Add fog to reduce distant rendering
          }
        }}
      >
        <Suspense fallback={<ThreeLoadingFallback />}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
};