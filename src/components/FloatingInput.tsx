import { splitProps } from "solid-js";

export default function FloatingInput(props: Record<string, any>) {
  // R is required props, O is optional props
  const [r, o] = splitProps(props, ['label', 'id']);

  console.info({ o })

  return (
    <div class="relative mb-3">
      <input
        type={o.type ?? 'text'}
        class="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
        id={r.id}
        placeholder={o.placeholder ?? r.label}
        value={o.value ?? ''}
      ></input>
      <label
        for={r.id}
        class="floating-label"
      >
        {r.label}
      </label>
    </div>
  )
}
