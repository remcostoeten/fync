export type TUser = {
  id: string;
  login: string;
  avatar_url: string;
  name: string;
  email: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  company: string;
  blog: string;
  created_at: string;
}

export type TRepository = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  owner: TUser;
  private: boolean;
  fork: boolean;
}

export type TIssue = {
  id: number;
  number: number;
  title: string;
  body: string;
  state: 'open' | 'closed';
  user: TUser;
  created_at: string;
  updated_at: string;
  html_url: string;
  labels: TLabel[];
}

export type TLabel = {
  id: number;
  name: string;
  color: string;
  description: string;
}

export type TPullRequest = {
  id: number;
  number: number;
  title: string;
  body: string;
  state: 'open' | 'closed' | 'merged';
  user: TUser;
  created_at: string;
  updated_at: string;
  html_url: string;
  head: {
    ref: string;
    sha: string;
  };
  base: {
    ref: string;
    sha: string;
  };
}

export type TRelease = {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  html_url: string;
  author: TUser;
}

export type TSpotifyUser = {
  id: string;
  display_name: string;
  email: string;
  followers: {
    total: number;
  };
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  country: string;
  product: string;
}

export type TSpotifyTrack = {
  id: string;
  name: string;
  artists: Array<{
    id: string;
    name: string;
    href: string;
  }>;
  album: {
    id: string;
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  duration_ms: number;
  explicit: boolean;
  href: string;
  preview_url: string;
  uri: string;
}

export type TSpotifyPlaylist = {
  id: string;
  name: string;
  description: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  owner: {
    id: string;
    display_name: string;
  };
  tracks: {
    total: number;
    href: string;
  };
  public: boolean;
  collaborative: boolean;
  href: string;
  uri: string;
}

export type TSpotifyArtist = {
  id: string;
  name: string;
  genres: string[];
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  popularity: number;
  followers: {
    total: number;
  };
  href: string;
  uri: string;
}

export type TSpotifyAlbum = {
  id: string;
  name: string;
  artists: Array<{
    id: string;
    name: string;
  }>;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  release_date: string;
  total_tracks: number;
  href: string;
  uri: string;
}

export type TCodeExample = {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  category: string;
  tags: string[];
}

export type TApiMethod = {
  id: string;
  name: string;
  description: string;
  signature: string;
  parameters: Array<{
    name: string;
    type: string;
    description: string;
    required: boolean;
  }>;
  returnType: string;
  examples: TCodeExample[];
}

export type TApiSection = {
  id: string;
  title: string;
  description: string;
  methods: TApiMethod[];
}

export type TNavItem = {
  id: string;
  title: string;
  href: string;
  icon?: string;
  children?: TNavItem[];
}

export type TTheme = 'light' | 'dark';

export type TSearchResult = {
  id: string;
  title: string;
  description: string;
  type: 'method' | 'example' | 'section';
  href: string;
  category: string;
}