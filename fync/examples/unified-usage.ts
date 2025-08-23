/**
 * Fync Unified API Usage Examples
 * 
 * This file demonstrates how easy it is to use the unified Fync APIs
 * All APIs follow the same pattern and provide rich convenience methods
 */

import { GitHub } from "../src/github/index.new";
import { NPM } from "../src/npm/index.new";
import { Spotify } from "../src/spotify/index.new";
import { Vercel } from "../src/vercel/index.new";

async function githubExamples() {
	const github = GitHub({ token: process.env.GITHUB_TOKEN! });

	// Simple user queries
	const user = await github.getUser("remcostoeten");
	console.log(`User ${user.login} has ${user.followers} followers`);

	// Repository queries - multiple syntaxes supported
	const repo1 = await github.getRepository("remcostoeten", "fync");
	const repo2 = await github.getRepositoryFromUrl("https://github.com/remcostoeten/fync");
	
	// Commit queries with various options
	const allCommits = await github.getUserCommits("remcostoeten");
	const latestCommit = await github.getUserLatestCommit("remcostoeten");
	const lastYearCommits = await github.getUserCommitsInTimeframe("remcostoeten", "1Y");
	const last3MonthCommits = await github.getUserCommitsInTimeframe("remcostoeten", "3M");
	
	// Stars and repository metadata
	const repoStars = await github.getRepositoryStars("remcostoeten", "fync");
	const userStarredCount = await github.getUserStarredCount("remcostoeten");
	
	// Comprehensive user statistics
	const stats = await github.getUserStats("remcostoeten");
	console.log(`Total repos: ${stats.totalRepos}, Total stars: ${stats.totalStars}`);
	
	// Search functionality
	const searchResults = await github.searchRepositories("typescript react", {
		sort: "stars",
		order: "desc",
		per_page: 10,
	});

	// Direct resource access for advanced usage
	const issues = await github.repos.getRepoIssues({
		owner: "facebook",
		repo: "react",
		state: "open",
		labels: "bug",
	});

	// Creating content
	const newIssue = await github.repos.createRepoIssue(
		{
			title: "Bug report",
			body: "Description of the issue",
			labels: ["bug"],
		},
		{ owner: "remcostoeten", repo: "fync" },
	);
}

async function npmExamples() {
	const npm = NPM();

	// Package queries
	const pkg = await npm.getPackage("react");
	const latestVersion = await npm.getLatestVersion("react");
	const packageSize = await npm.getPackageSize("react");
	
	// Download statistics
	const downloads = await npm.getPackageDownloads("react", "last-month");
	console.log(`React had ${downloads.downloads} downloads last month`);
	
	// Package metadata
	const dependencies = await npm.getPackageDependencies("react", "18.2.0");
	const isDeprecated = await npm.isPackageDeprecated("old-package");
	const maintainers = await npm.getPackageMaintainers("react");
	const keywords = await npm.getPackageKeywords("react");
	const readme = await npm.getPackageReadme("react");
	
	// Comprehensive package statistics
	const stats = await npm.getPackageStats("react");
	console.log(`${stats.name} v${stats.version}: ${stats.downloads} downloads`);
	
	// Search functionality
	const searchResults = await npm.searchPackages("react hooks", {
		size: 20,
		quality: 0.5,
		popularity: 0.8,
	});

	// Direct resource access
	const packageInfo = await npm.packages.getPackageVersion({
		packageName: "@remcostoeten/fync",
		version: "3.0.0",
	});
}

