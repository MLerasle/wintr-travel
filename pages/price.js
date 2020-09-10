import Head from 'next/head';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';

import Layout from '@/Layout/Layout';
import GridArg from '@/App/GridArg';
import MainSection from '@/UI/MainSection';
import Card from '@/UI/Card';

const Price = () => (
  <Layout>
    <Head>
      <title>Tarifs - Wintr Travel</title>
    </Head>

    <MainSection>
      <header className="text-center px-4 sm:px-10 py-10 sm:py-16">
        <GridArg title="Un tarif unique quelle que soit votre destination.">
          Budgéter ses vacances n'a jamais été aussi simple.
        </GridArg>
      </header>

      <article className="sm:flex sm:justify-between sm:items-center">
        <Card
          classes="sm:w-1/2 sm:mr-3 mx-4 sm:mx-0 mb-10"
          subclasses="rounded-lg shadow-xl p-6"
        >
          <span className="rounded-full py-1 px-5 text-blue-800 bg-blue-200 bg-opacity-75 uppercase tracking-wide font-semibold text-lg">
            Adulte
          </span>
          <h3 className="text-6xl font-black">
            55€{' '}
            <span className="text-2xl font-medium text-gray-600">/jour</span>
          </h3>
          <ul className="mt-6 text-gray-700">
            <li className="flex items-center my-3 tracking-wide sm:text-lg">
              <Icon path={mdiCheck} size={1} className="mr-2" color="#48BB78" />
              Ski Kastle DX 73 2020 + K10
            </li>
            <li className="flex items-center my-3 tracking-wide sm:text-lg">
              <Icon path={mdiCheck} size={1} className="mr-2" color="#48BB78" />
              Bâtons Rossignol Héro SL
            </li>
            <li className="flex items-center my-3 tracking-wide sm:text-lg">
              <Icon path={mdiCheck} size={1} className="mr-2" color="#48BB78" />
              Chaussures Nordica Gran Tour RTL
            </li>
            <li className="flex items-center my-3 tracking-wide sm:text-lg">
              <Icon path={mdiCheck} size={1} className="mr-2" color="#48BB78" />
              Casque SHRED Basher NOIR SHRASTA
            </li>
            <li className="flex items-center my-3 tracking-wide sm:text-lg">
              <Icon path={mdiCheck} size={1} className="mr-2" color="#48BB78" />
              Forfait Adulte
            </li>
            <li className="flex items-center tracking-wide sm:text-lg">
              <Icon path={mdiCheck} size={1} className="mr-2" color="#48BB78" />
              Livraison du matériel + forfait
            </li>
          </ul>
        </Card>
        <Card
          classes="sm:w-1/2 sm:ml-3 mx-4 sm:mx-0 mb-10"
          subclasses="rounded-lg shadow-xl p-6"
        >
          <span className="rounded-full py-1 px-5 text-blue-800 bg-blue-200 bg-opacity-75 uppercase tracking-wide font-semibold text-lg">
            Enfant
          </span>
          <h3 className="text-6xl font-black">
            40€{' '}
            <span className="text-2xl font-medium text-gray-600">/jour</span>
          </h3>
          <ul className="mt-6 text-gray-700">
            <li className="flex items-center my-3 tracking-wide sm:text-lg">
              <Icon path={mdiCheck} size={1} className="mr-2" color="#48BB78" />
              Ski Kastle DX 73 2020 + K10
            </li>
            <li className="flex items-center my-3 tracking-wide sm:text-lg">
              <Icon path={mdiCheck} size={1} className="mr-2" color="#48BB78" />
              Bâtons Rossignol Héro SL
            </li>
            <li className="flex items-center my-3 tracking-wide sm:text-lg">
              <Icon path={mdiCheck} size={1} className="mr-2" color="#48BB78" />
              Chaussures Nordica Gran Tour RTL
            </li>
            <li className="flex items-center my-3 tracking-wide sm:text-lg">
              <Icon path={mdiCheck} size={1} className="mr-2" color="#48BB78" />
              Casque SHRED Basher NOIR SHRASTA
            </li>
            <li className="flex items-center my-3 tracking-wide sm:text-lg">
              <Icon path={mdiCheck} size={1} className="mr-2" color="#48BB78" />
              Forfait Enfant
            </li>
            <li className="flex items-center tracking-wide sm:text-lg">
              <Icon path={mdiCheck} size={1} className="mr-2" color="#48BB78" />
              Livraison du matériel + forfait
            </li>
          </ul>
        </Card>
      </article>
    </MainSection>
  </Layout>
);

export default Price;
