import { splitProps } from 'solid-js';

export default function SiteHeader(props?: { class?: string }) {
  // R is required props, O is optional props
  const [R] = splitProps(props ?? {}, ['class']);

  return (
    <div class={R.class ?? ''}>
      <h1 class="text-header text-eggplant-200 dark:text-night-400 font-family-posterama-thin center mt-1 subpixel-antialiased">
        TheModern.Farm
      </h1>
    </div>
  )
}
