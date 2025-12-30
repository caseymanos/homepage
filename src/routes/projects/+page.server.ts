import type { PageServerLoad } from './$types';
import type { GitHubRepo, ProcessedRepo } from '$lib/types/github';
import { processRepo, getTenWeeksAgoDate } from '$lib/types/github';
import { getCached, setCache } from '$lib/server/cache';

const GITHUB_USERNAME = 'caseymanos';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const CACHE_KEY = 'github-timeline-data';

type Fetch = typeof fetch;

/**
 * Fetch commit count for a repo using contributors endpoint
 */
async function getCommitCount(fetchFn: Fetch, repoName: string): Promise<number> {
	try {
		const res = await fetchFn(
			`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/contributors`,
			{
				headers: {
					Accept: 'application/vnd.github.v3+json',
					'User-Agent': 'caseymanos-portfolio'
				}
			}
		);

		if (!res.ok) return 0;

		const contributors = await res.json();
		if (!Array.isArray(contributors)) return 0;

		return contributors.reduce(
			(sum: number, c: { contributions?: number }) => sum + (c.contributions || 0),
			0
		);
	} catch {
		return 0;
	}
}

/**
 * Fetch lines of code using ghloc.ifels.dev API
 * API format: https://ghloc.ifels.dev/{owner}/{repo}/{branch}
 * Returns: { loc: number, locByLangs: {...}, children: {...} }
 */
async function getLinesOfCode(
	fetchFn: Fetch,
	repoName: string,
	defaultBranch: string = 'main'
): Promise<number> {
	try {
		const res = await fetchFn(
			`https://ghloc.ifels.dev/${GITHUB_USERNAME}/${repoName}/${defaultBranch}?pretty=false`
		);

		if (!res.ok) return 0;

		const data = await res.json();
		return data.loc || 0;
	} catch {
		return 0;
	}
}

/**
 * Fetch all repo stats in parallel
 */
async function fetchRepoStats(
	fetchFn: Fetch,
	repoName: string,
	defaultBranch: string
): Promise<{ commits: number; loc: number }> {
	const [commits, loc] = await Promise.all([
		getCommitCount(fetchFn, repoName),
		getLinesOfCode(fetchFn, repoName, defaultBranch)
	]);

	return { commits, loc };
}

export const load: PageServerLoad = async ({ fetch }) => {
	// Check cache first
	const cached = getCached<{ repos: ProcessedRepo[]; tenWeeksAgoDate: string }>(CACHE_KEY);
	if (cached) {
		return {
			repos: cached.repos.map((r) => ({
				...r,
				createdAt: new Date(r.createdAt),
				updatedAt: new Date(r.updatedAt),
				pushedAt: new Date(r.pushedAt)
			})),
			tenWeeksAgoDate: new Date(cached.tenWeeksAgoDate),
			error: null,
			fromCache: true
		};
	}

	try {
		// Fetch all repos
		const response = await fetch(`${GITHUB_API_URL}?sort=pushed&per_page=100`, {
			headers: {
				Accept: 'application/vnd.github.v3+json',
				'User-Agent': 'caseymanos-portfolio'
			}
		});

		if (!response.ok) {
			console.error(`GitHub API error: ${response.status}`);
			return {
				repos: [] as ProcessedRepo[],
				tenWeeksAgoDate: getTenWeeksAgoDate(),
				error: `Failed to fetch repos: ${response.status}`,
				fromCache: false
			};
		}

		const rawRepos: GitHubRepo[] = await response.json();

		// Filter out forks and archived repos
		const filteredRepos = rawRepos.filter(
			(repo) => !repo.fork && !repo.archived && !repo.disabled
		);

		// Fetch commit counts and LOC for all repos in parallel
		const repoStatsPromises = filteredRepos.map((repo) =>
			fetchRepoStats(fetch, repo.name, repo.default_branch)
		);
		const repoStats = await Promise.all(repoStatsPromises);

		// Process repos with their stats
		const repos = filteredRepos
			.map((repo, index) => {
				const stats = repoStats[index];
				return processRepo(repo, stats.commits, stats.loc);
			})
			// Sort by most recent push date (descending)
			.sort((a, b) => b.pushedAt.getTime() - a.pushedAt.getTime());

		const tenWeeksAgoDate = getTenWeeksAgoDate();

		// Cache the results
		setCache(CACHE_KEY, {
			repos,
			tenWeeksAgoDate: tenWeeksAgoDate.toISOString()
		});

		return {
			repos,
			tenWeeksAgoDate,
			error: null,
			fromCache: false
		};
	} catch (err) {
		console.error('Failed to fetch GitHub repos:', err);
		return {
			repos: [] as ProcessedRepo[],
			tenWeeksAgoDate: getTenWeeksAgoDate(),
			error: 'Failed to connect to GitHub API',
			fromCache: false
		};
	}
};
