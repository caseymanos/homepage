<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	import { ShaderMaterial, Color, AdditiveBlending, BackSide } from 'three';
	import {
		sphereVertexShader,
		sphereFragmentShader,
		glowSphereVertexShader,
		glowSphereFragmentShader
	} from './shaders/sphere-hologram';
	import type { ProcessedRepo } from '$lib/types/github';
	import { getLanguageColor } from '$lib/types/github';

	interface Props {
		repo: ProcessedRepo;
		position: [number, number, number];
		radius: number;
		imageUrl: string;
	}

	let { repo, position, radius, imageUrl }: Props = $props();

	let material: ShaderMaterial | undefined = $state();
	let glowMaterial: ShaderMaterial | undefined = $state();
	let time = $state(0);
	let isHovered = $state(false);
	let rotation = $state(0);

	// Language color for glow
	const glowColor = $derived(new Color(getLanguageColor(repo.language)));

	// Load texture
	const texture = useTexture(imageUrl);

	// Create shader materials when texture loads
	$effect(() => {
		if ($texture && !material) {
			material = new ShaderMaterial({
				vertexShader: sphereVertexShader,
				fragmentShader: sphereFragmentShader,
				uniforms: {
					uTexture: { value: $texture },
					uTime: { value: 0 },
					uOpacity: { value: 0.95 },
					uHover: { value: 0 },
					uGlowColor: { value: glowColor },
					uGlowIntensity: { value: 1.0 }
				},
				transparent: true
			});

			glowMaterial = new ShaderMaterial({
				vertexShader: glowSphereVertexShader,
				fragmentShader: glowSphereFragmentShader,
				uniforms: {
					uColor: { value: glowColor },
					uOpacity: { value: 0.4 },
					uHover: { value: 0 }
				},
				transparent: true,
				blending: AdditiveBlending,
				side: BackSide
			});
		}
	});

	// Update hover state with stronger visual feedback
	$effect(() => {
		if (material) {
			material.uniforms.uHover.value = isHovered ? 1.0 : 0.0;
			material.uniforms.uGlowIntensity.value = isHovered ? 2.5 : 1.0;
		}
		if (glowMaterial) {
			glowMaterial.uniforms.uHover.value = isHovered ? 1.0 : 0.0;
			glowMaterial.uniforms.uOpacity.value = isHovered ? 0.8 : 0.4;
		}
	});

	// Animation loop
	useTask((delta) => {
		time += delta;
		rotation += delta * 0.2; // Slow rotation

		if (material) {
			material.uniforms.uTime.value = time;
		}
	});

	// Click handler - open GitHub
	function handleClick(event: MouseEvent) {
		event.stopPropagation();
		event.preventDefault();
		window.open(repo.url, '_blank', 'noopener,noreferrer');
	}

	// Hover handlers
	function handlePointerEnter(event: PointerEvent) {
		event.stopPropagation();
		isHovered = true;
		document.body.style.cursor = 'pointer';
	}

	function handlePointerLeave(event: PointerEvent) {
		event.stopPropagation();
		isHovered = false;
		document.body.style.cursor = 'default';
	}

	// Scale on hover - more dramatic
	const scale = $derived(isHovered ? 1.2 : 1.0);
</script>

<T.Group {position} scale={scale}>
	<!-- Main holographic sphere -->
	{#if material}
		<T.Mesh
			rotation.y={rotation}
			onclick={handleClick}
			onpointerenter={handlePointerEnter}
			onpointerleave={handlePointerLeave}
		>
			<T.SphereGeometry args={[radius, 64, 64]} />
			<T is={material} />
		</T.Mesh>
	{:else}
		<!-- Loading placeholder -->
		<T.Mesh rotation.y={rotation}>
			<T.SphereGeometry args={[radius, 32, 32]} />
			<T.MeshBasicMaterial color="#001122" transparent opacity={0.3} wireframe />
		</T.Mesh>
	{/if}

	<!-- Outer glow sphere -->
	{#if glowMaterial}
		<T.Mesh rotation.y={rotation}>
			<T.SphereGeometry args={[radius * 1.15, 32, 32]} />
			<T is={glowMaterial} />
		</T.Mesh>
	{/if}

	<!-- Point light inside sphere -->
	<T.PointLight color={glowColor} intensity={isHovered ? 3 : 1} distance={radius * 5} />
</T.Group>
