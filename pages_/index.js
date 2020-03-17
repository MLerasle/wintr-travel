import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'
import fetch from 'isomorphic-unfetch'

import LayoutCover from '../components/LayoutCover'
import MobileImage from '../components/MobileImage'
import BookingForm from '../components/BookingForm'
import PackContent from '../components/PackContent'

const Index = ({ catalog }) => {
  const { t } = useTranslation()

  return (
    <LayoutCover>
      <Head><title>{t('home:title')}</title></Head>
      <MobileImage />
      <BookingForm catalog={catalog} />
      <PackContent className="md:hidden px-6 md:px-8 pt-2 pb-6" />
    </LayoutCover>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://catalog.wintr.travel/v1/catalog.json')
  const catalog = await response.json()

  return {
    props: {
      catalog
    }
  }
}

export default Index