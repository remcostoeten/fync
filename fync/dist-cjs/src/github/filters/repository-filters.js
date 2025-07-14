"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterRepositories = filterRepositories;
exports.filterRepositoriesByAdvancedCriteria = filterRepositoriesByAdvancedCriteria;
exports.filterRepositoriesByForks = filterRepositoriesByForks;
exports.filterRepositoriesByLanguage = filterRepositoriesByLanguage;
exports.filterRepositoriesByLicense = filterRepositoriesByLicense;
exports.filterRepositoriesByStars = filterRepositoriesByStars;
exports.filterRepositoriesByTopics = filterRepositoriesByTopics;
exports.filterRepositoriesByWatchers = filterRepositoriesByWatchers;
function filterRepositoriesByLanguage(repos, language) {
  return repos.filter(repo => repo.language === language);
}
function filterRepositoriesByForks(repos, min, max) {
  return repos.filter(repo => {
    if (min !== undefined && repo.forks_count < min) return false;
    if (max !== undefined && repo.forks_count > max) return false;
    return true;
  });
}
function filterRepositoriesByStars(repos, min, max) {
  return repos.filter(repo => {
    if (min !== undefined && repo.stargazers_count < min) return false;
    if (max !== undefined && repo.stargazers_count > max) return false;
    return true;
  });
}
function filterRepositoriesByWatchers(repos, min, max) {
  return repos.filter(repo => {
    if (min !== undefined && repo.watchers_count < min) return false;
    if (max !== undefined && repo.watchers_count > max) return false;
    return true;
  });
}
function filterRepositoriesByTopics(repos, topics) {
  return repos.filter(repo => topics.every(topic => repo.topics.includes(topic)));
}
function filterRepositoriesByLicense(repos, license) {
  return repos.filter(repo => repo.license?.key === license);
}
function filterRepositories(repos, options) {
  let filteredRepos = repos;
  if (options.names) {
    filteredRepos = filteredRepos.filter(repo => options.names?.includes(repo.name) ?? false);
  }
  if (options.languages) {
    filteredRepos = filteredRepos.filter(repo => repo.language && (options.languages?.includes(repo.language) ?? false));
  }
  if (options.starsMin !== undefined || options.starsMax !== undefined) {
    filteredRepos = filterRepositoriesByStars(filteredRepos, options.starsMin, options.starsMax);
  }
  if (options.forksMin !== undefined || options.forksMax !== undefined) {
    filteredRepos = filterRepositoriesByForks(filteredRepos, options.forksMin, options.forksMax);
  }
  if (options.topics) {
    filteredRepos = filterRepositoriesByTopics(filteredRepos, options.topics);
  }
  if (options.license) {
    filteredRepos = filterRepositoriesByLicense(filteredRepos, options.license);
  }
  if (options.isPrivate !== undefined) {
    filteredRepos = filteredRepos.filter(repo => options.isPrivate ? repo.private : !repo.private);
  }
  if (options.isFork !== undefined) {
    filteredRepos = filteredRepos.filter(repo => options.isFork ? repo.fork : !repo.fork);
  }
  if (options.isArchived !== undefined) {
    filteredRepos = filteredRepos.filter(repo => options.isArchived ? repo.archived : !repo.archived);
  }
  if (options.isDisabled !== undefined) {
    filteredRepos = filteredRepos.filter(repo => options.isDisabled ? repo.disabled : !repo.disabled);
  }
  if (options.visibility) {
    filteredRepos = filteredRepos.filter(repo => repo.visibility === options.visibility);
  }
  return filteredRepos;
}
function filterRepositoriesByAdvancedCriteria(repos, criteria) {
  let filteredRepos = repos;
  if (criteria.language) {
    filteredRepos = filterRepositoriesByLanguage(filteredRepos, criteria.language);
  }
  if (criteria.minForks !== undefined || criteria.maxForks !== undefined) {
    filteredRepos = filterRepositoriesByForks(filteredRepos, criteria.minForks, criteria.maxForks);
  }
  if (criteria.minStars !== undefined || criteria.maxStars !== undefined) {
    filteredRepos = filterRepositoriesByStars(filteredRepos, criteria.minStars, criteria.maxStars);
  }
  if (criteria.minWatchers !== undefined || criteria.maxWatchers !== undefined) {
    filteredRepos = filterRepositoriesByWatchers(filteredRepos, criteria.minWatchers, criteria.maxWatchers);
  }
  if (criteria.topics) {
    filteredRepos = filterRepositoriesByTopics(filteredRepos, criteria.topics);
  }
  if (criteria.license) {
    filteredRepos = filterRepositoriesByLicense(filteredRepos, criteria.license);
  }
  if (criteria.isPrivate !== undefined) {
    filteredRepos = filteredRepos.filter(repo => criteria.isPrivate ? repo.private : !repo.private);
  }
  if (criteria.isFork !== undefined) {
    filteredRepos = filteredRepos.filter(repo => criteria.isFork ? repo.fork : !repo.fork);
  }
  if (criteria.isArchived !== undefined) {
    filteredRepos = filteredRepos.filter(repo => criteria.isArchived ? repo.archived : !repo.archived);
  }
  if (criteria.isDisabled !== undefined) {
    filteredRepos = filteredRepos.filter(repo => criteria.isDisabled ? repo.disabled : !repo.disabled);
  }
  if (criteria.visibility) {
    filteredRepos = filteredRepos.filter(repo => repo.visibility === criteria.visibility);
  }
  return filteredRepos;
}