import { useState } from 'react';
import { Play, Settings, Copy, Check, AlertCircle, ChevronDown } from 'lucide-react';
import { useClipboard } from '../hooks/useClipboard';

type TProps = {
  title: string;
  description: string;
  defaultCode: string;
  apiType: 'github' | 'spotify';
}

type ApiMethod = {
  id: string;
  name: string;
  description: string;
  params: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
}

const GITHUB_METHODS: ApiMethod[] = [
  {
    id: 'user.get',
    name: 'Get User Profile',
    description: 'Get public information about a GitHub user',
    params: [
      { name: 'username', type: 'string', required: true, description: 'GitHub username' }
    ]
  },
  {
    id: 'me.get',
    name: 'Get Authenticated User',
    description: 'Get information about the authenticated user',
    params: []
  },
  {
    id: 'user.repos',
    name: 'Get User Repositories',
    description: 'List public repositories for a user',
    params: [
      { name: 'username', type: 'string', required: true, description: 'GitHub username' }
    ]
  },
  {
    id: 'me.repos',
    name: 'Get My Repositories',
    description: 'List repositories for the authenticated user',
    params: []
  },
  {
    id: 'repo.get',
    name: 'Get Repository',
    description: 'Get information about a specific repository',
    params: [
      { name: 'owner', type: 'string', required: true, description: 'Repository owner' },
      { name: 'repo', type: 'string', required: true, description: 'Repository name' }
    ]
  },
  {
    id: 'search.repositories',
    name: 'Search Repositories',
    description: 'Search for repositories on GitHub',
    params: [
      { name: 'query', type: 'string', required: true, description: 'Search query' }
    ]
  }
];

const SPOTIFY_METHODS: ApiMethod[] = [
  {
    id: 'me.get',
    name: 'Get My Profile',
    description: 'Get detailed profile information about the current user',
    params: []
  },
  {
    id: 'me.playlists',
    name: 'Get My Playlists',
    description: 'Get a list of the playlists owned or followed by the current user',
    params: []
  },
  {
    id: 'me.tracks',
    name: 'Get Saved Tracks',
    description: 'Get the current user\'s saved tracks',
    params: []
  },
  {
    id: 'me.albums',
    name: 'Get Saved Albums',
    description: 'Get the current user\'s saved albums',
    params: []
  },
  {
    id: 'me.artists',
    name: 'Get Followed Artists',
    description: 'Get the current user\'s followed artists',
    params: []
  },
  {
    id: 'player.currently-playing',
    name: 'Get Currently Playing',
    description: 'Get information about the user\'s current playback',
    params: []
  },
  {
    id: 'search.tracks',
    name: 'Search Tracks',
    description: 'Search for tracks on Spotify',
    params: [
      { name: 'query', type: 'string', required: true, description: 'Search query' }
    ]
  },
  {
    id: 'search.artists',
    name: 'Search Artists',
    description: 'Search for artists on Spotify',
    params: [
      { name: 'query', type: 'string', required: true, description: 'Search query' }
    ]
  },
  {
    id: 'playlist.get',
    name: 'Get Playlist',
    description: 'Get a playlist owned by a Spotify user',
    params: [
      { name: 'playlistId', type: 'string', required: true, description: 'Spotify playlist ID' }
    ]
  }
];

