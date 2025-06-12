// Simple feature flags without React context for better SSR compatibility
export interface SimpleFeatureFlags {
  trackParticles: boolean;
  stopwatchRings: boolean;
  geometricPatterns: boolean;
  enableWebGL: boolean;
  debugMode: boolean;
}

// Get device capabilities safely
export const getDeviceCapabilities = () => {
  // Safe checks for browser environment
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      supportsWebGL: false,
      hasGoodGPU: false,
      reducedMotion: false,
    };
  }

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
  
  return {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768,
    supportsWebGL: !!gl,
    hasGoodGPU: gl ? gl.getParameter(gl.MAX_TEXTURE_SIZE) >= 4096 : false,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    devicePixelRatio: window.devicePixelRatio || 1,
  };
};

// Get optimized flags based on device
export const getOptimizedFlags = (): SimpleFeatureFlags => {
  const capabilities = getDeviceCapabilities();
  
  // Conservative defaults that work everywhere
  const flags: SimpleFeatureFlags = {
    trackParticles: true,
    stopwatchRings: false,
    geometricPatterns: false,
    enableWebGL: capabilities.supportsWebGL,
    debugMode: false,
  };
  
  // Disable effects on mobile or if motion is reduced
  if (capabilities.isMobile || capabilities.reducedMotion || !capabilities.supportsWebGL) {
    flags.trackParticles = false;
    flags.stopwatchRings = false;
    flags.geometricPatterns = false;
    flags.enableWebGL = false;
  } else if (capabilities.hasGoodGPU) {
    // Enable more effects on high-end devices
    flags.stopwatchRings = true;
    flags.geometricPatterns = true;
  }
  
  return flags;
};

// Simple hooks
export const useSimpleFlags = () => {
  return getOptimizedFlags();
};

export const useThreeJSEnabled = () => {
  const flags = getOptimizedFlags();
  return flags.enableWebGL;
};

export const usePerformanceMode = () => {
  const capabilities = getDeviceCapabilities();
  return {
    isHighPerformance: !capabilities.isMobile && capabilities.hasGoodGPU,
    particleCount: capabilities.isMobile ? 300 : 1000,
    targetFPS: capabilities.isMobile ? 30 : 60,
  };
};