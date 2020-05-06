import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'

import Layout from '../components/Layout/Layout'

const Terms = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <Head>
        <title>{t('common:label.terms')} - Wintr Travel</title>
      </Head>
      <div className="bg-gray-100 w-full flex justify-center">
        <div className="page px-4 py-10 tracking-wide">
          <h1 className="text-center text-3xl font-bold text-gray-900">Conditions Générales de Vente</h1>
          <h2 className="pt-6 pb-3 text-2xl font-bold text-gray-900">1. Lorem ipsum</h2>
          <p className="py-3 text-gray-600 text-lg">
            Duis vitae pretium dui. Nullam eget nisl diam. Cras dapibus mattis suscipit. In efficitur in enim id vestibulum. Nullam nibh metus, ultricies at ornare vitae, volutpat nec nisi. Duis id est est. Nam lacus ligula, accumsan vestibulum porttitor convallis, fringilla eu nisl. Nulla accumsan erat non efficitur dapibus.
          </p>
          <p className="py-3 text-gray-600 text-lg">
            Duis vitae pretium dui. Nullam eget nisl diam. Cras dapibus mattis suscipit. In efficitur in enim id vestibulum. Nullam nibh metus, ultricies at ornare vitae, volutpat nec nisi. Duis id est est. Nam lacus ligula, accumsan vestibulum porttitor convallis, fringilla eu nisl. Nulla accumsan erat non efficitur dapibus.
          </p>
          <p className="py-3 text-gray-600 text-lg">
            Duis vitae pretium dui. Nullam eget nisl diam. Cras dapibus mattis suscipit. In efficitur in enim id vestibulum. Nullam nibh metus, ultricies at ornare vitae, volutpat nec nisi. Duis id est est. Nam lacus ligula, accumsan vestibulum porttitor convallis, fringilla eu nisl. Nulla accumsan erat non efficitur dapibus.
          </p>
          <h2 className="pt-6 pb-3 text-2xl font-bold text-gray-900">2. Lorem ipsum</h2>
          <h3 className="py-3 text-xl font-bold underline text-gray-900">2.1 Lorem ipsum dolor</h3>
          <h3 className="py-3 text-xl font-bold underline text-gray-900">2.2 Lorem ipsum dolor</h3>
          <h2 className="pt-6 pb-3 text-2xl font-bold text-gray-900">3. Lorem ipsum</h2>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          .page {
            width: 1000px;
          }
        }
      `}</style>
    </Layout>
  )
}

export default Terms