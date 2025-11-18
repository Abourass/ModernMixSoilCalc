# TheModern.Farm - Soil Mixing Calculator

A professional-grade soil mixing calculator designed for cannabis cultivation, built with SolidJS and SolidStart. This web application provides precise calculations for creating organic soil mixes with proper ratios of humus, aeration, minerals, and amendments.

[![Node Version](https://img.shields.io/badge/node-20-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)
[![SolidJS](https://img.shields.io/badge/SolidJS-1.8-blue)](https://www.solidjs.com/)

## Features

### Intelligent Soil Calculator
- **Bidirectional Calculations**: Enter total soil needed or individual ingredient amounts
- **Precise Measurements**: Uses `dnum` library for accurate decimal arithmetic
- **Multiple Unit Support**: Handles both Cubic Feet (CuFt) and Cups
- **Real-time Updates**: Debounced input handling with automatic recalculation
- **Four Ingredient Categories**:
  - **Humus Mix**: Compost, Earthworm Castings, Sphagnum Moss
  - **Aeration Mix**: Pumice, BioChar, Lava Rock, Rice Hulls
  - **Mineral Mix**: Oyster Shell Flour, Gypsum, Glacial Rock Dust, Basalt, Calcium Bentonite
  - **Amendments**: Neem, Kelp, Crustacean, Insect Frass, Kashi, Karanja, Fish Bone Meal, Microbes

### Modern UI/UX
- **Dark/Light Mode**: System preference detection with persistent user preference
- **Responsive Design**: Mobile-first, fully responsive layout
- **Custom Typography**: Posterama font with Google Fonts fallbacks
- **Accessible**: WCAG compliant with semantic HTML and proper ARIA labels
- **Smooth Animations**: Motion.one powered animations

### Technical Highlights
- **Type-Safe**: Full TypeScript implementation with strict mode
- **Performance Optimized**: Debounced inputs, minimal re-renders
- **File-Based Routing**: Intuitive SolidStart routing structure
- **Modern Build**: Vite for fast HMR and optimized production builds

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm, pnpm, or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ModernMixSoilCalc.git
cd ModernMixSoilCalc
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
ModernMixSoilCalc/
├── src/
│   ├── routes/              # File-based routing
│   │   ├── index.tsx        # Home page
│   │   ├── calculator.tsx   # Main calculator
│   │   ├── about.tsx        # About page
│   │   └── articles/        # Articles section
│   ├── components/          # Reusable components
│   │   ├── layout/          # Layout components
│   │   │   └── SiteHeader.tsx
│   │   ├── Form/            # Form input components
│   │   │   ├── CuFtInput.tsx
│   │   │   ├── CupsInput.tsx
│   │   │   ├── FloatingInput.tsx
│   │   │   ├── SuffixedInput.tsx
│   │   │   └── Toggle.tsx
│   │   └── SoilCalculator.tsx
│   ├── modules/             # Utility modules
│   │   └── recase.ts
│   ├── root.tsx             # Root layout with navigation
│   ├── root.css             # Global styles
│   └── global.d.ts          # Type definitions
├── public/                  # Static assets
├── docs/                    # Additional documentation
├── tailwind.config.cjs      # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── package.json
```

## Technology Stack

### Core Framework
- **SolidJS** (^1.8.5) - Reactive UI framework
- **SolidStart** (^0.3.9) - Full-stack meta-framework
- **TypeScript** (^5.2.2) - Type safety

### Styling
- **Tailwind CSS** (^3.3.5) - Utility-first CSS
- **@tailwindcss/forms** - Form component styling
- **@tailwindcss/typography** - Typography utilities
- **PostCSS** - CSS processing

### Animation & Interactivity
- **@motionone/solid** - Smooth animations
- **GSAP** (^3.12.2) - Advanced animations

### Utilities
- **dnum** - Precise decimal calculations
- **@solid-primitives/scheduled** - Debouncing utilities

### Development Tools
- **Vite** - Build tool and dev server
- **ESLint** - Code linting (Airbnb style guide)
- **Prettier** - Code formatting

## Usage

### Using the Calculator

1. **Enter Total Soil Needed**: Input the total cubic feet of soil you want to create in the "Final Soil Mix" field
2. **Or Enter Individual Ingredients**: Input any ingredient amount, and the calculator will determine total soil needed
3. **View Results**: All fields update automatically with proper ratios maintained

### Soil Mix Ratios

The calculator uses the following ratios:

**Base Soil (1:1 ratio)**
- 50% Humus Mix (4 CuFt minimum)
- 50% Aeration Mix (4 CuFt minimum)

**Humus Mix Ratios**
- 16.66% Compost
- 33.34% Earthworm Castings
- 50% Sphagnum Moss

**Aeration Mix Ratios** (Equal parts)
- 25% Pumice
- 25% BioChar
- 25% Lava Rock
- 25% Rice Hulls

**Mineral Mix** (3 cups per CuFt of soil)
- 28.57% Oyster Shell Flour
- 28.57% Gypsum
- 14.28% Glacial Rock Dust
- 14.28% Basalt
- 14.28% Calcium Bentonite

**Amendment Mix** (3 cups per CuFt of soil)
- 15% Neem Meal
- 15% Kelp Meal
- 15% Crustacean Meal
- 15% Insect Frass
- 13.75% Kashi Blend
- 13.75% Karanja Meal
- 10% Fish Bone Meal
- 2.5% Modern Microbes

## Development

### Code Quality
The project enforces strict code quality standards:
- **TypeScript strict mode** enabled
- **ESLint** with Airbnb style guide
- **Prettier** for consistent formatting
- **Type-safe** props and components

### Key Files
- `src/components/SoilCalculator.tsx` (412 lines) - Core calculation engine
- `src/root.tsx` - Application layout and theming
- `src/components/Form/Toggle.tsx` - Theme toggle component
- `tailwind.config.cjs` - Custom color palette and theme

### Testing
Currently, no testing framework is configured. See [Contributing Guide](docs/CONTRIBUTING.md) for plans to add testing.

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License
[Your License Here]

## Contributing
See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for development guidelines.

## Support
For issues, questions, or contributions, please visit the [GitHub Issues](https://github.com/yourusername/ModernMixSoilCalc/issues) page.

## Acknowledgments
- Built with [SolidJS](https://www.solidjs.com/)
- Powered by [SolidStart](https://start.solidjs.com)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Recipe formulated by TheModern.Farm team

---

**TheModern.Farm** - *Science with a Smile*
