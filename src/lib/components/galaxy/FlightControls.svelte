<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { PerspectiveCamera, Euler } from 'three';
	import { onMount } from 'svelte';

	let initialRotationApplied = false;

	interface Props {
		speed?: number;
		sensitivity?: number;
		minZ?: number;
		maxZ?: number;
		onPositionChange?: (pos: { x: number; y: number; z: number }) => void;
	}

	let { 
		speed = 60, 
		sensitivity = 0.002, 
		minZ = -4000,
		maxZ = 200,
		onPositionChange 
	}: Props = $props();

	const { renderer } = useThrelte();

	let camera: PerspectiveCamera | undefined = $state();
	let isLocked = $state(false);

	// Camera offset from rail (left side, looking right at planets)
	const CAMERA_X_OFFSET = -80; // Left of the planets
	const CAMERA_Y_OFFSET = 15;  // Slightly elevated

	// Rail position (Z-axis only)
	let railZ = $state(100);
	let velocityZ = $state(0);

	// Movement state - only forward/backward on the rail
	const moveForward = $state({ value: false });
	const moveBackward = $state({ value: false });

	// Camera rotation (free look while on rail)
	// Start with slight yaw to look right toward planets
	let yaw = $state(0.4); // ~23 degrees right
	let pitch = $state(-0.05); // Slightly down
	const euler = new Euler(0, 0, 0, 'YXZ');

	// Pointer lock
	function requestPointerLock() {
		renderer.domElement.requestPointerLock();
	}

	function onPointerLockChange() {
		isLocked = document.pointerLockElement === renderer.domElement;
	}

	function onMouseMove(event: MouseEvent) {
		if (!isLocked || !camera) return;

		yaw -= event.movementX * sensitivity;
		pitch -= event.movementY * sensitivity;

		// Clamp pitch to prevent flipping
		pitch = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, pitch));

		euler.set(pitch, yaw, 0);
		camera.quaternion.setFromEuler(euler);
	}

	function onKeyDown(event: KeyboardEvent) {
		switch (event.code) {
			case 'KeyW':
			case 'ArrowUp':
				moveForward.value = true;
				break;
			case 'KeyS':
			case 'ArrowDown':
				moveBackward.value = true;
				break;
		}
	}

	function onKeyUp(event: KeyboardEvent) {
		switch (event.code) {
			case 'KeyW':
			case 'ArrowUp':
				moveForward.value = false;
				break;
			case 'KeyS':
			case 'ArrowDown':
				moveBackward.value = false;
				break;
		}
	}

	function handleCanvasClick(event: MouseEvent) {
		// Only request pointer lock if clicking on empty space (not a sphere)
		// Spheres will stop propagation, so if we get here, it's empty space
		// Also check if pointer is already locked - if so, don't interfere
		if (event.target === renderer.domElement && !isLocked) {
			requestPointerLock();
		}
	}

	onMount(() => {
		document.addEventListener('pointerlockchange', onPointerLockChange);
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('keydown', onKeyDown);
		document.addEventListener('keyup', onKeyUp);
		renderer.domElement.addEventListener('click', handleCanvasClick);

		// Apply initial camera rotation to look at planets
		if (camera) {
			euler.set(pitch, yaw, 0);
			camera.quaternion.setFromEuler(euler);
		}

		return () => {
			document.removeEventListener('pointerlockchange', onPointerLockChange);
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('keydown', onKeyDown);
			document.removeEventListener('keyup', onKeyUp);
			renderer.domElement.removeEventListener('click', handleCanvasClick);
		};
	});

	// Animation loop for rail movement
	useTask((delta) => {
		if (!camera) return;

		// Apply initial rotation once camera is ready
		if (!initialRotationApplied) {
			euler.set(pitch, yaw, 0);
			camera.quaternion.setFromEuler(euler);
			initialRotationApplied = true;
		}

		// Calculate direction on rail (forward = -Z, backward = +Z)
		const direction = Number(moveForward.value) - Number(moveBackward.value);

		// Apply velocity with smooth damping
		const damping = 0.92;
		velocityZ *= damping;

		if (moveForward.value || moveBackward.value) {
			velocityZ -= direction * speed * delta;
		}

		// Update rail position
		railZ += velocityZ;

		// Clamp to rail bounds
		railZ = Math.max(minZ, Math.min(maxZ, railZ));

		// Camera stays on rail with X/Y offset (left side, elevated)
		camera.position.set(CAMERA_X_OFFSET, CAMERA_Y_OFFSET, railZ);

		// Notify parent of position change
		if (onPositionChange) {
			onPositionChange({
				x: CAMERA_X_OFFSET,
				y: CAMERA_Y_OFFSET,
				z: railZ
			});
		}
	});

	export function getIsLocked() {
		return isLocked;
	}
</script>

<T.PerspectiveCamera
	bind:ref={camera}
	makeDefault
	position={[CAMERA_X_OFFSET, CAMERA_Y_OFFSET, 100]}
	fov={75}
	near={0.1}
	far={8000}
/>

<!-- Scene fog for depth -->
<T.Fog attach="fog" args={['#000008', 400, 4500]} />
