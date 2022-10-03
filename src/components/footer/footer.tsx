import React from 'react'

import { classNames } from '@helpers'

import { FooterItem } from './components'
import { FooterProps } from './footer.props'

export const Footer: React.FC<FooterProps> = ({ backgroundColor = 'light', navigation, content, ...props }) => {
  const textClass = 'text-gray-400'
  let bgClass,
    textLinkClass = ''
  switch (backgroundColor) {
    case 'dark':
      bgClass = 'bg-zinc-900'
      textLinkClass = 'text-gray-300 hover:text-white'
      break
    case 'white':
      bgClass = 'bg-white'
      textLinkClass = 'text-gray-500 hover:text-gray-900'
      break
    case 'light':
    default:
      bgClass = 'bg-zinc-50'
      textLinkClass = 'text-gray-500 hover:text-gray-900'
  }

  return (
    <footer className={bgClass} {...props}>
      <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        {navigation && (
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            {navigation.map((item) => (
              <FooterItem key={item.label} {...item} className={item.className ? item.className : textLinkClass} />
            ))}
          </nav>
        )}
        <p className={classNames('text-center text-base', textClass, navigation ? 'mt-8' : '')}>{content}</p>
      </div>
    </footer>
  )
}
