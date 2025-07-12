import { GithubEasyFetcher } from 'github-easy-fetcher';

export default async function Home() {
  const fetcher = new GithubEasyFetcher();
  const user = await fetcher.userFetcher.getUser('remco-stoeten');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">GitHub User Profile</h1>
      {user ? (
        <div className="flex flex-col items-center">
          <img
            src={user.avatarUrl}
            alt={user.login}
            className="w-32 h-32 rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-lg text-gray-600">@{user.login}</p>
          {user.bio && <p className="mt-2 text-center">{user.bio}</p>}
          <a
            href={user.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-blue-500 hover:underline"
          >
            View on GitHub
          </a>
        </div>
      ) : (
        <p>Failed to fetch user data.</p>
      )}
    </main>
  );
}