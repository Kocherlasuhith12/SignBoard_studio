"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useSound } from "@/context/SoundContext";

interface CinematicParticleIntroProps {
  onComplete: () => void;
  onExplore?: () => void;
  onStartProject?: () => void;
}

// Custom Vertex Shader with 3D organic curl interpolation and depth attenuation
const vertexShader = `
  uniform float uProgress;
  uniform float uTime;
  uniform float uDisperse;
  uniform float uPixelRatio;

  attribute vec3 aOrigin;
  attribute vec3 aTarget1;
  attribute vec3 aTarget2;
  attribute vec3 aTarget3;
  attribute vec3 aColor1;
  attribute vec3 aColor2;
  attribute vec3 aColor3;
  attribute vec4 aRandom;

  varying vec3 vColor;
  varying float vAlpha;

  // Organic wave function simulating magnetic stardust turbulence
  vec3 getCurl(vec3 p, float seed) {
    float t = uTime * 0.75 + seed;
    return vec3(
      sin(p.y * 0.18 + t) * cos(p.z * 0.12 + t * 0.8),
      cos(p.x * 0.18 + t * 0.9) * sin(p.z * 0.14 + t),
      sin(p.x * 0.14 + t * 0.7) * cos(p.y * 0.16 + t * 1.1)
    );
  }

  void main() {
    vec3 pos = aOrigin;
    vec3 col = vec3(0.95);
    float alpha = 1.0;

    // Stagger particle arrival slightly using random attribute
    float stagger = aRandom.w * 0.28;

    if (uProgress <= 1.0) {
      // STAGE 1 -> 2: Particle Arrival & Emblem Convergence
      float t = clamp((uProgress - stagger) / (1.0 - 0.28), 0.0, 1.0);
      float eased = smoothstep(0.0, 1.0, t);
      
      // Curved 3D trajectory
      vec3 curl = getCurl(aOrigin, aRandom.x * 6.28) * (1.0 - eased) * 8.0;
      pos = mix(aOrigin + curl, aTarget1, eased);
      
      // Subtle ambient hover breathing when formed
      pos += getCurl(aTarget1, aRandom.y * 6.28) * (0.07 * eased);

      // Color transition from cosmic red/amber to emblem target color
      vec3 cosmicColor = mix(vec3(0.71, 0.07, 0.11), vec3(0.94, 0.42, 0.16), aRandom.z);
      col = mix(cosmicColor, aColor1, eased);
      alpha = smoothstep(0.0, 0.2, uProgress);

    } else if (uProgress <= 2.0) {
      // STAGE 2 -> 3: Morph from Emblem into Brand Wordmark (SIGNBOARD)
      float s = uProgress - 1.0;
      float t = clamp((s - stagger) / (1.0 - 0.28), 0.0, 1.0);
      float eased = smoothstep(0.0, 1.0, t);

      // Arc curvature between shapes
      float arcHeight = sin(eased * 3.14159) * 4.5;
      vec3 arc = vec3((aRandom.x - 0.5) * arcHeight, (aRandom.y - 0.5) * arcHeight, arcHeight * 1.8);
      
      pos = mix(aTarget1, aTarget2, eased) + arc;
      pos += getCurl(aTarget2, aRandom.y * 6.28) * 0.06;
      col = mix(aColor1, aColor2, eased);

    } else if (uProgress <= 3.0) {
      // STAGE 3 -> 4: Morph into Headline ("WE MAKE BUSINESSES IMPOSSIBLE TO IGNORE")
      float s = uProgress - 2.0;
      float t = clamp((s - stagger) / (1.0 - 0.28), 0.0, 1.0);
      float eased = smoothstep(0.0, 1.0, t);

      float arcHeight = sin(eased * 3.14159) * 5.0;
      vec3 arc = vec3((aRandom.y - 0.5) * arcHeight * 1.2, (aRandom.x - 0.5) * arcHeight, arcHeight * 2.0);

      pos = mix(aTarget2, aTarget3, eased) + arc;
      pos += getCurl(aTarget3, aRandom.z * 6.28) * 0.05;
      col = mix(aColor2, aColor3, eased);

    } else {
      // STAGE 5: Cinematic Particle Outward Dispersion
      float s = uProgress - 3.0; // 0.0 -> 1.0
      float eased = s * s * (3.0 - 2.0 * s); // smoothstep

      vec3 dispersalDir = normalize(aTarget3 + vec3(aRandom.x - 0.5, aRandom.y - 0.5, aRandom.z - 0.5) * 3.5);
      // Explode radially and push past camera
      pos = aTarget3 + dispersalDir * (eased * 52.0) + getCurl(aTarget3, aRandom.x) * (eased * 14.0);
      pos.z += eased * 35.0; // depth push
      col = aColor3;
      alpha = max(0.0, 1.0 - eased * 1.4);
    }

    // Interactive user skip dispersal modifier
    if (uDisperse > 0.0) {
      vec3 dispDir = normalize(pos + vec3(aRandom.x - 0.5, aRandom.y - 0.5, aRandom.z - 0.5) * 4.0);
      pos += dispDir * (uDisperse * 60.0);
      alpha *= max(0.0, 1.0 - uDisperse * 1.6);
    }

    vColor = col;
    vAlpha = alpha;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Attenuated particle size
    float baseSize = mix(18.0, 42.0, aRandom.z);
    gl_PointSize = baseSize * (1.0 / -mvPosition.z) * uPixelRatio;
  }
`;

