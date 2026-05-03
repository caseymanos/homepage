<svelte:head>
	<title>Casey Manos</title>
</svelte:head>

<article class="prose">
	<h1>Casey Manos</h1>

	<p>
		I'm a founding engineer at <a href="https://adapt.com">adapt.com</a>. Worked as a backend engineer at JPMC for a few years
	 after receiving my B.S. in Computer Engineering from OSU(go bucks!).
	</p>
	<p>
		I'm a huge track and field fan, and am currently training for a 2:35 marathon at Chicago this fall. I've been running
		competitively (trying to, at least) for over a decade, and love the science side of it all. I've worked on a lot of
		side projects combining tech and sport, will share some eventually.
	</p>
	<p>
		Live with my amazing girlfriend Reilly, and our two sweet cats Blue and Yeti, in SF.
	</p>

	<h2>Contact</h2>
	<ul class="contact-list">
		<li><a href="/resume">Resume</a></li>
		<li><a href="https://linkedin.com/in/casey-manos">LinkedIn</a></li>
		<li><a href="mailto:manoscasey@gmail.com">Email</a></li>
		<li><a href="https://github.com/caseymanos">Github</a></li>
		<li><a href="https://www.strava.com/athletes/9664992">Strava</a></li>
	</ul>
</article>

<style>
	.prose {
		line-height: 1.7;
	}

	.prose h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 2.5rem;
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
