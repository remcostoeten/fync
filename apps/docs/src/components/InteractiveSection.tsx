;
import { InteractivePlayground } from './InteractivePlayground';
import { ApiTester } from './ApiTester';
import { TokenManager } from './TokenManager';

// Consistent easing curve for snappy animations
const EASE_CURVE = [0.4, 0, 0.2, 1];

export function InteractiveSection() {
  const githubExample = `import { GitHub } from '@remcostoeten/fync/github';

const github = GitHub({ 
  token: 'your-github-token' 
});

// Get user information
const user = await github.user('octocat').get();
console.log(user);`;

  const spotifyExample = `import { Spotify } from '@remcostoeten/fync/spotify';

const spotify = Spotify({ 
  token: 'your-spotify-token' 
});

// Get current user profile
const profile = await spotify.me.get();
console.log(profile);`;

  return (
    <div
      id="interactive" 
      className="space-y-8"
    >
      <div
        className="border-b border-border pb-4"
      >
        <h2
          className="text-2xl font-bold text-foreground"
        >
          Interactive Tools
        </h2>
        <p
          className="text-muted-foreground mt-2"
        >
          Test API methods, manage tokens, and experiment with code examples in real-time.
        </p>
      </div>

      <div
        className="space-y-8"
      >
        <TokenManager />

        <InteractivePlayground
          title="GitHub API Playground"
          description="Test GitHub API methods with live code execution"
          defaultCode={githubExample}
          apiType="github"
        />

        <InteractivePlayground
          title="Spotify API Playground"
          description="Test Spotify API methods with live code execution"
          defaultCode={spotifyExample}
          apiType="spotify"
        />

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <ApiTester
            endpoint="/user"
            method="GET"
            description="Get authenticated user information"
          />
          <ApiTester
            endpoint="/user/repos"
            method="GET"
            description="List repositories for the authenticated user"
          />
          <ApiTester
            endpoint="/me"
            method="GET"
            description="Get current user's Spotify profile"
          />
          <ApiTester
            endpoint="/me/playlists"
            method="GET"
            description="Get current user's playlists"
          />
        </div>
      </div>
    </div>
  );
}