async function spotifyExamples() {
	const spotify = Spotify({ token: process.env.SPOTIFY_TOKEN! });

	// Track, artist, album queries
	const track = await spotify.getTrack("3n3Ppam7vgaVa1iaRUc9Lp");
	const artist = await spotify.getArtist("0OdUWJ0sBjDrqHygGUXeCF");
	const album = await spotify.getAlbum("4aawyAB9vmqN3uQ7FjRGTy");
	const playlist = await spotify.getPlaylist("37i9dQZF1DXcBWIGoYBM5M");
	
	// Personal data
	const topTracks = await spotify.getMyTopTracks({
		timeRange: "short_term",
		limit: 10,
	});
	const topArtists = await spotify.getMyTopArtists({
		timeRange: "long_term",
		limit: 20,
	});
	const recentlyPlayed = await spotify.getRecentlyPlayed({ limit: 50 });
	const currentlyPlaying = await spotify.getCurrentlyPlaying();
	
	// Search with different types
	const tracks = await spotify.searchTracks("bohemian rhapsody");
	const artists = await spotify.searchArtists("queen");
	const albums = await spotify.searchAlbums("a night at the opera");
	const playlists = await spotify.searchPlaylists("rock classics");
	
	// Advanced search with multiple types
	const multiSearch = await spotify.search("queen", ["artist", "track", "album"], {
		limit: 10,
		offset: 0,
		market: "US",
	});
	
	// Playlist management
	const newPlaylist = await spotify.createPlaylist("user123", "My Awesome Playlist", {
		description: "Created with Fync!",
		public: true,
	});
	
	await spotify.addTracksToPlaylist(newPlaylist.id, [
		"spotify:track:3n3Ppam7vgaVa1iaRUc9Lp",
		"spotify:track:4u7EnebtmKWzUH433cf5Qv",
	]);
	
	// Playback control
	await spotify.playTrack("spotify:track:3n3Ppam7vgaVa1iaRUc9Lp");
	await spotify.pausePlayback();
	await spotify.skipToNext();
	await spotify.skipToPrevious();
	
	// Audio analysis
	const audioFeatures = await spotify.getAudioFeatures("3n3Ppam7vgaVa1iaRUc9Lp");
	console.log(`Track energy: ${audioFeatures.energy}, Danceability: ${audioFeatures.danceability}`);
	
	// Recommendations
	const recommendations = await spotify.getRecommendations({
		seed_artists: "0OdUWJ0sBjDrqHygGUXeCF",
		seed_tracks: "3n3Ppam7vgaVa1iaRUc9Lp",
		min_energy: 0.4,
		target_popularity: 80,
	});

	// Direct resource access for advanced usage
	const devices = await spotify.player.getDevices();
	await spotify.player.setVolume({ volume_percent: 50 });
	await spotify.player.setShuffle({ state: true });
}

async function vercelExamples() {
	const vercel = Vercel({ 
		token: process.env.VERCEL_TOKEN!,
		teamId: process.env.VERCEL_TEAM_ID,
	});

	// Project management
	const projects = await vercel.listProjects();
	const project = await vercel.getProject("my-project-id");
	
	// Deployment operations
	const latestDeployment = await vercel.getLatestDeployment("my-project-id");
	const deploymentStatus = await vercel.getDeploymentStatus(latestDeployment.id);
	console.log(`Deployment ${deploymentStatus.id} is ${deploymentStatus.state}`);
	
	// Redeploy a project
	const newDeployment = await vercel.redeployProject("my-project-id");
	
	// Domain management
	const domainStatus = await vercel.getDomainStatus("example.com");
	console.log(`Domain ${domainStatus.domain} verified: ${domainStatus.verified}`);
	
	// Team statistics
	const teamUsage = await vercel.getTeamUsage("team-id");
	console.log(`Team has ${teamUsage.usage.projects} projects`);
	
	// Analytics (mock data for now)
	const analytics = await vercel.getProjectAnalytics("my-project-id", {
		period: "30d",
	});

	// Direct resource access
	const envVars = await vercel.projects.getProjectEnvVars({ 
		projectId: "my-project-id" 
	});
	
	await vercel.projects.createProjectEnvVar(
		{
			key: "API_KEY",
			value: "secret-value",
			target: ["production"],
		},
		{ projectId: "my-project-id" },
	);
}

// Example of adding a completely new API (e.g., Stripe)
// This shows how easy it is to add new APIs with the unified architecture
async function addingNewApiExample() {
	// Step 1: Define resources (can be copy-pasted and modified)
	const stripeResources = {
		customers: {
			name: "customers",
			basePath: "/v1/customers",
			methods: {
				listCustomers: { path: "" },
				getCustomer: { path: "/{customerId}" },
				createCustomer: { path: "", method: "POST" },
				updateCustomer: { path: "/{customerId}", method: "POST" },
				deleteCustomer: { path: "/{customerId}", method: "DELETE" },
			},
		},
		charges: {
			name: "charges",
			basePath: "/v1/charges",
			methods: {
				listCharges: { path: "" },
				getCharge: { path: "/{chargeId}" },
				createCharge: { path: "", method: "POST" },
			},
		},
	};

	// Step 2: Create the API builder (copy-paste pattern)
	// const buildStripe = createApiBuilder({
	//   baseUrl: "https://api.stripe.com",
	//   auth: { type: "bearer" },
	// });

	// Step 3: Export the function with convenience methods
	// export function Stripe(config: { token: string }) {
	//   const base = buildStripe(config, stripeResources);
	//   // Add convenience methods...
	//   return base;
	// }

	// That's it! New API added in ~30 lines of code
}

// Run examples
async function main() {
	console.log("🚀 Fync Unified API Examples\n");

	if (process.env.GITHUB_TOKEN) {
		console.log("📦 GitHub Examples:");
		await githubExamples();
	}

	console.log("\n📦 NPM Examples:");
	await npmExamples();

	if (process.env.SPOTIFY_TOKEN) {
		console.log("\n🎵 Spotify Examples:");
		await spotifyExamples();
	}

	if (process.env.VERCEL_TOKEN) {
		console.log("\n▲ Vercel Examples:");
		await vercelExamples();
	}
}

main().catch(console.error);
