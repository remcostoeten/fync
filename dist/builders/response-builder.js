function buildSimple(user, repos) {
    return { user, repos };
}
function buildStructured(user, repos) {
    return {
        metadata: {
            fetchedAt: new Date().toISOString(),
            repoCount: repos.length,
        },
        data: { user, repos },
    };
}
function buildFluent(user, repos) {
    let filteredRepos = repos;
    return {
        getUser() {
            return user;
        },
        filterRepos(callback) {
            filteredRepos = filteredRepos.filter(callback);
            return this;
        },
        value() {
            return { user, repos: filteredRepos };
        },
    };
}
export { buildSimple, buildStructured, buildFluent };
function buildSuccessResponse(data, options = {}) {
    const { baseUrl = "", page = 1, per_page = 30, total = data.length, } = options;
    const total_pages = Math.ceil(total / per_page);
    return {
        data,
        meta: {
            total,
            page,
            per_page,
            total_pages,
        },
        links: {
            first: total_pages > 0 ? `${baseUrl}?page=1&per_page=${per_page}` : null,
            last: total_pages > 0
                ? `${baseUrl}?page=${total_pages}&per_page=${per_page}`
                : null,
            prev: page > 1 ? `${baseUrl}?page=${page - 1}&per_page=${per_page}` : null,
            next: page < total_pages
                ? `${baseUrl}?page=${page + 1}&per_page=${per_page}`
                : null,
        },
    };
}
function buildErrorResponse(message, code, details) {
    return {
        error: {
            message,
            code,
            details,
        },
    };
}
function buildSingleItemResponse(data) {
    return { data };
}
function paginateData(data, page, per_page) {
    const startIndex = (page - 1) * per_page;
    const endIndex = startIndex + per_page;
    return data.slice(startIndex, endIndex);
}
export { buildSuccessResponse, buildErrorResponse, buildSingleItemResponse, paginateData, };
//# sourceMappingURL=response-builder.js.map