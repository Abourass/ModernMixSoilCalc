# Architecture Documentation

## Overview

ModernMixSoilCalc is built using modern web technologies with a focus on type safety, performance, and maintainability. This document explains the architectural decisions and patterns used throughout the application.

## Technology Stack

### Core Framework - SolidJS

We chose **SolidJS** for several key reasons:

1. **Fine-grained Reactivity**: Unlike React's virtual DOM, Solid uses a reactive system that updates only what changes, resulting in excellent performance
2. **Small Bundle Size**: Solid produces smaller bundles than React for equivalent functionality
3. **True Reactivity**: Signals and effects provide a more intuitive mental model for state management
4. **No Virtual DOM**: Direct DOM manipulation means faster updates and lower memory overhead

### SolidStart Meta-Framework

**SolidStart** provides:
- File-based routing with automatic code splitting
- SSR/SSG capabilities (currently disabled, using SPA mode)
- Built-in Vite integration for fast HMR
- TypeScript support out of the box

### State Management

We use **SolidJS Signals** exclusively for state management:

```typescript
// Create reactive state
const [value, setValue] = createSignal<number>();

// Create computed/derived state
const total = () => calculateMix(ingredient1, ingredient2);

// Effects for side-effects
createEffect(() => {
  if (theme() === 'dark') {
    document.documentElement.classList.add('dark');
  }
});
```

**Why no external state library?**
- Solid's built-in reactivity is sufficient for our needs
- Reduces bundle size and complexity
- Better performance than Redux/Zustand with Solid
- More idiomatic Solid code

## Architecture Patterns

### Component Structure

#### 1. Container/Presentational Pattern

**Container Components** (Routes):
- Located in `src/routes/`
- Handle routing and page-level logic
- Compose presentational components
- Example: `calculator.tsx` contains the SoilCalculator component

**Presentational Components**:
- Located in `src/components/`
- Receive data via props
- Minimal internal state
- Highly reusable
- Example: `FloatingInput.tsx`, `Toggle.tsx`

#### 2. Specialized Form Components

Form inputs follow a composition pattern:

```
FloatingInput (base)
    ↓
SuffixedInput (adds unit suffix)
    ↓
CuFtInput / CupsInput (specialized with debouncing)
```

This allows:
- Code reuse through composition
- Consistent styling and behavior
- Easy customization at each layer

### State Management Patterns

#### 1. Signal-Based State

All component state uses signals:

```typescript
const [ingredient, setIngredient] = createSignal<number>();
```

Benefits:
- Automatic dependency tracking
- No manual optimization needed
- Fine-grained updates

#### 2. Computed Values

Derived state uses computed signals:

```typescript
const humusMix = () => calculateMix(compost, ewc, peat);
```

These automatically update when dependencies change.

#### 3. Debounced Input Handling

For performance, we debounce rapid user input:

```typescript
import { debounce } from '@solid-primitives/scheduled';

const handleInput = debounce((value: number) => {
  calculateSoil(value);
}, 350);
```

This prevents excessive recalculations during typing.

### Calculation Logic Architecture

The `SoilCalculator` component contains complex bidirectional calculation logic:

#### Forward Calculation
User enters total soil → Calculate all ingredients

```
Total Soil (8 CuFt)
    ↓
calculateBaseSoilMix() → Sets humus & aeration ingredients
calculateMineralMix() → Sets mineral ingredients
calculateNutrientMix() → Sets amendment ingredients
```

#### Inverse Calculation
User enters ingredient → Calculate total soil needed

```
Compost (1 CuFt) → 8% of total
    ↓
Calculate: 1 / 0.08 = 12.5 CuFt total
    ↓
Run forward calculation with 12.5 CuFt
```

This sophisticated pattern allows flexible data entry.

## Styling Architecture

### Tailwind CSS + Custom Theme

We use Tailwind for several reasons:

1. **Utility-First**: Rapid UI development
2. **Purging**: Removes unused CSS in production
3. **Dark Mode**: Built-in class-based dark mode
4. **Responsive**: Mobile-first responsive utilities

### Custom Color Palette

We extended Tailwind with domain-specific colors:

```javascript
colors: {
  night: { /* 50-950 shades */ },
  eggplant: { /* 50-950 shades */ },
  violet: { /* 50-950 shades */ },
  cinder: { /* 50-950 shades */ },
  fuchsia: { /* 50-950 shades */ }
}
```

These colors reflect the agricultural/botanical theme while providing full dark mode support.

### CSS-in-Tailwind Strategy

We avoid inline styles and prefer Tailwind classes for:
- Better purging/optimization
- Consistent design system
- Easier theming

Exception: Dynamic styles that can't be expressed in Tailwind use inline styles with style prop.

### Form Styling Approach

Custom floating labels implemented via CSS:

```css
/* Uses :placeholder-shown pseudo-selector */
.form-control:not(:placeholder-shown) ~ label {
  transform: translateY(-1.5rem) scale(0.85);
}
```

Benefits:
- No JavaScript overhead
- Smooth transitions via CSS
- Bootstrap-inspired familiar patterns

## Routing Architecture

### File-Based Routing

SolidStart uses file-system routing:

```
src/routes/
├── index.tsx           → /
├── calculator.tsx      → /calculator
├── about.tsx           → /about
├── articles.tsx        → /articles (layout)
└── articles/
    ├── index.tsx       → /articles
    ├── intro.tsx       → /articles/intro
    └── [...post].tsx   → /articles/* (catch-all)
```

