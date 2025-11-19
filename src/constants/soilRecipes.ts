/**
 * Soil Recipe Constants
 *
 * All ratios and percentages for the soil mixing calculator.
 * These values are based on organic living soil principles for cannabis cultivation.
 */

// ==================== MEASUREMENTS ====================

/** Conversion factors between Cups and Cubic Feet */
export const CONVERSIONS = {
  CUPS_PER_CUFT: 119.688,
  CUFT_PER_CUP: 0.00835,
} as const;

// ==================== BASE SOIL MIX ====================

/**
 * Base soil is 1:1 ratio of Humus Mix to Aeration Mix
 * Minimum: 8 CuFt total (4 CuFt humus + 4 CuFt aeration)
 */
export const BASE_SOIL = {
  MIN_TOTAL_CUFT: 8,
  MIN_HUMUS_CUFT: 4,
  MIN_AERATION_CUFT: 4,
  HUMUS_PERCENTAGE: 50,
  AERATION_PERCENTAGE: 50,
} as const;

// ==================== HUMUS MIX ====================

/**
 * Humus Mix Ratios (out of 6 parts)
 * - 1 part Compost
 * - 2 parts EWC (Earthworm Castings)
 * - 3 parts Peat (Sphagnum Moss)
 */
export const HUMUS_MIX = {
  TOTAL_PARTS: 6,
  COMPOST_PARTS: 1,
  EWC_PARTS: 2,
  PEAT_PARTS: 3,
  COMPOST_PERCENTAGE: 16.67, // 1/6 = 16.67%
  EWC_PERCENTAGE: 33.33,     // 2/6 = 33.33%
  PEAT_PERCENTAGE: 50.00,    // 3/6 = 50%
} as const;

/**
 * Humus ingredients as percentage of TOTAL soil (not just humus mix)
 * Since humus is 50% of total soil:
 * - Compost: 16.67% of 50% = 8.33% of total
 * - EWC: 33.33% of 50% = 16.67% of total
 * - Peat: 50% of 50% = 25% of total
 */
export const HUMUS_OF_TOTAL_SOIL = {
  COMPOST_PERCENTAGE: 8.33,
  EWC_PERCENTAGE: 16.67,
  PEAT_PERCENTAGE: 25.00,
} as const;

// ==================== AERATION MIX ====================

/**
 * Aeration Mix Ratios (equal parts)
 * - 1 part Pumice
 * - 1 part BioChar
 * - 1 part Lava Rock
 * - 1 part Rice Hulls
 */
export const AERATION_MIX = {
  TOTAL_PARTS: 4,
  PUMICE_PARTS: 1,
  BIOCHAR_PARTS: 1,
  LAVA_ROCK_PARTS: 1,
  RICE_HULLS_PARTS: 1,
  PUMICE_PERCENTAGE: 25,   // 1/4 = 25%
  BIOCHAR_PERCENTAGE: 25,  // 1/4 = 25%
  LAVA_ROCK_PERCENTAGE: 25, // 1/4 = 25%
  RICE_HULLS_PERCENTAGE: 25, // 1/4 = 25%
} as const;

/**
 * Aeration ingredients as percentage of TOTAL soil
 * Since aeration is 50% of total soil:
 * - Each ingredient: 25% of 50% = 12.5% of total
 */
export const AERATION_OF_TOTAL_SOIL = {
  PUMICE_PERCENTAGE: 12.5,
  BIOCHAR_PERCENTAGE: 12.5,
  LAVA_ROCK_PERCENTAGE: 12.5,
  RICE_HULLS_PERCENTAGE: 12.5,
} as const;

// ==================== MINERAL MIX ====================

/**
 * Mineral Mix Application Rate
 * 3 Cups per CuFt of total soil
 * Base: 24 Cups for 8 CuFt of soil
 */
export const MINERAL_MIX_RATE = {
  CUPS_PER_CUFT: 3,
  BASE_CUPS: 24, // For 8 CuFt base soil
} as const;

/**
 * Mineral Mix Ratios (out of 7 parts)
 * - 2 parts Oyster Shell Flour
 * - 2 parts Gypsum
 * - 1 part Glacial Rock Dust
 * - 1 part Basalt
 * - 1 part Calcium Bentonite
 */
export const MINERAL_MIX = {
  TOTAL_PARTS: 7,
  OYSTER_PARTS: 2,
  GYPSUM_PARTS: 2,
  GLACIAL_PARTS: 1,
  BASALT_PARTS: 1,
  BENTONITE_PARTS: 1,
  OYSTER_PERCENTAGE: 28.57,    // 2/7 = 28.57%
  GYPSUM_PERCENTAGE: 28.57,    // 2/7 = 28.57%
  GLACIAL_PERCENTAGE: 14.29,   // 1/7 = 14.29%
  BASALT_PERCENTAGE: 14.29,    // 1/7 = 14.29%
  BENTONITE_PERCENTAGE: 14.29, // 1/7 = 14.29%
} as const;

// ==================== AMENDMENT MIX ====================

/**
 * Amendment Mix Application Rate
 * 3 Cups per CuFt of total soil
 * Base: 24 Cups for 8 CuFt of soil
 */
export const AMENDMENT_MIX_RATE = {
  CUPS_PER_CUFT: 3,
  BASE_CUPS: 24, // For 8 CuFt base soil
} as const;

/**
 * Amendment Mix Ratios (out of 20 parts)
 * - 3 parts Neem Meal
 * - 3 parts Kelp Meal
 * - 3 parts Crustacean Meal
 * - 3 parts Insect Frass
 * - 2.75 parts Kashi Blend
 * - 2.75 parts Karanja Meal
 * - 2 parts Fish Bone Meal
 * - 0.5 parts Modern Microbes
 */
export const AMENDMENT_MIX = {
  TOTAL_PARTS: 20,
  NEEM_PARTS: 3,
  KELP_PARTS: 3,
  CRUSTACEAN_PARTS: 3,
  INSECT_PARTS: 3,
  KASHI_PARTS: 2.75,
  KARANJA_PARTS: 2.75,
  FISH_PARTS: 2,
  MICROBES_PARTS: 0.5,
  NEEM_PERCENTAGE: 15.00,      // 3/20 = 15%
  KELP_PERCENTAGE: 15.00,      // 3/20 = 15%
  CRUSTACEAN_PERCENTAGE: 15.00, // 3/20 = 15%
  INSECT_PERCENTAGE: 15.00,    // 3/20 = 15%
  KASHI_PERCENTAGE: 13.75,     // 2.75/20 = 13.75%
  KARANJA_PERCENTAGE: 13.75,   // 2.75/20 = 13.75%
  FISH_PERCENTAGE: 10.00,      // 2/20 = 10%
  MICROBES_PERCENTAGE: 2.50,   // 0.5/20 = 2.5%
} as const;

// ==================== PRECISION ====================

/**
 * Number of decimal places for calculations
 */
export const PRECISION = {
  DECIMAL_PLACES: 2,
} as const;

// ==================== VALIDATION ====================

/**
 * Input validation limits
 */
export const VALIDATION = {
  MIN_VALUE: 0,
  MAX_VALUE: 10000,
  MIN_TOTAL_SOIL: 1, // Minimum 1 CuFt total soil
} as const;
