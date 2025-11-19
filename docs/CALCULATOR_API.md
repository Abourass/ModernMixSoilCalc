# Calculator API Documentation

This document provides detailed documentation of the calculator logic, formulas, and functions used in the ModernMixSoilCalc application.

## Table of Contents

- [Overview](#overview)
- [Measurement Conversions](#measurement-conversions)
- [Recipe Specifications](#recipe-specifications)
- [Core Functions](#core-functions)
- [Calculation Examples](#calculation-examples)
- [Type Definitions](#type-definitions)

## Overview

The soil calculator implements bidirectional calculations:
1. **Forward**: User enters total soil needed → calculates all ingredients
2. **Inverse**: User enters any ingredient → calculates total soil needed

All calculations maintain precise ratios and use the `dnum` library for decimal precision.

## Measurement Conversions

### Basic Conversions

```typescript
1 Cup = 0.00835 CuFt
1 CuFt = 119.688 Cups
```

### Usage in Application

- **CuFt (Cubic Feet)**: Used for bulk ingredients (humus and aeration)
- **Cups**: Used for minerals and amendments

## Recipe Specifications

### Base Soil Mix
**Total**: 8 CuFt minimum (1:1 ratio)
- 4 CuFt Humus Mix (50%)
- 4 CuFt Aeration Mix (50%)

### Humus Mix
**Total**: 4 CuFt minimum

| Ingredient | Ratio | Percentage | Amount (4 CuFt base) |
|------------|-------|------------|---------------------|
| Compost (Olly Mountain or Malibu) | 1/6 | 16.66% | 0.67 CuFt |
| Earthworm Castings (Rocky Mountain) | 2/6 | 33.34% | 1.33 CuFt |
| Sphagnum Moss (Peat) | 3/6 | 50% | 2 CuFt |

**Note**: The calculation uses 1:2 ratio for Compost:EWC, then adds equal parts Peat.

### Aeration Mix
**Total**: 4 CuFt minimum (equal parts)

| Ingredient | Ratio | Percentage | Amount (4 CuFt base) |
|------------|-------|------------|---------------------|
| Pumice | 1/4 | 25% | 1 CuFt |
| BioChar | 1/4 | 25% | 1 CuFt |
| Lava Rock | 1/4 | 25% | 1 CuFt |
| Rice Hulls | 1/4 | 25% | 1 CuFt |

### Mineral Mix
**Rate**: 3 Cups per CuFt of total soil
**Base**: 20 Cups (for 8 CuFt base soil)

| Ingredient | Ratio | Percentage | Amount (20 Cups) |
|------------|-------|------------|------------------|
| Oyster Shell Flour | 2 parts | 28.75%* | 5.75 cups |
| Gypsum | 2 parts | 28.75%* | 5.75 cups |
| Glacial Rock Dust | 1 part | 14.28% | 2.86 cups |
| Basalt | 1 part | 14.28% | 2.86 cups |
| Calcium Bentonite | 1 part | 14.28% | 2.86 cups |

*Note: Code uses 28.75% instead of 28.57% for oyster and gypsum

**Ratio**: 2:2:1:1:1

### Amendment Mix
**Rate**: 3 Cups per CuFt of total soil
**Base**: 20 Cups (for 8 CuFt base soil)

| Ingredient | Parts | Percentage | Amount (20 Cups) |
|------------|-------|------------|------------------|
| Neem Meal | 3 | 15% | 3 cups |
| Kelp Meal | 3 | 15% | 3 cups |
| Crustacean Meal | 3 | 15% | 3 cups |
| Insect Frass | 3 | 15% | 3 cups |
| Kashi Blend (Gro-Kashi) | 2.75 | 13.75% | 2.75 cups |
| Karanja Meal | 2.75 | 13.75% | 2.75 cups |
| Fish Bone Meal | 2 | 10% | 2 cups |
| Modern Microbes | 0.5 | 2.5% | 0.5 cups |

**Total Parts**: 20
**Ratio**: 3:3:3:3:2.75:2.75:2:0.5

## Core Functions

### `calculateMix()`

Sums multiple signal values to get total mix amount.

```typescript
function calculateMix(
  ...ingredients: Accessor<number | undefined>[]
): number | undefined
```

**Parameters**:
- `...ingredients`: Variable number of signal accessors containing ingredient amounts

**Returns**:
- `number`: Total of all ingredients (fixed to 2 decimal places)
- `undefined`: If total is 0 (prevents showing "0.00" in inputs)

**Example**:
```typescript
const humusMix = () => calculateMix(compost, ewc, peat);
// If compost()=0.67, ewc()=1.33, peat()=2.00
// Returns: 4.00
```

**Implementation**:
```typescript
const calculateMix = (...ingredients: Accessor<number | undefined>[]) => {
  const total = ingredients.reduce((acc, curr) => acc + (curr() ?? 0), 0);
  return (total === 0) ? undefined : Number(total.toFixed(2));
}
```

### `calculateBaseSoilMix()`

Calculates all humus and aeration ingredients based on total soil amount.

```typescript
function calculateBaseSoilMix(sqFt: number): void
```

**Parameters**:
- `sqFt`: Total cubic feet of soil to produce

**Side Effects**:
Sets the following signals:
- `compost`: 8.33% of total (sqFt / 4 * 0.3333)
- `ewc`: 16.67% of total (sqFt / 4 * 0.6667)
- `peat`: 25% of total (sqFt / 4)
- `pumice`: 12.5% of total (sqFt / 2 / 4)
- `bioChar`: 12.5% of total
- `lavaRock`: 12.5% of total
- `riceHulls`: 12.5% of total

**Calculation Breakdown**:

1. **Humus Mix** (25% of total soil):
   ```typescript
   const totalCompostMix = sqFt / 4; // 25% of total
   setCompost((totalCompostMix * 33.33 / 100)); // 33.33% of humus = 8.33% of total
   setEWC((totalCompostMix * 66.67 / 100));     // 66.67% of humus = 16.67% of total
   ```

2. **Peat** (25% of total soil):
   ```typescript
   setPeat(sqFt / 4); // 25% of total
   ```

3. **Aeration Mix** (50% of total soil, split 4 ways):
   ```typescript
   const AerationMix = sqFt / 2; // 50% of total
   setPumice(AerationMix / 4);   // 12.5% of total
   setBioChar(AerationMix / 4);
   setLavaRock(AerationMix / 4);
   setRiceHulls(AerationMix / 4);
   ```

**Example**:
```typescript
calculateBaseSoilMix(8); // For 8 CuFt total

// Results:
// compost: 0.67 CuFt (8.33% of 8)
// ewc: 1.33 CuFt (16.67% of 8)
// peat: 2.00 CuFt (25% of 8)
// pumice: 1.00 CuFt (12.5% of 8)
// bioChar: 1.00 CuFt
// lavaRock: 1.00 CuFt
// riceHulls: 1.00 CuFt
```

### `calculateMineralMix()`

Calculates all mineral ingredients based on total cups needed.

```typescript
function calculateMineralMix(cups: number): void
```

**Parameters**:
- `cups`: Total cups of mineral mix needed

**Side Effects**:
Sets mineral signals based on these percentages:
- `oysterShellFlour`: 28.75% of cups
- `gypsum`: 28.75% of cups
- `glacialRockDust`: 14.28% of cups
- `basalt`: 14.28% of cups
- `calciumBentonite`: 14.28% of cups

**Example**:
```typescript
calculateMineralMix(24); // 3 cups per CuFt × 8 CuFt = 24 cups

// Results:
// oysterShellFlour: 6.90 cups (28.75% of 24)
// gypsum: 6.90 cups
// glacialRockDust: 3.43 cups (14.28% of 24)
// basalt: 3.43 cups
// calciumBentonite: 3.43 cups
```

### `calculateNutrientMix()`

Calculates all amendment ingredients based on total cups needed.

```typescript
function calculateNutrientMix(cups: number): void
```

**Parameters**:
- `cups`: Total cups of amendment mix needed

**Side Effects**:
- Sets all amendment signals
- **Also calls** `calculateMineralMix()` internally

**Calculation Method**:
Uses "40 cup units" system where 20 cups = 1 unit:

```typescript
const fortyCupUnits = cups / 40;

// Each ingredient is multiple of fortyCupUnits
setNeemMeal(fortyCupUnits * 3);      // 15% of total
setKelpMeal(fortyCupUnits * 3);      // 15%
setCrustaceanMeal(fortyCupUnits * 3); // 15%
setInsectFrass(fortyCupUnits * 3);   // 15%
setKashiBlend(fortyCupUnits * 2.75); // 13.75%
setKaranjaMeal(fortyCupUnits * 2.75); // 13.75%
setFishBoneMeal(fortyCupUnits * 2);  // 10%
setMicrobes(fortyCupUnits * 0.5);    // 2.5%
```

**Why 40?**: The base recipe uses 20 cups for both minerals and amendments. Total = 40 cups for 8 CuFt base soil.

**Example**:
```typescript
calculateNutrientMix(24); // 3 cups per CuFt × 8 CuFt = 24 cups

const units = 24 / 40 = 0.6;

// Results:
// neemMeal: 1.80 cups (0.6 × 3)
// kelpMeal: 1.80 cups
// crustaceanMeal: 1.80 cups
// insectFrass: 1.80 cups
// kashiBlend: 1.65 cups (0.6 × 2.75)
// karanjaMeal: 1.65 cups
// fishBoneMeal: 1.20 cups (0.6 × 2)
// microbes: 0.30 cups (0.6 × 0.5)

// Also calls:
// calculateMineralMix(0.6 × 20 = 12 cups)
```

### `calculateSoil()`

Master calculation function that handles both forward and inverse calculations.

```typescript
function calculateSoil(
  value: number,
  ingredient: SoilMixIngredients | 'all'
): void
```

**Parameters**:
- `value`: The amount entered by user
- `ingredient`: Which ingredient was changed (or 'all' for total soil)

**Logic Flow**:

#### 1. If ingredient is 'all' (forward calculation):
```typescript
if (ingredient === 'all') {
  soilMath(value); // value is total CuFt of soil
}
```

#### 2. If ingredient is CuFt type (inverse from humus/aeration):
```typescript
// Calculate total soil from ingredient percentage
if (ingredient === 'compost') {
  soilMath(value * (100 / 8)); // Compost is 8% of total
}
else if (ingredient === 'ewc') {
  soilMath(value * (100 / 16.67)); // EWC is 16.67% of total
}
else if (ingredient === 'peat') {
  soilMath(value * (100 / 25)); // Peat is 25% of total
}
else if (aerationIngredients.includes(ingredient)) {
  soilMath(value * (100 / 12.5)); // Each aeration is 12.5% of total
}
```

#### 3. If ingredient is Cups type (inverse from minerals/amendments):
```typescript
// These use a different calculation method
const nutrientMixCups = (value * 8) * 5;
soilMath(nutrientMixCups);
```

**Note**: The cups calculation appears incorrect in current implementation. Should be reviewed.

**Internal `soilMath()` function**:
```typescript
const soilMath = (totalCuFt: CuFt) => {
  const mineralMixCups = totalCuFt * 3;  // 3 cups per CuFt
  const nutrientMixCups = totalCuFt * 3; // 3 cups per CuFt

  calculateBaseSoilMix(totalCuFt);
  calculateMineralMix(mineralMixCups);
  calculateNutrientMix(nutrientMixCups);

  setSoil(totalCuFt);
}
```

### `recalculateSoil()`

Factory function that creates debounced event handlers.

```typescript
function recalculateSoil(
  ingredient: SoilMixIngredients | 'all'
): (e: InputEvent) => void
```

**Parameters**:
- `ingredient`: Which ingredient this handler is for

**Returns**:
- Event handler function that calls `calculateSoil` with input value

**Usage**:
```typescript
<CuFtInput
  label="Compost"
  value={compost()}
  oninput={recalculateSoil('compost')}
/>
```

**Note**: In the current implementation, this is NOT debounced. The debouncing happens in the CuFtInput component itself.

## Calculation Examples

### Example 1: Forward Calculation (Total → Ingredients)

**Input**: User enters 16 CuFt total soil

```typescript
calculateSoil(16, 'all')
```

**Process**:
1. `calculateBaseSoilMix(16)`:
   - compost: 16 / 4 * 0.3333 = **1.33 CuFt**
   - ewc: 16 / 4 * 0.6667 = **2.67 CuFt**
   - peat: 16 / 4 = **4.00 CuFt**
   - pumice: 16 / 2 / 4 = **2.00 CuFt**
   - bioChar: **2.00 CuFt**
   - lavaRock: **2.00 CuFt**
   - riceHulls: **2.00 CuFt**

2. `calculateMineralMix(16 * 3 = 48 cups)`:
   - oysterShellFlour: 48 * 0.2875 = **13.80 cups**
   - gypsum: **13.80 cups**
   - glacialRockDust: 48 * 0.1428 = **6.85 cups**
   - basalt: **6.85 cups**
   - calciumBentonite: **6.85 cups**

3. `calculateNutrientMix(16 * 3 = 48 cups)`:
   - units = 48 / 40 = 1.2
   - neemMeal: 1.2 * 3 = **3.60 cups**
   - kelpMeal: **3.60 cups**
   - crustaceanMeal: **3.60 cups**
   - insectFrass: **3.60 cups**
   - kashiBlend: 1.2 * 2.75 = **3.30 cups**
   - karanjaMeal: **3.30 cups**
   - fishBoneMeal: 1.2 * 2 = **2.40 cups**
   - microbes: 1.2 * 0.5 = **0.60 cups**

**Verification**:
- Humus: 1.33 + 2.67 + 4.00 = 8.00 CuFt ✓
- Aeration: 2.00 + 2.00 + 2.00 + 2.00 = 8.00 CuFt ✓
- Total: 8.00 + 8.00 = 16.00 CuFt ✓

### Example 2: Inverse Calculation (Ingredient → Total)

**Input**: User enters 2 CuFt of Pumice

```typescript
calculateSoil(2, 'pumice')
```

**Process**:
1. Calculate total soil from pumice percentage:
   - Pumice is 12.5% of total soil
   - Total = 2 * (100 / 12.5) = **16 CuFt**

2. Run forward calculation with 16 CuFt (same as Example 1)

**Result**: All ingredients calculated for 16 CuFt total

### Example 3: Minimum Recipe

**Input**: 1 CuFt Humus + 1 CuFt Aeration (2 CuFt total minimum)

```typescript
calculateSoil(2, 'all')
```

**Results**:
- Compost: 0.17 CuFt
- EWC: 0.33 CuFt
- Peat: 0.50 CuFt
- Pumice: 0.25 CuFt
- BioChar: 0.25 CuFt
- Lava Rock: 0.25 CuFt
- Rice Hulls: 0.25 CuFt
- Minerals: 6 cups total (3 per CuFt)
- Amendments: 6 cups total (3 per CuFt)

## Type Definitions

### Basic Types

```typescript
type CuFt = number;  // Cubic feet measurement
type Cups = number;  // Cups measurement
```

### Ingredient Types

```typescript
type HumusIngredients = 'compost' | 'ewc' | 'peat';

type AerationIngredients = 'pumice' | 'bioChar' | 'lavaRock' | 'riceHulls';

type MineralIngredients = 'oyster' | 'gypsum' | 'glacial' | 'basalt' | 'bentonite';

type AmendmentIngredients =
  | 'neem'
  | 'kelp'
  | 'crustacean'
  | 'insect'
  | 'kashi'
  | 'karanja'
  | 'fish'
  | 'microbes';

type SoilMixIngredients =
  | HumusIngredients
  | AerationIngredients
  | MineralIngredients
  | AmendmentIngredients;
```

## Known Issues and Considerations

### 1. Percentage Discrepancy
The code comments say Oyster/Gypsum are 28.57% each, but implementation uses 28.75%.

**Current**: 28.75%
**Expected**: 28.57% (2/7 ratio)

### 2. Cups Inverse Calculation
The formula for calculating total soil from cups ingredients may be incorrect:
```typescript
const nutrientMixCups = (value * 8) * 5;
```

This doesn't match the forward calculation logic and should be reviewed.

### 3. Humus Mix Ratio
The code comments say 1:2:3 (Compost:EWC:Peat), but implementation is different:
- Implementation: 33.33% : 66.67% for Compost:EWC (1:2 ratio) ✓
- Then Peat is added as 1:1 with the Compost+EWC mix
- Results in 1:2:3 overall ratio ✓

Actually correct, just implemented differently than described.

### 4. Precision
All values are fixed to 2 decimal places using `.toFixed(2)`, which is appropriate for measurement accuracy.

## Future Enhancements

Potential improvements to the calculator:

1. **Unit Conversion**: Add metric conversions (liters, kilograms)
2. **Save Recipes**: Allow users to save custom ratios
3. **Batch Calculation**: Calculate multiple batch sizes at once
4. **Cost Calculator**: Add ingredient costs and total cost calculation
5. **Print View**: Generate printable recipe cards
6. **Recipe Validation**: Warn if ratios are outside recommended ranges
7. **Ingredient Substitutions**: Suggest alternatives for unavailable ingredients
8. **pH Calculator**: Estimate soil pH based on ingredient ratios

## References

- [SoilCalculator.tsx Source](../src/components/SoilCalculator.tsx)
- Recipe formulated by TheModern.Farm
- Based on organic living soil principles for cannabis cultivation
