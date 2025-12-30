<script lang="ts">
	import type { PageData } from './$types';
	import SpaceScene from '$lib/components/galaxy/SpaceScene.svelte';

	let { data }: { data: PageData } = $props();
	let showSpaceScene = $state(false);
	let hoveredProject = $state<string | null>(null);
</script>

<svelte:head>
	<title>Projects - Casey Manos</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if showSpaceScene}
	<div class="space-wrapper">
		<button class="exit-space" onclick={() => (showSpaceScene = false)}>
			✕ Exit Space Mode
		</button>
		{#if data.repos && data.repos.length > 0}
			<SpaceScene repos={data.repos} />
		{:else}
			<div class="space-error">
				<p>Unable to load repos for space mode.</p>
				<button onclick={() => (showSpaceScene = false)}>Go Back</button>
			</div>
		{/if}
	</div>
{:else}
	<article class="projects-page">
		<header class="page-header">
			<h1>Projects</h1>
			<p class="subtitle">Things I've built, shipped, and obsessed over</p>
		</header>

		<!-- Space Mode Button -->
		<button class="space-button" onclick={() => (showSpaceScene = true)}>
			<span class="space-icon">🚀</span>
			<span class="space-text">
				<strong>Enter Space Mode</strong>
				<small>Experimental 3D flight through my GitHub repos</small>
			</span>
		</button>

		<!-- Featured Projects with Live Previews -->
		<section class="featured-section">
			<h2 class="section-title">
				<span class="title-accent">●</span> Live Projects
			</h2>
			
			<div class="featured-grid">
				<!-- Metriq - Top Featured -->
				<a 
					href="https://getmetriq.dev" 
					target="_blank" 
					rel="noopener noreferrer"
					class="project-card showcase"
					onmouseenter={() => hoveredProject = 'metriq'}
					onmouseleave={() => hoveredProject = null}
				>
					<div class="card-preview">
						<div class="preview-frame">
							<iframe 
								src="https://getmetriq.dev" 
								title="Metriq Preview"
								loading="lazy"
								sandbox="allow-scripts allow-same-origin"
							></iframe>
							<div class="preview-overlay">
								<span class="preview-cta">Visit Site →</span>
							</div>
						</div>
					</div>
					<div class="card-content">
						<div class="card-header">
							<h3>Metriq</h3>
							<span class="card-badge amber">AI Platform</span>
						</div>
						<p class="card-tagline">Cursor for Data Teams</p>
						<p class="card-description">
							LangChain network of agents that coordinate to solve data science problems autonomously. 
							Metriq Solver plans, codes, and verifies complex analysis in Jupyter notebooks. 
							Approaching SOTA on industry benchmarks. Built in under a week.
						</p>
						<div class="card-tech">
							<span>LangChain</span>
							<span>AI Agents</span>
							<span>Jupyter</span>
							<span>Python</span>
						</div>
					</div>
				</a>

				<!-- Dream Shot -->
				<a 
					href="https://dreamshot-sleep-tracker.vercel.app" 
					target="_blank" 
					rel="noopener noreferrer"
					class="project-card showcase"
					onmouseenter={() => hoveredProject = 'dreamshot'}
					onmouseleave={() => hoveredProject = null}
				>
					<div class="card-preview dreamshot-preview">
						<div class="preview-placeholder">
							<div class="preview-gradient"></div>
							<div class="preview-content">
								<span class="preview-icon">🌙</span>
								<span class="preview-title">Dream Shot</span>
								<span class="preview-subtitle">Sleep Analytics</span>
							</div>
						</div>
						<div class="preview-overlay">
							<span class="preview-cta">Visit Site →</span>
						</div>
					</div>
					<div class="card-content">
						<div class="card-header">
							<h3>Dream Shot Sleep Tracker</h3>
							<span class="card-badge purple">Analytics</span>
						</div>
						<p class="card-tagline">See Your Sleep Transform</p>
						<p class="card-description">
							Sleep analytics platform that parses data from Garmin, Oura, Whoop, and Apple Health 
							to measure the impact of sleep supplements. Beautiful visualizations show your 
							before/after sleep quality journey.
						</p>
						<div class="card-tech">
							<span>Next.js</span>
							<span>Data Viz</span>
							<span>Health APIs</span>
						</div>
					</div>
				</a>
			</div>
		</section>

		<!-- Other Projects -->
		<section class="projects-section">
			<h2 class="section-title">
				<span class="title-accent">●</span> More Work
			</h2>

			<div class="projects-list">
				<!-- EP-133 Interactive Guide -->
				<div class="project-item featured-item">
					<div class="item-marker new">NEW</div>
					<div class="item-content">
						<h3>EP-133 Interactive Guide</h3>
						<p>
							Voice-guided interactive lessons for the Teenage Engineering EP-133 K.O. II sampler.
							Features step-by-step tutorials with visual button highlighting, auto-loop mode,
							and ElevenLabs text-to-speech narration. Built as a gift for my dad!
						</p>
						<div class="item-tech">
							<span>React</span>
							<span>ElevenLabs TTS</span>
							<span>SVG Animation</span>
							<span>Tailwind</span>
						</div>
						<a href="/dad/" class="item-link">Try it live →</a>
					</div>
				</div>

				<!-- OpenT3 Chat -->
				<div class="project-item">
					<div class="item-content">
						<h3>OpenT3 Chat</h3>
						<p>
							Hackathon project built in under 24 hours—an open source clone of t3.chat 
							with modern AI development patterns. Streaming responses, context management, 
							and real-time interactions.
						</p>
						<div class="item-tech">
							<span>Next.js</span>
							<span>TypeScript</span>
							<span>AI/ML</span>
							<span>Hackathon</span>
						</div>
						<a href="https://opent3.chat" target="_blank" rel="noopener noreferrer" class="item-link">
							opent3.chat →
						</a>
					</div>
				</div>

				<!-- node-webcodecs -->
				<div class="project-item">
					<div class="item-content">
						<h3>node-webcodecs</h3>
						<p>
							Native WebCodecs API implementation for Node.js—browser-standard video/audio 
							encoding and decoding for server-side JavaScript. Supports H.264, HEVC, VP8/VP9, 
							AV1, and AAC/Opus codecs with hardware acceleration. Available on npm and bun.
						</p>
						<div class="item-tech">
							<span>Node.js</span>
							<span>WebCodecs</span>
							<span>C++</span>
							<span>Video/Audio</span>
						</div>
						<a href="https://www.npmjs.com/package/node-webcodecs" target="_blank" rel="noopener noreferrer" class="item-link">
							npm →
						</a>
					</div>
				</div>

				<!-- Marathon Training App -->
				<div class="project-item">
					<div class="item-content">
						<h3>Marathon Training App</h3>
						<p>
							Lead fullstack engineer for marathon training app with ~20k waitlisted users.
							Training pace algorithms, nutrition guidelines, and lifting routines.
							Built the backend infrastructure and mobile app from scratch.
						</p>
						<div class="item-tech">
							<span>React Native</span>
							<span>Supabase</span>
							<span>AWS CDK</span>
							<span>SQS</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	</article>
{/if}

<style>
	/* Page Layout */
	.projects-page {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.page-header {
		margin-bottom: 2.5rem;
	}

	.page-header h1 {
		font-family: 'Syne', sans-serif;
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		margin: 0 0 0.5rem 0;
		background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.subtitle {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin: 0;
	}

	/* Section Titles */
	.section-title {
		font-family: 'Syne', sans-serif;
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 1.5rem 0;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-secondary);
	}

	.title-accent {
		color: var(--accent);
		font-size: 0.75rem;
	}

	/* Space Mode */
	.space-wrapper {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: #000;
	}

	.exit-space {
		position: fixed;
		top: 1rem;
		left: 1rem;
		z-index: 200;
		padding: 0.5rem 1rem;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 0.5rem;
		color: white;
		font-size: 0.875rem;
		cursor: pointer;
		backdrop-filter: blur(10px);
		transition: all 0.2s;
	}

	.exit-space:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.space-error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		color: white;
		gap: 1rem;
	}

	.space-button {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
		padding: 1rem 1.25rem;
		margin-bottom: 3rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: left;
	}

	.space-button:hover {
		border-color: var(--accent);
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(99, 102, 241, 0.15);
	}

	.space-icon {
		font-size: 1.5rem;
	}

	.space-text {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.space-text strong {
		color: var(--text-primary);
		font-family: 'Syne', sans-serif;
		font-weight: 600;
	}

	.space-text small {
		color: var(--text-secondary);
		font-size: 0.8125rem;
	}

	/* Featured Section */
	.featured-section {
		margin-bottom: 4rem;
	}

	.featured-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
		gap: 2rem;
	}

	/* Project Cards with Preview */
	.project-card {
		display: flex;
		flex-direction: column;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 1rem;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.project-card:hover {
		transform: translateY(-8px);
		border-color: var(--accent);
		box-shadow: 
			0 20px 40px rgba(0, 0, 0, 0.15),
			0 0 0 1px var(--accent);
	}

	.card-preview {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
	}

	.preview-frame {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.preview-frame iframe {
		width: 200%;
		height: 200%;
		transform: scale(0.5);
		transform-origin: top left;
		border: none;
		pointer-events: none;
	}

	.preview-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.8) 0%,
			rgba(0, 0, 0, 0) 50%
		);
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding: 1.5rem;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.project-card:hover .preview-overlay {
		opacity: 1;
	}

	.preview-cta {
		padding: 0.5rem 1.25rem;
		background: var(--accent);
		color: white;
		border-radius: 2rem;
		font-size: 0.875rem;
		font-weight: 600;
		font-family: 'Syne', sans-serif;
	}

	.card-content {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.card-header h3 {
		font-family: 'Syne', sans-serif;
		font-size: 1.375rem;
		font-weight: 700;
		margin: 0;
		color: var(--text-primary);
	}

	.card-badge {
		padding: 0.25rem 0.75rem;
		border-radius: 2rem;
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		white-space: nowrap;
	}

	.card-badge.amber {
		background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
		color: white;
	}

	.card-badge.purple {
		background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
		color: white;
	}

	.card-tagline {
		font-family: 'Space Mono', monospace;
		font-size: 0.9375rem;
		color: var(--accent);
		margin: 0;
		font-weight: 400;
	}

	.card-description {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-secondary);
		margin: 0;
	}

	.card-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.card-tech span {
		padding: 0.25rem 0.625rem;
		background: var(--bg-primary);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		font-size: 0.75rem;
		color: var(--text-secondary);
		font-family: 'Space Mono', monospace;
	}

	/* Dream Shot Preview Placeholder */
	.dreamshot-preview {
		position: relative;
	}

	.preview-placeholder {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.preview-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e3a5f 100%);
	}

	.preview-gradient::before {
		content: '';
		position: absolute;
		top: 20%;
		left: 20%;
		width: 60%;
		height: 60%;
		background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
		filter: blur(40px);
	}

	.preview-gradient::after {
		content: '';
		position: absolute;
		bottom: 10%;
		right: 10%;
		width: 50%;
		height: 50%;
		background: radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%);
		filter: blur(30px);
	}

	.preview-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		gap: 0.5rem;
	}

	.preview-icon {
		font-size: 3rem;
		filter: drop-shadow(0 4px 20px rgba(139, 92, 246, 0.5));
	}

	.preview-title {
		font-family: 'Syne', sans-serif;
		font-size: 1.5rem;
		font-weight: 700;
		color: white;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
	}

	.preview-subtitle {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.7);
		font-family: 'Space Mono', monospace;
	}

	/* Projects List Section */
	.projects-section {
		margin-bottom: 4rem;
	}

	.projects-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.project-item {
		position: relative;
		padding: 1.5rem;
		padding-left: 2rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		transition: all 0.3s ease;
	}

	.project-item:hover {
		border-color: var(--accent);
		background: var(--bg-secondary);
	}

	.project-item::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: var(--border);
		border-radius: 3px 0 0 3px;
		transition: background 0.3s ease;
	}

	.project-item:hover::before {
		background: var(--accent);
	}

	.project-item.featured-item::before {
		background: #f97316;
	}

	.item-marker {
		position: absolute;
		top: -0.5rem;
		right: 1rem;
		padding: 0.25rem 0.75rem;
		border-radius: 2rem;
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.item-marker.new {
		background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
		color: white;
	}

	.item-content h3 {
		font-family: 'Syne', sans-serif;
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0 0 0.75rem 0;
		color: var(--text-primary);
	}

	.item-content p {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-secondary);
		margin: 0 0 1rem 0;
	}

	.item-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.item-tech span {
		padding: 0.25rem 0.625rem;
		background: var(--bg-primary);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		font-size: 0.75rem;
		color: var(--text-secondary);
		font-family: 'Space Mono', monospace;
	}

	.item-link {
		display: inline-flex;
		align-items: center;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--accent);
		text-decoration: none;
		transition: gap 0.2s ease;
	}

	.item-link:hover {
		text-decoration: underline;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.featured-grid {
			grid-template-columns: 1fr;
		}

		.card-preview {
			aspect-ratio: 16 / 9;
		}
	}
</style>
