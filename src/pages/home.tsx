import React from 'react'

import illustration from '@assets/images/presentation.svg'

import { useTranslation } from 'react-i18next'

export const Home: React.FC = () => {
  document.title = 'MySETUP'

  const { t } = useTranslation()

  return (
    <div className="max-w-7xl min-w-fit mx-auto flex flex-col content-center lg:flex-row justify-between p-5 gap-6 items-center">
      <main className="w-full lg:w-1/2 mt-10 mx-auto items-center sm:px-6 lg:px-8">
        <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
          mySETUP
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl  md:mt-5 md:text-xl lg:mx-0">
          {t('My setup presentation')}
        </p>
      </main>
      <img className="w-full lg:w-1/2" src={illustration} alt="chart illustration" />
    </div>
  )
}
