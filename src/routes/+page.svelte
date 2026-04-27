<svelte:head>
	<title>Casey Manos</title>
</svelte:head>

<article class="prose">
	<h1>Casey Manos</h1>

	<p class="intro">
		Software engineer, running enthusiast, and a whole lot more.
	</p>

	<h2>My Background</h2>
	<p>
		I'm a founding engineer at <a href="https://adapt.com">Adapt</a>, building an AI computer for business — the platform learns how a company works,
		answers questions across its data stack, and automates workflows from Slack. Joined in 2026 after coming out of Gauntlet AI's 3rd cohort.
	</p>
	<p>
		Before Adapt I spent 3.5 years at JP Morgan Chase as a backend engineer — modernizing legacy Java apps, moving services to AWS,
		and developing the OAuth/OIDC provider services for third party connections. I briefly started an M.S. in CS at Georgia Tech (OMSCS, AI specialization)
		before withdrawing for the Adapt offer.
	</p>
	<p>
		I graduated from OSU with a B.S. in Computer Engineering. Outside of work I run a lot — went from a mediocre high school runner to competing in D1 meets
		and racing the Boston Marathon — and spend the rest of my time with my girlfriend Reilly, our two cats, and <a href="/projects">side projects</a>.
	</p>

	<h2>Contact</h2>
	<ul class="contact-list">
		<li><a href="https://linkedin.com/in/casey-manos">LinkedIn</a></li>
		<li><a href="mailto:manoscasey@gmail.com">Email</a></li>
		<li><a href="https://github.com/caseymanos">Github</a></li>
		<li><a href="https://www.strava.com/athletes/9664992">Strava!</a></li>

	</ul>
</article>

<style>
	.prose {
		line-height: 1.7;
	}

	.prose h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		line-height: 1.2;
	}

	.prose h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-top: 2.5rem;
		margin-bottom: 1rem;
	}

	.prose p {
		margin-bottom: 1.5rem;
		color: var(--text-primary);
	}

	.prose p a {
		text-decoration: underline;
	}

	.intro {
		font-size: 1.25rem;
		color: var(--text-secondary);
		margin-bottom: 2.5rem;
	}

	.contact-list {
		list-style: none;
		padding: 0;
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.contact-list a {
		text-decoration: underline;
	}
</style>
