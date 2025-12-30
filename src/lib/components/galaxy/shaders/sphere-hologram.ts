// Vegas Sphere-style hologram shader
// Projects image onto sphere with holographic effects

export const sphereVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const sphereFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uHover;
  uniform vec3 uGlowColor;
  uniform float uGlowIntensity;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  
  // Random function for glitch effects
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Subtle UV distortion for hologram effect
    float distortion = sin(uv.y * 50.0 + uTime * 2.0) * 0.002;
    uv.x += distortion;
    
    // Sample texture with chromatic aberration
    float aberration = 0.003 + uHover * 0.002;
    vec4 texR = texture2D(uTexture, vec2(uv.x + aberration, uv.y));
    vec4 texG = texture2D(uTexture, uv);
    vec4 texB = texture2D(uTexture, vec2(uv.x - aberration, uv.y));
    
    vec3 texColor = vec3(texR.r, texG.g, texB.b);
    float texAlpha = (texR.a + texG.a + texB.a) / 3.0;
    
    // Scanlines wrapping around sphere
    float scanline = sin(vUv.y * 200.0 + uTime * 3.0) * 0.05 + 0.95;
    texColor *= scanline;
    
    // Horizontal scan bar
    float scanBar = smoothstep(0.0, 0.02, abs(fract(vUv.y - uTime * 0.1) - 0.5));
    texColor += (1.0 - scanBar) * uGlowColor * 0.3;
    
    // Fresnel rim glow (brighter at edges)
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = 1.0 - abs(dot(viewDir, vNormal));
    fresnel = pow(fresnel, 2.0);
    
    // Enhanced rim glow
    vec3 rimGlow = uGlowColor * fresnel * uGlowIntensity * (1.0 + uHover * 0.5);
    
    // Flicker effect
    float flicker = 0.95 + random(vec2(floor(uTime * 20.0), 0.0)) * 0.1;
    
    // Random glitch lines
    float glitchLine = step(0.995, random(vec2(floor(uTime * 15.0), floor(vUv.y * 30.0))));
    texColor += glitchLine * uGlowColor * 0.5;
    
    // Combine all effects
    vec3 finalColor = texColor * flicker + rimGlow;
    
    // Add hover highlight
    finalColor += uGlowColor * uHover * 0.2;
    
    // Inner glow
    float innerGlow = 1.0 - fresnel;
    finalColor += uGlowColor * innerGlow * 0.1;
    
    // Final alpha
    float alpha = texAlpha * uOpacity * flicker;
    alpha = max(alpha, fresnel * 0.3 * uOpacity); // Ensure rim is always somewhat visible
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// Simpler glow sphere shader for outer glow effect
export const glowSphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const glowSphereFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uHover;
  
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = 1.0 - abs(dot(viewDir, vNormal));
    fresnel = pow(fresnel, 3.0);
    
    float alpha = fresnel * uOpacity * (0.5 + uHover * 0.5);
    
    gl_FragColor = vec4(uColor, alpha);
  }
`;