// Custom Fragment Shader rendering soft circular stardust with luminescent core
const fragmentShader = `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Distance from center of point sprite
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    // Luminous Gaussian falloff with hot white center
    float falloff = smoothstep(0.5, 0.0, dist);
    float glow = pow(falloff, 1.7);
    float finalAlpha = glow * vAlpha * uOpacity;

    // White-hot core highlight
    vec3 coreColor = mix(vColor, vec3(1.0, 1.0, 1.0), pow(falloff, 4.0) * 0.6);

    gl_FragColor = vec4(coreColor, finalAlpha);
  }
`;

export function CinematicParticleIntro({
  onComplete,
}: CinematicParticleIntroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stageName, setStageName] = useState<string>("01 // PARTICLE ARRIVAL");
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const uniformsRef = useRef<{
    uProgress: { value: number };
    uTime: { value: number };
    uDisperse: { value: number };
    uPixelRatio: { value: number };
    uOpacity: { value: number };
  }>({
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uDisperse: { value: 0 },
    uPixelRatio: { value: 1 },
    uOpacity: { value: 1 },
  });

  const { playLogoSound, isMuted } = useSound();
  const hasPlayedChimeRef = useRef(false);

  // Skip Intro handler
  const handleSkip = useCallback(() => {
    if (isFadingOut) return;
    setIsFadingOut(true);

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Rapid cinematic dispersal
    gsap.to(uniformsRef.current.uDisperse, {
      value: 1.0,
      duration: 0.38,
      ease: "power2.out",
    });

    gsap.to(uniformsRef.current.uOpacity, {
      value: 0.0,
      duration: 0.38,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      },
    });
  }, [isFadingOut, onComplete]);

  // Keyboard shortcut listener for Esc, Space, Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let isMounted = true;
    let animationFrameId: number;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;

    // Responsive particle count: ~6,500 on mobile, ~11,000 on desktop
    const particleCount = isMobile ? 6500 : 11000;

    // 1. Setup Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    // Move camera back slightly on mobile portrait to fit wider text
    camera.position.z = isMobile ? 38 : 32;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    uniformsRef.current.uPixelRatio.value = pixelRatio;

    // 2. Coordinate Sampling from Offscreen Canvases
    // -------------------------------------------------------------
    // Helper to sample pixels where alpha > threshold
    const sampleCanvasPixels = (
      drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
      w: number,
      h: number,
      worldScale: { x: number; y: number },
      count: number,
      fallbackColor: [number, number, number]
    ) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = w;
      offscreen.height = h;
      const ctx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        return {
          positions: new Float32Array(count * 3),
          colors: new Float32Array(count * 3),
        };
      }

      drawFn(ctx, w, h);
      const imgData = ctx.getImageData(0, 0, w, h);
      const pixels: { x: number; y: number; r: number; g: number; b: number }[] = [];

      // Scan step
      const step = 2;
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const idx = (y * w + x) * 4;
          const alpha = imgData.data[idx + 3];
          if (alpha > 45) {
            pixels.push({
              x,
              y,
              r: imgData.data[idx] / 255,
              g: imgData.data[idx + 1] / 255,
              b: imgData.data[idx + 2] / 255,
            });
          }
        }
      }

      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      const hasPixels = pixels.length > 0;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        if (hasPixels && i < pixels.length * 1.5) {
          // Sample from drawn pixels with delicate organic jitter
          const p = pixels[i % pixels.length];
          const jitterX = (Math.random() - 0.5) * 0.12;
          const jitterY = (Math.random() - 0.5) * 0.12;
          const jitterZ = (Math.random() - 0.5) * 0.4;

          positions[i3] = ((p.x / w) - 0.5) * worldScale.x + jitterX;
          positions[i3 + 1] = -((p.y / h) - 0.5) * worldScale.y + jitterY;
          positions[i3 + 2] = jitterZ;

          colors[i3] = p.r;
          colors[i3 + 1] = p.g;
          colors[i3 + 2] = p.b;
        } else {
          // Extra particles form subtle orbiting halo aura around the shape
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * (worldScale.x * 0.65) + 3.0;
          positions[i3] = Math.cos(angle) * radius;
          positions[i3 + 1] = Math.sin(angle) * radius * 0.7;
          positions[i3 + 2] = (Math.random() - 0.5) * 4.0;

          colors[i3] = fallbackColor[0] * 0.7;
          colors[i3 + 1] = fallbackColor[1] * 0.7;
          colors[i3 + 2] = fallbackColor[2] * 0.7;
        }
      }

      return { positions, colors };
    };

    // TARGET 1: Official Architectural Signboard Emblem
    const target1 = sampleCanvasPixels(
      (ctx, w, h) => {
        ctx.clearRect(0, 0, w, h);
        const emblemSize = isMobile ? 320 : 380;
        ctx.save();
        ctx.translate((w - emblemSize) / 2, (h - emblemSize) / 2);
        ctx.scale(emblemSize / 120, emblemSize / 120);

        // Official Deep Red Palette (#C9161F)
        ctx.fillStyle = "#C9161F";

        // 1. Top Hanging Mounting Bracket
        ctx.fillRect(18, 18, 84, 5.5);
        // Suspension Pegs
        ctx.fillRect(30, 23.5, 5, 8.5);
        ctx.fillRect(85, 23.5, 5, 8.5);

        // 2. The Architectural 'S' Sections
        // Top section
        const p1 = new Path2D("M 26 32 H 94 V 58 H 78 V 46 H 42 V 46 L 26 46 Z");
        ctx.fill(p1);

        // Central Slanted Diagonal Beam
        const p2 = new Path2D("M 38 46 L 82 72 L 72 84 L 28 58 Z");
        ctx.fill(p2);

        // Bottom section
        const p3 = new Path2D("M 26 74 H 42 V 86 H 78 V 98 H 26 V 74 Z");
        ctx.fill(p3);

        // 3. Burnt Orange Accent Bars (#F06A28)
        ctx.fillStyle = "#F06A28";
        ctx.fillRect(54, 46, 26, 4.5);
        ctx.fillRect(40, 79, 26, 4.5);

        ctx.restore();
      },
      800,
      800,
      { x: isMobile ? 15 : 18, y: isMobile ? 15 : 18 },
      particleCount,
      [0.78, 0.09, 0.12]
    );

    // TARGET 2: Brand Identity Formation ("SIGNBOARD" / "CREATIVE DIGITAL STUDIO")
    const target2 = sampleCanvasPixels(
      (ctx, w, h) => {
        ctx.clearRect(0, 0, w, h);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Line 1: SIGNBOARD
        ctx.fillStyle = "#FFFFFF";
        const titleFont = isMobile ? "900 68px serif" : "900 84px serif";
        ctx.font = titleFont;
        // Draw with wide letter spacing
        const titleText = "SIGNBOARD";
        const letterSpacing = isMobile ? 14 : 20;
        let totalWidth = 0;
        for (let c of titleText) {
          totalWidth += ctx.measureText(c).width + letterSpacing;
        }
        totalWidth -= letterSpacing;

        let startX = (w - totalWidth) / 2;
        const titleY = h * 0.42;
        for (let c of titleText) {
          const charWidth = ctx.measureText(c).width;
          ctx.fillText(c, startX + charWidth / 2, titleY);
          startX += charWidth + letterSpacing;
        }

        // Line 2: CREATIVE DIGITAL STUDIO
        ctx.fillStyle = "#F06A28";
        const subFont = isMobile ? "600 22px monospace" : "600 26px monospace";
        ctx.font = subFont;
        const subText = "CREATIVE DIGITAL STUDIO";
        const subSpacing = isMobile ? 8 : 12;
        let subWidth = 0;
        for (let c of subText) {
          subWidth += ctx.measureText(c).width + subSpacing;
        }
        subWidth -= subSpacing;

        let subStartX = (w - subWidth) / 2;
        const subY = h * 0.62;
        for (let c of subText) {
          const charWidth = ctx.measureText(c).width;
          ctx.fillText(c, subStartX + charWidth / 2, subY);
          subStartX += charWidth + subSpacing;
        }
      },
      1200,
      500,
      { x: isMobile ? 21 : 26, y: isMobile ? 9 : 11 },
      particleCount,
      [0.94, 0.42, 0.16]
    );

    // TARGET 3: Headline Formation ("WE MAKE BUSINESSES IMPOSSIBLE TO IGNORE.")
    const target3 = sampleCanvasPixels(
      (ctx, w, h) => {
        ctx.clearRect(0, 0, w, h);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (isMobile) {
          // 3-line layout for mobile portrait
          ctx.fillStyle = "#EDEDED";
          ctx.font = "800 48px serif";
          ctx.fillText("WE MAKE", w / 2, h * 0.28);
          ctx.fillText("BUSINESSES", w / 2, h * 0.48);

          ctx.fillStyle = "#F06A28";
          ctx.font = "italic 800 44px serif";
          ctx.fillText("IMPOSSIBLE TO IGNORE.", w / 2, h * 0.70);
        } else {
          // 2-line layout for desktop
          ctx.font = "800 64px serif";
          ctx.fillStyle = "#EDEDED";
          ctx.fillText("WE MAKE BUSINESSES", w / 2, h * 0.38);

          // "IMPOSSIBLE" in brand orange, "TO IGNORE." in white
          const line2Y = h * 0.62;
          ctx.font = "italic 800 66px serif";
          ctx.fillStyle = "#F06A28";
          const impWidth = ctx.measureText("IMPOSSIBLE ").width;
          ctx.font = "800 64px serif";
          const restWidth = ctx.measureText("TO IGNORE.").width;
          const totalLine2 = impWidth + restWidth;

          const startLine2 = (w - totalLine2) / 2;
          ctx.textAlign = "left";
          ctx.font = "italic 800 66px serif";
          ctx.fillStyle = "#F06A28";
          ctx.fillText("IMPOSSIBLE ", startLine2, line2Y);

          ctx.font = "800 64px serif";
          ctx.fillStyle = "#EDEDED";
          ctx.fillText("TO IGNORE.", startLine2 + impWidth, line2Y);
        }
      },
      1400,
      600,
      { x: isMobile ? 22 : 28, y: isMobile ? 12 : 12 },
      particleCount,
      [0.93, 0.93, 0.93]
    );

    // 3. Stage 1 Origin Positions & Random Seeds
    const aOrigin = new Float32Array(particleCount * 3);
    const aRandom = new Float32Array(particleCount * 4);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const i4 = i * 4;

      // Dispersed spherical and radial arrival distribution across 3D depth
      const radius = 25.0 + Math.random() * 45.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      aOrigin[i3] = radius * Math.cos(phi) * Math.sin(theta);
      aOrigin[i3 + 1] = radius * Math.sin(phi);
      aOrigin[i3 + 2] = (Math.random() - 0.5) * 50.0 - 15.0;

      aRandom[i4] = Math.random(); // noise seed X
      aRandom[i4 + 1] = Math.random(); // noise seed Y
      aRandom[i4 + 2] = Math.random(); // size variance
      aRandom[i4 + 3] = Math.random(); // stagger offset
    }

    // 4. Construct Buffer Geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(particleCount * 3), 3));
    geometry.setAttribute("aOrigin", new THREE.BufferAttribute(aOrigin, 3));
    geometry.setAttribute("aTarget1", new THREE.BufferAttribute(target1.positions, 3));
    geometry.setAttribute("aTarget2", new THREE.BufferAttribute(target2.positions, 3));
    geometry.setAttribute("aTarget3", new THREE.BufferAttribute(target3.positions, 3));
    geometry.setAttribute("aColor1", new THREE.BufferAttribute(target1.colors, 3));
    geometry.setAttribute("aColor2", new THREE.BufferAttribute(target2.colors, 3));
    geometry.setAttribute("aColor3", new THREE.BufferAttribute(target3.colors, 3));
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(aRandom, 4));

    // 5. Shader Material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniformsRef.current,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 6. GSAP Choreographed Master Timeline (< 5.0 seconds total)
    const tl = gsap.timeline({
      onUpdate: () => {
        const val = uniformsRef.current.uProgress.value;
        const pct = Math.min(100, Math.round((val / 4.0) * 100));
        setProgressPercent(pct);

        if (val < 1.0) {
          setStageName("01 // PARTICLE ARRIVAL");
        } else if (val < 2.0) {
          setStageName("02 // LOGO FORMATION");
          // Play acoustic logo chime when emblem forms
          if (!hasPlayedChimeRef.current && !isMuted) {
            hasPlayedChimeRef.current = true;
            playLogoSound();
          }
        } else if (val < 3.0) {
          setStageName("03 // BRAND IDENTITY");
        } else if (val < 3.8) {
          setStageName("04 // MISSION HEADLINE");
        } else {
          setStageName("05 // CINEMATIC REVEAL");
        }
      },
      onComplete: () => {
        onComplete();
      },
    });

    timelineRef.current = tl;

    // Timeline choreography:
    // 0.0s - 1.1s: Arrival into Emblem
    tl.to(uniformsRef.current.uProgress, {
      value: 1.0,
      duration: 1.15,
      ease: "power2.inOut",
    });

    // 1.15s - 1.55s: Emblem Linger (0.4s hold for appreciation)
    tl.to({}, { duration: 0.4 });

    // 1.55s - 2.45s: Morph into Brand Wordmark ("SIGNBOARD")
    tl.to(uniformsRef.current.uProgress, {
      value: 2.0,
      duration: 0.9,
      ease: "power2.inOut",
    });

    // 2.45s - 2.85s: Brand Wordmark Linger (0.4s hold)
    tl.to({}, { duration: 0.4 });

    // 2.85s - 3.75s: Morph into Headline ("WE MAKE BUSINESSES IMPOSSIBLE TO IGNORE")
    tl.to(uniformsRef.current.uProgress, {
      value: 3.0,
      duration: 0.9,
      ease: "power2.inOut",
    });

    // 3.75s - 4.25s: Headline Linger (0.5s hold)
    tl.to({}, { duration: 0.5 });

    // 4.25s - 4.85s: Stage 5 - Cinematic Dispersion and Camera push
    tl.to(uniformsRef.current.uProgress, {
      value: 4.0,
      duration: 0.65,
      ease: "power3.in",
    });

    // Gentle camera push
    tl.to(
      camera.position,
      {
        z: camera.position.z - 4.0,
        duration: 0.65,
        ease: "power2.in",
      },
      "-=0.65"
    );

    // Overlay Opacity Dissolve at the very tail
    tl.to(
      uniformsRef.current.uOpacity,
      {
        value: 0.0,
        duration: 0.35,
        ease: "power2.out",
      },
      "-=0.35"
    );

    // 7. Render Loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isMounted) return;
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      uniformsRef.current.uTime.value += delta;

      // Subtle slow rotation of the particle system for organic spatial depth
      particles.rotation.y = Math.sin(uniformsRef.current.uTime.value * 0.25) * 0.04;
      particles.rotation.x = Math.cos(uniformsRef.current.uTime.value * 0.2) * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!isMounted) return;
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.position.z = newWidth < 768 ? 38 : 32;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      uniformsRef.current.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };

    window.addEventListener("resize", handleResize);

    // 9. Cleanup on Unmount
    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [isMuted, onComplete, playLogoSound]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#070707] text-white overflow-hidden select-none transition-opacity duration-300 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Signboard Studio Cinematic Opening Particle Experience"
    >
      {/* Three.js WebGL Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Atmospheric Ambient Red/Orange Volumetric Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] sm:w-[950px] sm:h-[950px] rounded-full pointer-events-none blur-[140px] opacity-40 transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(circle, rgba(181,18,27,0.45) 0%, rgba(240,106,40,0.2) 40%, rgba(7,7,7,0) 70%)",
        }}
      />

      {/* Top Bar: Brand Identifier & Skip Control */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-6 sm:pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#F06A28] animate-ping" />
          <span className="font-mono text-[11px] sm:text-xs text-neutral-300 tracking-[0.3em] uppercase">
            SIGNBOARD // PARTICLE INITIATIVE
          </span>
        </div>

        {/* Skip Intro Pill with Circular Progress Tracker */}
        <button
          onClick={handleSkip}
          className="group relative flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#F06A28]/50 text-neutral-300 hover:text-white transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer"
          title="Skip intro experience and enter website"
          aria-label="Skip intro experience"
        >
          {/* Progress Ring */}
          <div className="relative w-4 h-4 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/20"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#F06A28] transition-all duration-100"
                strokeDasharray={`${progressPercent}, 100`}
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>

          <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-semibold">
            SKIP INTRO <span className="text-neutral-300 text-[10px]">[ESC]</span>
          </span>
        </button>
      </header>

      {/* Bottom Bar: Telemetry & Stage Indicator */}
      <footer className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-8 pb-6 sm:pb-8 flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] tracking-widest text-neutral-400 uppercase gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[#F06A28]">{stageName}</span>
        </div>

        <div className="flex items-center gap-6 text-[10px] sm:text-[11px]">
          <span>WEBGL 2.0 // GPU PARTICLES</span>
          <span className="text-neutral-400">/</span>
          <span>HYDERABAD, INDIA</span>
        </div>
      </footer>
    </div>
  );
}
