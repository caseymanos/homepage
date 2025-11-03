// Theme store with auto dark/light detection and multiple design presets
import { browser } from '$app/environment';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ThemePreset = 'minimal' | 'brutalist' | 'classic' | 'modern';

interface ThemeState {
	mode: ThemeMode;
	preset: ThemePreset;
	resolvedMode: 'light' | 'dark';
}

function createThemeStore() {
	let state = $state<ThemeState>({
		mode: 'auto',
		preset: 'brutalist',
		resolvedMode: 'light'
	});

	// Initialize from localStorage and system preferences
	if (browser) {
		const savedMode = localStorage.getItem('theme-mode') as ThemeMode | null;
		const savedPreset = localStorage.getItem('theme-preset') as ThemePreset | null;

		if (savedMode) state.mode = savedMode;
		if (savedPreset) state.preset = savedPreset;

		updateResolvedMode();
		applyTheme();

		// Listen for system theme changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', () => {
			if (state.mode === 'auto') {
				updateResolvedMode();
				applyTheme();
			}
		});
	}

	function updateResolvedMode() {
		if (state.mode === 'auto') {
			state.resolvedMode = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
		} else {
			state.resolvedMode = state.mode;
		}
	}

	function applyTheme() {
		if (!browser) return;

		const root = document.documentElement;
		root.classList.remove('light', 'dark');
		root.classList.add(state.resolvedMode);
		root.setAttribute('data-preset', state.preset);
	}

	return {
		get mode() {
			return state.mode;
		},
		get preset() {
			return state.preset;
		},
		get resolvedMode() {
			return state.resolvedMode;
		},
		setMode(mode: ThemeMode) {
			state.mode = mode;
			if (browser) {
				localStorage.setItem('theme-mode', mode);
				updateResolvedMode();
				applyTheme();
			}
		},
		setPreset(preset: ThemePreset) {
			state.preset = preset;
			if (browser) {
				localStorage.setItem('theme-preset', preset);
				applyTheme();
			}
		},
		cyclePreset() {
			const presets: ThemePreset[] = ['minimal', 'brutalist', 'classic', 'modern'];
			const currentIndex = presets.indexOf(state.preset);
			const nextIndex = (currentIndex + 1) % presets.length;
			this.setPreset(presets[nextIndex]);
		}
	};
}

export const theme = createThemeStore();
