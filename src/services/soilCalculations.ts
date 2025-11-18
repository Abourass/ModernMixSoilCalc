/**
 * Soil Calculation Service
 *
 * Pure functions for calculating soil mix ratios.
 * All bugs from the original implementation have been fixed:
 * - Corrected mineral percentages (28.57% not 28.75%)
 * - Fixed inverse calculations from cups ingredients
 * - Proper humus mix ratios
 */

import {
  BASE_SOIL,
  HUMUS_MIX,
  HUMUS_OF_TOTAL_SOIL,
  AERATION_MIX,
  AERATION_OF_TOTAL_SOIL,
  MINERAL_MIX,
  MINERAL_MIX_RATE,
  AMENDMENT_MIX,
  AMENDMENT_MIX_RATE,
  PRECISION,
  VALIDATION,
} from '~/constants/soilRecipes';

import type {
  CuFt,
  Cups,
  SoilIngredient,
  HumusMixResult,
  AerationMixResult,
  MineralMixResult,
  AmendmentMixResult,
  SoilRecipeResult,
  ValidationResult,
} from '~/types/soil';

// ==================== UTILITY FUNCTIONS ====================

/**
 * Fix number to specified decimal places
 */
export function fixPrecision(value: number, decimals: number = PRECISION.DECIMAL_PLACES): number {
  return Number(value.toFixed(decimals));
}

/**
 * Validate input value
 */
export function validateInput(value: number): ValidationResult {
  if (isNaN(value)) {
    return { isValid: false, error: 'Value must be a number' };
  }
  if (value < VALIDATION.MIN_VALUE) {
    return { isValid: false, error: `Value must be at least ${VALIDATION.MIN_VALUE}` };
  }
  if (value > VALIDATION.MAX_VALUE) {
    return { isValid: false, error: `Value cannot exceed ${VALIDATION.MAX_VALUE}` };
  }
  return { isValid: true };
}

// ==================== HUMUS MIX CALCULATIONS ====================

/**
 * Calculate humus mix ingredients from total soil amount
 *
 * @param totalSoil - Total cubic feet of soil to produce
 * @returns Humus mix breakdown with each ingredient amount
 *
 * @example
 * calculateHumusMix(8) // For 8 CuFt total soil
 * // Returns: { compost: 0.67, ewc: 1.33, peat: 2.00, total: 4.00 }
 */
export function calculateHumusMix(totalSoil: CuFt): HumusMixResult {
  // Humus is 50% of total soil
  const totalHumus = totalSoil * (BASE_SOIL.HUMUS_PERCENTAGE / 100);

  // Calculate each ingredient as percentage of humus mix
  const compost = fixPrecision(totalHumus * (HUMUS_MIX.COMPOST_PERCENTAGE / 100));
  const ewc = fixPrecision(totalHumus * (HUMUS_MIX.EWC_PERCENTAGE / 100));
  const peat = fixPrecision(totalHumus * (HUMUS_MIX.PEAT_PERCENTAGE / 100));

  return {
    compost,
    ewc,
    peat,
    total: fixPrecision(totalHumus),
  };
}

/**
 * Calculate total soil needed from a humus ingredient amount
 *
 * @param value - Amount of the humus ingredient
 * @param ingredient - Which humus ingredient ('compost', 'ewc', 'peat')
 * @returns Total soil needed in CuFt
 */
export function calculateTotalFromHumus(value: CuFt, ingredient: 'compost' | 'ewc' | 'peat'): CuFt {
  const percentageMap = {
    compost: HUMUS_OF_TOTAL_SOIL.COMPOST_PERCENTAGE,
    ewc: HUMUS_OF_TOTAL_SOIL.EWC_PERCENTAGE,
    peat: HUMUS_OF_TOTAL_SOIL.PEAT_PERCENTAGE,
  };

  const percentage = percentageMap[ingredient];
  return fixPrecision(value * (100 / percentage));
}

// ==================== AERATION MIX CALCULATIONS ====================

/**
 * Calculate aeration mix ingredients from total soil amount
 *
 * @param totalSoil - Total cubic feet of soil to produce
 * @returns Aeration mix breakdown with each ingredient amount
 */
