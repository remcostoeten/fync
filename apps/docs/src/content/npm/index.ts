import type { TApiSection } from '@/types/content'

export const npmContent: TApiSection[] = [
  {
    id: 'npm-client',
    title: 'npm Registry Client',
    description: 'Client for interacting with the npm registry to query packages, versions, and metadata',
    methods: [
      {
        id: 'npm-main-client',
        name: 'NPM()',
        description: 'Main npm registry client factory with optional custom registry configuration',
        signature: 'NPM(config?: { registry?: string }): NPMClient',
        parameters: [
          {
            name: 'config',
            type: '{ registry?: string }',
            description: 'Optional configuration with custom registry URL',
            required: false
          }
        ],
        returnType: 'NPMClient',
        examples: [
          {
            id: 'npm-client-init',
            title: 'Initialize npm Client',
            description: 'Create an npm registry client',
            code: `import { NPM } from '@remcostoeten/fync/npm'

const npm = NPM()

const pkg = await npm.getPackage('react')
console.log(pkg.name, pkg.version)`,
            language: 'typescript',
            category: 'npm',
            tags: ['initialization']
          },
          {
            id: 'npm-custom-registry',
            title: 'Use Custom Registry',
            description: 'Connect to a custom npm registry',
            code: `const npm = NPM({
  registry: 'https://registry.your-company.com'
})

const pkg = await npm.getPackage('@company/internal-package')`,
            language: 'typescript',
            category: 'npm',
            tags: ['initialization', 'custom-registry']
          }
        ]
      }
    ]
  },
  {
    id: 'npm-packages',
    title: 'Package Operations',
    description: 'Methods for retrieving package information and metadata',
    methods: [
      {
        id: 'get-package',
        name: 'getPackage()',
        description: 'Get complete package information including all versions',
        signature: 'npm.getPackage(packageName: string): Promise<Package>',
        parameters: [
          {
            name: 'packageName',
            type: 'string',
            description: 'The package name (supports scoped packages)',
            required: true
          }
        ],
        returnType: 'Promise<Package>',
        examples: [
          {
            id: 'get-package-example',
            title: 'Get Package Information',
            description: 'Fetch complete package data',
            code: `const pkg = await npm.getPackage('typescript')

console.log(pkg.name)
console.log(pkg.description)
console.log(pkg['dist-tags'].latest)
console.log('Maintainers:', pkg.maintainers.length)`,
            language: 'typescript',
            category: 'npm',
            tags: ['packages', 'metadata']
          },
          {
            id: 'get-scoped-package',
            title: 'Get Scoped Package',
            description: 'Fetch information for a scoped package',
            code: `const pkg = await npm.getPackage('@types/node')

console.log(pkg.name)
console.log('Latest version:', pkg['dist-tags'].latest)
console.log('License:', pkg.license)`,
            language: 'typescript',
            category: 'npm',
            tags: ['packages', 'scoped']
          }
        ]
      },
      {
        id: 'get-latest-version',
        name: 'getLatestVersion()',
        description: 'Get the latest version number of a package',
        signature: 'npm.getLatestVersion(packageName: string): Promise<string>',
        parameters: [
          {
            name: 'packageName',
            type: 'string',
            description: 'The package name',
            required: true
          }
        ],
        returnType: 'Promise<string>',
        examples: [
          {
            id: 'get-latest-version-example',
            title: 'Get Latest Package Version',
            description: 'Quickly check the latest version',
            code: `const version = await npm.getLatestVersion('react')
console.log('Latest React version:', version)

const tsVersion = await npm.getLatestVersion('typescript')
console.log('Latest TypeScript version:', tsVersion)`,
            language: 'typescript',
            category: 'npm',
            tags: ['packages', 'versions']
          }
        ]
      },
      {
        id: 'get-package-version',
        name: 'getPackageVersion()',
        description: 'Get information about a specific package version',
        signature: 'npm.getPackageVersion(packageName: string, version: string): Promise<PackageVersion>',
        parameters: [
          {
            name: 'packageName',
            type: 'string',
            description: 'The package name',
            required: true
          },
          {
            name: 'version',
            type: 'string',
            description: 'Specific version number',
            required: true
          }
        ],
        returnType: 'Promise<PackageVersion>',
        examples: [
          {
            id: 'get-package-version-example',
            title: 'Get Specific Package Version',
            description: 'Fetch details for a particular version',
            code: `const version = await npm.getPackageVersion('react', '18.2.0')

console.log(version.name)
console.log(version.version)
console.log(version.dependencies)
console.log(version.dist.tarball)`,
            language: 'typescript',
            category: 'npm',
            tags: ['packages', 'versions']
          }
        ]
      },
      {
        id: 'get-package-stats',
        name: 'getPackageStats()',
        description: 'Get comprehensive statistics about a package',
        signature: 'npm.getPackageStats(packageName: string): Promise<PackageStats>',
        parameters: [
          {
            name: 'packageName',
            type: 'string',
            description: 'The package name',
            required: true
          }
        ],
        returnType: 'Promise<PackageStats>',
        examples: [
          {
            id: 'get-package-stats-example',
            title: 'Get Package Statistics',
            description: 'Fetch comprehensive package information and downloads',
            code: `const stats = await npm.getPackageStats('lodash')

console.log('Package:', stats.name)
console.log('Version:', stats.version)
console.log('Description:', stats.description)
console.log('Monthly downloads:', stats.downloads)
console.log('Maintainers:', stats.maintainers)
console.log('License:', stats.license)`,
            language: 'typescript',
            category: 'npm',
            tags: ['packages', 'statistics']
          }
        ]
      },
      {
        id: 'get-package-readme',
        name: 'getPackageReadme()',
        description: 'Get the README content for a package',
        signature: 'npm.getPackageReadme(packageName: string): Promise<string>',
        parameters: [
          {
            name: 'packageName',
            type: 'string',
            description: 'The package name',
            required: true
          }
        ],
        returnType: 'Promise<string>',
        examples: [
          {
            id: 'get-package-readme-example',
            title: 'Get Package README',
            description: 'Fetch README documentation',
            code: `const readme = await npm.getPackageReadme('express')

console.log(readme.substring(0, 200))`,
            language: 'typescript',
            category: 'npm',
            tags: ['packages', 'documentation']
          }
        ]
      }
    ]
  },
  {
    id: 'npm-dependencies',
    title: 'Dependency Operations',
    description: 'Methods for analyzing package dependencies',
    methods: [
      {
        id: 'get-package-dependencies',
        name: 'getPackageDependencies()',
        description: 'Get all dependencies for a package version',
        signature: 'npm.getPackageDependencies(packageName: string, version?: string): Promise<Dependencies>',
        parameters: [
          {
            name: 'packageName',
            type: 'string',
            description: 'The package name',
            required: true
          },
          {
            name: 'version',
            type: 'string',
            description: 'Specific version (defaults to latest)',
            required: false
          }
        ],
        returnType: 'Promise<Dependencies>',
        examples: [
          {
            id: 'get-package-dependencies-example',
            title: 'Get Package Dependencies',
            description: 'Analyze package dependency tree',
            code: `const deps = await npm.getPackageDependencies('next')

console.log('Dependencies:')
Object.entries(deps.dependencies).forEach(function showDep([name, version]) {
  console.log(\`  \${name}: \${version}\`)
})

console.log('\\nDev Dependencies:')
Object.keys(deps.devDependencies).forEach(function showDev(name) {
  console.log('  ' + name)
})`,
            language: 'typescript',
            category: 'npm',
            tags: ['dependencies', 'analysis']
          },
          {
            id: 'get-specific-version-deps',
            title: 'Get Dependencies for Specific Version',
            description: 'Analyze dependencies of a particular version',
            code: `const deps = await npm.getPackageDependencies('react', '17.0.2')

console.log('React 17.0.2 dependencies:')
Object.entries(deps.dependencies).forEach(function showDep([name, version]) {
  console.log(\`\${name}@\${version}\`)
})`,
            language: 'typescript',
            category: 'npm',
            tags: ['dependencies', 'versions']
          }
        ]
      },
      {
        id: 'get-package-maintainers',
        name: 'getPackageMaintainers()',
        description: 'Get the list of package maintainers',
        signature: 'npm.getPackageMaintainers(packageName: string): Promise<Maintainer[]>',
        parameters: [
          {
            name: 'packageName',
            type: 'string',
            description: 'The package name',
            required: true
          }
        ],
        returnType: 'Promise<Maintainer[]>',
        examples: [
          {
            id: 'get-package-maintainers-example',
            title: 'Get Package Maintainers',
            description: 'Fetch maintainer information',
            code: `const maintainers = await npm.getPackageMaintainers('vue')

console.log('Vue.js maintainers:')
maintainers.forEach(function showMaintainer(m) {
  console.log(\`  \${m.name} <\${m.email}>\`)
})`,
            language: 'typescript',
            category: 'npm',
            tags: ['packages', 'maintainers']
          }
        ]
      },
      {
        id: 'get-package-keywords',
        name: 'getPackageKeywords()',
        description: 'Get keywords/tags associated with a package',
        signature: 'npm.getPackageKeywords(packageName: string): Promise<string[]>',
        parameters: [
          {
            name: 'packageName',
            type: 'string',
            description: 'The package name',
            required: true
          }
        ],
        returnType: 'Promise<string[]>',
        examples: [
          {
            id: 'get-package-keywords-example',
            title: 'Get Package Keywords',
            description: 'Fetch package tags and keywords',
            code: `const keywords = await npm.getPackageKeywords('axios')

console.log('Axios keywords:', keywords.join(', '))`,
            language: 'typescript',
            category: 'npm',
            tags: ['packages', 'keywords']
          }
        ]
      }
    ]
  },
  {
    id: 'npm-search',
    title: 'Search Operations',
    description: 'Methods for searching the npm registry',
    methods: [
      {
        id: 'search-packages',
        name: 'searchPackages()',
        description: 'Search for packages in the npm registry',
        signature: 'npm.searchPackages(query: string, options?: SearchOptions): Promise<SearchResults>',
        parameters: [
          {
            name: 'query',
            type: 'string',
            description: 'Search query string',
            required: true
          },
          {
            name: 'options',
            type: 'SearchOptions',
            description: 'Optional search parameters like size and offset',
            required: false
          }
        ],
        returnType: 'Promise<SearchResults>',
        examples: [
          {
            id: 'search-packages-example',
            title: 'Search for Packages',
            description: 'Find packages matching a query',
            code: `const results = await npm.searchPackages('markdown parser', {
  size: 20
})

results.objects.forEach(function showResult(result) {
  const pkg = result.package
  console.log(\`\${pkg.name} - \${pkg.description}\`)
  console.log(\`  Version: \${pkg.version}\`)
  console.log()
})`,
            language: 'typescript',
            category: 'npm',
            tags: ['search', 'packages']
          },
          {
            id: 'search-with-pagination',
            title: 'Paginated Search',
            description: 'Search with pagination support',
            code: `async function searchAllPages(query: string) {
  let from = 0
  const size = 50
  const allResults = []

  while (true) {
    const results = await npm.searchPackages(query, { size, from })
    
    if (results.objects.length === 0) break
    
    allResults.push(...results.objects)
    from += size
  }

  return allResults
}

const all = await searchAllPages('react component')
console.log(\`Found \${all.length} packages\`)`,
            language: 'typescript',
            category: 'npm',
            tags: ['search', 'pagination']
          }
        ]
      }
    ]
  },
  {
    id: 'npm-downloads',
    title: 'Download Statistics',
    description: 'Methods for fetching package download counts',
    methods: [
      {
        id: 'get-package-downloads',
        name: 'getPackageDownloads()',
        description: 'Get download statistics for a package',
        signature: 'npm.getPackageDownloads(packageName: string, period?: string): Promise<DownloadStats>',
        parameters: [
          {
            name: 'packageName',
            type: 'string',
            description: 'The package name',
            required: true
          },
          {
            name: 'period',
            type: 'string',
            description: 'Time period like "last-day", "last-week", "last-month"',
            required: false
          }
        ],
        returnType: 'Promise<DownloadStats>',
        examples: [
          {
            id: 'get-package-downloads-example',
            title: 'Get Package Downloads',
            description: 'Fetch download statistics',
            code: `const downloads = await npm.getPackageDownloads('lodash', 'last-month')

console.log('Package:', downloads.package)
console.log('Downloads:', downloads.downloads)
console.log('Period:', downloads.start, 'to', downloads.end)`,
            language: 'typescript',
            category: 'npm',
            tags: ['downloads', 'statistics']
          },
          {
            id: 'compare-downloads',
            title: 'Compare Package Popularity',
            description: 'Compare download counts across packages',
            code: `const packages = ['react', 'vue', 'angular', 'svelte']

const comparisons = await Promise.all(
  packages.map(function getDownloads(pkg) {
    return npm.getPackageDownloads(pkg, 'last-month')
  })
)

comparisons.forEach(function showStats(stats) {
  console.log(\`\${stats.package}: \${stats.downloads.toLocaleString()} downloads\`)
})`,
            language: 'typescript',
            category: 'npm',
            tags: ['downloads', 'comparison']
          }
        ]
      }
    ]
  },
  {
    id: 'npm-size',
    title: 'Package Size',
    description: 'Methods for analyzing package size',
    methods: [
      {
        id: 'get-package-size',
        name: 'getPackageSize()',
        description: 'Get size information for a package',
        signature: 'npm.getPackageSize(packageName: string): Promise<PackageSize>',
        parameters: [
          {
            name: 'packageName',
            type: 'string',
            description: 'The package name',
            required: true
          }
        ],
        returnType: 'Promise<PackageSize>',
        examples: [
          {
            id: 'get-package-size-example',
            title: 'Get Package Size',
            description: 'Analyze package size metrics',
            code: `const size = await npm.getPackageSize('moment')

console.log('Unpacked size:', size.unpackedSize, 'bytes')
console.log('File count:', size.fileCount)
console.log('Tarball size:', size.tarballSize, 'bytes')`,
            language: 'typescript',
            category: 'npm',
            tags: ['packages', 'size']
          },
          {
            id: 'compare-sizes',
            title: 'Compare Package Sizes',
            description: 'Compare sizes of multiple packages',
            code: `const packages = ['moment', 'date-fns', 'dayjs']

const sizes = await Promise.all(
  packages.map(async function getSizeInfo(pkg) {
    const size = await npm.getPackageSize(pkg)
    return { package: pkg, size: size.unpackedSize }
  })
)

sizes.sort(function compareSize(a, b) {
  return a.size - b.size
})

sizes.forEach(function showSize({ package: pkg, size }) {
  console.log(\`\${pkg}: \${(size / 1024).toFixed(2)} KB\`)
})`,
            language: 'typescript',
            category: 'npm',
            tags: ['packages', 'size', 'comparison']
          }
        ]
      }
    ]
  },
  {
    id: 'npm-deprecation',
    title: 'Package Status',
    description: 'Methods for checking package deprecation status',
    methods: [
      {
        id: 'is-package-deprecated',
        name: 'isPackageDeprecated()',
        description: 'Check if a package is deprecated',
        signature: 'npm.isPackageDeprecated(packageName: string): Promise<boolean>',
        parameters: [
          {
            name: 'packageName',
            type: 'string',
            description: 'The package name',
            required: true
          }
        ],
        returnType: 'Promise<boolean>',
        examples: [
          {
            id: 'is-package-deprecated-example',
            title: 'Check Package Deprecation',
            description: 'Verify if a package is deprecated',
            code: `const deprecated = await npm.isPackageDeprecated('request')

if (deprecated) {
  console.log('This package is deprecated')
  console.log('Consider using alternatives')
} else {
  console.log('Package is actively maintained')
}`,
            language: 'typescript',
            category: 'npm',
            tags: ['packages', 'deprecation']
          },
          {
            id: 'check-dependencies-deprecation',
            title: 'Check Dependencies for Deprecation',
            description: 'Audit dependencies for deprecated packages',
            code: `const deps = await npm.getPackageDependencies('my-package')
const depNames = Object.keys(deps.dependencies)

const deprecationChecks = await Promise.all(
  depNames.map(async function checkDep(dep) {
    const deprecated = await npm.isPackageDeprecated(dep)
    return { package: dep, deprecated }
  })
)

const deprecatedDeps = deprecationChecks.filter(function isDeprecated(d) {
  return d.deprecated
})

if (deprecatedDeps.length > 0) {
  console.log('Deprecated dependencies found:')
  deprecatedDeps.forEach(function showDeprecated(d) {
    console.log('  -', d.package)
  })
}`,
            language: 'typescript',
            category: 'npm',
            tags: ['dependencies', 'deprecation', 'audit']
          }
        ]
      }
    ]
  }
]
