import { Motion } from '@motionone/solid';
import { splitProps } from 'solid-js';

type RingSizes = '0' | '1' | '2' | '3' | '4' | '8' | 'inset';
type Intensity = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type Colors = 'gray' | 'red' | 'cinder' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink' | 'eggplant' | 'slate' | 'white'

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
  ringSize?: RingSizes,
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
  /** @default {'200'} */
  dotIntensity?: Intensity,
  /** @default {'gray'} */
  dotBorderColor?: Colors,
  /** @default {'300'} */
  dotBorderIntensity?: Intensity,
  /** @default {'gray'} */
  darkDotBorderColor?: Colors,
  /** @default {'300'} */
  darkDotBorderIntensity?: Intensity,
  /** @default {'gray'} */
  darkBorderColor?: Colors,
  /** @default {'600'} */
  darkBorderIntensities?: Intensity,
  /** @default {undefined} */
  containerClassList?: string,
  /** @default {false} */
  checked?: boolean,
}

export default function Toggle(props: ToggleProps) {
  // R is required props, O is optional props
  const [r, o] = splitProps(props, ['label', 'value']);

  /** Tailwind only includes classes if they are included FULLY typed so... */
  const bgOptions = {
    gray: ['bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300', 'bg-gray-400', 'bg-gray-500', 'bg-gray-600', 'bg-gray-700', 'bg-gray-800', 'bg-gray-900'],
    darkGray: ['dark:bg-gray-50', 'dark:bg-gray-100', 'dark:bg-gray-200', 'dark:bg-gray-300', 'dark:bg-gray-400', 'dark:bg-gray-500', 'dark:bg-gray-600', 'dark:bg-gray-700', 'dark:bg-gray-800', 'dark:bg-gray-900'],
    afterGray: ['after:bg-gray-50', 'after:bg-gray-100', 'after:bg-gray-200', 'after:bg-gray-300', 'after:bg-gray-400', 'after:bg-gray-500', 'after:bg-gray-600', 'after:bg-gray-700', 'after:bg-gray-800', 'after:bg-gray-900'],
    peerGray: ['peer-focus:bg-gray-50', 'peer-focus:bg-gray-100', 'peer-focus:bg-gray-200', 'peer-focus:bg-gray-300', 'peer-focus:bg-gray-400', 'peer-focus:bg-gray-500', 'peer-focus:bg-gray-600', 'peer-focus:bg-gray-700', 'peer-focus:bg-gray-800', 'peer-focus:bg-gray-900'],
    red: ['bg-red-50', 'bg-red-100', 'bg-red-200', 'bg-red-300', 'bg-red-400', 'bg-red-500', 'bg-red-600', 'bg-red-700', 'bg-red-800', 'bg-red-900'],
    darkRed: ['dark:bg-red-50', 'dark:bg-red-100', 'dark:bg-red-200', 'dark:bg-red-300', 'dark:bg-red-400', 'dark:bg-red-500', 'dark:bg-red-600', 'dark:bg-red-700', 'dark:bg-red-800', 'dark:bg-red-900'],
    afterRed: ['after:bg-red-50', 'after:bg-red-100', 'after:bg-red-200', 'after:bg-red-300', 'after:bg-red-400', 'after:bg-red-500', 'after:bg-red-600', 'after:bg-red-700', 'after:bg-red-800', 'after:bg-red-900'],
    peerRed: ['peer-focus:bg-red-50', 'peer-focus:bg-red-100', 'peer-focus:bg-red-200', 'peer-focus:bg-red-300', 'peer-focus:bg-red-400', 'peer-focus:bg-red-500', 'peer-focus:bg-red-600', 'peer-focus:bg-red-700', 'peer-focus:bg-red-800', 'peer-focus:bg-red-900'],
    cinder: ['bg-cinder-50', 'bg-cinder-100', 'bg-cinder-200', 'bg-cinder-300', 'bg-cinder-400', 'bg-cinder-500', 'bg-cinder-600', 'bg-cinder-700', 'bg-cinder-800', 'bg-cinder-900'],
    darkCinder: ['dark:bg-cinder-50', 'dark:bg-cinder-100', 'dark:bg-cinder-200', 'dark:bg-cinder-300', 'dark:bg-cinder-400', 'dark:bg-cinder-500', 'dark:bg-cinder-600', 'dark:bg-cinder-700', 'dark:bg-cinder-800', 'dark:bg-cinder-900'],
    afterCinder: ['after:bg-cinder-50', 'after:bg-cinder-100', 'after:bg-cinder-200', 'after:bg-cinder-300', 'after:bg-cinder-400', 'after:bg-cinder-500', 'after:bg-cinder-600', 'after:bg-cinder-700', 'after:bg-cinder-800', 'after:bg-cinder-900'],
    peerCinder: ['peer-focus:bg-cinder-50', 'peer-focus:bg-cinder-100', 'peer-focus:bg-cinder-200', 'peer-focus:bg-cinder-300', 'peer-focus:bg-cinder-400', 'peer-focus:bg-cinder-500', 'peer-focus:bg-cinder-600', 'peer-focus:bg-cinder-700', 'peer-focus:bg-cinder-800', 'peer-focus:bg-cinder-900'],
    green: ['bg-green-50', 'bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900'],
    darkGreen: ['dark:bg-green-50', 'dark:bg-green-100', 'dark:bg-green-200', 'dark:bg-green-300', 'dark:bg-green-400', 'dark:bg-green-500', 'dark:bg-green-600', 'dark:bg-green-700', 'dark:bg-green-800', 'dark:bg-green-900'],
    afterGreen: ['after:bg-green-50', 'after:bg-green-100', 'after:bg-green-200', 'after:bg-green-300', 'after:bg-green-400', 'after:bg-green-500', 'after:bg-green-600', 'after:bg-green-700', 'after:bg-green-800', 'after:bg-green-900'],
    peerGreen: ['peer-focus:bg-green-50', 'peer-focus:bg-green-100', 'peer-focus:bg-green-200', 'peer-focus:bg-green-300', 'peer-focus:bg-green-400', 'peer-focus:bg-green-500', 'peer-focus:bg-green-600', 'peer-focus:bg-green-700', 'peer-focus:bg-green-800', 'peer-focus:bg-green-900'],
    blue: ['bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900'],
    darkBlue: ['dark:bg-blue-50', 'dark:bg-blue-100', 'dark:bg-blue-200', 'dark:bg-blue-300', 'dark:bg-blue-400', 'dark:bg-blue-500', 'dark:bg-blue-600', 'dark:bg-blue-700', 'dark:bg-blue-800', 'dark:bg-blue-900'],
    afterBlue: ['after:bg-blue-50', 'after:bg-blue-100', 'after:bg-blue-200', 'after:bg-blue-300', 'after:bg-blue-400', 'after:bg-blue-500', 'after:bg-blue-600', 'after:bg-blue-700', 'after:bg-blue-800', 'after:bg-blue-900'],
    peerBlue: ['peer-focus:bg-blue-50', 'peer-focus:bg-blue-100', 'peer-focus:bg-blue-200', 'peer-focus:bg-blue-300', 'peer-focus:bg-blue-400', 'peer-focus:bg-blue-500', 'peer-focus:bg-blue-600', 'peer-focus:bg-blue-700', 'peer-focus:bg-blue-800', 'peer-focus:bg-blue-900'],
    indigo: ['bg-indigo-50', 'bg-indigo-100', 'bg-indigo-200', 'bg-indigo-300', 'bg-indigo-400', 'bg-indigo-500', 'bg-indigo-600', 'bg-indigo-700', 'bg-indigo-800', 'bg-indigo-900'],
    darkIndigo: ['dark:bg-indigo-50', 'dark:bg-indigo-100', 'dark:bg-indigo-200', 'dark:bg-indigo-300', 'dark:bg-indigo-400', 'dark:bg-indigo-500', 'dark:bg-indigo-600', 'dark:bg-indigo-700', 'dark:bg-indigo-800', 'dark:bg-indigo-900'],
    afterIndigo: ['after:bg-indigo-50', 'after:bg-indigo-100', 'after:bg-indigo-200', 'after:bg-indigo-300', 'after:bg-indigo-400', 'after:bg-indigo-500', 'after:bg-indigo-600', 'after:bg-indigo-700', 'after:bg-indigo-800', 'after:bg-indigo-900'],
    peerIndigo: ['peer-focus:bg-indigo-50', 'peer-focus:bg-indigo-100', 'peer-focus:bg-indigo-200', 'peer-focus:bg-indigo-300', 'peer-focus:bg-indigo-400', 'peer-focus:bg-indigo-500', 'peer-focus:bg-indigo-600', 'peer-focus:bg-indigo-700', 'peer-focus:bg-indigo-800', 'peer-focus:bg-indigo-900'],
    purple: ['bg-purple-50', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400', 'bg-purple-500', 'bg-purple-600', 'bg-purple-700', 'bg-purple-800', 'bg-purple-900'],
    darkPurple: ['dark:bg-purple-50', 'dark:bg-purple-100', 'dark:bg-purple-200', 'dark:bg-purple-300', 'dark:bg-purple-400', 'dark:bg-purple-500', 'dark:bg-purple-600', 'dark:bg-purple-700', 'dark:bg-purple-800', 'dark:bg-purple-900'],
    afterPurple: ['after:bg-purple-50', 'after:bg-purple-100', 'after:bg-purple-200', 'after:bg-purple-300', 'after:bg-purple-400', 'after:bg-purple-500', 'after:bg-purple-600', 'after:bg-purple-700', 'after:bg-purple-800', 'after:bg-purple-900'],
    peerPurple: ['peer-focus:bg-purple-50', 'peer-focus:bg-purple-100', 'peer-focus:bg-purple-200', 'peer-focus:bg-purple-300', 'peer-focus:bg-purple-400', 'peer-focus:bg-purple-500', 'peer-focus:bg-purple-600', 'peer-focus:bg-purple-700', 'peer-focus:bg-purple-800', 'peer-focus:bg-purple-900'],
    pink: ['bg-pink-50', 'bg-pink-100', 'bg-pink-200', 'bg-pink-300', 'bg-pink-400', 'bg-pink-500', 'bg-pink-600', 'bg-pink-700', 'bg-pink-800', 'bg-pink-900'],
    darkPink: ['dark:bg-pink-50', 'dark:bg-pink-100', 'dark:bg-pink-200', 'dark:bg-pink-300', 'dark:bg-pink-400', 'dark:bg-pink-500', 'dark:bg-pink-600', 'dark:bg-pink-700', 'dark:bg-pink-800', 'dark:bg-pink-900'],
    afterPink: ['after:bg-pink-50', 'after:bg-pink-100', 'after:bg-pink-200', 'after:bg-pink-300', 'after:bg-pink-400', 'after:bg-pink-500', 'after:bg-pink-600', 'after:bg-pink-700', 'after:bg-pink-800', 'after:bg-pink-900'],
    peerPink: ['peer-focus:bg-pink-50', 'peer-focus:bg-pink-100', 'peer-focus:bg-pink-200', 'peer-focus:bg-pink-300', 'peer-focus:bg-pink-400', 'peer-focus:bg-pink-500', 'peer-focus:bg-pink-600', 'peer-focus:bg-pink-700', 'peer-focus:bg-pink-800', 'peer-focus:bg-pink-900'],
    eggplant: ['bg-eggplant-50', 'bg-eggplant-100', 'bg-eggplant-200', 'bg-eggplant-300', 'bg-eggplant-400', 'bg-eggplant-500', 'bg-eggplant-600', 'bg-eggplant-700', 'bg-eggplant-800', 'bg-eggplant-900'],
    darkEggplant: ['dark:bg-eggplant-50', 'dark:bg-eggplant-100', 'dark:bg-eggplant-200', 'dark:bg-eggplant-300', 'dark:bg-eggplant-400', 'dark:bg-eggplant-500', 'dark:bg-eggplant-600', 'dark:bg-eggplant-700', 'dark:bg-eggplant-800', 'dark:bg-eggplant-900'],
    afterEggplant: ['after:bg-eggplant-50', 'after:bg-eggplant-100', 'after:bg-eggplant-200', 'after:bg-eggplant-300', 'after:bg-eggplant-400', 'after:bg-eggplant-500', 'after:bg-eggplant-600', 'after:bg-eggplant-700', 'after:bg-eggplant-800', 'after:bg-eggplant-900'],
    peerEggplant: ['peer-focus:bg-eggplant-50', 'peer-focus:bg-eggplant-100', 'peer-focus:bg-eggplant-200', 'peer-focus:bg-eggplant-300', 'peer-focus:bg-eggplant-400', 'peer-focus:bg-eggplant-500', 'peer-focus:bg-eggplant-600', 'peer-focus:bg-eggplant-700', 'peer-focus:bg-eggplant-800', 'peer-focus:bg-eggplant-900'],
    slate: ['bg-slate-50', 'bg-slate-100', 'bg-slate-200', 'bg-slate-300', 'bg-slate-400', 'bg-slate-500', 'bg-slate-600', 'bg-slate-700', 'bg-slate-800', 'bg-slate-900'],
    darkSlate: ['dark:bg-slate-50', 'dark:bg-slate-100', 'dark:bg-slate-200', 'dark:bg-slate-300', 'dark:bg-slate-400', 'dark:bg-slate-500', 'dark:bg-slate-600', 'dark:bg-slate-700', 'dark:bg-slate-800', 'dark:bg-slate-900'],
    afterSlate: ['after:bg-slate-50', 'after:bg-slate-100', 'after:bg-slate-200', 'after:bg-slate-300', 'after:bg-slate-400', 'after:bg-slate-500', 'after:bg-slate-600', 'after:bg-slate-700', 'after:bg-slate-800', 'after:bg-slate-900'],
    peerSlate: ['peer-focus:bg-slate-50', 'peer-focus:bg-slate-100', 'peer-focus:bg-slate-200', 'peer-focus:bg-slate-300', 'peer-focus:bg-slate-400', 'peer-focus:bg-slate-500', 'peer-focus:bg-slate-600', 'peer-focus:bg-slate-700', 'peer-focus:bg-slate-800', 'peer-focus:bg-slate-900'],
    white: ['bg-white-50', 'bg-white-100', 'bg-white-200', 'bg-white-300', 'bg-white-400', 'bg-white-500', 'bg-white-600', 'bg-white-700', 'bg-white-800', 'bg-white-900'],
    darkWhite: ['dark:bg-white-50', 'dark:bg-white-100', 'dark:bg-white-200', 'dark:bg-white-300', 'dark:bg-white-400', 'dark:bg-white-500', 'dark:bg-white-600', 'dark:bg-white-700', 'dark:bg-white-800', 'dark:bg-white-900'],
    afterWhite: ['after:bg-white-50', 'after:bg-white-100', 'after:bg-white-200', 'after:bg-white-300', 'after:bg-white-400', 'after:bg-white-500', 'after:bg-white-600', 'after:bg-white-700', 'after:bg-white-800', 'after:bg-white-900'],
    peerWhite: ['peer-focus:bg-white-50', 'peer-focus:bg-white-100', 'peer-focus:bg-white-200', 'peer-focus:bg-white-300', 'peer-focus:bg-white-400', 'peer-focus:bg-white-500', 'peer-focus:bg-white-600', 'peer-focus:bg-white-700', 'peer-focus:bg-white-800', 'peer-focus:bg-white-900'],
  };

  const ringOptions = {
    gray: ['peer-focus:ring-gray-50', 'peer-focus:ring-gray-100', 'peer-focus:ring-gray-200', 'peer-focus:ring-gray-300', 'peer-focus:ring-gray-400', 'peer-focus:ring-gray-500', 'peer-focus:ring-gray-600', 'peer-focus:ring-gray-700', 'peer-focus:ring-gray-800', 'peer-focus:ring-gray-900'],
    darkGray: ['dark:peer-focus:ring-gray-50', 'dark:peer-focus:ring-gray-100', 'dark:peer-focus:ring-gray-200', 'dark:peer-focus:ring-gray-300', 'dark:peer-focus:ring-gray-400', 'dark:peer-focus:ring-gray-500', 'dark:peer-focus:ring-gray-600', 'dark:peer-focus:ring-gray-700', 'dark:peer-focus:ring-gray-800', 'dark:peer-focus:ring-gray-900'],
    red: ['peer-focus:ring-red-50', 'peer-focus:ring-red-100', 'peer-focus:ring-red-200', 'peer-focus:ring-red-300', 'peer-focus:ring-red-400', 'peer-focus:ring-red-500', 'peer-focus:ring-red-600', 'peer-focus:ring-red-700', 'peer-focus:ring-red-800', 'peer-focus:ring-red-900'],
    darkRed: ['dark:peer-focus:ring-red-50', 'dark:peer-focus:ring-red-100', 'dark:peer-focus:ring-red-200', 'dark:peer-focus:ring-red-300', 'dark:peer-focus:ring-red-400', 'dark:peer-focus:ring-red-500', 'dark:peer-focus:ring-red-600', 'dark:peer-focus:ring-red-700', 'dark:peer-focus:ring-red-800', 'dark:peer-focus:ring-red-900'],
    cinder: ['peer-focus:ring-cinder-50', 'peer-focus:ring-cinder-100', 'peer-focus:ring-cinder-200', 'peer-focus:ring-cinder-300', 'peer-focus:ring-cinder-400', 'peer-focus:ring-cinder-500', 'peer-focus:ring-cinder-600', 'peer-focus:ring-cinder-700', 'peer-focus:ring-cinder-800', 'peer-focus:ring-cinder-900'],
    darkCinder: ['dark:peer-focus:ring-cinder-50', 'dark:peer-focus:ring-cinder-100', 'dark:peer-focus:ring-cinder-200', 'dark:peer-focus:ring-cinder-300', 'dark:peer-focus:ring-cinder-400', 'dark:peer-focus:ring-cinder-500', 'dark:peer-focus:ring-cinder-600', 'dark:peer-focus:ring-cinder-700', 'dark:peer-focus:ring-cinder-800', 'dark:peer-focus:ring-cinder-900'],
    green: ['peer-focus:ring-green-50', 'peer-focus:ring-green-100', 'peer-focus:ring-green-200', 'peer-focus:ring-green-300', 'peer-focus:ring-green-400', 'peer-focus:ring-green-500', 'peer-focus:ring-green-600', 'peer-focus:ring-green-700', 'peer-focus:ring-green-800', 'peer-focus:ring-green-900'],
    darkGreen: ['dark:peer-focus:ring-green-50', 'dark:peer-focus:ring-green-100', 'dark:peer-focus:ring-green-200', 'dark:peer-focus:ring-green-300', 'dark:peer-focus:ring-green-400', 'dark:peer-focus:ring-green-500', 'dark:peer-focus:ring-green-600', 'dark:peer-focus:ring-green-700', 'dark:peer-focus:ring-green-800', 'dark:peer-focus:ring-green-900'],
    blue: ['peer-focus:ring-blue-50', 'peer-focus:ring-blue-100', 'peer-focus:ring-blue-200', 'peer-focus:ring-blue-300', 'peer-focus:ring-blue-400', 'peer-focus:ring-blue-500', 'peer-focus:ring-blue-600', 'peer-focus:ring-blue-700', 'peer-focus:ring-blue-800', 'peer-focus:ring-blue-900'],
    darkBlue: ['dark:peer-focus:ring-blue-50', 'dark:peer-focus:ring-blue-100', 'dark:peer-focus:ring-blue-200', 'dark:peer-focus:ring-blue-300', 'dark:peer-focus:ring-blue-400', 'dark:peer-focus:ring-blue-500', 'dark:peer-focus:ring-blue-600', 'dark:peer-focus:ring-blue-700', 'dark:peer-focus:ring-blue-800', 'dark:peer-focus:ring-blue-900'],
    indigo: ['peer-focus:ring-indigo-50', 'peer-focus:ring-indigo-100', 'peer-focus:ring-indigo-200', 'peer-focus:ring-indigo-300', 'peer-focus:ring-indigo-400', 'peer-focus:ring-indigo-500', 'peer-focus:ring-indigo-600', 'peer-focus:ring-indigo-700', 'peer-focus:ring-indigo-800', 'peer-focus:ring-indigo-900'],
    darkIndigo: ['dark:peer-focus:ring-indigo-50', 'dark:peer-focus:ring-indigo-100', 'dark:peer-focus:ring-indigo-200', 'dark:peer-focus:ring-indigo-300', 'dark:peer-focus:ring-indigo-400', 'dark:peer-focus:ring-indigo-500', 'dark:peer-focus:ring-indigo-600', 'dark:peer-focus:ring-indigo-700', 'dark:peer-focus:ring-indigo-800', 'dark:peer-focus:ring-indigo-900'],
    purple: ['peer-focus:ring-purple-50', 'peer-focus:ring-purple-100', 'peer-focus:ring-purple-200', 'peer-focus:ring-purple-300', 'peer-focus:ring-purple-400', 'peer-focus:ring-purple-500', 'peer-focus:ring-purple-600', 'peer-focus:ring-purple-700', 'peer-focus:ring-purple-800', 'peer-focus:ring-purple-900'],
    darkPurple: ['dark:peer-focus:ring-purple-50', 'dark:peer-focus:ring-purple-100', 'dark:peer-focus:ring-purple-200', 'dark:peer-focus:ring-purple-300', 'dark:peer-focus:ring-purple-400', 'dark:peer-focus:ring-purple-500', 'dark:peer-focus:ring-purple-600', 'dark:peer-focus:ring-purple-700', 'dark:peer-focus:ring-purple-800', 'dark:peer-focus:ring-purple-900'],
    pink: ['peer-focus:ring-pink-50', 'peer-focus:ring-pink-100', 'peer-focus:ring-pink-200', 'peer-focus:ring-pink-300', 'peer-focus:ring-pink-400', 'peer-focus:ring-pink-500', 'peer-focus:ring-pink-600', 'peer-focus:ring-pink-700', 'peer-focus:ring-pink-800', 'peer-focus:ring-pink-900'],
    darkPink: ['dark:peer-focus:ring-pink-50', 'dark:peer-focus:ring-pink-100', 'dark:peer-focus:ring-pink-200', 'dark:peer-focus:ring-pink-300', 'dark:peer-focus:ring-pink-400', 'dark:peer-focus:ring-pink-500', 'dark:peer-focus:ring-pink-600', 'dark:peer-focus:ring-pink-700', 'dark:peer-focus:ring-pink-800', 'dark:peer-focus:ring-pink-900'],
    eggplant: ['peer-focus:ring-eggplant-50', 'peer-focus:ring-eggplant-100', 'peer-focus:ring-eggplant-200', 'peer-focus:ring-eggplant-300', 'peer-focus:ring-eggplant-400', 'peer-focus:ring-eggplant-500', 'peer-focus:ring-eggplant-600', 'peer-focus:ring-eggplant-700', 'peer-focus:ring-eggplant-800', 'peer-focus:ring-eggplant-900'],
    darkEggplant: ['dark:peer-focus:ring-eggplant-50', 'dark:peer-focus:ring-eggplant-100', 'dark:peer-focus:ring-eggplant-200', 'dark:peer-focus:ring-eggplant-300', 'dark:peer-focus:ring-eggplant-400', 'dark:peer-focus:ring-eggplant-500', 'dark:peer-focus:ring-eggplant-600', 'dark:peer-focus:ring-eggplant-700', 'dark:peer-focus:ring-eggplant-800', 'dark:peer-focus:ring-eggplant-900'],
    slate: ['peer-focus:ring-slate-50', 'peer-focus:ring-slate-100', 'peer-focus:ring-slate-200', 'peer-focus:ring-slate-300', 'peer-focus:ring-slate-400', 'peer-focus:ring-slate-500', 'peer-focus:ring-slate-600', 'peer-focus:ring-slate-700', 'peer-focus:ring-slate-800', 'peer-focus:ring-slate-900'],
    darkSlate: ['dark:peer-focus:ring-slate-50', 'dark:peer-focus:ring-slate-100', 'dark:peer-focus:ring-slate-200', 'dark:peer-focus:ring-slate-300', 'dark:peer-focus:ring-slate-400', 'dark:peer-focus:ring-slate-500', 'dark:peer-focus:ring-slate-600', 'dark:peer-focus:ring-slate-700', 'dark:peer-focus:ring-slate-800', 'dark:peer-focus:ring-slate-900'],
    white: ['peer-focus:ring-white-50', 'peer-focus:ring-white-100', 'peer-focus:ring-white-200', 'peer-focus:ring-white-300', 'peer-focus:ring-white-400', 'peer-focus:ring-white-500', 'peer-focus:ring-white-600', 'peer-focus:ring-white-700', 'peer-focus:ring-white-800', 'peer-focus:ring-white-900'],
    darkWhite: ['dark:peer-focus:ring-white-50', 'dark:peer-focus:ring-white-100', 'dark:peer-focus:ring-white-200', 'dark:peer-focus:ring-white-300', 'dark:peer-focus:ring-white-400', 'dark:peer-focus:ring-white-500', 'dark:peer-focus:ring-white-600', 'dark:peer-focus:ring-white-700', 'dark:peer-focus:ring-white-800', 'dark:peer-focus:ring-white-900'],
  };

  const ringSizeOptions: Record<RingSizes, string> = {
    '0': 'peer-focus:ring-0',
    '1': 'peer-focus:ring-1',
    '2': 'peer-focus:ring-2',
    '3': 'peer-focus:ring-3',
    '4': 'peer-focus:ring-4',
    '8': 'peer-focus:ring-8',
    inset: 'peer-focus:ring-inset',
  }

  const borderOptions = {
    gray: ['after:border-gray-50', 'after:border-gray-100', 'after:border-gray-200', 'after:border-gray-300', 'after:border-gray-400', 'after:border-gray-500', 'after:border-gray-600', 'after:border-gray-700', 'after:border-gray-800', 'after:border-gray-900'],
    red: ['after:border-red-50', 'after:border-red-100', 'after:border-red-200', 'after:border-red-300', 'after:border-red-400', 'after:border-red-500', 'after:border-red-600', 'after:border-red-700', 'after:border-red-800', 'after:border-red-900'],
    cinder: ['after:border-cinder-50', 'after:border-cinder-100', 'after:border-cinder-200', 'after:border-cinder-300', 'after:border-cinder-400', 'after:border-cinder-500', 'after:border-cinder-600', 'after:border-cinder-700', 'after:border-cinder-800', 'after:border-cinder-900'],
    green: ['after:border-green-50', 'after:border-green-100', 'after:border-green-200', 'after:border-green-300', 'after:border-green-400', 'after:border-green-500', 'after:border-green-600', 'after:border-green-700', 'after:border-green-800', 'after:border-green-900'],
    blue: ['after:border-blue-50', 'after:border-blue-100', 'after:border-blue-200', 'after:border-blue-300', 'after:border-blue-400', 'after:border-blue-500', 'after:border-blue-600', 'after:border-blue-700', 'after:border-blue-800', 'after:border-blue-900'],
    indigo: ['after:border-indigo-50', 'after:border-indigo-100', 'after:border-indigo-200', 'after:border-indigo-300', 'after:border-indigo-400', 'after:border-indigo-500', 'after:border-indigo-600', 'after:border-indigo-700', 'after:border-indigo-800', 'after:border-indigo-900'],
    purple: ['after:border-purple-50', 'after:border-purple-100', 'after:border-purple-200', 'after:border-purple-300', 'after:border-purple-400', 'after:border-purple-500', 'after:border-purple-600', 'after:border-purple-700', 'after:border-purple-800', 'after:border-purple-900'],
    pink: ['after:border-pink-50', 'after:border-pink-100', 'after:border-pink-200', 'after:border-pink-300', 'after:border-pink-400', 'after:border-pink-500', 'after:border-pink-600', 'after:border-pink-700', 'after:border-pink-800', 'after:border-pink-900'],
    eggplant: ['after:border-eggplant-50', 'after:border-eggplant-100', 'after:border-eggplant-200', 'after:border-eggplant-300', 'after:border-eggplant-400', 'after:border-eggplant-500', 'after:border-eggplant-600', 'after:border-eggplant-700', 'after:border-eggplant-800', 'after:border-eggplant-900'],
    slate: ['after:border-slate-50', 'after:border-slate-100', 'after:border-slate-200', 'after:border-slate-300', 'after:border-slate-400', 'after:border-slate-500', 'after:border-slate-600', 'after:border-slate-700', 'after:border-slate-800', 'after:border-slate-900'],
    white: ['after:border-white-50', 'after:border-white-100', 'after:border-white-200', 'after:border-white-300', 'after:border-white-400', 'after:border-white-500', 'after:border-white-600', 'after:border-white-700', 'after:border-white-800', 'after:border-white-900'],
    darkGray: ['dark:border-white-50', 'dark:border-white-100', 'dark:border-white-200', 'dark:border-white-300', 'dark:border-white-400', 'dark:border-white-500', 'dark:border-white-600', 'dark:border-white-700', 'dark:border-white-800', 'dark:border-white-900'],
    darkRed: ['dark:border-red-50', 'dark:border-red-100', 'dark:border-red-200', 'dark:border-red-300', 'dark:border-red-400', 'dark:border-red-500', 'dark:border-red-600', 'dark:border-red-700', 'dark:border-red-800', 'dark:border-red-900'],
    darkCinder: ['dark:border-cinder-50', 'dark:border-cinder-100', 'dark:border-cinder-200', 'dark:border-cinder-300', 'dark:border-cinder-400', 'dark:border-cinder-500', 'dark:border-cinder-600', 'dark:border-cinder-700', 'dark:border-cinder-800', 'dark:border-cinder-900'],
    darkGreen: ['dark:border-green-50', 'dark:border-green-100', 'dark:border-green-200', 'dark:border-green-300', 'dark:border-green-400', 'dark:border-green-500', 'dark:border-green-600', 'dark:border-green-700', 'dark:border-green-800', 'dark:border-green-900'],
    darkBlue: ['dark:border-blue-50', 'dark:border-blue-100', 'dark:border-blue-200', 'dark:border-blue-300', 'dark:border-blue-400', 'dark:border-blue-500', 'dark:border-blue-600', 'dark:border-blue-700', 'dark:border-blue-800', 'dark:border-blue-900'],
    darkIndigo: ['dark:border-indigo-50', 'dark:border-indigo-100', 'dark:border-indigo-200', 'dark:border-indigo-300', 'dark:border-indigo-400', 'dark:border-indigo-500', 'dark:border-indigo-600', 'dark:border-indigo-700', 'dark:border-indigo-800', 'dark:border-indigo-900'],
    darkPurple: ['dark:border-purple-50', 'dark:border-purple-100', 'dark:border-purple-200', 'dark:border-purple-300', 'dark:border-purple-400', 'dark:border-purple-500', 'dark:border-purple-600', 'dark:border-purple-700', 'dark:border-purple-800', 'dark:border-purple-900'],
    darkPink: ['dark:border-pink-50', 'dark:border-pink-100', 'dark:border-pink-200', 'dark:border-pink-300', 'dark:border-pink-400', 'dark:border-pink-500', 'dark:border-pink-600', 'dark:border-pink-700', 'dark:border-pink-800', 'dark:border-pink-900'],
    darkEggplant: ['dark:border-eggplant-50', 'dark:border-eggplant-100', 'dark:border-eggplant-200', 'dark:border-eggplant-300', 'dark:border-eggplant-400', 'dark:border-eggplant-500', 'dark:border-eggplant-600', 'dark:border-eggplant-700', 'dark:border-eggplant-800', 'dark:border-eggplant-900'],
    darkSlate: ['dark:border-slate-50', 'dark:border-slate-100', 'dark:border-slate-200', 'dark:border-slate-300', 'dark:border-slate-400', 'dark:border-slate-500', 'dark:border-slate-600', 'dark:border-slate-700', 'dark:border-slate-800', 'dark:border-slate-900'],
    darkWhite: ['dark:border-white-50', 'dark:border-white-100', 'dark:border-white-200', 'dark:border-white-300', 'dark:border-white-400', 'dark:border-white-500', 'dark:border-white-600', 'dark:border-white-700', 'dark:border-white-800', 'dark:border-white-900'],
    darkAfterGray: ['dark:after:border-gray-50', 'dark:after:border-gray-100', 'dark:after:border-gray-200', 'dark:after:border-gray-300', 'dark:after:border-gray-400', 'dark:after:border-gray-500', 'dark:after:border-gray-600', 'dark:after:border-gray-700', 'dark:after:border-gray-800', 'dark:after:border-gray-900'],
    darkAfterRed: ['dark:after:border-red-50', 'dark:after:border-red-100', 'dark:after:border-red-200', 'dark:after:border-red-300', 'dark:after:border-red-400', 'dark:after:border-red-500', 'dark:after:border-red-600', 'dark:after:border-red-700', 'dark:after:border-red-800', 'dark:after:border-red-900'],
    darkAfterCinder: ['dark:after:border-cinder-50', 'dark:after:border-cinder-100', 'dark:after:border-cinder-200', 'dark:after:border-cinder-300', 'dark:after:border-cinder-400', 'dark:after:border-cinder-500', 'dark:after:border-cinder-600', 'dark:after:border-cinder-700', 'dark:after:border-cinder-800', 'dark:after:border-cinder-900'],
    darkAfterGreen: ['dark:after:border-green-50', 'dark:after:border-green-100', 'dark:after:border-green-200', 'dark:after:border-green-300', 'dark:after:border-green-400', 'dark:after:border-green-500', 'dark:after:border-green-600', 'dark:after:border-green-700', 'dark:after:border-green-800', 'dark:after:border-green-900'],
    darkAfterBlue: ['dark:after:border-blue-50', 'dark:after:border-blue-100', 'dark:after:border-blue-200', 'dark:after:border-blue-300', 'dark:after:border-blue-400', 'dark:after:border-blue-500', 'dark:after:border-blue-600', 'dark:after:border-blue-700', 'dark:after:border-blue-800', 'dark:after:border-blue-900'],
    darkAfterIndigo: ['dark:after:border-indigo-50', 'dark:after:border-indigo-100', 'dark:after:border-indigo-200', 'dark:after:border-indigo-300', 'dark:after:border-indigo-400', 'dark:after:border-indigo-500', 'dark:after:border-indigo-600', 'dark:after:border-indigo-700', 'dark:after:border-indigo-800', 'dark:after:border-indigo-900'],
    darkAfterPurple: ['dark:after:border-purple-50', 'dark:after:border-purple-100', 'dark:after:border-purple-200', 'dark:after:border-purple-300', 'dark:after:border-purple-400', 'dark:after:border-purple-500', 'dark:after:border-purple-600', 'dark:after:border-purple-700', 'dark:after:border-purple-800', 'dark:after:border-purple-900'],
    darkAfterPink: ['dark:after:border-pink-50', 'dark:after:border-pink-100', 'dark:after:border-pink-200', 'dark:after:border-pink-300', 'dark:after:border-pink-400', 'dark:after:border-pink-500', 'dark:after:border-pink-600', 'dark:after:border-pink-700', 'dark:after:border-pink-800', 'dark:after:border-pink-900'],
    darkAfterEggplant: ['dark:after:border-eggplant-50', 'dark:after:border-eggplant-100', 'dark:after:border-eggplant-200', 'dark:after:border-eggplant-300', 'dark:after:border-eggplant-400', 'dark:after:border-eggplant-500', 'dark:after:border-eggplant-600', 'dark:after:border-eggplant-700', 'dark:after:border-eggplant-800', 'dark:after:border-eggplant-900'],
    darkAfterSlate: ['dark:after:border-slate-50', 'dark:after:border-slate-100', 'dark:after:border-slate-200', 'dark:after:border-slate-300', 'dark:after:border-slate-400', 'dark:after:border-slate-500', 'dark:after:border-slate-600', 'dark:after:border-slate-700', 'dark:after:border-slate-800', 'dark:after:border-slate-900'],
    darkAfterWhite: ['dark:after:border-white-50', 'dark:after:border-white-100', 'dark:after:border-white-200', 'dark:after:border-white-300', 'dark:after:border-white-400', 'dark:after:border-white-500', 'dark:after:border-white-600', 'dark:after:border-white-700', 'dark:after:border-white-800', 'dark:after:border-white-900'],
  };

  const textOptions = {
    gray: ['text-gray-50', 'text-gray-100', 'text-gray-200', 'text-gray-300', 'text-gray-400', 'text-gray-500', 'text-gray-600', 'text-gray-700', 'text-gray-800', 'text-gray-900'],
    red: ['text-red-50', 'text-red-100', 'text-red-200', 'text-red-300', 'text-red-400', 'text-red-500', 'text-red-600', 'text-red-700', 'text-red-800', 'text-red-900'],
    cinder: ['text-cinder-50', 'text-cinder-100', 'text-cinder-200', 'text-cinder-300', 'text-cinder-400', 'text-cinder-500', 'text-cinder-600', 'text-cinder-700', 'text-cinder-800', 'text-cinder-900'],
    green: ['text-green-50', 'text-green-100', 'text-green-200', 'text-green-300', 'text-green-400', 'text-green-500', 'text-green-600', 'text-green-700', 'text-green-800', 'text-green-900'],
    blue: ['text-blue-50', 'text-blue-100', 'text-blue-200', 'text-blue-300', 'text-blue-400', 'text-blue-500', 'text-blue-600', 'text-blue-700', 'text-blue-800', 'text-blue-900'],
    indigo: ['text-indigo-50', 'text-indigo-100', 'text-indigo-200', 'text-indigo-300', 'text-indigo-400', 'text-indigo-500', 'text-indigo-600', 'text-indigo-700', 'text-indigo-800', 'text-indigo-900'],
    purple: ['text-purple-50', 'text-purple-100', 'text-purple-200', 'text-purple-300', 'text-purple-400', 'text-purple-500', 'text-purple-600', 'text-purple-700', 'text-purple-800', 'text-purple-900'],
    pink: ['text-pink-50', 'text-pink-100', 'text-pink-200', 'text-pink-300', 'text-pink-400', 'text-pink-500', 'text-pink-600', 'text-pink-700', 'text-pink-800', 'text-pink-900'],
    eggplant: ['text-eggplant-50', 'text-eggplant-100', 'text-eggplant-200', 'text-eggplant-300', 'text-eggplant-400', 'text-eggplant-500', 'text-eggplant-600', 'text-eggplant-700', 'text-eggplant-800', 'text-eggplant-900'],
    slate: ['text-slate-50', 'text-slate-100', 'text-slate-200', 'text-slate-300', 'text-slate-400', 'text-slate-500', 'text-slate-600', 'text-slate-700', 'text-slate-800', 'text-slate-900'],
    white: ['text-white-50', 'text-white-100', 'text-white-200', 'text-white-300', 'text-white-400', 'text-white-500', 'text-white-600', 'text-white-700', 'text-white-800', 'text-white-900'],
    darkGray: ['dark:text-gray-50', 'dark:text-gray-100', 'dark:text-gray-200', 'dark:text-gray-300', 'dark:text-gray-400', 'dark:text-gray-500', 'dark:text-gray-600', 'dark:text-gray-700', 'dark:text-gray-800', 'dark:text-gray-900'],
    darkRed: ['dark:text-red-50', 'dark:text-red-100', 'dark:text-red-200', 'dark:text-red-300', 'dark:text-red-400', 'dark:text-red-500', 'dark:text-red-600', 'dark:text-red-700', 'dark:text-red-800', 'dark:text-red-900'],
    darkCinder: ['dark:text-cinder-50', 'dark:text-cinder-100', 'dark:text-cinder-200', 'dark:text-cinder-300', 'dark:text-cinder-400', 'dark:text-cinder-500', 'dark:text-cinder-600', 'dark:text-cinder-700', 'dark:text-cinder-800', 'dark:text-cinder-900'],
    darkGreen: ['dark:text-green-50', 'dark:text-green-100', 'dark:text-green-200', 'dark:text-green-300', 'dark:text-green-400', 'dark:text-green-500', 'dark:text-green-600', 'dark:text-green-700', 'dark:text-green-800', 'dark:text-green-900'],
    darkBlue: ['dark:text-blue-50', 'dark:text-blue-100', 'dark:text-blue-200', 'dark:text-blue-300', 'dark:text-blue-400', 'dark:text-blue-500', 'dark:text-blue-600', 'dark:text-blue-700', 'dark:text-blue-800', 'dark:text-blue-900'],
    darkIndigo: ['dark:text-indigo-50', 'dark:text-indigo-100', 'dark:text-indigo-200', 'dark:text-indigo-300', 'dark:text-indigo-400', 'dark:text-indigo-500', 'dark:text-indigo-600', 'dark:text-indigo-700', 'dark:text-indigo-800', 'dark:text-indigo-900'],
    darkPurple: ['dark:text-purple-50', 'dark:text-purple-100', 'dark:text-purple-200', 'dark:text-purple-300', 'dark:text-purple-400', 'dark:text-purple-500', 'dark:text-purple-600', 'dark:text-purple-700', 'dark:text-purple-800', 'dark:text-purple-900'],
    darkPink: ['dark:text-pink-50', 'dark:text-pink-100', 'dark:text-pink-200', 'dark:text-pink-300', 'dark:text-pink-400', 'dark:text-pink-500', 'dark:text-pink-600', 'dark:text-pink-700', 'dark:text-pink-800', 'dark:text-pink-900'],
    darkEggplant: ['dark:text-eggplant-50', 'dark:text-eggplant-100', 'dark:text-eggplant-200', 'dark:text-eggplant-300', 'dark:text-eggplant-400', 'dark:text-eggplant-500', 'dark:text-eggplant-600', 'dark:text-eggplant-700', 'dark:text-eggplant-800', 'dark:text-eggplant-900'],
    darkSlate: ['dark:text-slate-50', 'dark:text-slate-100', 'dark:text-slate-200', 'dark:text-slate-300', 'dark:text-slate-400', 'dark:text-slate-500', 'dark:text-slate-600', 'dark:text-slate-700', 'dark:text-slate-800', 'dark:text-slate-900'],
    darkWhite: ['dark:text-white-50', 'dark:text-white-100', 'dark:text-white-200', 'dark:text-white-300', 'dark:text-white-400', 'dark:text-white-500', 'dark:text-white-600', 'dark:text-white-700', 'dark:text-white-800', 'dark:text-white-900'],
  };

  const mapIntensity = (intensity: Intensity) => {
    if (intensity === '50') return 0;
    return Number(intensity[0])
  }

  const capitalize = <Text extends string | undefined = undefined>(text?: Text) => {
    if (!text) return undefined as Text extends undefined ? undefined : never;
    return text.charAt(0).toUpperCase() + text.slice(1) as Text extends string ? Capitalize<Text> : never;
  }

  return (
    <Motion.label class={`relative inline-flex items-center cursor-pointer ${o.containerClassList ? o.containerClassList : ''}`}>
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
        ${bgOptions[o.bgColor ?? 'gray'][mapIntensity(o.bgIntensity ?? '200')]}
        ${bgOptions[`dark${capitalize(o.darkBgColor ?? 'Gray')}`][mapIntensity(o.darkBgIntensity ?? '700')]}
        peer ${ringSizeOptions[o.ringSize ?? '4']} ${ringOptions[o.ringColor ?? 'blue'][mapIntensity(o.ringIntensity ?? '300')]}
        ${ringOptions[`dark${capitalize(o.darkRingColor ?? 'Blue')}`][mapIntensity(o.darkRingIntensity ?? '800')]}
        peer-checked:after:translate-x-full
        peer-checked:after:border-cinder-700 after:content-['']
        after:absolute after:top-0.5 after:left-[2px]
        ${bgOptions[`after${capitalize(o.dotColor ?? 'White')}`][mapIntensity(o.dotIntensity ?? '800')]}
        ${borderOptions[o.dotBorderColor ?? 'gray'][mapIntensity(o.dotBorderIntensity ?? '300')]}
        ${borderOptions[`darkAfter${capitalize(o.darkDotBorderColor ?? 'Gray')}`][mapIntensity(o.darkDotBorderIntensity ?? '300')]}
        after:border after:rounded-full after:h-5 after:w-5 after:transition-all
        ${borderOptions[`dark${capitalize(o.darkBorderColor ?? 'Gray')}`][mapIntensity(o.darkBorderIntensities ?? '600')]}
        ${o.classList ? o.classList : ""}`}
      />
      <span class={`
        ml-3 text-sm font-medium
        ${textOptions[o.labelTextColor ?? 'gray'][mapIntensity(o.labelTextIntensity ?? '900')]}
        ${textOptions[`dark${capitalize(o.labelDarkTextColor ?? 'Gray')}`][mapIntensity(o.labelDarkTextIntensity ?? '300')]}
        ${o.labelClassList ? o.labelClassList : ''}
      `}>{r.label}</span>
    </Motion.label>
  )
}
