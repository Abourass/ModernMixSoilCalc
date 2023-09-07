import { createSignal } from "solid-js";
import FloatingInput from './FloatingInput';

/**
 * @example
 * =========================
 * ## Measurements
 * 
 * | 1 Cup = 0.00835 CuFt  |
 * | 1 CuFt = 119.688 Cups |
 * 
 * =========================
 * 
 * ## Humus Mix
 * ### (2 CuFt)
 *
 * - 1/3 Compost (Olly Mountain or Malibu Compost) | 33.33%
 * - 2/3 EWC (Rocky Mountain Earth Worm Castings)  | 66.67%
 * 
 * =========================
 * 
 * ## Aeration Mix
 * ### (4 CuFt)
 * 
 * - 1 part Pumice     | 1 CuFt | 25%
 * - 1 part BioChar    | 1 CuFt | 25%
 * - 1 part Lava Rock  | 1 CuFt | 25%
 * - 1 part Rice Hulls | 1 CuFt | 25%
 * 
 * =========================
 * 
 * ## Base Soil
 * ### (8 CuFt)
 * 
 * - 2 CuFt Sphagnum moss (peat) | 25%
 * - 4 CuFt Aeration Mix         | 50%
 * - 2 CuFt Humus Mix            | 25%
 * 
 * =========================
 * 
 * ## Mineral Mix
 * ### (20 Cups)
 * 
 * - 2 part Oyster Shell Flour | 5 3/4 cups | 28.57%
 * - 2 part Gypsum             | 5 3/4 cups | 28.57%
 * - 1 parts Glacial Rock Dust | 2 3/4 cups | 14.28%
 * - 1 part Basalt             | 2 3/4 cups | 14.28%
 * - 1 part Calcium Bentonite  | 3 cups     | 14.28%
 * 
 * =========================
 * ## Amendments
 * ### (40 Cups)
 * 
 * - 3 cup organic Neem meal
 * - 3 cup organic Kelp meal
 * - 3 cup organic Crustacean meal
 * - 3 cup organic insect frass
 * - 2 3/4 cup Gro-Kashi
 * - 2 3/4 cup Karanja Meal
 * - 2 cup of fish bone meal
 * - 1/2 cup of Modern Microbes
 * - 20 cups of Mineral Mix
 * 
 * =========================
 */
