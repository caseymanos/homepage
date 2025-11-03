<svelte:head>
	<title>Resume - Casey Manos</title>
</svelte:head>

<article class="prose">
	<h1>Resume</h1>

	<section>
		<h2>Experience</h2>
		<div class="job">
			<div class="job-header">
				<h3>Software Engineer II</h3>
				<span class="date">Jul 2024 - Oct 2025</span>
			</div>
			<p class="company">JP Morgan Chase - Columbus, OH</p>
			<ul>
				<li>Developed APIs implementing token management for OAuth, OIDC provider services</li>
				<li>
					Designed and executed Cassandra migration strategy that replicated on-prem data to a new
					cluster in real time via asynchronous, fault-tolerant writes, zero-downtime transition for 3
					million customers
				</li>
				<li>Processed all token events through Kafka for data analysis teams</li>
				<li>Created and triaged production AWS infra using Terraform</li>
			</ul>
		</div>

		<div class="job">
			<div class="job-header">
				<h3>Software Engineer I</h3>
				<span class="date">2022 - 2024</span>
			</div>
			<p class="company">JP Morgan Chase - Chicago, IL</p>
			<ul>
				<li>Migrated legacy applications to AWS via Kubernetes, Terraform, Spinnaker</li>
				<li>
					Reviewed cloud architecture for resiliency improvements. Set up Blue Green deployments for
					database swaps with no downtime
				</li>
				<li>Analyzed batch jobs and shell scripts for potential issues when modernizing codebase</li>
				<li>API development and integration with Java Spring applications</li>
				<li>Lead role on mentorship committee planning events for new engineers</li>
				<li>
					Developer on volunteer Force For Good program, wrote Salesforce Apex code for local
					nonprofit
				</li>
				<li>Obtained AWS Cloud Practitioner and Developer Associate Certifications</li>
			</ul>
		</div>

		<div class="job">
			<div class="job-header">
				<h3>Software Engineer Summer Intern</h3>
				<span class="date">2021</span>
			</div>
			<p class="company">JP Morgan Chase - Chicago, IL</p>
			<ul>
				<li>JUnit testing with Mockito, increased code coverage for multiple packages</li>
				<li>Wrote Cucumber automated tests for front end application</li>
			</ul>
		</div>

		<div class="job">
			<div class="job-header">
				<h3>Hardware Engineer Summer Intern</h3>
				<span class="date">2020</span>
			</div>
			<p class="company">Air Force Civilian Service - Dayton, OH</p>
			<ul>
				<li>Implemented a DDS on a CMOD-A7 FPGA using Vivado and Verilog</li>
				<li>Automation with Tcl and Python</li>
			</ul>
		</div>
	</section>

	<section>
		<h2>Programs & Training</h2>
		<div class="job">
			<div class="job-header">
				<h3>Gauntlet AI Cohort 3</h3>
				<span class="date">2024</span>
			</div>
			<p class="company">Gauntlet AI - 10 Week Program (1.2% acceptance rate)</p>
			<ul>
				<li>Created open source clone of t3.chat at opent3.chat</li>
				<li>Developed complete applications weekly using cutting-edge AI development techniques</li>
				<li>Implemented projects using LangChain, MCPs, and modern AI tooling</li>
			</ul>
		</div>
	</section>

	<section>
		<h2>Education</h2>
		<div class="job">
			<div class="job-header">
				<h3>M.S. Computer Science</h3>
				<span class="date">Aug 2025 - Present</span>
			</div>
			<p class="company">Georgia Institute of Technology</p>
			<p>OMSCS - Machine Learning for Trading, Robotics: AI Techniques</p>
		</div>

		<div class="job">
			<div class="job-header">
				<h3>B.S. Computer Engineering</h3>
				<span class="date">May 2022</span>
			</div>
			<p class="company">The Ohio State University</p>
			<p>Fundamentals of Engineering Honors program</p>
		</div>
	</section>

	<section>
		<h2>Technologies</h2>
		<div class="tech-section">
			<h3 class="tech-label">Experienced:</h3>
			<div class="skills">
				<span class="skill">Java Spring Boot</span>
				<span class="skill">SQL</span>
				<span class="skill">AWS</span>
				<span class="skill">REST APIs</span>
				<span class="skill">Python</span>
				<span class="skill">Spinnaker/Jenkins</span>
				<span class="skill">Terraform</span>
				<span class="skill">Kafka</span>
			</div>
		</div>
		<div class="tech-section">
			<h3 class="tech-label">Projects & Classes:</h3>
			<div class="skills">
				<span class="skill">React</span>
				<span class="skill">React Native</span>
				<span class="skill">JavaScript</span>
				<span class="skill">C/C++</span>
				<span class="skill">ML fundamentals</span>
				<span class="skill">Bayesian stats</span>
				<span class="skill">LangChain</span>
				<span class="skill">MCPs</span>
			</div>
		</div>
	</section>
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

	.prose h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-top: 3rem;
		margin-bottom: 1.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border);
	}

	.prose h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin: 0;
	}

	section {
		margin-bottom: 2rem;
	}

	.job {
		margin-bottom: 2rem;
	}

	.job-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		margin-bottom: 0.25rem;
	}

	.date {
		color: var(--text-secondary);
		font-size: 0.875rem;
		white-space: nowrap;
	}

	.company {
		color: var(--text-secondary);
		margin-bottom: 0.75rem;
	}

	.prose ul {
		margin: 0.75rem 0 1.5rem 1.5rem;
		padding: 0;
	}

	.prose ul li {
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.tech-section {
		margin-bottom: 1.5rem;
	}

	.tech-label {
		font-size: 1rem;
		font-weight: 500;
		margin-bottom: 0.75rem;
		color: var(--text-secondary);
	}

	.skills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.skill {
		padding: 0.375rem 0.75rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		font-size: 0.875rem;
	}

	@media (max-width: 640px) {
		.job-header {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