export function calculateAerationMix(totalSoil: CuFt): AerationMixResult {
  // Aeration is 50% of total soil
  const totalAeration = totalSoil * (BASE_SOIL.AERATION_PERCENTAGE / 100);

  // Each ingredient is 25% of aeration mix (equal parts)
  const eachIngredient = fixPrecision(totalAeration / AERATION_MIX.TOTAL_PARTS);

  return {
    pumice: eachIngredient,
    bioChar: eachIngredient,
    lavaRock: eachIngredient,
    riceHulls: eachIngredient,
    total: fixPrecision(totalAeration),
  };
}

/**
 * Calculate total soil needed from an aeration ingredient amount
 *
 * @param value - Amount of the aeration ingredient
 * @returns Total soil needed in CuFt
 *
 * All aeration ingredients are 12.5% of total soil (equal parts)
 */
export function calculateTotalFromAeration(value: CuFt): CuFt {
  const percentage = AERATION_OF_TOTAL_SOIL.PUMICE_PERCENTAGE; // Same for all
  return fixPrecision(value * (100 / percentage));
}

// ==================== MINERAL MIX CALCULATIONS ====================

/**
 * Calculate mineral mix ingredients from total soil amount
 *
 * @param totalSoil - Total cubic feet of soil to produce
 * @returns Mineral mix breakdown with each ingredient amount in Cups
 */
export function calculateMineralMix(totalSoil: CuFt): MineralMixResult {
  // 3 cups of minerals per CuFt of total soil
  const totalCups = totalSoil * MINERAL_MIX_RATE.CUPS_PER_CUFT;

  // Calculate each ingredient based on corrected percentages
  const oysterShellFlour = fixPrecision(totalCups * (MINERAL_MIX.OYSTER_PERCENTAGE / 100));
  const gypsum = fixPrecision(totalCups * (MINERAL_MIX.GYPSUM_PERCENTAGE / 100));
  const glacialRockDust = fixPrecision(totalCups * (MINERAL_MIX.GLACIAL_PERCENTAGE / 100));
  const basalt = fixPrecision(totalCups * (MINERAL_MIX.BASALT_PERCENTAGE / 100));
  const calciumBentonite = fixPrecision(totalCups * (MINERAL_MIX.BENTONITE_PERCENTAGE / 100));

  return {
    oysterShellFlour,
    gypsum,
    glacialRockDust,
    basalt,
    calciumBentonite,
    total: fixPrecision(totalCups),
  };
}

/**
 * Calculate total soil needed from a mineral ingredient amount
 *
 * @param value - Amount of the mineral ingredient in Cups
 * @param ingredient - Which mineral ingredient
 * @returns Total soil needed in CuFt
 */
export function calculateTotalFromMineral(
  value: Cups,
  ingredient: 'oyster' | 'gypsum' | 'glacial' | 'basalt' | 'bentonite'
): CuFt {
  const percentageMap = {
    oyster: MINERAL_MIX.OYSTER_PERCENTAGE,
    gypsum: MINERAL_MIX.GYPSUM_PERCENTAGE,
    glacial: MINERAL_MIX.GLACIAL_PERCENTAGE,
    basalt: MINERAL_MIX.BASALT_PERCENTAGE,
    bentonite: MINERAL_MIX.BENTONITE_PERCENTAGE,
  };

  const percentage = percentageMap[ingredient];
  // value is percentage of total mineral cups
  const totalMineralCups = value * (100 / percentage);
  // Total soil = total mineral cups / cups per CuFt
  return fixPrecision(totalMineralCups / MINERAL_MIX_RATE.CUPS_PER_CUFT);
}

// ==================== AMENDMENT MIX CALCULATIONS ====================

/**
 * Calculate amendment mix ingredients from total soil amount
 *
 * @param totalSoil - Total cubic feet of soil to produce
 * @returns Amendment mix breakdown with each ingredient amount in Cups
 */
