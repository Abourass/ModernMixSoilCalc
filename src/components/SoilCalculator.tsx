import { createSignal, createEffect } from 'solid-js';
import CuFtInput from './Form/CuFtInput';
import CupsInput from './Form/CupsInput';
import {
  calculateCompleteRecipe,
  calculateTotalFromIngredient,
  validateInput,
} from '~/services/soilCalculations';
import type { CuFt, Cups, SoilIngredient } from '~/types/soil';

/**
 * Soil Calculator Component
 *
 * Calculates precise soil mix recipes for cannabis cultivation.
 * Supports bidirectional calculations - enter total soil or any ingredient amount.
 *
 * Recipe specifications are documented in ~/constants/soilRecipes.ts
 * All calculation logic is in ~/services/soilCalculations.ts
 */
export default function SoilCalculator() {
  // ==================== STATE ====================

  // Humus Mix Ingredients (CuFt)
  const [compost, setCompost] = createSignal<CuFt>();
  const [ewc, setEWC] = createSignal<CuFt>();
  const [peat, setPeat] = createSignal<CuFt>();

  // Aeration Mix Ingredients (CuFt)
  const [pumice, setPumice] = createSignal<CuFt>();
  const [bioChar, setBioChar] = createSignal<CuFt>();
  const [lavaRock, setLavaRock] = createSignal<CuFt>();
  const [riceHulls, setRiceHulls] = createSignal<CuFt>();

  // Mineral Mix Ingredients (Cups)
  const [oysterShellFlour, setOysterShellFlour] = createSignal<Cups>();
  const [gypsum, setGypsum] = createSignal<Cups>();
  const [glacialRockDust, setGlacialRockDust] = createSignal<Cups>();
  const [basalt, setBasalt] = createSignal<Cups>();
  const [calciumBentonite, setCalciumBentonite] = createSignal<Cups>();

  // Amendment Mix Ingredients (Cups)
  const [neemMeal, setNeemMeal] = createSignal<Cups>();
  const [kelpMeal, setKelpMeal] = createSignal<Cups>();
  const [crustaceanMeal, setCrustaceanMeal] = createSignal<Cups>();
  const [insectFrass, setInsectFrass] = createSignal<Cups>();
  const [kashiBlend, setKashiBlend] = createSignal<Cups>();
  const [karanjaMeal, setKaranjaMeal] = createSignal<Cups>();
  const [fishBoneMeal, setFishBoneMeal] = createSignal<Cups>();
  const [microbes, setMicrobes] = createSignal<Cups>();

  // Total Soil and Totals
  const [soil, setSoil] = createSignal<CuFt>();
  const [error, setError] = createSignal<string>();

  // ==================== COMPUTED VALUES ====================

  const humusMix = () => {
    const c = compost() ?? 0;
    const e = ewc() ?? 0;
    const p = peat() ?? 0;
    const total = c + e + p;
    return total === 0 ? undefined : Number(total.toFixed(2));
  };

  const aerationMix = () => {
    const pu = pumice() ?? 0;
    const bio = bioChar() ?? 0;
    const lava = lavaRock() ?? 0;
    const rice = riceHulls() ?? 0;
    const total = pu + bio + lava + rice;
    return total === 0 ? undefined : Number(total.toFixed(2));
  };

  const mineralMix = () => {
    const o = oysterShellFlour() ?? 0;
    const g = gypsum() ?? 0;
    const gl = glacialRockDust() ?? 0;
    const b = basalt() ?? 0;
    const c = calciumBentonite() ?? 0;
    const total = o + g + gl + b + c;
    return total === 0 ? undefined : Number(total.toFixed(2));
  };

  const amendmentMix = () => {
    const n = neemMeal() ?? 0;
    const k = kelpMeal() ?? 0;
    const cr = crustaceanMeal() ?? 0;
    const i = insectFrass() ?? 0;
    const ka = kashiBlend() ?? 0;
    const kar = karanjaMeal() ?? 0;
    const f = fishBoneMeal() ?? 0;
    const m = microbes() ?? 0;
    const total = n + k + cr + i + ka + kar + f + m;
    return total === 0 ? undefined : Number(total.toFixed(2));
  };

  // ==================== CALCULATION HANDLERS ====================

  /**
   * Update all ingredients based on total soil amount or specific ingredient
   */
  function updateRecipe(value: number, ingredient: SoilIngredient | 'all') {
    // Validate input
    const validation = validateInput(value);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    setError(undefined);

    // If entering a specific ingredient, calculate total first
    let totalSoil: number;
    if (ingredient === 'all') {
      totalSoil = value;
    } else {
      totalSoil = calculateTotalFromIngredient(value, ingredient);
    }

    // Calculate complete recipe
    const recipe = calculateCompleteRecipe(totalSoil);

    // Update all signals
    setSoil(recipe.totalSoil);

    // Humus mix
    setCompost(recipe.humusMix.compost);
    setEWC(recipe.humusMix.ewc);
    setPeat(recipe.humusMix.peat);

    // Aeration mix
    setPumice(recipe.aerationMix.pumice);
    setBioChar(recipe.aerationMix.bioChar);
    setLavaRock(recipe.aerationMix.lavaRock);
    setRiceHulls(recipe.aerationMix.riceHulls);

    // Mineral mix
    setOysterShellFlour(recipe.mineralMix.oysterShellFlour);
    setGypsum(recipe.mineralMix.gypsum);
    setGlacialRockDust(recipe.mineralMix.glacialRockDust);
    setBasalt(recipe.mineralMix.basalt);
    setCalciumBentonite(recipe.mineralMix.calciumBentonite);

    // Amendment mix
    setNeemMeal(recipe.amendmentMix.neemMeal);
    setKelpMeal(recipe.amendmentMix.kelpMeal);
    setCrustaceanMeal(recipe.amendmentMix.crustaceanMeal);
    setInsectFrass(recipe.amendmentMix.insectFrass);
    setKashiBlend(recipe.amendmentMix.kashiBlend);
    setKaranjaMeal(recipe.amendmentMix.karanjaMeal);
    setFishBoneMeal(recipe.amendmentMix.fishBoneMeal);
    setMicrobes(recipe.amendmentMix.microbes);
  }

  /**
   * Create input handler for a specific ingredient
   */
  function createInputHandler(ingredient: SoilIngredient | 'all') {
    return (e: InputEvent & { currentTarget: HTMLInputElement; target: HTMLInputElement }) => {
      const value = e.target.valueAsNumber;
      if (!isNaN(value)) {
        updateRecipe(value, ingredient);
      }
    };
  }

  // ==================== JSX ====================

  return (
    <div class="bg-night-100 dark:bg-night-900 dark:text-gray-200 rounded-md mx-2 flex flex-col items-center py-2">
      {error() && (
        <div class="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-4 py-2 rounded mb-4">
          {error()}
        </div>
      )}

      <div class="flex justify-evenly w-full h-full dark:text-gray-200">
        <div class="flex flex-col justify-center items-center">
          {/* Humus Mix */}
          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-11/12">
            <legend>Humus Mix</legend>
            <div class="flex flex-row justify-evenly items-center">
              <CuFtInput
                label="Compost"
                containerClassList="mx-2"
                value={compost()}
                oninput={createInputHandler('compost')}
              />
              <CuFtInput
                label="Earth Worm Castings"
                containerClassList="mx-2"
                value={ewc()}
                oninput={createInputHandler('ewc')}
              />
              <CuFtInput
                label="Sphagnum Moss"
                containerClassList="mx-2"
                value={peat()}
                oninput={createInputHandler('peat')}
              />
            </div>
          </fieldset>

          {/* Aeration Mix */}
          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-11/12">
            <legend>Aeration Mix</legend>
            <div class="flex flex-row justify-evenly items-center">
              <CuFtInput
                label="Pumice"
                value={pumice()}
                oninput={createInputHandler('pumice')}
              />
              <CuFtInput
                label="BioChar"
                value={bioChar()}
                oninput={createInputHandler('bioChar')}
              />
            </div>
            <div class="flex flex-row justify-evenly items-center">
              <CuFtInput
                label="Lava Rock"
                value={lavaRock()}
                oninput={createInputHandler('lavaRock')}
              />
              <CuFtInput
                label="Rice Hulls"
                value={riceHulls()}
                oninput={createInputHandler('riceHulls')}
              />
            </div>
          </fieldset>
        </div>

        <div class="flex flex-col justify-between items-center">
          {/* Mineral Mix */}
          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-11/12">
            <legend>Mineral Mix</legend>
            <div class="flex flex-row justify-evenly items-center">
              <CupsInput
                label="Oyster Shell Flour"
                value={oysterShellFlour()}
                oninput={createInputHandler('oyster')}
              />
              <CupsInput
                label="Gypsum"
                value={gypsum()}
                oninput={createInputHandler('gypsum')}
              />
            </div>
            <div class="flex flex-row justify-evenly items-center">
              <CupsInput
                label="Glacial Rock Dust"
                value={glacialRockDust()}
                containerClassList="mx-2"
                oninput={createInputHandler('glacial')}
              />
              <CupsInput
                label="Basalt"
                value={basalt()}
                containerClassList="mx-2"
                oninput={createInputHandler('basalt')}
              />
              <CupsInput
                label="Calcium Bentonite"
                value={calciumBentonite()}
                containerClassList="mx-2"
                oninput={createInputHandler('bentonite')}
              />
            </div>
          </fieldset>

          {/* Amendments */}
          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-11/12">
            <legend>Amendments</legend>
            <div class="flex flex-row justify-evenly items-center">
              <CupsInput
                label="Neem Meal"
                value={neemMeal()}
                oninput={createInputHandler('neem')}
              />
              <CupsInput
                label="Kelp Meal"
                value={kelpMeal()}
                oninput={createInputHandler('kelp')}
              />
            </div>
            <div class="flex flex-row justify-evenly items-center">
              <CupsInput
                label="Crustacean Meal"
                value={crustaceanMeal()}
                oninput={createInputHandler('crustacean')}
              />
              <CupsInput
                label="Insect Frass"
                value={insectFrass()}
                oninput={createInputHandler('insect')}
              />
            </div>
            <div class="flex flex-row justify-evenly items-center">
              <CupsInput
                label="Kashi Blend"
                value={kashiBlend()}
                oninput={createInputHandler('kashi')}
              />
              <CupsInput
                label="Karanja Meal"
                value={karanjaMeal()}
                oninput={createInputHandler('karanja')}
              />
            </div>
            <div class="flex flex-row justify-evenly items-center">
              <CupsInput
                label="Fish Bone Meal"
                value={fishBoneMeal()}
                oninput={createInputHandler('fish')}
              />
              <CupsInput
                label="Microbes"
                value={microbes()}
                oninput={createInputHandler('microbes')}
              />
            </div>
          </fieldset>
        </div>
      </div>

      {/* Final Soil Mix Summary */}
      <div class="flex flex-col w-full mt-2 items-center">
        <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-1/2">
          <legend>Final Soil Mix</legend>
          <div class="flex flex-row justify-evenly items-center">
            <CuFtInput
              label="Final Soil Mix"
              value={soil()}
              oninput={createInputHandler('all')}
            />
          </div>
          <div class="flex flex-row justify-evenly items-center">
            <CuFtInput
              label="Humus"
              value={humusMix()}
              disabled={true}
            />
            <CuFtInput
              label="Aeration Mix"
              value={aerationMix()}
              disabled={true}
            />
          </div>
          <div class="flex flex-row justify-evenly items-center">
            <CupsInput
              label="Mineral Mix"
              value={mineralMix()}
              disabled={true}
            />
            <CupsInput
              label="Amendments"
              value={amendmentMix()}
              disabled={true}
            />
          </div>
        </fieldset>
      </div>
    </div>
  );
}
