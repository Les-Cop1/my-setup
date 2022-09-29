import React from 'react'

import illustration from '@assets/images/not_found.svg'

import { useTranslation } from 'react-i18next'

export const NotFound: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="w-full flex flex-col items-center justify-center px-10 gap-6">
      <img className="max-h-96" src={illustration} alt="page not found illustration" />
      <h1>{t('this_page_doesnt_exist')}</h1>
    </div>
  )
}
