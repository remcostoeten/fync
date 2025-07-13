# @fync/core

## 3.0.0

### Major Changes

- BREAKING CHANGE: Removed deprecated package "fync" in favor of scoped packages.

  - The main package is now published as `@fync/fync`
  - Core functionality has been split into `@fync/core`
  - Users should update their imports from `fync` to `@fync/fync`
  - This restructure provides better organization and clearer package boundaries

  Migration path:

  ```javascript
  // Before
  import { someFunction } from 'fync'

  // After
  import { someFunction } from '@fync/fync'
  ```

- feat: migrate to fync monorepo structure; no API changes.

### Patch Changes

- Initial release of @fync/core and @fync/fync packages
