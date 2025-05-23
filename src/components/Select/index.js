import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function Select({
  options = [],
  value = options?.[0],
  onChange = () => {},
  optionContainerClassName = "",
}) {
  const handleChange = (option) => {
    if (value !== option) {
      onChange(option);
    }
  };

  return (
    <Listbox value={value} onChange={handleChange}>
      <div className="relative sm:max-w-xs">
        <ListboxButton className="relative w-full cursor-default rounded bg-white py-3 pl-3 pr-10 text-left text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:leading-6">
          <span className="ml-3 block truncate">{value.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className={`absolute z-10 mt-1 max-h-56 min-w-full overflow-auto rounded bg-white py-1 text-base text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in ${optionContainerClassName}`}
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option}
              className="group relative cursor-default select-none py-3 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white"
            >
              <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                {option.label}
              </span>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
