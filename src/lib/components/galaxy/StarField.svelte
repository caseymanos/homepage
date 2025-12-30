<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import {
		InstancedMesh,
		Object3D,
		SphereGeometry,
		MeshBasicMaterial,
		Color,
		Matrix4,
		Vector3
	} from 'three';
	import { onMount } from 'svelte';

	interface Props {
		scrollProgress: number;
		count?: number;
	}

	let { scrollProgress, count = 2000 }: Props = $props();

	let instancedMesh: InstancedMesh | undefined = $state();
	let lastScrollProgress = $state(0);

	// Star data
	interface StarData {
		position: Vector3;
		baseScale: number;
		color: Color;
		speed: number;
	}

	let stars: StarData[] = [];
	const dummy = new Object3D();
	const tempMatrix = new Matrix4();

	// Generate star positions
	onMount(() => {
		stars = Array.from({ length: count }, () => {
			// Distribute stars in a cylindrical volume around the flight path
			const angle = Math.random() * Math.PI * 2;
			const radius = 20 + Math.random() * 100;
			const x = Math.cos(angle) * radius;
			const y = Math.sin(angle) * radius;
			const z = -Math.random() * 2000; // Spread along Z

			// Random star colors (white to blue to yellow)
			const colorChoice = Math.random();
			let color: Color;
			if (colorChoice < 0.6) {
				color = new Color(0xffffff); // White
			} else if (colorChoice < 0.8) {
				color = new Color(0xaaccff); // Blue-white
			} else if (colorChoice < 0.95) {
				color = new Color(0xffffaa); // Yellow
			} else {
				color = new Color(0xffaaaa); // Red (rare)
			}

			return {
				position: new Vector3(x, y, z),
				baseScale: 0.1 + Math.random() * 0.3,
				color,
				speed: 0.5 + Math.random() * 1.5
			};
		});

		updateInstanceMatrices();
	});

	function updateInstanceMatrices() {
		if (!instancedMesh || stars.length === 0) return;

		const scrollSpeed = Math.abs(scrollProgress - lastScrollProgress) * 100;
		const stretchFactor = 1 + scrollSpeed * 2; // Stars stretch during fast scroll

		stars.forEach((star, i) => {
			dummy.position.copy(star.position);

			// Stretch stars in Z direction based on scroll speed (motion blur effect)
			dummy.scale.set(star.baseScale, star.baseScale, star.baseScale * stretchFactor);

			dummy.updateMatrix();
			instancedMesh!.setMatrixAt(i, dummy.matrix);

			// Set color
			instancedMesh!.setColorAt(i, star.color);
		});

		instancedMesh.instanceMatrix.needsUpdate = true;
		if (instancedMesh.instanceColor) {
			instancedMesh.instanceColor.needsUpdate = true;
		}

		lastScrollProgress = scrollProgress;
	}

	// Update on scroll
	$effect(() => {
		scrollProgress;
		updateInstanceMatrices();
	});

	// Subtle twinkling animation
	useTask((delta) => {
		if (!instancedMesh || stars.length === 0) return;

		// Only update a subset of stars each frame for performance
		const updateCount = Math.min(100, stars.length);
		const startIdx = Math.floor(Math.random() * (stars.length - updateCount));

		for (let i = startIdx; i < startIdx + updateCount; i++) {
			const star = stars[i];
			const twinkle = 0.8 + Math.sin(Date.now() * 0.005 * star.speed + i) * 0.2;

			instancedMesh.getMatrixAt(i, tempMatrix);
			dummy.matrix.copy(tempMatrix);
			dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);

			// Apply twinkle to scale
			const baseScale = star.baseScale * twinkle;
			dummy.scale.set(baseScale, baseScale, dummy.scale.z);
			dummy.updateMatrix();
			instancedMesh.setMatrixAt(i, dummy.matrix);
		}

		instancedMesh.instanceMatrix.needsUpdate = true;
	});
</script>

<T.InstancedMesh bind:ref={instancedMesh} args={[undefined, undefined, count]}>
	<T.SphereGeometry args={[1, 6, 6]} />
	<T.MeshBasicMaterial transparent opacity={0.9} />
</T.InstancedMesh>
