import React, { useEffect, useState } from 'react'

import { InputProps } from '@components'
import { classNames } from '@helpers'

import { v4 as uuid } from 'uuid'

export const Input: React.FC<InputProps> = ({
  id = uuid(),
  label,
  name,
  value = '',
  isDisabled = false,
  helpText,
  placeholder,
  className = '',
  isError = false,
  isRequired = false,
  type = 'text',
  onChange,
  addonBefore: AddonBefore,
  addonAfter: AddonAfter,
  ...props
}) => {
  const [_value, setValue] = useState<string>(value)

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: _value } = e.target
    setValue(_value)
    if (onChange) {
      onChange(_value)
    }
  }

  let addonClassName: string
  let inputClassName: string
  let iconClassName: string

  switch (typeof AddonBefore) {
    case 'undefined':
      addonClassName = ''
      break
    case 'string':
      addonClassName = 'pl-16 sm:pl-14'
      break
    default:
      addonClassName = 'pl-10'
  }

  switch (typeof AddonAfter) {
    case 'undefined':
      addonClassName = classNames(addonClassName, '')
      break
    case 'string':
      addonClassName = classNames(addonClassName, 'pr-16 sm:pr-14')
      break
    default:
      addonClassName = classNames(addonClassName, 'pr-10')
  }

  if (isError) {
    inputClassName = 'border-red-500 focus:border-red-500 focus:ring-red-500'
    iconClassName = 'text-red-500'
  } else {
    inputClassName = 'border-slate-300 focus:border-teal-500 focus:ring-teal-500'
    iconClassName = 'text-slate-400'
  }

  useEffect(() => {
    if (value !== _value) {
      setValue(value)
    }
  }, [value])

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative mt-1 rounded-md shadow-sm">
        {AddonBefore !== undefined &&
          (typeof AddonBefore === 'string' ? (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-slate-500 sm:text-sm">{AddonBefore}</span>
            </div>
          ) : (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <AddonBefore className={classNames('h-5 w-5', iconClassName)} aria-hidden="true" />
            </div>
          ))}
        <input
          id={id}
          name={name}
          type={type}
          value={_value}
          placeholder={placeholder}
          disabled={isDisabled}
          required={isRequired}
          onChange={_onChange}
          className={classNames(
            'block w-full rounded-md shadow-sm placeholder-slate-400 sm:text-sm',
            className,
            inputClassName,
            addonClassName,
          )}
          {...props}
        />
        {AddonAfter !== undefined &&
          (typeof AddonAfter === 'string' ? (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-slate-500 sm:text-sm">{AddonAfter}</span>
            </div>
          ) : (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <AddonAfter className={classNames('h-5 w-5', iconClassName)} aria-hidden="true" />
            </div>
          ))}
      </div>
      {helpText && (
        <p className="mt-2 text-sm text-slate-500" id={`${id}-description`}>
          {helpText}
        </p>
      )}
    </div>
  )
}