### Nested Routing

The `articles.tsx` route uses `<Outlet />` for nested content:

```typescript
export default function ArticlesLayout() {
  return (
    <div class="articles-container">
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}
```

### 404 Handling

Catch-all route `[...404].tsx` handles unmatched paths.

## Performance Optimizations

### 1. Debounced Input
- CuFt inputs debounced at 350ms
- Prevents excessive recalculations
- Maintains smooth UX

### 2. Fine-Grained Reactivity
- Only changed components re-render
- No virtual DOM diffing overhead
- Solid's compiler optimizes reactivity

### 3. Code Splitting
- File-based routing enables automatic code splitting
- Each route loaded on-demand

### 4. Precise Math with `dnum`
- Avoids floating-point errors
- Maintains calculation accuracy
- Essential for recipe precision

## Type Safety

### TypeScript Configuration

Strict mode enabled:
```json
{
  "strict": true,
  "target": "ESNext",
  "jsx": "preserve"
}
```

### Type Patterns

#### 1. Type Aliases for Domain Models
```typescript
type CuFt = number;
type Cups = number;
type HumusIngredients = 'compost' | 'ewc' | 'peat';
```

#### 2. Component Props with splitProps
```typescript
type FloatingInputProps<R, O> = {
  required: R;
  optional?: O;
};

function Component(props: FloatingInputProps) {
  const [required, optional] = splitProps(props, ['required']);
}
```

#### 3. Accessor Types
```typescript
const calculateMix = (...ingredients: Accessor<number | undefined>[])
```

## Build Architecture

### Vite Configuration

```typescript
export default defineConfig({
  plugins: [solid({ ssr: false })],
});
```

SSR disabled for SPA mode (could be enabled for better SEO).

### Build Process

1. **Development**: `vite dev` with HMR
2. **Production Build**:
   - TypeScript compilation
   - Vite optimization (minification, tree-shaking)
   - CSS purging via Tailwind
   - Output: Optimized SPA

## Code Quality Architecture

### Linting Strategy

ESLint configuration:
- **Base**: `eslint:recommended`
- **Style Guide**: Airbnb (strict)
- **TypeScript**: Strict type checking
- **Solid**: Solid-specific rules
- **A11y**: jsx-a11y for accessibility

### Formatting

Prettier handles:
- Consistent code style
- Auto-formatting on save
- Integration with ESLint

## Accessibility Architecture

### Semantic HTML
- `<fieldset>` and `<legend>` for grouped inputs
- Proper `<label>` associations via `for` attribute
- ARIA labels where needed

### Keyboard Navigation
- All inputs keyboard accessible
- Tab order follows logical flow
- Focus states clearly visible

### Screen Reader Support
- Meaningful labels for all inputs
- Status updates announced
- Error messages associated with inputs

### Dark Mode Accessibility
- WCAG AA contrast ratios maintained
- System preference detection
- User preference persistence

## Testing Strategy (Planned)

While not currently implemented, the architecture supports:

### Unit Tests
- Calculator math functions
- Utility functions (recase.ts)
- Pure functions easily testable

### Component Tests
- Input components in isolation
- Toggle component states
- Form validation

### Integration Tests
- Full calculator flow
- Theme switching
- Route navigation

### Tools to Add
- **Vitest** - Fast unit tests
- **@solidjs/testing-library** - Component tests
- **Playwright** - E2E tests

## Security Considerations

### Input Validation
- Type checking prevents invalid input
- Number inputs constrained by HTML5 input type
- No user-generated content reduces XSS risk

### Dependencies
- Regular dependency updates needed
- No known security vulnerabilities (audit with `npm audit`)

### CSP Considerations
- Consider Content Security Policy headers for production
- Inline styles minimal (only for dynamic values)

## Deployment Architecture

### Current: Node.js Adapter

Uses `solid-start-node` for Node.js deployment:
```bash
npm run build
npm start
```

### Alternative Deployment Options

SolidStart supports multiple adapters:
- **Vercel**: `solid-start-vercel`
- **Netlify**: `solid-start-netlify`
- **Cloudflare**: `solid-start-cloudflare-workers`
- **Static**: Pre-render to static HTML

## Future Architecture Considerations

### Potential Enhancements

1. **API Integration**: Connect to backend for recipe storage
2. **Database**: Store user recipes and history
3. **Authentication**: User accounts and saved calculations
4. **PWA**: Offline functionality with service workers
5. **SSR**: Enable server-side rendering for SEO
6. **Testing**: Add comprehensive test suite
7. **CI/CD**: Automated testing and deployment
8. **Analytics**: Track usage patterns
9. **Internationalization**: Multi-language support

### Scalability

Current architecture scales well for:
- ✅ More calculator types
- ✅ Additional ingredients
- ✅ Complex calculations
- ✅ More UI features

Requires refactoring for:
- ❌ Multi-user features
- ❌ Real-time collaboration
- ❌ Large datasets
- ❌ Complex state synchronization

## Conclusion

The architecture prioritizes:
1. **Type Safety**: TypeScript strict mode throughout
2. **Performance**: Fine-grained reactivity, debouncing
3. **Maintainability**: Clear patterns, good separation of concerns
4. **User Experience**: Smooth interactions, accessibility
5. **Developer Experience**: Fast HMR, good tooling

The codebase is well-structured for a single-purpose calculator application and can grow to support additional features with minimal refactoring.
