import { Github, Music, Code, Search, Zap, Shield, Star, Users, Download, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

export function OverviewSection() {
  const apiShowcaseCode = `import { GitHub, Spotify } from '@remcostoeten/fync'

// GitHub - Get any user's profile
const github = GitHub({ token: 'your-token' })
const user = await github.user('octocat').get()

// Spotify - Get your profile  
const spotify = Spotify({ token: 'your-token' })
const me = await spotify.me.get()

// That's it! 🎉`;

  const installationCode = `npm install @remcostoeten/fync
# or
yarn add @remcostoeten/fync
# or
pnpm add @remcostoeten/fync`;

  const quickStartCode = `import { createCore } from '@remcostoeten/fync'
import { GitHub } from '@remcostoeten/fync/github'
import { Spotify } from '@remcostoeten/fync/spotify'

// Initialize core
const core = createCore()

// GitHub API
const github = GitHub({ token: 'your-token' })
const user = await github.user('octocat').get()

// Spotify API
const spotify = Spotify({ token: 'your-token' })
const profile = await spotify.me.get()`;

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized for performance with intelligent caching and request batching"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Type Safe",
      description: "Full TypeScript support with auto-generated types from API schemas"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Developer Friendly",
      description: "Intuitive API design with method chaining and comprehensive error handling"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Production Ready",
      description: "Battle-tested with rate limiting, retry mechanisms, and monitoring"
    }
  ];

  const stats = [
    { label: "GitHub Stars", value: "2.4k", icon: <Star className="w-4 h-4" /> },
    { label: "Weekly Downloads", value: "15k", icon: <Download className="w-4 h-4" /> },
    { label: "Contributors", value: "24", icon: <Users className="w-4 h-4" /> },
    { label: "API Coverage", value: "95%", icon: <CheckCircle className="w-4 h-4" /> }
  ];

  return (
    <div id="overview" className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        {/* API Showcase */}
        <div
          className="mb-12"
        >
          <div 
            className="max-w-2xl mx-auto"
          >
            <h2 
              className="text-lg font-semibold text-foreground mb-4 flex items-center justify-center space-x-2"
            >
              <Code className="w-5 h-5 text-accent" />
              <span>Simple. Powerful. Ready.</span>
            </h2>
            <CodeBlock code={apiShowcaseCode} language="typescript" />
          </div>
        </div>

        <div 
          className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full border border-accent/20"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Modern API Library</span>
        </div>
        
        <h1 
          className="text-4xl md:text-6xl font-bold text-foreground"
        >
          Build with{' '}
          <span 
            className="text-transparent bg-gradient-to-r from-accent to-accent/70 bg-clip-text"
          >
            GitHub
          </span>
          {' '}and{' '}
          <span 
            className="text-transparent bg-gradient-to-r from-green-400 to-green-600 bg-clip-text"
          >
            Spotify
          </span>
        </h1>
        
        <p 
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          A modern, type-safe TypeScript library for interacting with GitHub and Spotify APIs. 
          Built for developers who value simplicity, performance, and reliability.
        </p>
        
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            className="flex items-center space-x-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            className="flex items-center space-x-2 border border-border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>View on GitHub</span>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="relative p-6 bg-card border border-border rounded-lg hover:border-accent/50 transition-all duration-300 group overflow-hidden"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
            }}
          >
            {/* Subtle unique spotlight effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
              style={{
                background: `
                  radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                    hsl(var(--accent) / 0.05), 
                    transparent 50%),
                  radial-gradient(100px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                    hsl(var(--accent) / 0.08), 
                    transparent 60%)
                `,
                transform: 'scale(1.02)',
                filter: 'blur(0.5px)'
              }}
            />
            
            {/* Subtle border glow */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(var(--accent) / 0.1) 0%, 
                  transparent 50%, 
                  hsl(var(--accent) / 0.05) 100%)`,
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'xor',
                padding: '1px'
              }}
            />
            
            <div 
              className="relative z-10 text-accent mb-4 group-hover:scale-110 transition-transform"
            >
              {feature.icon}
            </div>
            <h3 
              className="relative z-10 text-lg font-semibold text-foreground mb-2"
            >
              {feature.title}
            </h3>
            <p 
              className="relative z-10 text-muted-foreground"
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Code Examples Section */}
      <div 
        className="space-y-8"
      >
        <div 
          className="text-center"
        >
          <h2 
            className="text-3xl font-bold text-foreground mb-4"
          >
            Get Started in Seconds
          </h2>
          <p 
            className="text-muted-foreground"
          >
            Install Fync and start building amazing applications with GitHub and Spotify APIs
          </p>
        </div>

        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div
          >
            <h3 
              className="text-xl font-semibold text-foreground mb-4"
            >
              Installation
            </h3>
            <CodeBlock code={installationCode} language="bash" />
          </div>

          <div
          >
            <h3 
              className="text-xl font-semibold text-foreground mb-4"
            >
              Quick Start
            </h3>
            <CodeBlock code={quickStartCode} language="typescript" />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        className="relative bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 rounded-2xl p-8 border border-accent/20 text-center overflow-hidden group"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
        }}
      >
        {/* Enhanced CTA spotlight */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
          style={{
            background: `
              radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                hsl(var(--accent) / 0.08), 
                transparent 45%),
              radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                hsl(var(--accent) / 0.12), 
                transparent 60%)
            `,
            transform: 'scale(1.01)',
            filter: 'blur(1px)'
          }}
        />
        
        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg at var(--mouse-x, 50%) var(--mouse-y, 50%), 
              transparent 0deg, 
              hsl(var(--accent) / 0.03) 60deg, 
              transparent 120deg, 
              hsl(var(--accent) / 0.03) 180deg, 
              transparent 240deg, 
              hsl(var(--accent) / 0.03) 300deg, 
              transparent 360deg)`
          }}
        />
        
        <h2 
          className="relative z-10 text-2xl font-bold text-foreground mb-4"
        >
          Ready to Build Something Amazing?
        </h2>

        <p 
          className="relative z-10 text-muted-foreground mb-6 max-w-2xl mx-auto"
        >
          Join thousands of developers who are already building incredible applications 
          with Fync. Start your journey today and experience the power of modern API integration.
        </p>

        <div 
          className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            className="flex items-center space-x-2 bg-accent text-accent-foreground px-8 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            <span>Explore Documentation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            className="flex items-center space-x-2 border border-border px-8 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
          >
            <Music className="w-4 h-4" />
            <span>Try Interactive Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
}