export default function SoilCalculator() {
  /** Base Soil Ingredients */
  const [compost, setCompost] = createSignal<number>();          //-| In CuFt
  const [ewc, setEWC] = createSignal<number>();                  //-| In CuFt
  const humus = () => {
    const CuFt = (compost() ?? 0) + (ewc() ?? 0);
    return Number(CuFt.toFixed(2));
  }  //-| In CuFt
  const [peat, setPeat] = createSignal<number>();                //-| In CuFt
  type LoamIngredients = 'compost'|'ewc'|'peat';
  const loam = () => {
    const CuFt = (humus() ?? 0) + (peat() ?? 0);
    return Number(CuFt.toFixed(2));
  }
  /** Aeration Mix Ingredients */
  const [pumice, setPumice] = createSignal<number>();            //-| In CuFt
  const [bioChar, setBioChar] = createSignal<number>();          //-| In CuFt
  const [lavaRock, setLavaRock] = createSignal<number>();        //-| In CuFt
  const [riceHulls, setRiceHulls] = createSignal<number>();      //-| In CuFt
  type AerationMixIngredients = 'pumice'|'bioChar'|'lavaRock'|'riceHulls';
  const aerationMix = () => { //-| In CuFt
    const CuFt = (pumice() ?? 0) + (bioChar() ?? 0) + (lavaRock() ?? 0) + (riceHulls() ?? 0);
    return Number(CuFt.toFixed(2));
  };
  /** Mineral Mix Ingredients */
  const [oysterShellFlour, setOysterShellFlour] = createSignal<number>(); //-| In Cups
  const [gypsum, setGypsum] = createSignal<number>();                     //-| In Cups
  const [glacialRockDust, setGlacialRockDust] = createSignal<number>();   //-| In Cups
  const [basalt, setBasalt] = createSignal<number>();                     //-| In Cups
  const [calciumBentonite, setCalciumBentonite] = createSignal<number>(); //-| In Cups
  type MineralMixIngredients = 'oyster'|'gypsum'|'glacial'|'basalt'|'bentonite';
  const mineralMix = () => {
    const CuFt = (oysterShellFlour() ?? 0) + (gypsum() ?? 0) + (glacialRockDust() ?? 0) + (basalt() ?? 0) + (calciumBentonite() ?? 0);
    return Number(CuFt.toFixed(2));
  }         //-| In Cups
  /** Nutrient Mix Ingredients */
  const [neemMeal, setNeemMeal] = createSignal<number>();                 //-| 1/2 Cup
  const [kelpMeal, setKelpMeal] = createSignal<number>();                 //-| 1/2 Cup
  const [crustaceanMeal, setCrustaceanMeal] = createSignal<number>();     //-| 1/2 Cup
  const [insectFrass, setInsectFrass] = createSignal<number>();           //-| 1/2 Cup
  const [kashiBlend, setKashiBlend] = createSignal<number>();             //-| 1/3 Cup
  const [karanjaMeal, setKaranjaMeal] = createSignal<number>();           //-| 1/3 Cup
  const [fishBoneMeal, setFishBoneMeal] = createSignal<number>();         //-| 1/4 Cup
  const [microbes, setMicrobes] = createSignal<number>();                //-| 1/16 Cup
  type NutrientMixIngredients = 'neem'|'kelp'|'crustacean'|'insect'|'kashi'|'karanja'|'fish'|'microbes';
  const nutrientMix = () => (neemMeal() ?? 0)
  + (kelpMeal() ?? 0) + (crustaceanMeal() ?? 0) + (insectFrass() ?? 0) + (kashiBlend() ?? 0)
  + (karanjaMeal() ?? 0) + (fishBoneMeal() ?? 0) + (microbes() ?? 0);                          //-| In Cups
  /** Final Soil Mix Ingredients */
  type SoilMixIngredients = LoamIngredients|AerationMixIngredients|MineralMixIngredients|NutrientMixIngredients;
  const [soil, setSoil] = createSignal<number>(); //-| In CuFt

  /** 1:1 Loam Mix to Aeration Mix */
  function calculateBaseSoilMix(sqFt: number) {
    /** 1:2 Compost to EWC */
    const humus = sqFt / 4;
    setCompost(Number((humus * (33.33 / 100)).toFixed(2)));
    setEWC(Number((humus * (66.67 / 100)).toFixed(2)));

    /** 1:1 Sphagnum Moss to Humus Mix */
    setPeat(Number((sqFt / 4).toFixed(2)));

    /** 1:1:1:1 Pumice, BioChar, Lava Rock, Rice Hulls */
    const aerationMix = sqFt / 2;
    setPumice(Number((aerationMix / 4).toFixed(2)));
    setBioChar(Number((aerationMix / 4).toFixed(2)));
    setLavaRock(Number((aerationMix / 4).toFixed(2)));
    setRiceHulls(Number((aerationMix / 4).toFixed(2)));
  }

  /** 2:2:1:1:1 Oyster Shell Flour (2) : Gypsum (2) : Glacial Rock Dust (1) : Basalt (1) : Calcium Bentonite (1) */
  function calculateMineralMix(cups: number) {
    let oysterShellFlour = 0;
    let gypsum = 0;
    let glacialRockDust = 0;
    let basalt = 0;
    let calciumBentonite = 0;

    oysterShellFlour = Number((cups * (28.75 / 100)).toFixed(2));
    gypsum = Number((cups * (28.75 / 100)).toFixed(2));
    glacialRockDust = Number((cups * (14.28 / 100)).toFixed(2));
    basalt = Number((cups * (14.28  / 100)).toFixed(2));
    calciumBentonite = Number((cups * (14.28 / 100)).toFixed(2));

    setOysterShellFlour(oysterShellFlour);
    setGypsum(gypsum);
    setGlacialRockDust(glacialRockDust);
    setBasalt(basalt);
    setCalciumBentonite(calciumBentonite);
  }

  /**  */
  function calculateNutrientMix(cups: number) {
    const fortyCupUnits = Number((cups / 40).toFixed(2))

    setNeemMeal(Number((fortyCupUnits * 3).toFixed(2)))
    setKelpMeal(Number((fortyCupUnits * 3).toFixed(2)))
    setCrustaceanMeal(Number((fortyCupUnits * 3).toFixed(2)))
    setInsectFrass(Number((fortyCupUnits * 3).toFixed(2)))

    setKashiBlend(Number((fortyCupUnits * 2.75).toFixed(2)))
    setKaranjaMeal(Number((fortyCupUnits * 2.75).toFixed(2)))

    setFishBoneMeal(Number((fortyCupUnits * 2).toFixed(2)))

    setMicrobes(Number((fortyCupUnits * .5).toFixed(2)))

    calculateMineralMix(Number((fortyCupUnits * 20).toFixed(2)))
  }

  function calculateSoil(value: number, ingredient: SoilMixIngredients|'all') {
    const loamIngredients = ['compost', 'ewc', 'peat'] as const;
    const aerationMixIngredients = ['pumice', 'bioChar', 'lavaRock', 'riceHulls'] as const;
    const cuFtIngredients = [...loamIngredients, ...aerationMixIngredients] as const;
    const mineralMixIngredients = ['oyster', 'gypsum', 'glacial', 'basalt', 'bentonite'] as const;
    const nutrientMixIngredients = ['neem', 'kelp', 'crustacean', 'insect', 'kashi', 'karanja', 'fish', 'microbes'] as const;
    const cupsIngredients = [...mineralMixIngredients, ...nutrientMixIngredients] as const;

    const soilMath = (totalCuFt: number) => {
      const eightCuFtUnits = Number((totalCuFt / 8).toFixed(2));

      // We are calculating the total amount of soil needed
      calculateBaseSoilMix(totalCuFt)
      calculateNutrientMix(Number((eightCuFtUnits * 40).toFixed(2)))

      setSoil(totalCuFt);
    }

    if (ingredient === 'all'){
      soilMath(value);
    } else if (cuFtIngredients.includes(ingredient as LoamIngredients|AerationMixIngredients)) {
      if (ingredient === 'compost'){
        const baseSoilCuFt = ((value * 3) * 4);
        soilMath(baseSoilCuFt);
      } else if (ingredient === 'ewc'){
        const baseSoilCuFt = (value * 1.5) * 4;
        soilMath(baseSoilCuFt);
      } else if (ingredient === 'peat'){
        const baseSoilCuFt = (value * 2) * 4;
        soilMath(baseSoilCuFt);
      } else if (ingredient === 'pumice' || ingredient === 'bioChar' || ingredient === 'lavaRock' || ingredient === 'riceHulls'){
        const baseSoilCuFt = (value * 4) * 4;
        soilMath(baseSoilCuFt);
      }
    } else if (cupsIngredients.includes(ingredient as MineralMixIngredients|NutrientMixIngredients)) {

    }
  }

  return (
    <div class="bg-eggplant-200 dark:bg-night-900 dark:text-gray-200 rounded-md mx-2 flex flex-col items-center py-2 ">
      <div class="flex flex-row">
        <button class="flex flex-col items-center outline outline-1 outline-purple-200 dark:outline-night-700 mx-1 p-2 rounded">
          <span class="leading-none mb-1">Do you already have any of the base soil ingredients?</span>
          {/* <hr class="w-24 mt-2" />
          <hr class="w-24 mt-1" />
          <sub class="text-xs">Generally speaking, your most expensive ingredient is compost</sub>
          <sub class="text-xs"> Because of this, if you already have several of the ingredients, I suggest you choose compost as your base ingredient</sub> */}
        </button>

        <button class="flex flex-col items-center outline outline-1 outline-purple-200 dark:outline-night-700 mx-1 p-2 rounded">
          <span class="leading-none mb-1">Do you know to total amount of soil you need?</span>
        </button>
      </div>
      
      <div class="md:columns-2 sm:columns-1 w-full h-full dark:text-gray-200">
        <div class="flex flex-col justify-center items-center">
          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-3/4">
            <legend>Hummus Mix</legend>

            <div class="flex flex-row justify-evenly items-center">
              <FloatingInput
                id="compost"
                label="Compost"
                type="number"
                value={compost()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'compost')}
              />

              <FloatingInput
                id="ewc"
                label="Earth Worm Castings"
                type="number"
                value={ewc()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'ewc')}
              />
            </div>
          </fieldset>

          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-3/4">
            <legend>Aeration Mix</legend>

            <div class="flex flex-row justify-evenly items-center">
              <FloatingInput
                id="pumice"
                label="Pumice"
                type="number"
                value={pumice()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'pumice')}
              />

              <FloatingInput
                id="bioChar"
                label="BioChar"
                type="number"
                value={bioChar()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'bioChar')}
              />
            </div>

            <div class="flex flex-row justify-evenly items-center">
              <FloatingInput
                id="lavaRock"
                label="Lava Rock"
                type="number"
                value={lavaRock()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'lavaRock')}
              />

              <FloatingInput
                id="riceHulls"
                label="Rice Hulls"
                type="number"
                value={riceHulls()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'riceHulls')}
              />
            </div>
            
          </fieldset>

          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-3/4">
            <legend>Loam Mix</legend>

            <div class="flex flex-row justify-evenly items-center">
              <FloatingInput
                id="peat"
                label="Sphagnum Moss"
                type="number"
                value={peat()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'peat')}
              />

              <FloatingInput
                id="humusMix"
                label="Humus Mix"
                type="number"
                value={humus()}
                // oninput={e => calculateHumus(e.target.valueAsNumber, 'humus')}
              />

              <FloatingInput
                id="aerationMix"
                label="Aeration Mix"
                type="number"
                value={aerationMix()}
                // oninput={e => calculateSoil(e.target.valueAsNumber, true)}
              />
           </div>
          </fieldset>
        </div>

        <div class="flex flex-col justify-between items-center">
          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-3/4">
            <legend>Mineral Mix</legend>

            <div class="flex flex-row justify-evenly items-center">
              <FloatingInput
                id="oysterShellFlour"
                label="Oyster Shell Flour"
                type="number"
                value={oysterShellFlour()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'oyster')}
              />

              <FloatingInput
                id="gypsum"
                label="Gypsum"
                type="number"
                value={gypsum()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'gypsum')}
              />
            </div>

            <div class="flex flex-row justify-evenly items-center">
              <FloatingInput
                id="glacialRockDust"
                label="Glacial Rock Dust"
                type="number"
                value={glacialRockDust()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'glacial')}
              />

              <FloatingInput
                id="basalt"
                label="Basalt"
                type="number"
                value={basalt()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'basalt')}
              />

              <FloatingInput
                id="calciumBentonite"
                label="Calcium Bentonite"
                type="number"
                value={calciumBentonite()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'bentonite')}
              />
            </div>
          </fieldset>

          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-3/4">
            <legend>Amendments</legend>

            <div class="flex flex-row justify-evenly items-center">
              <FloatingInput
                id="neemMeal"
                label="Neem Meal"
                type="number"
                value={neemMeal()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'neem')}
              />

              <FloatingInput
                id="kelpMeal"
                label="Kelp Meal"
                type="number"
                value={kelpMeal()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'kelp')}
              />
            </div>

            <div class="flex flex-row justify-evenly items-center">
              <FloatingInput
                id="crustaceanMeal"
                label="Crustacean Meal"
                type="number"
                value={crustaceanMeal()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'crustacean')}
              />

              <FloatingInput
                id="insectFrass"
                label="Insect Frass"
                type="number"
                value={insectFrass()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'insect')}
              />
            </div>

            <div class="flex flex-row justify-evenly items-center">
              <FloatingInput
                id="kashiBlend"
                label="Kashi Blend"
                type="number"
                value={kashiBlend()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'kashi')}
              />

              <FloatingInput
                id="karanjaMeal"
                label="Karanja Meal"
                type="number"
                value={karanjaMeal()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'karanja')}
              />
            </div>

            <div class="flex flex-row justify-evenly items-center">
              <FloatingInput
                id="fishBoneMeal"
                label="Fish Bone Meal"
                type="number"
                value={fishBoneMeal()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'fish')}
              />

              <FloatingInput
                id="microbes"
                label="Microbes"
                type="number"
                value={microbes()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'microbes')}
              />
            </div>
          </fieldset>
        
          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-3/4">
            <legend>Final Soil Mix</legend>

            <div class="flex flex-row justify-evenly items-center">
              <FloatingInput
                id="mineralMix"
                label="Mineral Mix"
                type="number"
                value={mineralMix()}
                // oninput={e => calculateSoil(e.target.valueAsNumber, 'all')}
              />

              <FloatingInput
                id="nutrientMix"
                label="Nutrient Mix"
                type="number"
                value={nutrientMix()}
                // oninput={e => calculateNutrientMix(e.target.valueAsNumber, 'all')}
              />

              <FloatingInput
                id="loamMix"
                label="Loam Mix"
                type="number"
                value={loam()}
                // oninput={e => calculateLoamMix(e.target.valueAsNumber)}
              />
            </div>

            <div class="flex flex-row justify-evenly items-center">
              <FloatingInput
                id="soil"
                label="Soil"
                type="number"
                value={soil()}
                oninput={e => calculateSoil(e.target.valueAsNumber, 'all')}
              />
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
