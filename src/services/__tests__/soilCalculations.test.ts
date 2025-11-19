import { describe, it, expect } from 'vitest';
import {
  fixPrecision,
  validateInput,
  calculateHumusMix,
  calculateTotalFromHumus,
  calculateAerationMix,
  calculateTotalFromAeration,
  calculateMineralMix,
  calculateTotalFromMineral,
  calculateAmendmentMix,
  calculateTotalFromAmendment,
  calculateCompleteRecipe,
  calculateTotalFromIngredient,
} from '../soilCalculations';

describe('Utility Functions', () => {
  describe('fixPrecision', () => {
    it('should fix to 2 decimal places by default', () => {
      expect(fixPrecision(1.23456)).toBe(1.23);
      expect(fixPrecision(1.999)).toBe(2.00);
    });

    it('should handle custom decimal places', () => {
      expect(fixPrecision(1.23456, 3)).toBe(1.235);
      expect(fixPrecision(1.23456, 1)).toBe(1.2);
    });
  });

  describe('validateInput', () => {
    it('should accept valid numbers', () => {
      expect(validateInput(10).isValid).toBe(true);
      expect(validateInput(0).isValid).toBe(true);
      expect(validateInput(100.5).isValid).toBe(true);
    });

    it('should reject NaN', () => {
      const result = validateInput(NaN);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('number');
    });

    it('should reject negative numbers', () => {
      const result = validateInput(-5);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('at least');
    });

    it('should reject values exceeding max', () => {
      const result = validateInput(100000);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('cannot exceed');
    });
  });
});

describe('Humus Mix Calculations', () => {
  describe('calculateHumusMix', () => {
    it('should calculate correct ratios for 8 CuFt base', () => {
      const result = calculateHumusMix(8);
      expect(result.compost).toBe(0.67); // 8.33% of 8 CuFt
      expect(result.ewc).toBe(1.33);     // 16.67% of 8 CuFt
      expect(result.peat).toBe(2.00);    // 25% of 8 CuFt
      expect(result.total).toBe(4.00);   // 50% of 8 CuFt
    });

    it('should scale proportionally for different amounts', () => {
      const result = calculateHumusMix(16);
      expect(result.compost).toBe(1.33); // Double of base
      expect(result.ewc).toBe(2.67);
      expect(result.peat).toBe(4.00);
      expect(result.total).toBe(8.00);
    });

    it('should handle minimum recipe (2 CuFt)', () => {
      const result = calculateHumusMix(2);
      expect(result.compost).toBe(0.17);
      expect(result.ewc).toBe(0.33);
      expect(result.peat).toBe(0.50);
      expect(result.total).toBe(1.00);
    });
  });

  describe('calculateTotalFromHumus', () => {
    it('should calculate total from compost (8.33%)', () => {
      expect(calculateTotalFromHumus(0.67, 'compost')).toBe(8.04); // ~8 CuFt
    });

    it('should calculate total from ewc (16.67%)', () => {
      expect(calculateTotalFromHumus(1.33, 'ewc')).toBeCloseTo(7.98, 1); // ~8 CuFt
    });

    it('should calculate total from peat (25%)', () => {
      expect(calculateTotalFromHumus(2.00, 'peat')).toBe(8.00);
    });

    it('should be inverse of calculateHumusMix', () => {
      const totalSoil = 12;
      const humusMix = calculateHumusMix(totalSoil);

      const fromCompost = calculateTotalFromHumus(humusMix.compost, 'compost');
      const fromEwc = calculateTotalFromHumus(humusMix.ewc, 'ewc');
      const fromPeat = calculateTotalFromHumus(humusMix.peat, 'peat');

      expect(fromCompost).toBeCloseTo(totalSoil, 0);
      expect(fromEwc).toBeCloseTo(totalSoil, 0);
      expect(fromPeat).toBeCloseTo(totalSoil, 0);
    });
  });
});

