# Contributing to Spazio UI

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Start development: `npm run dev`
4. Start Storybook: `npm run storybook`

## Creating a Component

1. Create a folder: `src/components/ComponentName/`
2. Add files:
   - `ComponentName.tsx` — component implementation
   - `ComponentName.test.tsx` — tests (must include vitest-axe check)
   - `ComponentName.stories.tsx` — Storybook story
   - `index.ts` — barrel export
3. Export from `src/components/index.ts`
4. Follow patterns from existing components (Button is the reference)

## Component Requirements

- Use `React.forwardRef` on all components
- Extend native HTML element attributes
- Accept and merge `className` prop via `cn()`
- Use CVA for variant definitions
- Include at least one `vitest-axe` accessibility test
- Add a Storybook story with all variants

## Pull Request Process

1. Create a changeset: `npx changeset`
2. Run checks: `npm run lint && npm run typecheck && npm test`
3. Submit PR with clear description
4. Ensure CI passes

## Commit Convention

We use conventional commits:
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `test:` tests
- `chore:` maintenance
