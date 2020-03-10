import React from 'react'
import useTranslation from 'next-translate/useTranslation'

import Header from './Header'
import PackItem from './PackItem'

const PackContent = () => {
  const { t } = useTranslation()

  const items = [
    t('common:pack.skis'),
    t('common:pack.shoes'),
    t('common:pack.helmet'),
    t('common:pack.insurance'),
    t('common:pack.skipass')
  ]

  return (
    <div className="bg-white w-full">
      <Header>{t('common:pack.content')}:</Header>
      <ul className="text-gray-600 pt-4">
        {
          items.map(item => (
            <PackItem item={item} key={item} />
          ))
        }
      </ul>
    </div>
  )
}

export default PackContent;