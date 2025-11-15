'use client'

import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  icon?: React.ReactNode
  placeholder?: string
}

export default function Select({ options, value, onChange, icon, placeholder }: SelectProps) {
  const selectedOption = options.find(opt => opt.value === value) || options[0]

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button className="flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-gray-200 hover:border-gray-300 transition-colors text-sm text-gray-700 w-full cursor-pointer">
            {icon && <span className="text-gray-500 flex-shrink-0">{icon}</span>}
            <span className="flex-1 text-left truncate">{selectedOption?.label || placeholder}</span>
            <svg
              className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                open ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
        >
          <Listbox.Options className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded shadow-md overflow-hidden focus:outline-none max-h-60 overflow-y-auto">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active, selected }) =>
                  `cursor-pointer select-none py-1.5 px-3 text-sm transition-colors ${
                    active || selected
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span className={selected ? 'font-medium' : ''}>
                      {option.label}
                    </span>
                    {selected && (
                      <svg
                        className="w-4 h-4 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
        </div>
      )}
    </Listbox>
  )
}

