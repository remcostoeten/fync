import { NPM } from '../fync/src/npm/index.js';

// Initialize NPM client (no auth required - public API)
const npm = NPM({
  cache: true,
  cacheTTL: 300000, // 5 minutes
});

async function exampleUsage() {
  console.log('🚀 NPM API Examples\n');

  try {
    // 1. Get package information
    console.log('📦 Getting package info for "react"...');
    const reactPackage = await npm.package('react').get();
    console.log(`- Name: ${reactPackage.name}`);
    console.log(`- Description: ${reactPackage.description}`);
    console.log(`- Latest: ${reactPackage['dist-tags'].latest}`);
    console.log(`- Total versions: ${Object.keys(reactPackage.versions).length}`);

    // 2. Get latest version details
    console.log('\n📋 Getting latest version details...');
    const latestReact = await npm.package('react').latest();
    console.log(`- Version: ${latestReact.version}`);
    console.log(`- License: ${latestReact.license}`);
    console.log(`- Dependencies: ${Object.keys(latestReact.dependencies || {}).length}`);

    // 3. Get specific version
    console.log('\n🎯 Getting specific version (18.0.0)...');
    const reactV18 = await npm.package('react').version('18.0.0').get();
    console.log(`- React 18.0.0 released: ${reactV18.dist.tarball}`);

    // 4. Search packages
    console.log('\n🔍 Searching for "typescript" packages...');
    const searchResults = await npm.search.packages('typescript', {
      size: 5,
      quality: 0.8,
    });
    console.log(`- Found ${searchResults.total} packages`);
    searchResults.objects.slice(0, 3).forEach((result, i) => {
      console.log(`  ${i + 1}. ${result.package.name} - ${result.package.description?.slice(0, 50)}...`);
    });

    // 5. Get download statistics
    console.log('\n📊 Getting download stats...');
    const reactDownloads = await npm.downloads.package('react', 'last-week');
    console.log(`- React downloads last week: ${reactDownloads.downloads.toLocaleString()}`);

    // 6. Compare multiple packages
    console.log('\n⚖️ Comparing framework downloads...');
    const frameworkDownloads = await npm.downloads.packages([
      'react',
      'vue', 
      'angular',
      'svelte'
    ], 'last-week');
    
    Object.entries(frameworkDownloads).forEach(([pkg, stats]) => {
      console.log(`- ${pkg}: ${stats.downloads.toLocaleString()} downloads`);
    });

    // 7. Get download range (last 30 days)
    console.log('\n📈 Getting React download trend (last 30 days)...');
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const downloadTrend = await npm.downloads.range('react', startDate, endDate);
    const totalDownloads = downloadTrend.downloads.reduce((sum, day) => sum + day.downloads, 0);
    console.log(`- Total downloads in period: ${totalDownloads.toLocaleString()}`);
    console.log(`- Average per day: ${Math.round(totalDownloads / downloadTrend.downloads.length).toLocaleString()}`);

    // 8. Using chainable API for custom queries
    console.log('\n🔗 Using chainable API...');
    const customQuery = await npm.api['@types']['node'].get();
    console.log(`- @types/node latest: ${customQuery['dist-tags'].latest}`);

    // 9. User and organization data
    console.log('\n👤 Getting user information...');
    try {
      const user = await npm.user('sindresorhus').get();
      console.log(`- User: ${user.name} (${user.email})`);
      
      const userPackages = await npm.user('sindresorhus').packages({ size: 5 });
      console.log(`- User has ${userPackages.length} packages (showing first 5)`);
    } catch (error) {
      console.log('- User data not available (API limitations)');
    }

    // 10. Organization packages
    console.log('\n🏢 Getting organization packages...');
    try {
      const orgPackages = await npm.org('microsoft').packages({ size: 5 });
      console.log(`- Microsoft org has ${orgPackages.length} packages (showing first 5)`);
    } catch (error) {
      console.log('- Org data not available (API limitations)');
    }

    // 11. Tag-based package discovery
    console.log('\n🏷️ Finding packages by tag...');
    const reactPackages = await npm.tag('react').packages({ size: 3 });
    console.log(`- Found ${reactPackages.length} React-related packages`);
    reactPackages.forEach((pkg, i) => {
      console.log(`  ${i + 1}. ${pkg.name} - ${pkg.description?.slice(0, 40)}...`);
    });

    // 12. Advanced package analysis
    console.log('\n🔍 Advanced package analysis for "lodash"...');
    const lodashPackage = npm.package('lodash');
    
    // Check deprecation status
    const isDeprecated = await lodashPackage.isDeprecated();
    console.log(`- Is deprecated: ${isDeprecated}`);
    
    // Get distribution tags
    const distTags = await lodashPackage.distTags();
    console.log(`- Available tags: ${Object.keys(distTags).join(', ')}`);
    
    // Get collaborators
    const collaborators = await lodashPackage.collaborators();
    console.log(`- Collaborators: ${collaborators.length}`);
    
    // Bundle analysis
    const bundleInfo = await lodashPackage.bundleAnalysis();
    console.log(`- Dependencies: ${bundleInfo.dependencies.length}`);
    console.log(`- Main dependencies: ${bundleInfo.dependencies.slice(0, 3).join(', ')}`);

    // 13. Security analysis (if available)
    console.log('\n🛡️ Security analysis...');
    try {
      const vulnerabilities = await lodashPackage.vulnerabilities();
      console.log(`- Known vulnerabilities: ${vulnerabilities.length}`);
    } catch (error) {
      console.log('- Security data not available (requires audit endpoints)');
    }

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
  }
}

// Run the example
exampleUsage().catch(console.error);