export function calculateAmendmentMix(totalSoil: CuFt): AmendmentMixResult {
  // 3 cups of amendments per CuFt of total soil
  const totalCups = totalSoil * AMENDMENT_MIX_RATE.CUPS_PER_CUFT;

  // Calculate each ingredient based on percentages
  const neemMeal = fixPrecision(totalCups * (AMENDMENT_MIX.NEEM_PERCENTAGE / 100));
  const kelpMeal = fixPrecision(totalCups * (AMENDMENT_MIX.KELP_PERCENTAGE / 100));
  const crustaceanMeal = fixPrecision(totalCups * (AMENDMENT_MIX.CRUSTACEAN_PERCENTAGE / 100));
  const insectFrass = fixPrecision(totalCups * (AMENDMENT_MIX.INSECT_PERCENTAGE / 100));
  const kashiBlend = fixPrecision(totalCups * (AMENDMENT_MIX.KASHI_PERCENTAGE / 100));
  const karanjaMeal = fixPrecision(totalCups * (AMENDMENT_MIX.KARANJA_PERCENTAGE / 100));
  const fishBoneMeal = fixPrecision(totalCups * (AMENDMENT_MIX.FISH_PERCENTAGE / 100));
  const microbes = fixPrecision(totalCups * (AMENDMENT_MIX.MICROBES_PERCENTAGE / 100));

  return {
    neemMeal,
    kelpMeal,
    crustaceanMeal,
    insectFrass,
    kashiBlend,
    karanjaMeal,
    fishBoneMeal,
    microbes,
    total: fixPrecision(totalCups),
  };
}

/**
 * Calculate total soil needed from an amendment ingredient amount
 *
 * @param value - Amount of the amendment ingredient in Cups
 * @param ingredient - Which amendment ingredient
 * @returns Total soil needed in CuFt
 */
export function calculateTotalFromAmendment(
  value: Cups,
  ingredient: 'neem' | 'kelp' | 'crustacean' | 'insect' | 'kashi' | 'karanja' | 'fish' | 'microbes'
): CuFt {
  const percentageMap = {
    neem: AMENDMENT_MIX.NEEM_PERCENTAGE,
    kelp: AMENDMENT_MIX.KELP_PERCENTAGE,
    crustacean: AMENDMENT_MIX.CRUSTACEAN_PERCENTAGE,
    insect: AMENDMENT_MIX.INSECT_PERCENTAGE,
    kashi: AMENDMENT_MIX.KASHI_PERCENTAGE,
    karanja: AMENDMENT_MIX.KARANJA_PERCENTAGE,
    fish: AMENDMENT_MIX.FISH_PERCENTAGE,
    microbes: AMENDMENT_MIX.MICROBES_PERCENTAGE,
  };

  const percentage = percentageMap[ingredient];
  // value is percentage of total amendment cups
  const totalAmendmentCups = value * (100 / percentage);
  // Total soil = total amendment cups / cups per CuFt
  return fixPrecision(totalAmendmentCups / AMENDMENT_MIX_RATE.CUPS_PER_CUFT);
}

// ==================== COMPLETE RECIPE CALCULATION ====================

/**
 * Calculate complete soil recipe from total soil amount
 *
 * @param totalSoil - Total cubic feet of soil to produce
 * @returns Complete recipe with all ingredients
 */
export function calculateCompleteRecipe(totalSoil: CuFt): SoilRecipeResult {
  return {
    totalSoil: fixPrecision(totalSoil),
    humusMix: calculateHumusMix(totalSoil),
    aerationMix: calculateAerationMix(totalSoil),
    mineralMix: calculateMineralMix(totalSoil),
    amendmentMix: calculateAmendmentMix(totalSoil),
  };
}

/**
 * Calculate total soil needed from any ingredient amount
 *
 * @param value - Amount of the ingredient
 * @param ingredient - Which ingredient (or 'all' for direct total)
 * @returns Total soil needed in CuFt
 */
export function calculateTotalFromIngredient(value: number, ingredient: SoilIngredient | 'all'): CuFt {
  if (ingredient === 'all') {
    return fixPrecision(value);
  }

  // Humus ingredients
  if (ingredient === 'compost' || ingredient === 'ewc' || ingredient === 'peat') {
    return calculateTotalFromHumus(value, ingredient);
  }

  // Aeration ingredients
  if (ingredient === 'pumice' || ingredient === 'bioChar' || ingredient === 'lavaRock' || ingredient === 'riceHulls') {
    return calculateTotalFromAeration(value);
  }

  // Mineral ingredients
  if (ingredient === 'oyster' || ingredient === 'gypsum' || ingredient === 'glacial' || ingredient === 'basalt' || ingredient === 'bentonite') {
    return calculateTotalFromMineral(value, ingredient);
  }

  // Amendment ingredients
  if (ingredient === 'neem' || ingredient === 'kelp' || ingredient === 'crustacean' || ingredient === 'insect' ||
      ingredient === 'kashi' || ingredient === 'karanja' || ingredient === 'fish' || ingredient === 'microbes') {
    return calculateTotalFromAmendment(value, ingredient);
  }

  // Fallback (should never reach here with proper typing)
  return fixPrecision(value);
}
