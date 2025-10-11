import { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, Trash2, Plus, Github, Music } from 'lucide-react';

type TToken = {
  id: string;
  name: string;
  type: 'github' | 'spotify';
  token: string;
  scopes: string[];
  createdAt: string;
  lastUsed?: string;
}

export function TokenManager() {
  const [tokens, setTokens] = useState<TToken[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [visibleTokens, setVisibleTokens] = useState<Set<string>>(new Set());
  const [newToken, setNewToken] = useState({
    name: '',
    type: 'github' as 'github' | 'spotify',
    token: '',
    scopes: [] as string[]
  });

  useEffect(() => {
    // Load tokens from localStorage
    const savedTokens = localStorage.getItem('fync-tokens');
    if (savedTokens) {
      setTokens(JSON.parse(savedTokens));
    }
  }, []);

  function saveTokens(updatedTokens: TToken[]) {
    setTokens(updatedTokens);
    localStorage.setItem('fync-tokens', JSON.stringify(updatedTokens));
  }

  function addToken() {
    if (!newToken.name || !newToken.token) return;

    const token: TToken = {
      id: Date.now().toString(),
      name: newToken.name,
      type: newToken.type,
      token: newToken.token,
      scopes: newToken.scopes,
      createdAt: new Date().toISOString()
    };

    saveTokens([...tokens, token]);
    setNewToken({ name: '', type: 'github', token: '', scopes: [] });
    setShowAddForm(false);
  }

  function deleteToken(id: string) {
    saveTokens(tokens.filter(token => token.id !== id));
  }

  function toggleTokenVisibility(id: string) {
    const newVisible = new Set(visibleTokens);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleTokens(newVisible);
  }

  async function testToken(token: TToken) {
    try {
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiType: token.type,
          method: token.type === 'github' ? 'me.get' : 'me.get',
          params: {},
          token: token.token
        })
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`Token "${token.name}" is valid!`);
        // Update last used timestamp
        const updatedTokens = tokens.map(t => 
          t.id === token.id 
            ? { ...t, lastUsed: new Date().toISOString() }
            : t
        );
        saveTokens(updatedTokens);
      } else {
        alert(`Token "${token.name}" failed: ${result.error}`);
      }
    } catch (error) {
      alert(`Token test failed: ${error.message}`);
    }
  }

  function maskToken(token: string) {
    return token.slice(0, 8) + '•'.repeat(token.length - 12) + token.slice(-4);
  }

  function getTokenIcon(type: 'github' | 'spotify') {
    return type === 'github' ? <Github className="w-4 h-4" /> : <Music className="w-4 h-4" />;
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
          <div
            className="flex items-center space-x-2"
          >
            <Key className="w-5 h-5 text-accent" />
            <h3
              className="font-semibold text-foreground"
            >
              Token Manager
            </h3>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 px-3 py-1 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Token</span>
          </button>
        </div>
      </div>

      {showAddForm && (
        <div
          className="bg-muted/20 px-4 py-4 border-b border-border"
        >
          <div
            className="space-y-3"
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <div>
                <label
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Token Name
                </label>
                <input
                  type="text"
                  value={newToken.name}
                  onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
                  placeholder="My GitHub Token"
                  className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Type
                </label>
                <select
                  value={newToken.type}
                  onChange={(e) => setNewToken({ ...newToken, type: e.target.value as 'github' | 'spotify' })}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="github">GitHub</option>
                  <option value="spotify">Spotify</option>
                </select>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-1"
              >
                Token
              </label>
              <input
                type="password"
                value={newToken.token}
                onChange={(e) => setNewToken({ ...newToken, token: e.target.value })}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div
              className="flex justify-end space-x-2"
            >
              <button
                onClick={() => setShowAddForm(false)}
                className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addToken}
                className="px-3 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
              >
                Add Token
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="p-4"
      >
        {tokens.length === 0 ? (
          <div
            className="text-center py-8 text-muted-foreground"
          >
            <Key className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No tokens stored yet.</p>
            <p className="text-sm">Add a token to get started with API testing.</p>
          </div>
        ) : (
          <div
            className="space-y-3"
          >
            {tokens.map((token, index) => (
              <div
                key={token.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border"
              >
                <div
                  className="flex items-center space-x-3"
                >
                  <div
                    className="text-accent"
                  >
                    {getTokenIcon(token.type)}
                  </div>
                  <div>
                    <div
                      className="font-medium text-foreground"
                    >
                      {token.name}
                    </div>
                    <div
                      className="text-sm text-muted-foreground font-mono"
                    >
                      {visibleTokens.has(token.id) ? token.token : maskToken(token.token)}
                    </div>
                    <div
                      className="text-xs text-muted-foreground"
                    >
                      Created: {new Date(token.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-center space-x-2"
                >
                  <button
                    onClick={() => testToken(token)}
                    className="p-1 text-muted-foreground hover:text-accent transition-colors"
                    title="Test token"
                  >
                    <div className="w-4 h-4 border border-current rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-current rounded-full" />
                    </div>
                  </button>
                  <button
                    onClick={() => toggleTokenVisibility(token.id)}
                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {visibleTokens.has(token.id) ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteToken(token.id)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}