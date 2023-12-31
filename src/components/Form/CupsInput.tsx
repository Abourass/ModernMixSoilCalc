import { splitProps } from 'solid-js';
import { FloatingInputProps } from './FloatingInput.js';
import SuffixedInput from './SuffixedInput.jsx';
import toCase from '~/modules/recase.js';

type CupsInputProps = Pick<FloatingInputProps, 'label' | 'value' | 'oninput'> & {
  id?: string, inputClassList?: string, containerClassList?: string, disabled?: boolean
}

export default function CupsInput(props: CupsInputProps) {
  // R is required props, O is optional props
  const [r, o] = splitProps(props, ['label']);

  return (
    <SuffixedInput
      id={o.id ?? (r.label.includes(' ') ? toCase(r.label) : r.label)}
      label={r.label}
      type="number"
      suffix="Cups"
      value={o.value}
      oninput={o.oninput}
      inputClassList={o.inputClassList}
      containerClassList={o.containerClassList}
      disabled={o.disabled}
    />
  )
}
