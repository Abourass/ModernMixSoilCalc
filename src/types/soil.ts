/**
 * Type definitions for soil calculator
 */

// ==================== MEASUREMENT TYPES ====================

/** Cubic Feet measurement */
export type CuFt = number;

/** Cups measurement */
export type Cups = number;

// ==================== INGREDIENT TYPES ====================

/** Humus mix ingredients */
export type HumusIngredient = 'compost' | 'ewc' | 'peat';

/** Aeration mix ingredients */
export type AerationIngredient = 'pumice' | 'bioChar' | 'lavaRock' | 'riceHulls';

/** Mineral mix ingredients */
export type MineralIngredient = 'oyster' | 'gypsum' | 'glacial' | 'basalt' | 'bentonite';

/** Amendment mix ingredients */
export type AmendmentIngredient =
  | 'neem'
  | 'kelp'
  | 'crustacean'
  | 'insect'
  | 'kashi'
  | 'karanja'
  | 'fish'
  | 'microbes';

/** All soil mix ingredients */
export type SoilIngredient =
  | HumusIngredient
  | AerationIngredient
  | MineralIngredient
  | AmendmentIngredient;

// ==================== CALCULATION RESULT TYPES ====================

/** Humus mix calculation result */
export interface HumusMixResult {
  compost: CuFt;
  ewc: CuFt;
  peat: CuFt;
  total: CuFt;
}

/** Aeration mix calculation result */
export interface AerationMixResult {
  pumice: CuFt;
  bioChar: CuFt;
  lavaRock: CuFt;
  riceHulls: CuFt;
  total: CuFt;
}

/** Mineral mix calculation result */
export interface MineralMixResult {
  oysterShellFlour: Cups;
  gypsum: Cups;
  glacialRockDust: Cups;
  basalt: Cups;
  calciumBentonite: Cups;
  total: Cups;
}

/** Amendment mix calculation result */
export interface AmendmentMixResult {
  neemMeal: Cups;
  kelpMeal: Cups;
  crustaceanMeal: Cups;
  insectFrass: Cups;
  kashiBlend: Cups;
  karanjaMeal: Cups;
  fishBoneMeal: Cups;
  microbes: Cups;
  total: Cups;
}

/** Complete soil recipe result */
export interface SoilRecipeResult {
  totalSoil: CuFt;
  humusMix: HumusMixResult;
  aerationMix: AerationMixResult;
  mineralMix: MineralMixResult;
  amendmentMix: AmendmentMixResult;
}

// ==================== VALIDATION TYPES ====================

/** Validation result */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
