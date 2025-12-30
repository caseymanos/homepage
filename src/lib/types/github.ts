/**
 * GitHub API types for repository data
 */

export interface GitHubRepo {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	homepage: string | null;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
	watchers_count: number;
	open_issues_count: number;
	size: number; // KB
	created_at: string;
	updated_at: string;
	pushed_at: string;
	topics: string[];
	fork: boolean;
	archived: boolean;
	disabled: boolean;
	visibility: string;
	default_branch: string;
}

export type SizeCategory = 'minimal' | 'small' | 'medium' | 'large' | 'massive';

export interface ProcessedRepo {
	id: number;
	name: string;
	displayName: string;
	description: string | null;
	url: string;
	homepage: string | null;
	language: string | null;
	stars: number;
	forks: number;
	size: number;
	commitCount: number;
	linesOfCode: number;
	sizeCategory: SizeCategory;
	createdAt: Date;
	updatedAt: Date;
	pushedAt: Date;
	topics: string[];
	isFork: boolean;
	isArchived: boolean;
	isWithinLast10Weeks: boolean;
}

/**
 * Size categories based on lines of code
 * minimal: < 500 LOC
 * small: 500 - 2,000 LOC
 * medium: 2,000 - 10,000 LOC
 * large: 10,000 - 50,000 LOC
 * massive: > 50,000 LOC
 */
export function getSizeCategory(linesOfCode: number): SizeCategory {
	if (linesOfCode >= 50000) return 'massive';
	if (linesOfCode >= 10000) return 'large';
	if (linesOfCode >= 2000) return 'medium';
	if (linesOfCode >= 500) return 'small';
	return 'minimal';
}

/**
 * Check if a date is within the last 10 weeks
 */
export function isWithinLast10Weeks(date: Date): boolean {
	const tenWeeksAgo = new Date();
	tenWeeksAgo.setDate(tenWeeksAgo.getDate() - 70); // 10 weeks = 70 days
	return date >= tenWeeksAgo;
}

/**
 * Get the date 10 weeks ago (for timeline marker)
 */
export function getTenWeeksAgoDate(): Date {
	const date = new Date();
	date.setDate(date.getDate() - 70);
	return date;
}

/**
 * Convert raw GitHub API response to processed repo
 */
export function processRepo(
	repo: GitHubRepo,
	commitCount: number = 0,
	linesOfCode: number = 0
): ProcessedRepo {
	const pushedAt = new Date(repo.pushed_at);
	const createdAt = new Date(repo.created_at);

	return {
		id: repo.id,
		name: repo.name,
		displayName: formatRepoName(repo.name),
		description: repo.description,
		url: repo.html_url,
		homepage: repo.homepage,
		language: repo.language,
		stars: repo.stargazers_count,
		forks: repo.forks_count,
		size: repo.size,
		commitCount,
		linesOfCode,
		sizeCategory: getSizeCategory(linesOfCode),
		createdAt,
		updatedAt: new Date(repo.updated_at),
		pushedAt,
		topics: repo.topics || [],
		isFork: repo.fork,
		isArchived: repo.archived,
		isWithinLast10Weeks: isWithinLast10Weeks(pushedAt) || isWithinLast10Weeks(createdAt)
	};
}

/**
 * Convert repo name to display format
 * e.g., "my-cool-project" -> "My Cool Project"
 */
function formatRepoName(name: string): string {
	return name
		.split(/[-_]/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

/**
 * Language color mapping for visual indicators
 */
export const languageColors: Record<string, string> = {
	TypeScript: '#3178c6',
	JavaScript: '#f7df1e',
	Python: '#3572A5',
	Rust: '#dea584',
	Go: '#00ADD8',
	Java: '#b07219',
	'C++': '#f34b7d',
	C: '#555555',
	Ruby: '#701516',
	Swift: '#F05138',
	Kotlin: '#A97BFF',
	Svelte: '#ff3e00',
	HTML: '#e34c26',
	CSS: '#563d7c',
	Shell: '#89e051',
	Dockerfile: '#384d54',
	MDX: '#fcb32c'
};

export function getLanguageColor(language: string | null): string {
	if (!language) return '#6b7280';
	return languageColors[language] || '#6b7280';
}

/**
 * Format lines of code for display
 */
export function formatLinesOfCode(loc: number): string {
	if (loc >= 1000000) return `${(loc / 1000000).toFixed(1)}M`;
	if (loc >= 1000) return `${(loc / 1000).toFixed(1)}K`;
	return loc.toString();
}

/**
 * Format date for timeline display
 */
export function formatTimelineDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		month: 'short',
		year: 'numeric'
	});
}
