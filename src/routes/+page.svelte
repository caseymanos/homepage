<svelte:head>
	<title>Casey Manos</title>
</svelte:head>

<article class="prose">
	<h1>Casey Manos</h1>

	<p class="intro">
		Welcome! Software engineer, running enthusiast, and a whole lot more.  
	</p>

	<h2>My Background</h2>
	<p>
		Currently I'm going through Gauntlet AI's 3rd cohort. Also pursuing a M.S. in Computer Science at Georgia Tech, specializing in Artificial Intelligence.
		Gauntlet AI requires ~100 hour weeks for 10 weeks, so I left my job at JP Morgan Chase, where I worked for 3.5 years as a backend engineer. I was working on  
		modernizing legacy Java apps, building out and moving services to AWS, and developing the OAuth/OIDC provider services for third party connections.
	</p>
	<p>
		I graduated from OSU with a B.S. in Computer Engineering. I also ran a ton, going from a mediocre high school runner to competing in D1 meets and racing the Boston Marathon.
		Spending my free time these days running, hanging out with my incredible girlfriend Reilly and two sweet cats, and working on projects! 
		Relatively new to taking this stuff seriously so I've been working hard to catch up with my very impressive X feed and have a pretty gnarly backlog of dev blogs and papers, but open to more :) 
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