describe('Aeration Mix Calculations', () => {
  describe('calculateAerationMix', () => {
    it('should calculate equal parts for 8 CuFt base', () => {
      const result = calculateAerationMix(8);
      expect(result.pumice).toBe(1.00);    // 12.5% of 8 CuFt
      expect(result.bioChar).toBe(1.00);
      expect(result.lavaRock).toBe(1.00);
      expect(result.riceHulls).toBe(1.00);
      expect(result.total).toBe(4.00);     // 50% of 8 CuFt
    });

    it('should scale proportionally', () => {
      const result = calculateAerationMix(16);
      expect(result.pumice).toBe(2.00);
      expect(result.bioChar).toBe(2.00);
      expect(result.lavaRock).toBe(2.00);
      expect(result.riceHulls).toBe(2.00);
      expect(result.total).toBe(8.00);
    });
  });

  describe('calculateTotalFromAeration', () => {
    it('should calculate total from any aeration ingredient (12.5%)', () => {
      expect(calculateTotalFromAeration(1.00)).toBe(8.00);
      expect(calculateTotalFromAeration(2.00)).toBe(16.00);
    });

    it('should be inverse of calculateAerationMix', () => {
      const totalSoil = 10;
      const aerationMix = calculateAerationMix(totalSoil);

      const fromPumice = calculateTotalFromAeration(aerationMix.pumice);
      expect(fromPumice).toBeCloseTo(totalSoil, 0);
    });
  });
});

describe('Mineral Mix Calculations', () => {
  describe('calculateMineralMix', () => {
    it('should calculate correct ratios for 8 CuFt base (24 cups)', () => {
      const result = calculateMineralMix(8);

      // Expected: 24 cups total (3 per CuFt)
      expect(result.total).toBe(24.00);

      // Ratios: 2:2:1:1:1 (28.57:28.57:14.29:14.29:14.29%)
      expect(result.oysterShellFlour).toBe(6.86); // 28.57% of 24
      expect(result.gypsum).toBe(6.86);
      expect(result.glacialRockDust).toBe(3.43);  // 14.29% of 24
      expect(result.basalt).toBe(3.43);
      expect(result.calciumBentonite).toBe(3.43);
    });

    it('should use 3 cups per CuFt', () => {
      const result1 = calculateMineralMix(1);
      expect(result1.total).toBe(3.00);

      const result10 = calculateMineralMix(10);
      expect(result10.total).toBe(30.00);
    });
  });

  describe('calculateTotalFromMineral', () => {
    it('should calculate total from oyster (28.57%)', () => {
      const total = calculateTotalFromMineral(6.86, 'oyster');
      expect(total).toBeCloseTo(8, 0);
    });

    it('should calculate total from glacial (14.29%)', () => {
      const total = calculateTotalFromMineral(3.43, 'glacial');
      expect(total).toBeCloseTo(8, 0);
    });

    it('should be inverse of calculateMineralMix', () => {
      const totalSoil = 12;
      const mineralMix = calculateMineralMix(totalSoil);

      const fromOyster = calculateTotalFromMineral(mineralMix.oysterShellFlour, 'oyster');
      const fromBasalt = calculateTotalFromMineral(mineralMix.basalt, 'basalt');

      expect(fromOyster).toBeCloseTo(totalSoil, 0);
      expect(fromBasalt).toBeCloseTo(totalSoil, 0);
    });
  });
});

describe('Amendment Mix Calculations', () => {
  describe('calculateAmendmentMix', () => {
    it('should calculate correct ratios for 8 CuFt base (24 cups)', () => {
      const result = calculateAmendmentMix(8);

      expect(result.total).toBe(24.00);

      // 15% ingredients (3.6 cups each)
      expect(result.neemMeal).toBe(3.60);
      expect(result.kelpMeal).toBe(3.60);
      expect(result.crustaceanMeal).toBe(3.60);
      expect(result.insectFrass).toBe(3.60);

      // 13.75% ingredients (3.3 cups each)
      expect(result.kashiBlend).toBe(3.30);
      expect(result.karanjaMeal).toBe(3.30);

      // 10% ingredient (2.4 cups)
      expect(result.fishBoneMeal).toBe(2.40);

      // 2.5% ingredient (0.6 cups)
      expect(result.microbes).toBe(0.60);
    });

    it('should use 3 cups per CuFt', () => {
      const result = calculateAmendmentMix(10);
      expect(result.total).toBe(30.00);
    });
  });

  describe('calculateTotalFromAmendment', () => {
    it('should calculate total from neem (15%)', () => {
      const total = calculateTotalFromAmendment(3.60, 'neem');
      expect(total).toBeCloseTo(8, 0);
    });

    it('should calculate total from microbes (2.5%)', () => {
      const total = calculateTotalFromAmendment(0.60, 'microbes');
      expect(total).toBeCloseTo(8, 0);
    });

    it('should be inverse of calculateAmendmentMix', () => {
      const totalSoil = 15;
      const amendmentMix = calculateAmendmentMix(totalSoil);

      const fromNeem = calculateTotalFromAmendment(amendmentMix.neemMeal, 'neem');
      const fromFish = calculateTotalFromAmendment(amendmentMix.fishBoneMeal, 'fish');

      expect(fromNeem).toBeCloseTo(totalSoil, 0);
      expect(fromFish).toBeCloseTo(totalSoil, 0);
    });
  });
});

