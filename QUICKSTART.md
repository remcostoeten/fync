# 🚀 Fync Quickstart: From Zero to API Hero in 5 Minutes

*Build a multi-API dashboard that combines GitHub, Spotify, and NPM data in just 5 minutes.*

## What You'll Build

A developer dashboard that shows:
- 📊 Your GitHub repository stats  
- 🎵 Your current Spotify track
- 📦 NPM package health for your projects

![Demo Preview](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Demo+Dashboard+Preview)

## Prerequisites

- Node.js 18+
- GitHub Personal Access Token ([Get one here](https://github.com/settings/tokens))
- Spotify Access Token ([OAuth flow guide](https://developer.spotify.com/documentation/web-api/tutorials/getting-started))

## Step 1: Install & Setup (30 seconds)

```bash
npm install @remcostoeten/fync
```

Create `.env` file:
```env
GITHUB_TOKEN=ghp_your_github_token_here
SPOTIFY_ACCESS_TOKEN=your_spotify_token_here
```

## Step 2: Basic GitHub Integration (1 minute)

```typescript
import { GitHub } from '@remcostoeten/fync/github';

const github = GitHub({ token: process.env.GITHUB_TOKEN });

// Get your profile + top repositories
async function getGitHubStats() {
  const [profile, repos] = await Promise.all([
    github.me.get(),
    github.me.repos.get({ params: { sort: 'updated', per_page: 5 } })
  ]);

  return {
    username: profile.login,
    totalRepos: profile.public_repos,
    followers: profile.followers,
    topRepos: repos.map(repo => ({
      name: repo.name,
      stars: repo.stargazers_count,
      language: repo.language
    }))
  };
}
```

## Step 3: Add Spotify Integration (1 minute)

```typescript
import { Spotify } from '@remcostoeten/fync/spotify';

const spotify = Spotify({ token: process.env.SPOTIFY_ACCESS_TOKEN });

// Get currently playing track
async function getCurrentMusic() {
  const current = await spotify.player.currentlyPlaying();
  
  if (!current?.item) return { message: 'No music playing' };
  
  return {
    track: current.item.name,
    artist: current.item.artists[0].name,
    album: current.item.album.name,
    isPlaying: current.is_playing
  };
}
```

## Step 4: Add NPM Package Analysis (1 minute)

```typescript
import { NPM } from '@remcostoeten/fync/npm';

const npm = NPM({ cache: true });

// Analyze your favorite packages
async function analyzePackages() {
  const packages = ['react', 'typescript', 'next'];
  
  const analysis = await Promise.all(
    packages.map(async pkg => {
      const [info, downloads] = await Promise.all([
        npm.package(pkg).get(),
        npm.package(pkg).downloads.last('week')
      ]);
      
      return {
        name: pkg,
        version: info['dist-tags'].latest,
        weeklyDownloads: downloads.downloads,
        license: info.license
      };
    })
  );
  
  return analysis;
}
```

## Step 5: Create Your Dashboard (1.5 minutes)

```typescript
// dashboard.ts
async function createDashboard() {
  console.log('🔄 Building your developer dashboard...\n');
  
  try {
    const [githubStats, musicStatus, packageStats] = await Promise.all([
      getGitHubStats(),
      getCurrentMusic(),
      analyzePackages()
    ]);

    // Display GitHub Stats
    console.log('📊 GitHub Profile:');
    console.log(`   👤 ${githubStats.username} (${githubStats.followers} followers)`);
    console.log(`   📁 ${githubStats.totalRepos} public repositories`);
    console.log('   🌟 Top Repositories:');
    githubStats.topRepos.forEach(repo => 
      console.log(`      ${repo.name} - ${repo.stars}⭐ (${repo.language})`)
    );

    // Display Music Status
    console.log('\n🎵 Currently Playing:');
    if (musicStatus.track) {
      console.log(`   🎧 ${musicStatus.track} by ${musicStatus.artist}`);
      console.log(`   💿 Album: ${musicStatus.album}`);
      console.log(`   ${musicStatus.isPlaying ? '▶️ Playing' : '⏸️ Paused'}`);
    } else {
      console.log('   🔇 No music playing');
    }

    // Display Package Analysis
    console.log('\n📦 Package Analysis:');
    packageStats.forEach(pkg => 
      console.log(`   ${pkg.name}@${pkg.version} - ${pkg.weeklyDownloads.toLocaleString()} weekly downloads`)
    );

  } catch (error) {
    console.error('❌ Error building dashboard:', error.message);
  }
}

// Run the dashboard
createDashboard();
```

## Step 6: Run Your Dashboard (30 seconds)

```bash
npx tsx dashboard.ts
```

**Expected Output:**
```
🔄 Building your developer dashboard...

📊 GitHub Profile:
   👤 octocat (1234 followers)
   📁 8 public repositories
   🌟 Top Repositories:
      Hello-World - 1892⭐ (C)
      git-consortium - 45⭐ (JavaScript)

🎵 Currently Playing:
   🎧 Bohemian Rhapsody by Queen
   💿 Album: A Night at the Opera
   ▶️ Playing

📦 Package Analysis:
   react@18.2.0 - 18,419,159 weekly downloads
   typescript@5.3.3 - 8,234,567 weekly downloads
   next@14.0.4 - 4,123,890 weekly downloads
```

## 🎉 Congratulations!

You just built a multi-API dashboard in under 5 minutes! 

## What's Next?

### 🔥 Level Up Your Dashboard
- Add **Google Calendar** integration for upcoming meetings
- Create a **web interface** with React/Next.js
- Set up **real-time updates** with webhooks
- Add **data persistence** with a database

### 🚀 Production Ready
- Implement **error handling** and retries
- Add **rate limiting** and caching strategies  
- Set up **monitoring** and alerting
- Deploy to **Vercel/Netlify/AWS**

### 📚 Learn More
- [📖 Complete API Documentation](./docs/README.md)
- [🎯 Advanced Examples](./examples/)
- [🔐 Security Best Practices](./SECURITY.md)
- [💬 Join the Community](https://github.com/remcostoeten/fync/discussions)

## Need Help?

- 🐛 **Found a bug?** [Open an issue](https://github.com/remcostoeten/fync/issues)
- 💡 **Have an idea?** [Start a discussion](https://github.com/remcostoeten/fync/discussions)
- 📧 **Questions?** Email: support@fync.dev

---

**Pro Tip:** Star the repo ⭐ if this saved you time, and share your creations with `#FyncMadeThis`!
