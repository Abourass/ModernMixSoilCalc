import { createSignal, splitProps } from 'solid-js';

type FontIntensity = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

interface ToggleProps {
  label: string,
  value: string,
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink' | 'gray' | 'white' | 'black',
  oninput?: (event: InputEvent & { currentTarget: HTMLInputElement; target: HTMLInputElement; }) => void;
  disabled?: boolean
  classList?: string,
  labelClassList?: string,
  labelTextColor?: string,
  labelTextIntensity?: FontIntensity,
  labelDarkTextColor?: string,
  labelDarkTextIntensity?: FontIntensity,
  checked?: boolean,
}

export default function Toggle(props: ToggleProps) {
  // R is required props, O is optional props
  const [r, o] = splitProps(props, ['label', 'value']);

  // eslint-disable-next-line solid/reactivity
  const [color] = createSignal<NonNullable<ToggleProps['color']>>(o.color as ToggleProps['color'] ?? 'blue');

  return (
    <label class="relative inline-flex items-center mr-5 cursor-pointer">
      <input
        type="checkbox"
        value={r.value}
        class="sr-only peer"
        onInput={(e) => { if (o.oninput) o.oninput(e) }}
        checked={o.checked}
        disabled={o.disabled}
      />
      <div
        class={`
        w-11 h-6
        bg-gray-200
        rounded-full
        peer
        peer-focus:ring-4
        peer-focus:ring-${color()}-300
        dark:peer-focus:ring-${color()}-800
        dark:bg-gray-700
        peer-checked:after:translate-x-full
        peer-checked:after:border-white after:content-['']
        after:absolute after:top-0.5 after:left-[2px]
        after:bg-white
        after:border-gray-300
        after:border
        after:rounded-full
        after:h-5 after:w-5
        after:transition-all
        dark:border-gray-600
        peer-checked:bg-${color()}-600
        ${o.classList ? o.classList : ""}`}
      />
      <span class={`
        ml-3
        text-sm
        font-medium
        text-${o.labelTextColor ?? 'gray'}-${o.labelTextIntensity ?? 900}
        dark:text-${o.labelDarkTextColor ?? 'gray'}-${o.labelDarkTextIntensity ?? 300}
        ${o.labelClassList ? o.labelClassList : ''}
      `}>{r.label}</span>
    </label>
  )
}