describe('Complete Recipe Calculations', () => {
  describe('calculateCompleteRecipe', () => {
    it('should calculate all mixes for 8 CuFt base', () => {
      const recipe = calculateCompleteRecipe(8);

      expect(recipe.totalSoil).toBe(8.00);
      expect(recipe.humusMix.total).toBe(4.00);
      expect(recipe.aerationMix.total).toBe(4.00);
      expect(recipe.mineralMix.total).toBe(24.00);
      expect(recipe.amendmentMix.total).toBe(24.00);
    });

    it('should verify ratios add up correctly', () => {
      const recipe = calculateCompleteRecipe(10);

      // Humus + Aeration should equal total soil
      const baseSoilTotal = recipe.humusMix.total + recipe.aerationMix.total;
      expect(baseSoilTotal).toBeCloseTo(recipe.totalSoil, 1);

      // Minerals and amendments should be 3 cups per CuFt each
      expect(recipe.mineralMix.total).toBe(recipe.totalSoil * 3);
      expect(recipe.amendmentMix.total).toBe(recipe.totalSoil * 3);
    });
  });

  describe('calculateTotalFromIngredient', () => {
    it('should handle "all" ingredient', () => {
      expect(calculateTotalFromIngredient(10, 'all')).toBe(10.00);
    });

    it('should delegate to correct function for each ingredient type', () => {
      // Humus
      const fromCompost = calculateTotalFromIngredient(0.67, 'compost');
      expect(fromCompost).toBeCloseTo(8, 0);

      // Aeration
      const fromPumice = calculateTotalFromIngredient(1.00, 'pumice');
      expect(fromPumice).toBe(8.00);

      // Mineral
      const fromOyster = calculateTotalFromIngredient(6.86, 'oyster');
      expect(fromOyster).toBeCloseTo(8, 0);

      // Amendment
      const fromNeem = calculateTotalFromIngredient(3.60, 'neem');
      expect(fromNeem).toBeCloseTo(8, 0);
    });
  });
});

describe('Edge Cases and Integration', () => {
  it('should handle very small amounts', () => {
    const recipe = calculateCompleteRecipe(0.5);
    expect(recipe.humusMix.total).toBeGreaterThan(0);
    expect(recipe.aerationMix.total).toBeGreaterThan(0);
  });

  it('should handle large amounts', () => {
    const recipe = calculateCompleteRecipe(100);
    expect(recipe.totalSoil).toBe(100.00);
    expect(recipe.humusMix.total).toBe(50.00);
    expect(recipe.aerationMix.total).toBe(50.00);
  });

  it('should maintain precision across calculations', () => {
    const totalSoil = 7.5;
    const recipe = calculateCompleteRecipe(totalSoil);

    // All values should have max 2 decimal places
    const checkPrecision = (value: number) => {
      const str = value.toString();
      const decimals = str.includes('.') ? str.split('.')[1].length : 0;
      return decimals <= 2;
    };

    expect(checkPrecision(recipe.humusMix.compost)).toBe(true);
    expect(checkPrecision(recipe.mineralMix.oysterShellFlour)).toBe(true);
    expect(checkPrecision(recipe.amendmentMix.microbes)).toBe(true);
  });

  it('should verify complete round-trip calculation', () => {
    // Start with total soil
    const originalTotal = 12;
    const recipe = calculateCompleteRecipe(originalTotal);

    // Calculate back from each ingredient
    const fromCompost = calculateTotalFromIngredient(recipe.humusMix.compost, 'compost');
    const fromPumice = calculateTotalFromIngredient(recipe.aerationMix.pumice, 'pumice');
    const fromOyster = calculateTotalFromIngredient(recipe.mineralMix.oysterShellFlour, 'oyster');
    const fromNeem = calculateTotalFromIngredient(recipe.amendmentMix.neemMeal, 'neem');

    // All should return approximately the original total (within rounding)
    expect(fromCompost).toBeCloseTo(originalTotal, 0);
    expect(fromPumice).toBeCloseTo(originalTotal, 0);
    expect(fromOyster).toBeCloseTo(originalTotal, 0);
    expect(fromNeem).toBeCloseTo(originalTotal, 0);
  });
});
