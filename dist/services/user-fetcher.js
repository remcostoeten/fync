import { memoize } from "./cache-service";
import { httpRequest } from "./http-client";
async function fetchUserInternal(username, opts = {}) {
    const response = await httpRequest(`https://api.github.com/users/${username}`, undefined, opts.signal);
    return response.data;
}
function fetchUser(username, opts = {}) {
    return memoizedFetchUser(username, opts);
}
const fetchUserWrapper = async (...args) => {
    const username = args[0];
    const opts = args[1] || {};
    return fetchUserInternal(username, opts);
};
const memoizedFetchUser = memoize(fetchUserWrapper, (...args) => {
    const username = args[0];
    return `user:${username}`;
});
export { fetchUser };
//# sourceMappingURL=user-fetcher.js.map