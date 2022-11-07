import React from 'react'

import { SelectOptionProps } from '@components'
import { Listbox } from '@headlessui/react'
import { classNames } from '@helpers'
import { CheckIcon } from '@heroicons/react/20/solid'

export const SelectOption: React.FC<SelectOptionProps> = (props) => {
  return (
    <Listbox.Option
      key={props.id}
      className={({ active }) =>
        classNames(
          active ? 'text-white bg-teal-600' : 'text-slate-900',
          'relative cursor-default select-none py-2 pl-8 pr-4',
        )
      }
      value={props}
      disabled={props.disabled}
    >
      {({ selected, active }) => (
        <>
          <div className="flex items-center">
            {props.image && <img src={props.image} alt="" className="h-6 w-6 flex-shrink-0 rounded-full mr-2" />}
            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'truncate')}>{props.text}</span>
            {props.description && (
              <span className={classNames(active ? 'text-teal-200' : 'text-slate-500', 'ml-2 truncate')}>
                {props.description}
              </span>
            )}
          </div>
          {selected ? (
            <span
              className={classNames(
                active ? 'text-white' : 'text-emerald-600',
                'absolute inset-y-0 left-0 flex items-center pl-1.5',
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  )
}
