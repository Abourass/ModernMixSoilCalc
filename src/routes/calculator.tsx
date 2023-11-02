import SoilCalculator from '~/components/SoilCalculator.jsx';

export default function Calculator() {
  return (
    <main class="text-center mx-auto p-4">
      <h1 class="max-6-xs text-6xl text-eggplant-900 dark:text-night-400 font-thin uppercase mb-4">
        Modern Mix Calculator
      </h1>

      <SoilCalculator />
    </main>
  );
}
