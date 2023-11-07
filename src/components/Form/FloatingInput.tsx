import { splitProps } from "solid-js";

export interface FloatingInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value?: string | number | string[];
  oninput?: (event: InputEvent & { currentTarget: HTMLInputElement; target: HTMLInputElement; }) => void;
  isInGroup?: boolean;
  classList?: string,
  disabled?: boolean
}

export default function FloatingInput(props: FloatingInputProps) {
  // R is required props, O is optional props
  const [r, o] = splitProps(props, ['label', 'id']);

  return (
    <div class={(o.isInGroup) ? "relative" : "relative mb-3"}>
      <input
        type={o.type ?? 'text'}
        class={`${o.classList ? o.classList : ""} focus:shadow-eggplant-400/30 focus:border-eggplant-400/70`}
        id={r.id}
        placeholder={o.placeholder ?? r.label}
        value={o.value ?? ''}
        onInput={(e) => { if (o.oninput) o.oninput(e) }}
        disabled={o.disabled}
      />
      <label for={r.id} class="floating-label" >
        {r.label}
      </label>
    </div>
  )
}
