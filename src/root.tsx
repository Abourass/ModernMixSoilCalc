// @refresh reload
import { Suspense, createEffect, createSignal } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import Toggle from './components/Form/Toggle.jsx';

export default function Root() {
  const location = useLocation();
  const active = (path: string) =>
    path === location.pathname
      ? "border-night-50 dark:border-night-500"
      : "border-transparent hover:border-night-300";

  const tagline = [
    'Science with a Smile',
    'Soil with Soul',
    'Sustainable Soil for All',
    'Cultivate Culture',
  ].sort(() => Math.random() - 0.5)[0];

  /** If they've yet to set a dark mode preference let's default to their system preference */
  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  const [theme, setTheme] = createSignal(localStorage.theme);

  /** Toggle Light and Dark Mode */
  createEffect(() => {
    if (theme() === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light');
    }
  });

  return (
    <Html lang="en">
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Title>TheModern.Farm - {tagline}</Title>
      </Head>
      <Body class="bg-violet-50 dark:bg-night-950">
        <Suspense>
          <ErrorBoundary>
            <nav class="bg-violet-800 dark:bg-night-950 flex justify-between">
              <ul class="container flex items-center p-3 text-gray-100 dark:text-gray-200">
                <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
                  <A href="/">Home</A>
                </li>
                <li class={`border-b-2 ${active("/calculator")} mx-1.5 sm:mx-6`}>
                  <A href="/calculator">Calculator</A>
                </li>
                <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
                  <A href="/about">About</A>
                </li>
              </ul>

              <div class="flex items-center">
                <Toggle
                  label={theme() === 'dark' ? 'Dark' : 'Light'}
                  value="dark"
                  oninput={(e) => {
                    if (e.target.checked) {
                      setTheme('dark');
                    } else {
                      setTheme('light');
                    }
                  }}
                  labelTextIntensity='100'
                  labelDarkTextIntensity='200'
                  checked={theme() === 'dark'}
                />
              </div>
            </nav>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