export function InteractivePlayground({ title, description, defaultCode, apiType }: TProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [params, setParams] = useState<Record<string, string>>({});
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showMethodDropdown, setShowMethodDropdown] = useState(false);
  const { copied, copyToClipboard } = useClipboard();

  const methods = apiType === 'github' ? GITHUB_METHODS : SPOTIFY_METHODS;
  const selectedMethodData = methods.find(m => m.id === selectedMethod);

  function handleMethodSelect(methodId: string) {
    setSelectedMethod(methodId);
    setShowMethodDropdown(false);
    setParams({});
    setError('');
    setOutput('');
  }

  function handleParamChange(paramName: string, value: string) {
    setParams(prev => ({
      ...prev,
      [paramName]: value
    }));
  }

  function generateCodeExample() {
    if (!selectedMethodData) return '';

    const apiClient = apiType === 'github' ? 'github' : 'spotify';
    let methodCall = '';

    switch (selectedMethod) {
      case 'user.get':
        methodCall = `${apiClient}.user('${params.username || 'octocat'}').get()`;
        break;
      case 'me.get':
        methodCall = `${apiClient}.me.get()`;
        break;
      case 'user.repos':
        methodCall = `${apiClient}.user('${params.username || 'octocat'}').repos.get()`;
        break;
      case 'me.repos':
        methodCall = `${apiClient}.me.repos.get()`;
        break;
      case 'repo.get':
        methodCall = `${apiClient}.repo('${params.owner || 'facebook'}', '${params.repo || 'react'}').get()`;
        break;
      case 'search.repositories':
        methodCall = `${apiClient}.search.repositories('${params.query || 'javascript'}')`;
        break;
      case 'me.playlists':
        methodCall = `${apiClient}.me.playlists.get()`;
        break;
      case 'me.tracks':
        methodCall = `${apiClient}.me.tracks.get()`;
        break;
      case 'me.albums':
        methodCall = `${apiClient}.me.albums.get()`;
        break;
      case 'me.artists':
        methodCall = `${apiClient}.me.artists.get()`;
        break;
      case 'player.currently-playing':
        methodCall = `${apiClient}.player.currentlyPlaying()`;
        break;
      case 'search.tracks':
        methodCall = `${apiClient}.search.tracks('${params.query || 'bohemian rhapsody'}')`;
        break;
      case 'search.artists':
        methodCall = `${apiClient}.search.artists('${params.query || 'queen'}')`;
        break;
      case 'playlist.get':
        methodCall = `${apiClient}.playlist('${params.playlistId || '37i9dQZF1DXcBWIGoYBM5M'}').get()`;
        break;
      default:
        return '';
    }

    return `import { ${apiType === 'github' ? 'GitHub' : 'Spotify'} } from '@remcostoeten/fync/${apiType}';

const ${apiClient} = ${apiType === 'github' ? 'GitHub' : 'Spotify'}({ 
  token: 'your-${apiType}-token' 
});

// ${selectedMethodData.description}
const result = await ${methodCall};
console.log(result);`;
  }

  async function runApiCall() {
    if (!selectedMethod) {
      setError('Please select an API method first.');
      return;
    }

    // Validate required parameters
    if (selectedMethodData) {
      const missingParams = selectedMethodData.params
        .filter(param => param.required && !params[param.name])
        .map(param => param.name);

      if (missingParams.length > 0) {
        setError(`Missing required parameters: ${missingParams.join(', ')}`);
        return;
      }
    }

    setIsRunning(true);
    setError('');
    setOutput('');

    try {
      // Get stored token for the API type
      const tokens = JSON.parse(localStorage.getItem('fync-tokens') || '[]');
      const apiToken = tokens.find(t => t.type === apiType)?.token;

      if (!apiToken) {
        throw new Error(`No ${apiType} token found. Please add a token in the Token Manager first.`);
      }

      // Make request to serverless function
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiType,
          method: selectedMethod,
          params,
          token: apiToken
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'API call failed');
      }

      setOutput(JSON.stringify(result.data, null, 2));
    } catch (err) {
      setError(err.message || 'Failed to execute API call. Please check your token and try again.');
    } finally {
      setIsRunning(false);
    }
  }

  function handleCopyCode() {
    const code = generateCodeExample();
    if (code) {
      copyToClipboard(code);
    }
  }

  return (
    <div
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      <div
        className="bg-muted/30 px-4 py-3 border-b border-border"
      >
        <div
          className="flex items-center justify-between"
        >
          <div>
            <h3
              className="font-semibold text-foreground"
            >
              {title}
            </h3>
            <p
              className="text-sm text-muted-foreground mt-1"
            >
              {description}
            </p>
          </div>
          <div
            className="flex items-center space-x-2"
          >
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-md bg-background hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyCode}
              disabled={!selectedMethod}
              className="p-2 rounded-md bg-background hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={runApiCall}
              disabled={isRunning || !selectedMethod}
              className="flex items-center space-x-2 px-3 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>
                {isRunning ? 'Running...' : 'Run'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {showSettings && (
        <div
          className="bg-muted/20 px-4 py-3 border-b border-border"
        >
          <div
            className="space-y-3"
          >
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-1"
              >
                API Endpoint
              </label>
              <select
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="production">Production ({apiType === 'github' ? 'api.github.com' : 'api.spotify.com'})</option>
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-1"
              >
                Request Timeout (ms)
              </label>
              <input
                type="number"
                defaultValue={5000}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>
      )}

      <div
        className="p-4 space-y-4"
      >
        {/* Method Selection */}
        <div>
          <label
            className="block text-sm font-medium text-foreground mb-2"
          >
            Select API Method
          </label>
          <div className="relative">
            <button
              onClick={() => setShowMethodDropdown(!showMethodDropdown)}
              className="w-full flex items-center justify-between px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <span>
                {selectedMethodData ? selectedMethodData.name : 'Choose a method...'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showMethodDropdown && (
              <div
                className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-64 overflow-y-auto z-50"
              >
                {methods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handleMethodSelect(method.id)}
                    className="w-full text-left px-3 py-2 hover:bg-muted border-b border-border last:border-b-0 transition-colors"
                  >
                    <div className="font-medium text-foreground">{method.name}</div>
                    <div className="text-sm text-muted-foreground">{method.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Parameters */}
        {selectedMethodData && selectedMethodData.params.length > 0 && (
          <div>
            <label
              className="block text-sm font-medium text-foreground mb-2"
            >
              Parameters
            </label>
            <div className="space-y-3">
              {selectedMethodData.params.map((param) => (
                <div key={param.name}>
                  <label
                    className="block text-xs font-medium text-muted-foreground mb-1"
                  >
                    {param.name} {param.required && <span className="text-destructive">*</span>}
                  </label>
                  <input
                    type="text"
                    value={params[param.name] || ''}
                    onChange={(e) => handleParamChange(param.name, e.target.value)}
                    placeholder={param.description}
                    className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Generated Code Preview */}
        {selectedMethod && (
          <div>
            <label
              className="block text-sm font-medium text-foreground mb-2"
            >
              Generated Code
            </label>
            <pre
              className="p-3 bg-muted/30 border border-border rounded-md text-sm text-foreground overflow-auto max-h-32"
            >
              <code>{generateCodeExample()}</code>
            </pre>
          </div>
        )}

        {/* Output */}
        <div>
          <label
            className="block text-sm font-medium text-foreground mb-2"
          >
            Output
          </label>
          <div
            className="h-64 p-3 bg-muted/30 border border-border rounded-md overflow-auto"
          >
            {isRunning && (
              <div
                className="flex items-center space-x-2 text-muted-foreground"
              >
                <div
                  className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"
                />
                <span>Executing API call...</span>
              </div>
            )}
            {error && !isRunning && (
              <div
                className="flex items-start space-x-2 text-destructive"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            {output && !isRunning && (
              <pre
                className="text-sm text-foreground whitespace-pre-wrap"
              >
                {output}
              </pre>
            )}
            {!output && !error && !isRunning && (
              <div
                className="text-muted-foreground text-sm"
              >
                Select an API method and click "Run" to see the output here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}