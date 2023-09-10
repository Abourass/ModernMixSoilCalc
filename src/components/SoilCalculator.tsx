import { Accessor, createSignal } from "solid-js";
import CuFtInput from './CuFtInput.jsx';
import CupsInput from './CupsInput.jsx';

const calculateMix = (...ingredients: Accessor<number|undefined>[]) => {
  const total = ingredients.reduce((acc, curr) => acc + (curr() ?? 0), 0);

  return (total === 0)
    ? undefined // Don't show anything in the inputs if the value is 0
    : Number(total.toFixed(2));
}

type CuFt = number;
type Cups = number;

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
 * ### (4 CuFt)
 *
 * - 1/6 Compost (Olly Mountain or Malibu Compost) | 16.66%
 * - 2/6 EWC (Rocky Mountain Earth Worm Castings)  | 33.34%
 * - 3/6 Peat (Sphagnum Moss)                      | 50%
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
 * - 4 CuFt Humus Mix            | 50%
 * - 4 CuFt Aeration Mix         | 50%
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
  /** |======== Humus Ingredients ========| */
  type HumusIngredients = 'compost'|'ewc'|'peat';

  const [compost, setCompost] = createSignal<CuFt>();          //-| In CuFt
  const [ewc, setEWC] = createSignal<CuFt>();                  //-| In CuFt
  const [peat, setPeat] = createSignal<CuFt>();                //-| In CuFt

  /**
   * The base humus is (at least) 4 CuFt and composed of
   * - 1/6 Compost (Olly Mountain or Malibu Compost) | 16.66%
   * - 2/6 EWC (Rocky Mountain Earth Worm Castings)  | 33.34%
   * - 3/6 Peat (Sphagnum Moss)                      | 50%
   * */
  const humusMix = () => calculateMix(compost, ewc, peat);

  /** |======= Aeration Ingredients =======| */
  type AerationIngredients = 'pumice'|'bioChar'|'lavaRock'|'riceHulls';

  const [pumice, setPumice] = createSignal<CuFt>();            //-| In CuFt
  const [bioChar, setBioChar] = createSignal<CuFt>();          //-| In CuFt
  const [lavaRock, setLavaRock] = createSignal<CuFt>();        //-| In CuFt
  const [riceHulls, setRiceHulls] = createSignal<CuFt>();      //-| In CuFt

  /**
   * The aeration mix is (at least) 4 CuFt and composed of
   * - 1 part Pumice     | 1 CuFt | 25%
   * - 1 part BioChar    | 1 CuFt | 25%
   * - 1 part Lava Rock  | 1 CuFt | 25%
   * - 1 part Rice Hulls | 1 CuFt | 25%
   */
  const aerationMix = () => calculateMix(pumice, bioChar, lavaRock, riceHulls);

  /** |======= Mineral Ingredients =======| */
  type MineralIngredients = 'oyster'|'gypsum'|'glacial'|'basalt'|'bentonite';

  const [oysterShellFlour, setOysterShellFlour] = createSignal<Cups>(); //-| In Cups
  const [gypsum, setGypsum] = createSignal<Cups>();                     //-| In Cups
  const [glacialRockDust, setGlacialRockDust] = createSignal<Cups>();   //-| In Cups
  const [basalt, setBasalt] = createSignal<Cups>();                     //-| In Cups
  const [calciumBentonite, setCalciumBentonite] = createSignal<Cups>(); //-| In Cups

  /**
   * The mineral mix is (at least) 20 Cups and composed of
   * - 2 part Oyster Shell Flour | 5 3/4 cups | 28.57%
   * - 2 part Gypsum             | 5 3/4 cups | 28.57%
   * - 1 parts Glacial Rock Dust | 2 3/4 cups | 14.28%
   * - 1 part Basalt             | 2 3/4 cups | 14.28%
   * - 1 part Calcium Bentonite  | 3 cups     | 14.28%
   * */
  const mineralMix = () => calculateMix(oysterShellFlour, gypsum, glacialRockDust, basalt, calciumBentonite);

  /** |====== Amendment Ingredients ======| */
  type AmendmentIngredients = 'neem'|'kelp'|'crustacean'|'insect'|'kashi'|'karanja'|'fish'|'microbes';

  const [neemMeal, setNeemMeal] = createSignal<Cups>();                 //-| 1/2 Cup
  const [kelpMeal, setKelpMeal] = createSignal<Cups>();                 //-| 1/2 Cup
  const [crustaceanMeal, setCrustaceanMeal] = createSignal<Cups>();     //-| 1/2 Cup
  const [insectFrass, setInsectFrass] = createSignal<Cups>();           //-| 1/2 Cup
  const [kashiBlend, setKashiBlend] = createSignal<Cups>();             //-| 1/3 Cup
  const [karanjaMeal, setKaranjaMeal] = createSignal<Cups>();           //-| 1/3 Cup
  const [fishBoneMeal, setFishBoneMeal] = createSignal<Cups>();         //-| 1/4 Cup
  const [microbes, setMicrobes] = createSignal<Cups>();                //-| 1/16 Cup

  /**
   * The nutrient mix is (at least) 40 Cups and composed of
   * - 3 cup organic Neem meal
   * - 3 cup organic Kelp meal
   * - 3 cup organic Crustacean meal
   * - 3 cup organic insect frass
   * - 2 3/4 cup Gro-Kashi
   * - 2 3/4 cup Karanja Meal
   * - 2 cup of fish bone meal
   * - 1/2 cup of Modern Microbes
   * */
  const amendmentMix = () => calculateMix(neemMeal, kelpMeal, crustaceanMeal, insectFrass, kashiBlend, karanjaMeal, fishBoneMeal, microbes);

  /** |====== Complete Soil ======| */
  type SoilMixIngredients = HumusIngredients|AerationIngredients|MineralIngredients|AmendmentIngredients;

  const [soil, setSoil] = createSignal<CuFt>(); //-| In CuFt

  /** 1:1 Loam Mix to Aeration Mix */
  function calculateBaseSoilMix(sqFt: number) {
    /** 1:2 Compost to EWC */
    const totalCompostMix: CuFt = sqFt / 4;
  
    setCompost(Number((totalCompostMix * (33.33 / 100)).toFixed(2)));
    setEWC(Number((totalCompostMix * (66.67 / 100)).toFixed(2)));

    /** 1:1 Sphagnum Moss to Humus Mix */
    setPeat(Number((sqFt / 4).toFixed(2)));

    /** 1:1:1:1 Pumice, BioChar, Lava Rock, Rice Hulls */
    const aerationMix: CuFt = sqFt / 2;

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

    const soilMath = (totalCuFt: CuFt) => {
      const eightCuFtUnits = Number((totalCuFt / 8).toFixed(2));

      // We are calculating the total amount of soil needed
      calculateBaseSoilMix(totalCuFt)
      calculateNutrientMix(Number((eightCuFtUnits * 40).toFixed(2)))

      setSoil(totalCuFt);
    }

    if (ingredient === 'all'){
      soilMath(value);
    } else if (cuFtIngredients.includes(ingredient as HumusIngredients|AerationIngredients)) {
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
    } else if (cupsIngredients.includes(ingredient as MineralIngredients|AmendmentIngredients)) {

    }
  }

  function recalculateSoil(ingredient: SoilMixIngredients|'all'){
    return (e: InputEvent & { currentTarget: HTMLInputElement; target: HTMLInputElement; }) => calculateSoil(e.target.valueAsNumber, ingredient);
  }

  return (
    <div class="bg-eggplant-200 dark:bg-night-900 dark:text-gray-200 rounded-md mx-2 flex flex-col items-center py-2 ">
      
      <div class="flex justify-evenly w-full h-full dark:text-gray-200">
        <div class="flex flex-col justify-center items-center">
          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-11/12">
            <legend>Humus Mix</legend>

            <div class="flex flex-row justify-evenly items-center">
              <CuFtInput
                label="Compost"
                containerClassList="mx-2"
                value={compost()}
                oninput={recalculateSoil('compost')}
              />

              <CuFtInput
                label="Earth Worm Castings"
                containerClassList="mx-2"
                value={ewc()}
                oninput={recalculateSoil('ewc')}
              />

              <CuFtInput
                label="Sphagnum Moss"
                containerClassList="mx-2"
                value={peat()}
                oninput={recalculateSoil('peat')}
              />
            </div>
          </fieldset>

          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-11/12">
            <legend>Aeration Mix</legend>

            <div class="flex flex-row justify-evenly items-center">
              <CuFtInput label="Pumice" value={pumice()} oninput={recalculateSoil('pumice')} />
              <CuFtInput label="BioChar" value={bioChar()} oninput={recalculateSoil('bioChar')} />
            </div>

            <div class="flex flex-row justify-evenly items-center">
              <CuFtInput label="Lava Rock" value={lavaRock()} oninput={recalculateSoil('lavaRock')} />
              <CuFtInput label="Rice Hulls" value={riceHulls()} oninput={recalculateSoil('riceHulls')} />
            </div>
            
          </fieldset>
        </div>

        <div class="flex flex-col justify-between items-center">
          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-11/12">
            <legend>Mineral Mix</legend>

            <div class="flex flex-row justify-evenly items-center">
              <CupsInput label="Oyster Shell Flour" value={oysterShellFlour()} oninput={recalculateSoil('oyster')} />

              <CupsInput
                label="Gypsum"
                value={gypsum()}
                oninput={recalculateSoil('gypsum')}
              />
            </div>

            <div class="flex flex-row justify-evenly items-center">
              <CupsInput
                label="Glacial Rock Dust"
                value={glacialRockDust()}
                containerClassList="mx-2"
                oninput={recalculateSoil('glacial')}
              />

              <CupsInput
                label="Basalt"
                value={basalt()}
                containerClassList="mx-2"
                oninput={recalculateSoil('basalt')}
              />

              <CupsInput
                label="Calcium Bentonite"
                value={calciumBentonite()}
                containerClassList="mx-2"
                oninput={recalculateSoil('bentonite')}
              />
            </div>
          </fieldset>

          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-11/12">
            <legend>Amendments</legend>

            <div class="flex flex-row justify-evenly items-center">
              <CupsInput label="Neem Meal" value={neemMeal()} oninput={recalculateSoil('neem')} />
              <CupsInput label="Kelp Meal" value={kelpMeal()} oninput={recalculateSoil('kelp')} />
            </div>

            <div class="flex flex-row justify-evenly items-center">
              <CupsInput label="Crustacean Meal" value={crustaceanMeal()} oninput={recalculateSoil('crustacean')} />
              <CupsInput label="Insect Frass" value={insectFrass()} oninput={recalculateSoil('insect')} />
            </div>

            <div class="flex flex-row justify-evenly items-center">
              <CupsInput label="Kashi Blend" value={kashiBlend()} oninput={recalculateSoil('kashi')} />
              <CupsInput label="Karanja Meal" value={karanjaMeal()} oninput={recalculateSoil('karanja')} />
            </div>

            <div class="flex flex-row justify-evenly items-center">
              <CupsInput label="Fish Bone Meal" value={fishBoneMeal()} oninput={recalculateSoil('fish')} />
              <CupsInput label="Microbes" value={microbes()} oninput={recalculateSoil('microbes')} />
            </div>
          </fieldset>
        </div>
      </div>

      <div class="flex flex-col w-full mt-2 items-center">
        <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1 w-1/2">
          <legend>Final Soil Mix</legend>

          <div class="flex flex-row justify-evenly items-center">
            <CuFtInput label="Humus" value={humusMix()} disabled={true} />
            <CuFtInput label="Aeration Mix" value={aerationMix()} disabled={true} />
          </div>

          <div class="flex flex-row justify-evenly items-center">
            <CupsInput label="Mineral Mix" value={mineralMix()} disabled={true} />
            <CupsInput label="Amendments" value={amendmentMix()} disabled={true} />
          </div>

          <div class="flex flex-row justify-evenly items-center">
            <CuFtInput label="Final Soil Mix" value={soil()} oninput={recalculateSoil('all')} />
          </div>
        </fieldset>
      </div>
    </div>
  )
}
