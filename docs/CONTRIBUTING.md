# Contributing to ModernMixSoilCalc

Thank you for your interest in contributing to ModernMixSoilCalc! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Common Tasks](#common-tasks)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to:
- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

Before contributing, ensure you have:
- Node.js 20 or higher installed
- Git configured with your GitHub account
- A code editor (VS Code recommended)
- Basic knowledge of TypeScript and SolidJS

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/ModernMixSoilCalc.git
cd ModernMixSoilCalc
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/ModernMixSoilCalc.git
```

## Development Setup

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code patterns
- Add comments for complex logic
- Update documentation as needed

### 3. Test Your Changes

Before committing:
- Test all affected functionality manually
- Ensure the app builds without errors: `npm run build`
- Check for linting errors: `npm run lint` (if configured)
- Test in both light and dark modes
- Test responsive behavior on different screen sizes

### 4. Commit Your Changes

Follow the [commit message guidelines](#commit-message-guidelines):

```bash
git add .
git commit -m "feat: add new ingredient to calculator"
```

### 5. Stay Up to Date

Regularly sync with upstream:

```bash
git fetch upstream
git rebase upstream/main
```

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

## Code Style Guidelines

### TypeScript

- **Use strict types**: Avoid `any` unless absolutely necessary
- **Type aliases**: Create type aliases for domain concepts
```typescript
type CuFt = number;
type Cups = number;
```

- **Explicit return types**: For public functions
```typescript
function calculateMix(...ingredients: Accessor<number>[]): number | undefined {
  // ...
}
```

- **Prefer const**: Use `const` over `let` when possible
- **Destructuring**: Use destructuring for cleaner code
```typescript
const [required, optional] = splitProps(props, ['label']);
```

### SolidJS Patterns

#### Signals
```typescript
// Good
const [value, setValue] = createSignal<number>();

// Bad - don't use useState from React habits
const [value, setValue] = useState(0);
```

#### Computed Values
```typescript
// Good - computed signal
const total = () => ingredient1() + ingredient2();

// Bad - manual state management
const [total, setTotal] = createSignal(0);
createEffect(() => setTotal(ingredient1() + ingredient2()));
```

#### Effects
```typescript
// Good - for side effects only
createEffect(() => {
  console.log('Value changed:', value());
});

// Bad - for computed values
createEffect(() => {
  setTotal(ingredient1() + ingredient2()); // Use computed signals instead
});
```

### Component Structure

Components should follow this order:

```typescript
export default function MyComponent(props: MyProps) {
  // 1. Props destructuring
  const [required, optional] = splitProps(props, ['label']);

  // 2. Signals
  const [state, setState] = createSignal();

  // 3. Computed values
  const computed = () => state() * 2;

  // 4. Effects
  createEffect(() => {
    // side effects
  });

  // 5. Event handlers
  const handleClick = () => {
    setState(state() + 1);
  };

  // 6. JSX return
  return (
    <div>{computed()}</div>
  );
}
```

### CSS and Styling

- **Prefer Tailwind classes**: Use utility classes over custom CSS
```typescript
// Good
<div class="flex items-center justify-between">

// Avoid
<div style="display: flex; align-items: center; justify-content: space-between">
```

- **Dark mode**: Always include dark mode variants
```typescript
<div class="bg-white dark:bg-night-900">
```

- **Responsive**: Use responsive utilities
```typescript
<div class="text-sm md:text-base lg:text-lg">
```

- **Custom CSS**: Only when Tailwind can't achieve the result
  - Place in `root.css` with clear comments
  - Use CSS modules for component-specific styles (if needed)

### File Naming

- **Components**: PascalCase (e.g., `SoilCalculator.tsx`)
- **Utilities**: camelCase (e.g., `recase.ts`)
- **Routes**: kebab-case (e.g., `calculator.tsx`)
- **Types**: PascalCase (e.g., `SoilTypes.ts`)

## Testing Guidelines

### Current Status

⚠️ **Testing framework not yet configured**

### Planned Testing Strategy

When we add testing, follow these guidelines:

#### Unit Tests
- Test pure functions in `src/modules/`
- Test calculation logic
- Test utility functions
- Aim for 80%+ coverage of utility code

#### Component Tests
- Test component rendering
- Test user interactions
- Test props and signals
- Mock external dependencies

#### Integration Tests
- Test full calculator workflows
- Test routing
- Test theme switching
- Test form submissions

### Example Test Structure (Future)

```typescript
import { render } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';

describe('SoilCalculator', () => {
  it('calculates correct ratios', () => {
    const result = calculateMix(signal1, signal2);
    expect(result()).toBe(expectedValue);
  });
});
```

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring (no functional changes)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks
- **build**: Build system changes
- **ci**: CI/CD changes

### Examples

```
feat(calculator): add support for liquid measurements

Add cups to gallons conversion for liquid amendments.
Includes validation and error handling.

Closes #123
```

```
fix(toggle): correct dark mode border color

The toggle border was too dark in dark mode, reducing contrast.
Updated to use cinder-600 for better visibility.
```

```
docs: update installation instructions

Add prerequisites section and clarify Node version requirement.
```

### Rules

- Use present tense ("add" not "added")
- Use imperative mood ("move" not "moves")
- Don't capitalize first letter of subject
- No period at end of subject
- Keep subject under 50 characters
- Wrap body at 72 characters
- Reference issues in footer

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass (when testing is added)
- [ ] No linting errors
- [ ] Documentation updated if needed
- [ ] Self-review completed
- [ ] Changes tested locally
- [ ] Responsive design tested
- [ ] Dark mode tested
- [ ] Accessibility checked

### PR Template

When creating a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tested in multiple browsers
- [ ] Dark mode tested
- [ ] Responsive design verified
```

### Review Process

1. At least one maintainer review required
2. All CI checks must pass (when configured)
3. No merge conflicts
4. Constructive discussion welcome
5. Changes may be requested
6. Be responsive to feedback

### After Merge

- Delete your feature branch
- Pull latest main
- Celebrate your contribution! 🎉

## Project Structure

Understanding the codebase structure:

```
src/
├── routes/              # File-based routes (pages)
├── components/          # Reusable components
│   ├── layout/          # Layout components
│   ├── Form/            # Form input components
│   └── SoilCalculator.tsx
├── modules/             # Utility functions
├── root.tsx             # Root layout
├── root.css             # Global styles
└── global.d.ts          # Type definitions
```

## Common Tasks

### Adding a New Route

1. Create file in `src/routes/`
```typescript
// src/routes/my-page.tsx
export default function MyPage() {
  return <div>My Page</div>;
}
```

2. Add navigation link in `src/root.tsx`
```typescript
<li class={`border-b-2 ${active("/my-page")} mx-1.5 sm:mx-6`}>
  <A href="/my-page">My Page</A>
</li>
```

### Adding a New Component

1. Create component file
```typescript
// src/components/MyComponent.tsx
import { Component } from 'solid-js';

interface MyComponentProps {
  label: string;
}

const MyComponent: Component<MyComponentProps> = (props) => {
  return <div>{props.label}</div>;
};

export default MyComponent;
```

2. Import and use
```typescript
import MyComponent from '~/components/MyComponent';

<MyComponent label="Hello" />
```

### Adding a New Ingredient

1. Update types in `SoilCalculator.tsx`
```typescript
type NewIngredientType = 'existing1' | 'existing2' | 'newIngredient';
```

2. Add signal
```typescript
const [newIngredient, setNewIngredient] = createSignal<Cups>();
```

3. Update calculation functions
```typescript
function calculateMix(cups: number) {
  // Add new ingredient calculation
  setNewIngredient(Number((cups * percentage).toFixed(2)));
}
```

4. Add input to JSX
```typescript
<CupsInput
  label="New Ingredient"
  value={newIngredient()}
  oninput={recalculateSoil('newIngredient')}
/>
```

### Adding a Color Theme

1. Update `tailwind.config.cjs`
```javascript
colors: {
  mycolor: {
    '50': '#...',
    '100': '#...',
    // ... all shades
    '950': '#...',
  }
}
```

2. Use in components
```typescript
<div class="bg-mycolor-100 dark:bg-mycolor-900">
```

### Updating Documentation

- Main docs in `README.md`
- Architecture docs in `docs/ARCHITECTURE.md`
- This file: `docs/CONTRIBUTING.md`
- API docs: `docs/CALCULATOR_API.md`

## Questions?

If you have questions:
1. Check existing documentation
2. Search closed issues
3. Open a new issue with the `question` label
4. Tag maintainers if urgent

## Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes

Thank you for contributing to ModernMixSoilCalc!
