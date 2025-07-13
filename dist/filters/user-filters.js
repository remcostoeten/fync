function filterUsersByType(users, type) {
    return users.filter((user) => user.type === type);
}
function filterUsersByFollowers(users, min, max) {
    return users.filter((user) => {
        if (min !== undefined && user.followers < min)
            return false;
        if (max !== undefined && user.followers > max)
            return false;
        return true;
    });
}
function filterUsersByPublicRepos(users, min, max) {
    return users.filter((user) => {
        if (min !== undefined && user.public_repos < min)
            return false;
        if (max !== undefined && user.public_repos > max)
            return false;
        return true;
    });
}
function filterUsersByLocation(users, location) {
    return users.filter((user) => user.location?.toLowerCase().includes(location.toLowerCase()));
}
function filterUsersByCompany(users, company) {
    return users.filter((user) => user.company?.toLowerCase().includes(company.toLowerCase()));
}
function filterUserFields(user, filter) {
    const { include, exclude } = filter;
    if (include && exclude) {
        throw new Error("Cannot specify both include and exclude filters");
    }
    if (include) {
        const result = {};
        for (const key of include) {
            if (key in user) {
                Reflect.set(result, key, user[key]);
            }
        }
        return result;
    }
    if (exclude) {
        const result = { ...user };
        for (const key of exclude) {
            Reflect.deleteProperty(result, key);
        }
        return result;
    }
    return user;
}
function filterUsers(users, criteria) {
    let filteredUsers = users;
    if (criteria.type) {
        filteredUsers = filterUsersByType(filteredUsers, criteria.type);
    }
    if (criteria.minFollowers !== undefined ||
        criteria.maxFollowers !== undefined) {
        filteredUsers = filterUsersByFollowers(filteredUsers, criteria.minFollowers, criteria.maxFollowers);
    }
    if (criteria.minPublicRepos !== undefined ||
        criteria.maxPublicRepos !== undefined) {
        filteredUsers = filterUsersByPublicRepos(filteredUsers, criteria.minPublicRepos, criteria.maxPublicRepos);
    }
    if (criteria.location) {
        filteredUsers = filterUsersByLocation(filteredUsers, criteria.location);
    }
    if (criteria.company) {
        filteredUsers = filterUsersByCompany(filteredUsers, criteria.company);
    }
    if (criteria.hasBio !== undefined) {
        filteredUsers = filteredUsers.filter((user) => criteria.hasBio ? user.bio !== null : user.bio === null);
    }
    if (criteria.hasEmail !== undefined) {
        filteredUsers = filteredUsers.filter((user) => criteria.hasEmail ? user.email !== null : user.email === null);
    }
    return filteredUsers;
}
export { filterUsers, filterUserFields, filterUsersByType, filterUsersByFollowers, filterUsersByPublicRepos, filterUsersByLocation, filterUsersByCompany, };
//# sourceMappingURL=user-filters.js.map