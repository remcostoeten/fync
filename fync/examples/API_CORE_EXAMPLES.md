// ================================
// CORE LAYER - Function-based abstractions
// ================================

// Core functions exported from '../core'
function initializeApi(baseUrl, config) {
  // Sets up base configuration for API
  return {
    baseUrl,
    headers: config?.headers || {},
    initialized: true
  };
}

function Err(result) {
  return {
    throw: function(message) {
      if (!result || result.error) {
        throw new Error(message);
      }
    },
    handle: function(callback) {
      if (!result || result.error) {
        callback(result?.error);
      }
    }
  };
}

function createMethod(methodName) {
  return {
    args: function(...argNames) {
      return {
        endpoint: function(endpointTemplate) {
          return {
            method: function(httpMethod) {
              return {
                transform: function(transformFn) {
                  // Register the method with core system
                  return registerMethod(methodName, {
                    args: argNames,
                    endpoint: endpointTemplate,
                    method: httpMethod || 'GET',
                    transform: transformFn
                  });
                }
              };
            },
            // If no method specified, default to GET
            transform: function(transformFn) {
              return registerMethod(methodName, {
                args: argNames,
                endpoint: endpointTemplate,
                method: 'GET',
                transform: transformFn
              });
            }
          };
        }
      };
    }
  };
}

function createResource(resourceName) {
  return {
    methods: function(methodDefinitions) {
      return registerResource(resourceName, methodDefinitions);
    }
  };
}

function createFync(name) {
  // Creates async function that can be chained
  return {
    params: function(...params) {
      return {
        returns: function(returnShape) {
          return registerFync(name, { params, returns: returnShape });
        }
      };
    }
  };
}

// ================================
// GITHUB API IMPLEMENTATION
// ================================

import { initializeApi, Err, createMethod, createResource } from '../core';

function initGithub(token) {
  const api = initializeApi('https://api.github.com', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  Err(api).throw('Failed to initialize GitHub API');
  return api;
}

createMethod('getUser').args('username').endpoint('/users/{username}');
createMethod('getUserRepos').args('username').endpoint('/users/{username}/repos');
createMethod('getProject').args('owner', 'repo').endpoint('/repos/{owner}/{repo}');
createMethod('getProjectViaUrl').args('repoUrl').endpoint(extractRepoPath);

createResource('github').methods({
  getUser: 'getUser',
  getUserRepos: 'getUserRepos', 
  getProject: 'getProject',
  getProjectViaUrl: 'getProjectViaUrl'
});

// ================================
// NPM API IMPLEMENTATION  
// ================================

function initNpm() {
  const api = initializeApi('https://registry.npmjs.org');
  Err(api).throw('Failed to initialize NPM API');
  return api;
}

createMethod('getPackage').args('name').endpoint('/{name}');
createMethod('searchPackages').args('query').endpoint('/-/v1/search?text={query}');
createMethod('getVersions').args('name').endpoint('/{name}');

createResource('npm').methods({
  get: 'getPackage',
  search: 'searchPackages',
  versions: 'getVersions'
});

// ================================
// SPOTIFY API IMPLEMENTATION
// ================================

function initSpotify(token) {
  const api = initializeApi('https://api.spotify.com/v1', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  Err(api).throw('Failed to initialize Spotify API');
  return api;
}

createMethod('getTrack').args('id').endpoint('/tracks/{id}');
createMethod('searchTracks').args('query').endpoint('/search?q={query}&type=track');
createMethod('getPlaylist').args('id').endpoint('/playlists/{id}');

createResource('spotify').methods({
  getTrack: 'getTrack',
  search: 'searchTracks',
  getPlaylist: 'getPlaylist'
});

// ================================
// VERCEL API IMPLEMENTATION (copy-paste pattern)
// ================================

function initVercel(token) {
  const api = initializeApi('https://api.vercel.com', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  Err(api).throw('Failed to initialize Vercel API');
  return api;
}

createMethod('getProjects').args('teamId').endpoint('/v9/projects?teamId={teamId}');
createMethod('getProject').args('id').endpoint('/v9/projects/{id}');
createMethod('getDeployments').args('projectId').endpoint('/v6/deployments?projectId={projectId}');

createResource('vercel').methods({
  getProjects: 'getProjects',
  getProject: 'getProject', 
  getDeployments: 'getDeployments'
});

// ================================
// USAGE EXAMPLES
// ================================

function exampleUsage() {
  // Initialize APIs
  const githubApi = initGithub('your-token');
  const npmApi = initNpm();
  const spotifyApi = initSpotify('your-token');
  const vercelApi = initVercel('your-token');

  // Usage - all follow same pattern
  github.getUser('octocat').then(function(user) {
    console.log(user.name, user.publicRepos);
  });

  npm.getPackage('react').then(function(pkg) {
    console.log(pkg.name, pkg.version);
  });

  spotify.getTrack('4iV5W9uYEdYUVa79Axb7Rh').then(function(track) {
    console.log(track.name, track.artists);
  });

  vercel.getProjects().then(function(projects) {
    console.log('Projects:', projects.length);
  });
}

// ================================
// ADVANCED PATTERNS
// ================================

// Chained methods for complex queries
createFync('getProjectWithStats')
  .params('username', 'projectName')
  .returns({
    project: 'object',
    contributors: 'array',
    issues: 'number'
  });

// Conditional method execution
createMethod('getProjectDetails')
  .args('projectIdentifier') // Could be URL or owner/repo
  .endpoint(function(identifier) {
    if (identifier.includes('http')) {
      return getProjectViaUrl.endpoint(identifier);
    } else {
      const parts = identifier.split('/');
      return getProject.endpoint(parts[0], parts[1]);
    }
  })
  .transform(function(data) {
    return {
      name: data.name,
      totalStars: data.stargazers_count,
      description: data.description
    };
  });
