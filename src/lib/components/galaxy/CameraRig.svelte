<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { PerspectiveCamera } from 'three';

	interface Props {
		scrollProgress: number;
		totalDepth: number;
	}

	let { scrollProgress, totalDepth }: Props = $props();

	let camera: PerspectiveCamera | undefined = $state();
	let currentZ = $state(0);
	let currentShake = $state({ x: 0, y: 0 });

	// Smooth interpolation
	function lerp(a: number, b: number, t: number): number {
		return a + (b - a) * t;
	}

	// Calculate target Z position based on scroll
	const targetZ = $derived(-scrollProgress * totalDepth);

	// Animation loop for smooth camera movement
	useTask((delta) => {
		if (!camera) return;

		// Smooth Z interpolation (cinematic feel)
		currentZ = lerp(currentZ, targetZ, 0.08);
		camera.position.z = currentZ;

		// Subtle camera shake during movement
		const speed = Math.abs(targetZ - currentZ);
		const shakeAmount = Math.min(speed * 0.002, 0.1);

		currentShake.x = lerp(currentShake.x, (Math.random() - 0.5) * shakeAmount, 0.1);
		currentShake.y = lerp(currentShake.y, (Math.random() - 0.5) * shakeAmount, 0.1);

		camera.position.x = currentShake.x;
		camera.position.y = currentShake.y;

		// Slight forward tilt during dive
		const tiltAmount = Math.min(speed * 0.0001, 0.02);
		camera.rotation.x = -tiltAmount;
	});
</script>

<T.PerspectiveCamera
	bind:ref={camera}
	makeDefault
	position={[0, 0, 0]}
	fov={75}
	near={0.1}
	far={2000}
/>

<!-- Scene fog for depth -->
<T.Fog attach="fog" args={['#000011', 50, 500]} />
