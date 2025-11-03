<svelte:head>
	<title>Projects - Casey Manos</title>
</svelte:head>

<article class="prose">
	<h1>Projects</h1>

	<div class="projects">
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

<style>
	.prose {
		line-height: 1.7;
	}

	.prose h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 3rem;
		line-height: 1.2;
	}

	.projects {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.project {
		padding: 1.5rem;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		transition: all 0.2s ease;
	}

	.project:hover {
		border-color: var(--accent);
		background: var(--bg-secondary);
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
</style>
