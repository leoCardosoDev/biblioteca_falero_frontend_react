# Implementation Plan - Frontend Refactor (DDD Modular Monolith)

Refactoring the Frontend (`app/frontend`) from a horizontal Layered Architecture to a **Modular Monolith** based on the Domain-Driven Design (DDD) Bounded Contexts defined in `app/docs/sql/falero.sql`.

## User Review Required

> [!IMPORTANT]
> **Breaking Changes**: This refactor rearranges the entire `src` directory.
>
> - `src/presentation` will be split into `src/modules/*/presentation`.
> - `src/domain` will be split into `src/modules/*/domain`.
> - `src/infra` will be split into `src/modules/*/infra` and `src/shared/infra`.

## Proposed Changes

### Phase 1: Foundation

#### [Config & Linting](app/docs/specs/01_in_progress/frontend/refactor/01_config.md)

- **Files**: `vite.config.ts`, `tsconfig.json`, `eslint.config.js`
- **Action**: Add `@/modules`, `@/shared` aliases. Configure `eslint-plugin-boundaries` to enforce Context Sovereignty.

### Phase 2: Shared Kernel

#### [Shared Extraction](app/docs/specs/01_in_progress/frontend/refactor/02_shared_kernel.md)

- **UI Kit**: Move `src/presentation/react/components/ui` -> `src/shared/components/ui`.
- **Hooks**: Move generic hooks -> `src/shared/hooks`.
- **Infra**: Move `HttpClient` -> `src/shared/infra`.

### Phase 3: Bounded Contexts

#### [Geography Module](app/docs/specs/01_in_progress/frontend/refactor/03_module_geography.md)

- **Path**: `src/modules/geography`
- **Content**: `City`, `State`, `Neighborhood` models/usecases. `UserForm`, `LoginForm`, `ProfileDisplay`.
- **API**: Export `AddressForm` for Identity.

#### [Identity Module](app/docs/specs/01_in_progress/frontend/refactor/04_module_identity.md)

- **Path**: `src/modules/identity`
- **Content**: `User`, `Login`, `Account` models/usecases. `UserForm`, `LoginForm`, `ProfileDisplay`.
- **Dependency**: Imports `AddressForm` from Geography.

### Phase 4: Main Integration

#### [Composition Root](app/docs/specs/01_in_progress/frontend/refactor/05_main_composition.md)

- **Router**: Update `src/presentation/react/router` to load pages from Modules.
- **Factories**: Update `src/main/factories` to instantiate new Module classes.

### Phase 5: Verification

#### [Test Refactor](app/docs/specs/01_in_progress/frontend/refactor/06_tests_refactor.md)

- **Scope**: Update all `vitest` imports to new locations.

## Verification Plan

### Automated Tests

- **Linting**: `npm run lint` MUST pass with strict boundary rules.
- **Unit/Integration**: `npm run test:ci` (Vitest) MUST pass 100%.

### Manual Verification

1.  **Build**: `npm run build` must succeed.
2.  **Docker**: `docker-compose up frontend` must start.
3.  **Flows**:
    - Open Browser (via `docker:prod` or `dev`).
    - Login (Identity).
    - Navigate to User List (Identity).
    - Open User Form -> Check Address Fields (Identity + Geography integration).
