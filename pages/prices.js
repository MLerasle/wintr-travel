import Head from 'next/head';
import Link from 'next/link';

import MainSection from '@/UI/MainSection';
import PageHeader from '@/UI/PageHeader';
import PackItem from '@/App/Static/PackItem';

import PackPrice from '@/App/Static/PackPrice';
import PackItemDesc from '@/App/Static/PackItemDesc';

import { packItems, packPrices, packItemDescriptions } from 'data/pack';

const Prices = () => {
  return (
    <>
      <Head>
        <title>Tarifs Wintr Travel</title>
        <meta
          name="description"
          content="Budgéter ses vacances au ski n'a jamais été aussi simple grâce à la politique de tarification unique de Wintr Travel."
        />
      </Head>

      <MainSection>
        <PageHeader title="Un tarif simple">
          Pré-réservez pour 50€. Payez le reste la veille de votre arrivée.
        </PageHeader>

        <div className="relative bg-gray-100">
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gray-50"></div>
          </div>
          <div className="relative max-w-7xl mx-auto lg:px-8 lg:grid lg:grid-cols-2">
            <div className="bg-gray-100 pb-16 px-4 sm:py-24 sm:px-6 lg:px-0 lg:pr-8">
              <div className="max-w-lg mx-auto lg:mx-0">
                <h2 className="text-base font-semibold tracking-wide text-green-600 uppercase">
                  Une offre complète
                </h2>
                <p className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  Tout ce dont vous avez besoin pour un séjour au ski réussi
                </p>
                <dl className="mt-12 space-y-10">
                  {packItemDescriptions.map((item) => (
                    <PackItemDesc
                      key={item.name}
                      name={item.name}
                      icon={item.icon}
                      description={item.description}
                    />
                  ))}
                </dl>
              </div>
            </div>
            <div className="bg-gray-50 py-16 px-4 sm:py-24 sm:px-6 lg:bg-none lg:px-0 lg:pl-8 lg:flex lg:items-center lg:justify-end">
              <div className="max-w-lg mx-auto w-full space-y-8 lg:mx-0">
                <div>
                  <h2 className="sr-only">Prix</h2>
                  <p className="relative grid grid-cols-2">
                    {packPrices.map((pack) => (
                      <PackPrice
                        key={pack.label}
                        label={pack.label}
                        price={pack.price}
                      />
                    ))}
                  </p>
                </div>
                <ul className="rounded overflow-hidden grid gap-px sm:grid-cols-2">
                  {packItems.map((item) => (
                    <PackItem key={item} item={item} />
                  ))}
                </ul>
                <Link href="/">
                  <a className="btn btn-primary btn-large w-full">
                    Réservez maintenant
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MainSection>
    </>
  );
};

export default Prices;
