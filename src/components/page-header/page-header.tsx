import React, { Fragment } from 'react'

import { Button, ButtonSize, ButtonVariant, PageHeaderProps } from '@components'
import { Menu, Transition } from '@headlessui/react'
import { classNames } from '@helpers'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { PageHeaderMeta } from './components'

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  actions,
  meta,
  moreText = 'More',
  backgroundColor = 'white',
  className = '',
  ...props
}) => {
  let backgroundColorClassName: string
  let titleClassName: string
  switch (backgroundColor) {
    case 'dark':
      backgroundColorClassName = 'bg-zinc-800'
      titleClassName = 'text-white'
      break
    case 'light':
      backgroundColorClassName = 'bg-zinc-50'
      titleClassName = 'text-slate-900'
      break
    case 'white':
    default:
      backgroundColorClassName = 'bg-white'
      titleClassName = 'text-slate-900'
      break
  }

  return (
    <div
      className={classNames(
        className,
        'p-4 sm:p-8 lg:flex lg:items-center lg:justify-between max-w-7xl mx-auto',
        backgroundColorClassName,
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">
        <h2
          className={classNames(
            'text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight',
            titleClassName,
          )}
        >
          {title}
        </h2>
        {meta && (
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 text-slate-500">
            {meta.map((item) => (
              <PageHeaderMeta key={item.label} backgroundColor={backgroundColor} {...item} />
            ))}
          </div>
        )}
      </div>
      {actions && (
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          {actions.slice(1, actions.length)?.map((action, index) => {
            let className = 'mr-2 lg:mr-0'
            if (actions?.length > 2) {
              className = 'hidden sm:block'
              if (index > 0) {
                className = classNames(className, 'ml-3 mr-3')
              }
            }
            return (
              <span key={index} className={className}>
                <Button {...action} size={ButtonSize.SMALL} />
              </span>
            )
          })}
          {actions.length > 0 && (
            <span className="sm:ml-3">
              <Button {...actions[0]} size={ButtonSize.SMALL} variant={ButtonVariant.PRIMARY} />
            </span>
          )}
          {actions.length > 2 && (
            <Menu as="div" className="relative ml-3 sm:hidden">
              <Menu.Button className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                {moreText}
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-slate-500" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {actions.slice(1, actions.length)?.map((action, index) => {
                    return (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <a
                            {...action}
                            className={classNames(
                              active ? 'bg-slate-100' : '',
                              'block px-4 py-2 text-sm text-slate-700',
                            )}
                          >
                            {action?.label}
                          </a>
                        )}
                      </Menu.Item>
                    )
                  })}
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      )}
    </div>
  )
}
