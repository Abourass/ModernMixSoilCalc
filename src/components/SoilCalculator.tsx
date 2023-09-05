import { createSignal } from "solid-js";
import FloatingInput from './FloatingInput.jsx';

export default function SoilCalculator() {
  const [compost, setCompost] = createSignal(0);          //-| In CuFt
  const [ewc, setEWC] = createSignal(0);                  //-| In CuFt
  const humus = () => compost() + ewc();  //-| In CuFt

  /**
   * Our Humus is composed of 1/3 Compost (Olly Mountain or Malibu Compost)
   * and 2/3 EWC (Rocky Mountain EarthWorm Castings)
   */
  function calculateHumus(value: number, label: 'compost' | 'ewc') {
    let compost = 0;
    let ewc = 0;

    if (label === 'compost') {
      compost = value;
      ewc = Number((value * 2).toFixed());
    } else {
      compost = Number((value / 2).toFixed());
      ewc = value;
    }

    setCompost(compost);
    setEWC(ewc);
  }

  const [peat, setPeat] = createSignal(0);                //-| In CuFt

  const loamMix = () => humus() + peat(); //-| In CuFt

  const [pumice, setPumice] = createSignal(0);          //-| In CuFt
  const [bioChar, setBioChar] = createSignal(0);        //-| In CuFt
  const [lavaRock, setLavaRock] = createSignal(0);      //-| In CuFt
  const [riceHulls, setRiceHulls] = createSignal(0);    //-| In CuFt

  const aerationMix = () => pumice() + bioChar() + lavaRock() + riceHulls(); //-| In CuFt

  // Base Soil Mix is 1:1 Loam Mix to Aeration Mix

  const [oysterShellFlour, setOysterShellFlour] = createSignal(0); //-| 2 Pt
  const [gypsum, setGypsum] = createSignal(0);                     //-| 2 Pt
  const [glacialRockDust, setGlacialRockDust] = createSignal(0);   //-| 1 Pt
  const [basalt, setBasalt] = createSignal(0);                     //-| 1 Pt
  const [calciumBentonite, setCalciumBentonite] = createSignal(0); //-| 1 Pt

  // 3 Cups of Mineral Mix per CuFt of Base Soil Mix
  const mineralMix = () => oysterShellFlour() + gypsum() + glacialRockDust() + basalt() + calciumBentonite(); //-| In Cups

  const [neemMeal, setNeemMeal] = createSignal(0);             //-| 1/2 Cup
  const [kelpMeal, setKelpMeal] = createSignal(0);             //-| 1/2 Cup
  const [crustaceanMeal, setCrustaceanMeal] = createSignal(0); //-| 1/2 Cup
  const [insectFrass, setInsectFrass] = createSignal(0);       //-| 1/2 Cup
  const [kashiBlend, setKashiBlend] = createSignal(0);         //-| 1/3 Cup
  const [karanjaMeal, setKaranjaMeal] = createSignal(0);       //-| 1/3 Cup
  const [fishBoneMeal, setFishBoneMeal] = createSignal(0);     //-| 1/4 Cup
  const [microbes, setMicrobes] = createSignal(0);            //-| 1/16 Cup
  // + 3 Cups of Mineral Mix
  // All per CuFt of Base Soil Mix

  const [soil, setSoil] = createSignal(0); //-| In CuFt

  const [total, setTotal] = createSignal(0); //-| In CuFt


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
        <div class="flex flex-col justify-center items-center w-1/2">
          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1">
            <legend>Loam Mix</legend>

            <FloatingInput label="Humus" value={humus()} type="number" placeholder="Sample" />

            <div class="flex flex-row justify-center items-center">
              
              <label class="flex flex-col items-center">
                <span class="leading-none mb-1">Compost</span>
                <input class="dark:bg-night-950 dark:text-gray-400 rounded px-2 w-6/12" type="number" value={compost()} oninput={e => calculateHumus(e.target.valueAsNumber, 'compost')} />
              </label>
            
              <label class="flex flex-col items-center">
                <span class="leading-none mb-1">EWC</span>
                <input class="dark:bg-night-950 dark:text-gray-400 rounded px-2 w-6/12" type="number" value={ewc()} oninput={e => calculateHumus(e.target.valueAsNumber, 'ewc')} />
              </label>
            </div>
          </fieldset>

          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1">
            <legend>Aeration Mix</legend>

            <div class="flex flex-row justify-center items-center">
              <label class="flex flex-col items-center">
                <span class="leading-none mb-1">Pumice</span>
                <input class="dark:bg-night-950 dark:text-gray-400 rounded px-2 w-6/12" type="number" value={pumice()} oninput={e => setPumice(e.currentTarget.valueAsNumber)} />
              </label>

              <label class="flex flex-col items-center">
                <span class="leading-none mb-1">BioChar</span>
                <input class="dark:bg-night-950 dark:text-gray-400 rounded px-2 w-6/12" type="number" value={bioChar()} oninput={e => setBioChar(e.currentTarget.valueAsNumber)} />
              </label>
            </div>

            <div class="flex flex-row justify-center items-center">
              <label class="flex flex-col items-center">
                <span class="leading-none mb-1">Lava Rock</span>
                <input class="dark:bg-night-950 dark:text-gray-400 rounded px-2 w-6/12" type="number" value={lavaRock()} oninput={e => setLavaRock(e.currentTarget.valueAsNumber)} />
              </label>

              <label class="flex flex-col items-center">
                <span class="leading-none mb-1">Rice Hulls</span>
                <input class="dark:bg-night-950 dark:text-gray-400 rounded px-2 w-6/12" type="number" value={riceHulls()} oninput={e => setRiceHulls(e.currentTarget.valueAsNumber)} />
              </label>
            </div>
            
          </fieldset>

          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1">
            <legend>Base Soil Mix</legend>

            <div class="flex flex-row justify-center items-center">
              <label class="flex flex-col items-center">
                <span class="leading-none mb-1">Loam Mix</span>
                <input class="dark:bg-night-950 dark:text-gray-400 rounded px-2 w-6/12" type="number" value={loamMix()} />
              </label>

              <label class="flex flex-col items-center">
                <span class="leading-none mb-1">Aeration Mix</span>
                <input class="dark:bg-night-950 dark:text-gray-400 rounded px-2 w-6/12" type="number" value={aerationMix()} />
              </label>
           </div>
          </fieldset>
        </div>

        <div class="flex flex-col justify-center items-center w-1/2">
          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1">
            <legend>Mineral Mix</legend>

            <div class="flex flex-row justify-center items-center">
              <label class="flex flex-col items-center">
                <span class="leading-none mb-1">Oyster Shell Flour</span>
                <input class="dark:bg-night-950 dark:text-gray-400 rounded px-2 w-6/12" type="number" value={oysterShellFlour()} oninput={e => setOysterShellFlour(e.currentTarget.valueAsNumber)} />
              </label>
            
              <label class="flex flex-col items-center">
                <span class="leading-none mb-1">Gypsum</span>
                <input class="dark:bg-night-950 dark:text-gray-400 rounded px-2 w-6/12" type="number" value={gypsum()} oninput={e => setGypsum(e.currentTarget.valueAsNumber)} />
              </label>

              <label class="flex flex-col items-center">
                <span class="leading-none mb-1">Glacial Rock Dust</span>
                <input class="dark:bg-night-950 dark:text-gray-400 rounded px-2 w-6/12" type="number" value={glacialRockDust()} oninput={e => setGlacialRockDust(e.currentTarget.valueAsNumber)} />
              </label>

              <label class="flex flex-col items-center">
                <span class="leading-none mb-1">Basalt</span>
                <input class="dark:bg-night-950 dark:text-gray-400 rounded px-2 w-6/12" type="number" value={basalt()} oninput={e => setBasalt(e.currentTarget.valueAsNumber)} />
              </label>
            </div>
          </fieldset>

          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1">
            <legend>Amendments</legend>
          </fieldset>
        
          <fieldset class="rounded dark:border-night-950 border-solid border p-2 pt-1">
            <legend>Final Soil Mix</legend>

            
          </fieldset>
        </div>
      </div>
    </div>
  )
}
