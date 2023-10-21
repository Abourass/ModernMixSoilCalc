import { splitProps } from 'solid-js';
import FloatingInput, { FloatingInputProps } from './FloatingInput.jsx';

interface SuffixedInputProps extends FloatingInputProps { suffix: string; inputClassList?: string; containerClassList?: string, disabled?: boolean }

export default function SuffixedInput(props: SuffixedInputProps) {
  // R is required props, O is optional props
  const [r, o] = splitProps(props, ['label', 'id']);

  return (
    <div class={o.containerClassList ? `${o.containerClassList} input-group mb-3` : "input-group mb-3"}>
      <FloatingInput
        type={o.type ?? 'text'}
        id={r.id}
        placeholder={o.placeholder ?? r.label}
        value={o.value ?? ''}
        oninput={o.oninput}
        label={r.label}
        isInGroup={true}
        classList={o.inputClassList ? `${o.inputClassList} focus:rounded-br-sm focus:rounded-tr-sm` : 'focus:rounded-br-sm focus:rounded-tr-sm'}
        disabled={o.disabled}
      />
      <span class="input-group-text">{o.suffix}</span>
    </div>
  )
}
