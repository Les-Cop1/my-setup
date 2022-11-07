import React, { Fragment, useEffect, useState } from 'react'

import { SelectOption, SelectOptionProps, SelectProps } from '@components'
import { Listbox, Transition } from '@headlessui/react'
import { classNames } from '@helpers'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { v4 as uuid } from 'uuid'

export const Select: React.FC<SelectProps> = ({
  id = uuid(),
  name,
  label,
  placeholder,
  value,
  onChange,
  options,
  isDisabled = false,
  isError = false,
  multiple = false,
  className = '',
  ...props
}) => {
  const [selected, setSelected] = useState<SelectOptionProps | SelectOptionProps[] | undefined>(
    value || multiple ? [] : undefined,
  )

  const _onChange = (newValue: SelectOptionProps) => {
    setSelected(newValue)
    onChange?.(newValue)
  }

  useEffect(() => {
    if (value !== selected) {
      setSelected(value)
    }
  }, [value])

  return (
    <Listbox value={selected} onChange={_onChange} multiple={multiple} by="id" name={name} disabled={isDisabled}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="block text-sm font-medium text-slate-700" htmlFor={id}>
              {label}
            </Listbox.Label>
          )}
          <div className="relative mt-1">
            <Listbox.Button
              className={classNames(
                className,
                'relative w-full cursor-default rounded-md border border-slate-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 sm:text-sm',
                isError ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-teal-500 focus:ring-teal-500',
              )}
              {...props}
            >
              <span className="block truncate">
                {(Array.isArray(selected) ? selected.map((item) => item.text).join(', ') : selected?.text) ||
                  placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options?.map((option) => (
                  <SelectOption key={option.id} {...option} />
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
