import { NPM } from '@remcostoeten/fync/npm';

type TEcosystemReport = {
  packageHealth: number;
  securityScore: number;
  popularity: number;
  maintenance: number;
  dependencies: {
    total: number;
    outdated: number;
    vulnerable: number;
  };
  recommendations: string[];
};

async function analyzePackageEcosystem(packageName: string): Promise<TEcosystemReport> {
  const npm = NPM({ cache: true, cacheTTL: 600000 });

  const [packageInfo, vulnerabilities, downloads, bundleAnalysis] = await Promise.all([
    npm.package(packageName).get(),
    npm.package(packageName).vulnerabilities().catch(() => []),
    npm.package(packageName).downloads.last('month'),
    npm.package(packageName).bundleAnalysis().catch(() => ({ dependencies: [], size: 0 }))
  ]);

  const isDeprecated = await npm.package(packageName).isDeprecated();
  
  const healthScore = calculateHealthScore(packageInfo, downloads, vulnerabilities, isDeprecated);
  const securityScore = calculateSecurityScore(vulnerabilities, packageInfo);
  const popularityScore = calculatePopularityScore(downloads, packageInfo);
  const maintenanceScore = calculateMaintenanceScore(packageInfo);

  const recommendations = generateRecommendations(
    healthScore,
    securityScore,
    popularityScore,
    maintenanceScore,
    isDeprecated
  );

  return {
    packageHealth: healthScore,
    securityScore,
    popularity: popularityScore,
    maintenance: maintenanceScore,
    dependencies: {
      total: bundleAnalysis.dependencies.length,
      outdated: 0,
      vulnerable: vulnerabilities.length
    },
    recommendations
  };
}

function calculateHealthScore(packageInfo: any, downloads: any, vulnerabilities: any[], isDeprecated: boolean): number {
  let score = 100;

  if (isDeprecated) score -= 50;
  if (vulnerabilities.length > 0) score -= vulnerabilities.length * 10;
  if (!packageInfo.license) score -= 10;
  if (!packageInfo.repository) score -= 15;
  if (downloads.downloads < 1000) score -= 20;

  const lastUpdate = new Date(packageInfo.time?.modified || 0);
  const monthsOld = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24 * 30);
  if (monthsOld > 12) score -= Math.min(monthsOld * 2, 30);

  return Math.max(0, Math.min(100, score));
}

function calculateSecurityScore(vulnerabilities: any[], packageInfo: any): number {
  let score = 100;

  if (vulnerabilities.length > 0) {
    score -= vulnerabilities.length * 15;
    
    const highSeverity = vulnerabilities.filter(v => v.severity === 'high').length;
    const criticalSeverity = vulnerabilities.filter(v => v.severity === 'critical').length;
    
    score -= highSeverity * 10;
    score -= criticalSeverity * 20;
  }

  if (!packageInfo.repository?.url?.includes('github.com')) score -= 10;

  return Math.max(0, Math.min(100, score));
}

function calculatePopularityScore(downloads: any, packageInfo: any): number {
  const monthlyDownloads = downloads.downloads;
  const stars = packageInfo.stargazers_count || 0;

  let score = 0;
  score += Math.min(monthlyDownloads / 10000, 50);
  score += Math.min(stars / 100, 30);
  score += packageInfo.description ? 10 : 0;
  score += packageInfo.keywords?.length > 3 ? 10 : 0;

  return Math.min(100, score);
}

function calculateMaintenanceScore(packageInfo: any): number {
  let score = 100;

  const lastUpdate = new Date(packageInfo.time?.modified || 0);
  const monthsOld = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24 * 30);

  if (monthsOld > 6) score -= Math.min(monthsOld * 5, 40);
  if (!packageInfo.maintainers || packageInfo.maintainers.length === 0) score -= 20;
  if (!packageInfo.bugs?.url) score -= 10;
  if (!packageInfo.homepage) score -= 10;

  return Math.max(0, Math.min(100, score));
}

function generateRecommendations(
  health: number,
  security: number,
  popularity: number,
  maintenance: number,
  isDeprecated: boolean
): string[] {
  const recommendations: string[] = [];

  if (isDeprecated) {
    recommendations.push('Package is deprecated - consider finding alternatives');
  }

  if (security < 70) {
    recommendations.push('Security concerns detected - review vulnerabilities');
  }

  if (maintenance < 60) {
    recommendations.push('Package appears unmaintained - verify active development');
  }

  if (popularity < 40) {
    recommendations.push('Low adoption rate - consider more popular alternatives');
  }

  if (health < 50) {
    recommendations.push('Overall package health is poor - use with caution');
  }

  return recommendations;
}

