# NPM API Methods

## Client Configuration

```typescript
import { NPM } from '@remcostoeten/fync/npm';

const npm = NPM({ 
  cache: true,
  cacheTTL: 600000,
  timeout: 30000
});
```

## Core Client Methods

### npm.api
```typescript
const response = await npm.api.react.get();
```

### npm.package(packageName)
```typescript
const packageClient = npm.package('react');
const packageInfo = await packageClient.get();
```

### npm.user(username)
```typescript
const userClient = npm.user('sindresorhus');
const user = await userClient.get();
```

### npm.org(orgName)
```typescript
const orgClient = npm.org('babel');
const organization = await orgClient.get();
```

### npm.tag(tag)
```typescript
const tagClient = npm.tag('react');
const packages = await tagClient.packages();
```

## Package Methods

### package.get()
```typescript
const packageInfo = await npm.package('react').get();
console.log(`Version: ${packageInfo['dist-tags'].latest}`);
```

### package.version(version)
```typescript
const versionClient = npm.package('react').version('18.2.0');
const versionInfo = await versionClient.get();
```

### package.latest()
```typescript
const latestVersion = await npm.package('react').latest();
console.log(latestVersion.version);
```

### package.versions()
```typescript
const allVersions = await npm.package('react').versions();
console.log(Object.keys(allVersions));
```

### package.downloads.last(period)
```typescript
const weeklyDownloads = await npm.package('react').downloads.last('week');
console.log(`Downloads: ${weeklyDownloads.downloads}`);
```

### package.downloads.range(start, end)
```typescript
const rangeDownloads = await npm.package('react').downloads.range('2023-01-01', '2023-01-31');
console.log(rangeDownloads.downloads);
```

## Advanced Package Methods

### package.vulnerabilities()
```typescript
const vulnerabilities = await npm.package('lodash').vulnerabilities();
console.log(`Found ${vulnerabilities.length} vulnerabilities`);
```

### package.audit()
```typescript
const auditResult = await npm.package('express').audit();
console.log(auditResult);
```

### package.size()
```typescript
const sizeInfo = await npm.package('react').size();
console.log(`Package size: ${sizeInfo.size} bytes`);
```

### package.deprecation()
```typescript
const deprecation = await npm.package('left-pad').deprecation();
if (deprecation) {
  console.log(`Deprecated: ${deprecation.message}`);
}
```

### package.distTags()
```typescript
const distTags = await npm.package('react').distTags();
console.log(`Latest: ${distTags.latest}`);
```

### package.collaborators()
```typescript
const collaborators = await npm.package('react').collaborators();
console.log(`${collaborators.length} collaborators`);
```

### package.isDeprecated()
```typescript
const isDeprecated = await npm.package('left-pad').isDeprecated();
if (isDeprecated) {
  console.log('Package is deprecated');
}
```

### package.bundleAnalysis()
```typescript
const analysis = await npm.package('lodash').bundleAnalysis();
console.log(`Dependencies: ${analysis.dependencies.length}`);
```

## Version Methods

### version.get()
```typescript
const versionInfo = await npm.package('react').version('18.2.0').get();
console.log(versionInfo.description);
```

## Search Methods

### search.packages(query, options?)
```typescript
const results = await npm.search.packages('typescript', {
  size: 20,
  quality: 1.0,
  popularity: 0.8,
  maintenance: 0.6
});

results.objects.forEach(result => {
  console.log(result.package.name);
});
```

## Downloads Methods

### downloads.package(packageName, period?)
```typescript
const downloads = await npm.downloads.package('react', 'last-week');
console.log(`Weekly downloads: ${downloads.downloads}`);
```

### downloads.packages(packageNames, period?)
```typescript
const multipleDownloads = await npm.downloads.packages([
  'react', 
  'vue', 
  'angular'
], 'last-month');

Object.entries(multipleDownloads).forEach(([pkg, stats]) => {
  console.log(`${pkg}: ${stats.downloads}`);
});
```

### downloads.range(packageName, start, end)
```typescript
const rangeStats = await npm.downloads.range('react', '2023-01-01', '2023-12-31');
console.log(`Total downloads: ${rangeStats.downloads.reduce((sum, day) => sum + day.downloads, 0)}`);
```

## User Methods

### user.get()
```typescript
const user = await npm.user('sindresorhus').get();
console.log(user.name);
```

### user.packages(options?)
```typescript
const userPackages = await npm.user('sindresorhus').packages();
console.log(`${userPackages.length} packages published`);
```

## Organization Methods

### org.get()
```typescript
const org = await npm.org('babel').get();
console.log(org.name);
```

### org.packages(options?)
```typescript
const orgPackages = await npm.org('babel').packages();
console.log(`${orgPackages.length} packages in organization`);
```

### org.members(options?)
```typescript
const members = await npm.org('babel').members();
console.log(`${members.length} organization members`);
```

## Tag Methods

### tag.packages(options?)
```typescript
const reactPackages = await npm.tag('react').packages();
console.log(`${reactPackages.length} packages tagged with 'react'`);
```

## Chainable Client Methods

### .get<T>(options?)
```typescript
const packageData = await npm.api.react.get();
```

### .path()
```typescript
const currentPath = npm.api.react.path();
console.log(currentPath);
```

## Usage Examples

### Get Package Statistics
```typescript
async function getPackageStats(packageName: string) {
  const pkg = npm.package(packageName);
  
  const [info, downloads, size] = await Promise.all([
    pkg.get(),
    pkg.downloads.last('month'),
    pkg.size()
  ]);
  
  console.log({
    name: info.name,
    version: info['dist-tags'].latest,
    monthlyDownloads: downloads.downloads,
    size: size.size
  });
}

await getPackageStats('react');
```

### Compare Package Popularity
```typescript
async function comparePackages(packages: string[]) {
  const downloadStats = await npm.downloads.packages(packages, 'last-month');
  
  const sorted = Object.entries(downloadStats)
    .sort(([, a], [, b]) => b.downloads - a.downloads)
    .map(([name, stats]) => ({ name, downloads: stats.downloads }));
  
  console.log('Package popularity ranking:', sorted);
}

await comparePackages(['react', 'vue', 'angular', 'svelte']);
```

### Find User's Most Popular Package
```typescript
async function findMostPopularPackage(username: string) {
  const userPackages = await npm.user(username).packages();
  
  const downloadPromises = userPackages.map(async pkg => {
    const downloads = await npm.downloads.package(pkg.name, 'last-week');
    return { name: pkg.name, downloads: downloads.downloads };
  });
  
  const results = await Promise.all(downloadPromises);
  const mostPopular = results.reduce((max, current) => 
    current.downloads > max.downloads ? current : max
  );
  
  console.log(`Most popular package by ${username}:`, mostPopular);
}

await findMostPopularPackage('sindresorhus');
```

### Security Audit
```typescript
async function auditPackage(packageName: string) {
  const pkg = npm.package(packageName);
  
  const [vulnerabilities, isDeprecated, packageInfo] = await Promise.all([
    pkg.vulnerabilities(),
    pkg.isDeprecated(),
    pkg.get()
  ]);
  
  console.log({
    package: packageName,
    version: packageInfo['dist-tags'].latest,
    vulnerabilities: vulnerabilities.length,
    deprecated: isDeprecated,
    lastUpdate: packageInfo.time?.modified
  });
}

await auditPackage('express');
```
