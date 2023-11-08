import { Motion } from '@motionone/solid';
import { splitProps } from 'solid-js';

type Intensity = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type Colors = 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink' | 'eggplant' | 'slate' | 'white'

interface ToggleProps {
  label: string,
  value: string,
  color?: Colors,
  oninput?: (event: InputEvent & { currentTarget: HTMLInputElement; target: HTMLInputElement; }) => void;
  /** @default {false} */
  disabled?: boolean
  classList?: string,
  /** @default {'gray'} */
  bgColor?: Colors,
  /** @default {'200'} */
  bgIntensity?: Intensity,
  /** @default {'gray'} */
  darkBgColor?: Colors,
  /** @default {'700'} */
  darkBgIntensity?: Intensity,
  /** @default {'blue'} */
  checkedBgColor?: Colors,
  /** @default {'600'} */
  checkedBgIntensity?: Intensity,
  /** @default {'blue'} */
  ringColor?: Colors,
  /** @default {'300'} */
  ringIntensity?: Intensity,
  /** @default {'blue'} */
  darkRingColor?: Colors,
  /** @default {'800'} */
  darkRingIntensity?: Intensity,
  /** @default {'4'} */
  ringSize?: '0' | '1' | '2' | '3' | '4' | '8' | 'inset',
  labelClassList?: string,
  /** @default {'gray'} */
  labelTextColor?: Colors,
  /** @default {'900'} */
  labelTextIntensity?: Intensity,
  /** @default {'gray'} */
  labelDarkTextColor?: Colors,
  /** @default {'300'} */
  labelDarkTextIntensity?: Intensity,
  /** @default {'white'} */
  dotColor?: Colors,
  /** @default {'gray'} */
  dotBorderColor?: Colors,
  /** @default {'300'} */
  dotBorderIntensity?: Intensity,
  /** @default {false} */
  checked?: boolean,

}

export default function Toggle(props: ToggleProps) {
  // R is required props, O is optional props
  const [r, o] = splitProps(props, ['label', 'value']);

  return (
    <Motion.label class="relative inline-flex items-center cursor-pointer">
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
        w-11 h-6 rounded-full
        bg-${o.bgColor ?? 'gray'}-${o.bgIntensity ?? '200'}
        dark:bg-${o.darkBgColor ?? 'gray'}-${o.darkBgIntensity ?? '700'}
        peer
        peer-focus:ring-${o.ringSize ?? '4'}
        peer-focus:ring-${o.ringColor ?? 'blue'}-${o.ringIntensity ?? '300'}
        dark:peer-focus:ring-${o.darkRingColor ?? 'blue'}-${o.darkRingIntensity ?? '800'}
        peer-checked:after:translate-x-full
        peer-checked:after:border-white after:content-['']
        after:absolute after:top-0.5 after:left-[2px]
        after:bg-${o.dotColor ?? 'white'}
        after:border-${o.dotBorderColor ?? 'gray'}-${o.dotBorderIntensity ?? '300'}
        after:border
        after:rounded-full
        after:h-5 after:w-5
        after:transition-all
        dark:border-grey-600
        peer-checked:bg-${o.checkedBgColor ?? 'blue'}-${o.checkedBgIntensity ?? '600'}
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
    </Motion.label>
  )
}