async function comparePackages(packageNames: string[]) {
  const npm = NPM({ cache: true });

  const comparisons = await Promise.all(
    packageNames.map(async packageName => {
      const [packageInfo, downloads, vulnerabilities] = await Promise.all([
        npm.package(packageName).get(),
        npm.package(packageName).downloads.last('month'),
        npm.package(packageName).vulnerabilities().catch(() => [])
      ]);

      return {
        name: packageName,
        version: packageInfo['dist-tags']?.latest,
        downloads: downloads.downloads,
        size: packageInfo.dist?.unpackedSize || 0,
        vulnerabilities: vulnerabilities.length,
        lastUpdate: packageInfo.time?.modified,
        license: packageInfo.license,
        dependencies: Object.keys(packageInfo.versions?.[packageInfo['dist-tags']?.latest]?.dependencies || {}).length
      };
    })
  );

  return comparisons.sort((a, b) => b.downloads - a.downloads);
}

async function findAlternatives(packageName: string, limit: number = 10) {
  const npm = NPM({ cache: true });

  const packageInfo = await npm.package(packageName).get();
  const keywords = packageInfo.keywords || [];
  const description = packageInfo.description || '';

  const searchQueries = [
    ...keywords.slice(0, 3),
    ...description.split(' ').slice(0, 2)
  ].filter(Boolean);

  const searchResults = await Promise.all(
    searchQueries.map(async query => {
      const results = await npm.search.packages(query, {
        size: 5,
        quality: 0.8,
        popularity: 0.6,
        maintenance: 0.4
      });

      return results.objects
        .filter(result => result.package.name !== packageName)
        .map(result => result.package);
    })
  );

  const alternatives = Array.from(
    new Map(
      searchResults
        .flat()
        .map(pkg => [pkg.name, pkg])
    ).values()
  ).slice(0, limit);

  return alternatives;
}

async function trackPackageTrends(packageNames: string[], days: number = 30) {
  const npm = NPM({ cache: true });

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  const trends = await Promise.all(
    packageNames.map(async packageName => {
      const downloads = await npm.downloads.range(
        packageName,
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );

      const dailyDownloads = downloads.downloads || [];
      const totalDownloads = dailyDownloads.reduce((sum, day) => sum + day.downloads, 0);
      const averageDaily = totalDownloads / dailyDownloads.length;

      const trend = calculateTrend(dailyDownloads);

      return {
        packageName,
        totalDownloads,
        averageDaily: Math.round(averageDaily),
        trend,
        data: dailyDownloads
      };
    })
  );

  return trends.sort((a, b) => b.totalDownloads - a.totalDownloads);
}

function calculateTrend(dailyDownloads: any[]): 'increasing' | 'decreasing' | 'stable' {
  if (dailyDownloads.length < 7) return 'stable';

  const firstWeek = dailyDownloads.slice(0, 7).reduce((sum, day) => sum + day.downloads, 0);
  const lastWeek = dailyDownloads.slice(-7).reduce((sum, day) => sum + day.downloads, 0);

  const percentChange = ((lastWeek - firstWeek) / firstWeek) * 100;

  if (percentChange > 10) return 'increasing';
  if (percentChange < -10) return 'decreasing';
  return 'stable';
}

async function generateDependencyReport(packageName: string) {
  const npm = NPM({ cache: true });

  const packageInfo = await npm.package(packageName).get();
  const latestVersion = packageInfo['dist-tags']?.latest;
  const versionInfo = packageInfo.versions?.[latestVersion];

  if (!versionInfo) {
    throw new Error(`Version ${latestVersion} not found for ${packageName}`);
  }

  const dependencies = versionInfo.dependencies || {};
  const devDependencies = versionInfo.devDependencies || {};
  const peerDependencies = versionInfo.peerDependencies || {};

  const dependencyAnalysis = await Promise.all(
    Object.entries(dependencies).map(async ([depName, version]) => {
      try {
        const [depInfo, depVulnerabilities] = await Promise.all([
          npm.package(depName).get(),
          npm.package(depName).vulnerabilities().catch(() => [])
        ]);

        return {
          name: depName,
          requestedVersion: version,
          latestVersion: depInfo['dist-tags']?.latest,
          vulnerabilities: depVulnerabilities.length,
          isDeprecated: await npm.package(depName).isDeprecated().catch(() => false)
        };
      } catch {
        return {
          name: depName,
          requestedVersion: version,
          latestVersion: 'unknown',
          vulnerabilities: 0,
          isDeprecated: false
        };
      }
    })
  );

  return {
    package: packageName,
    version: latestVersion,
    dependencies: {
      production: Object.keys(dependencies).length,
      development: Object.keys(devDependencies).length,
      peer: Object.keys(peerDependencies).length
    },
    analysis: dependencyAnalysis,
    risks: {
      deprecated: dependencyAnalysis.filter(dep => dep.isDeprecated).length,
      vulnerable: dependencyAnalysis.filter(dep => dep.vulnerabilities > 0).length,
      outdated: dependencyAnalysis.filter(dep => 
        dep.latestVersion !== 'unknown' && dep.requestedVersion !== dep.latestVersion
      ).length
    }
  };
}

export {
  analyzePackageEcosystem,
  comparePackages,
  findAlternatives,
  trackPackageTrends,
  generateDependencyReport
};
