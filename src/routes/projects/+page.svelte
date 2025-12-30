<script lang="ts">
	import type { PageData } from './$types';
	import SpaceScene from '$lib/components/galaxy/SpaceScene.svelte';

	let { data }: { data: PageData } = $props();
	let showSpaceScene = $state(false);
</script>

<svelte:head>
	<title>Projects - Casey Manos</title>
	{#if showSpaceScene}
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
		<link
			href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
			rel="stylesheet"
		/>
	{/if}
</svelte:head>

{#if showSpaceScene}
	<!-- Full-screen Space Scene -->
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
	<!-- Normal Projects Page -->
	<article class="prose">
		<h1>Projects</h1>

		<!-- Space Mode Button -->
		<button class="space-button" onclick={() => (showSpaceScene = true)}>
			<span class="space-icon">🚀</span>
			<span class="space-text">
				<strong>Enter Space Mode</strong>
				<small>⚠️ Experimental 3D flight through my GitHub repos</small>
			</span>
		</button>

		<div class="projects">
			<!-- EP-133 Interactive Guide - Featured -->
			<div class="project featured">
				<div class="featured-badge">✨ NEW</div>
				<h2>EP-133 Interactive Guide</h2>
				<p class="description">
					Voice-guided interactive lessons for the Teenage Engineering EP-133 K.O. II sampler. 
					Features step-by-step tutorials with visual button highlighting, auto-loop mode, 
					and ElevenLabs text-to-speech narration. Built as a gift for my dad!
				</p>
				<div class="tech-stack">
					<span class="tech">React</span>
					<span class="tech">ElevenLabs TTS</span>
					<span class="tech">SVG Animation</span>
					<span class="tech">Tailwind</span>
				</div>
				<div class="links">
					<a href="/dad/">Try it live →</a>
				</div>
			</div>

			<div class="project">
				<h2>Gauntlet AI Cohort 3</h2>
				<p class="description">
					Selected for highly competitive AI development program (1.2% acceptance rate). Developed
					complete applications weekly using cutting-edge AI development techniques including
					LangChain and MCPs.
				</p>
				<div class="tech-stack">
					<span class="tech">LangChain</span>
					<span class="tech">MCPs</span>
					<span class="tech">AI Development</span>
				</div>
			</div>

			<div class="project">
				<h2>OpenT3 Chat</h2>
				<p class="description">
					Open source clone of t3.chat. Built as part of Gauntlet AI cohort to demonstrate modern AI
					application development patterns and best practices.
				</p>
				<div class="tech-stack">
					<span class="tech">Next.js</span>
					<span class="tech">TypeScript</span>
					<span class="tech">AI/ML</span>
				</div>
				<div class="links">
					<a href="https://opent3.chat">opent3.chat</a>
				</div>
			</div>

			<div class="project">
				<h2>The Feed</h2>
				<p class="description">
					Sleep tracking web app that parses sleep data and analyzes the effect of sleep supplements
					on sleep quality. Collects user responses via Twilio for real-time data gathering and
					analysis.
				</p>
				<div class="tech-stack">
					<span class="tech">React Native</span>
					<span class="tech">FastAPI</span>
					<span class="tech">Python</span>
					<span class="tech">Twilio</span>
				</div>
			</div>

			<div class="project">
				<h2>Marathon Training Fullstack App</h2>
				<p class="description">
					Lead fullstack engineer for marathon training app with ~20k waitlisted users. Built with
					React Native, Supabase, and AWS infrastructure. Features training pace algorithms,
					nutrition guidelines, and lifting routines following Figma designs from UI/UX team.
				</p>
				<div class="tech-stack">
					<span class="tech">React Native</span>
					<span class="tech">Supabase</span>
					<span class="tech">AWS CDK</span>
					<span class="tech">SQS</span>
					<span class="tech">S3</span>
				</div>
			</div>

			<div class="project">
				<h2>Machine Learning for Trading Application</h2>
				<p class="description">
					Stock trading application using hand-rolled decision trees, linear regression learners,
					XGBoost, and technical indicators to predict portfolio performance. Implements various ML
					algorithms to analyze market data and optimize trading strategies.
				</p>
				<div class="tech-stack">
					<span class="tech">Python</span>
					<span class="tech">XGBoost</span>
					<span class="tech">Machine Learning</span>
					<span class="tech">Technical Analysis</span>
				</div>
				<p class="status">In Progress</p>
			</div>
		</div>
	</article>
{/if}

<style>
	/* Space Mode Wrapper */
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
		border-color: rgba(255, 255, 255, 0.5);
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

	.space-error button {
		padding: 0.5rem 1rem;
		background: #6366f1;
		border: none;
		border-radius: 0.5rem;
		color: white;
		cursor: pointer;
	}

	/* Space Mode Button */
	.space-button {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
		padding: 1rem 1.25rem;
		margin-bottom: 2rem;
		background: var(--bg-secondary);
		border: 1px solid #6366f1;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: left;
	}

	.space-button:hover {
		border-color: #818cf8;
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
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
		font-size: 1rem;
	}

	.space-text small {
		color: var(--text-secondary);
		font-size: 0.75rem;
	}

	/* Normal Page Styles */
	.prose {
		line-height: 1.7;
	}

	.prose h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 2rem;
		line-height: 1.2;
	}

	.projects {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.project {
		position: relative;
		padding: 1.5rem;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		transition: all 0.2s ease;
	}

	.project:hover {
		border-color: var(--accent);
		background: var(--bg-secondary);
	}

	.project.featured {
		border-color: #f97316;
		background: var(--bg-secondary);
	}

	.project.featured:hover {
		border-color: #fb923c;
	}

	.featured-badge {
		position: absolute;
		top: -0.5rem;
		right: 1rem;
		padding: 0.25rem 0.75rem;
		background: #f97316;
		color: white;
		font-size: 0.75rem;
		font-weight: 600;
		border-radius: 9999px;
	}

	.project h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 0.75rem 0;
		color: var(--text-primary);
	}

	.description {
		color: var(--text-secondary);
		margin: 0 0 1rem 0;
		line-height: 1.6;
	}

	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.tech {
		padding: 0.25rem 0.625rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		font-size: 0.8125rem;
		color: var(--text-secondary);
	}

	.project.featured .tech {
		border-color: rgba(249, 115, 22, 0.3);
	}

	.status {
		margin-top: 0.75rem;
		font-style: italic;
		color: var(--text-secondary);
		font-size: 0.875rem;
	}

	.links {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 1rem;
	}

	.links a {
		font-size: 0.875rem;
		text-decoration: underline;
	}

	.project.featured .links a {
		color: #f97316;
		font-weight: 500;
	}
</style>
