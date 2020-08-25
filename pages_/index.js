import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

// import LayoutCover from 'components/Layout/LayoutCover';
import Layout from 'components/Layout/Layout';
import MobileImage from 'components/UI/MobileImage';
import BookingForm from 'components/App/BookingForm';
import Button from '@/UI/Button';
import Icon from '@mdi/react';
import { mdiFormatQuoteOpen } from '@mdi/js';
// import PackContent from 'components/App/PackContent';

const Index = ({ catalog }) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Head>
        <title>{t('home:title')}</title>
      </Head>
      <MobileImage />
      <section className="hero">
        <section className="hero-content">
          <BookingForm catalog={catalog} />
        </section>
      </section>
      <section>
        <article className="text-center px-4 sm:px-10 py-10 sm:py-16">
          <h2 className="font-semibold text-gray-800 text-2xl sm:text-3xl leading-tight mb-1">
            Louez votre matériel. Nous vous livrons.
          </h2>
          <p className="text-gray-700">
            Nous vous livrons vos skis et votre forfait directement en station,
            dans votre résidence.
          </p>
        </article>
        <article>
          <div className="flex justify-center bg-gray-200">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2">
              <div className="flex justify-center items-center ski-image bg-white overflow-hidden">
                <img src="/wintr-travel-simple.jpg" alt="Un homme skie" />
              </div>
              <div className="flex justify-center items-center">
                <div className="max-w-md mx-8 sm:mx-auto ski-description">
                  <h2 className="text-2xl sm:text-3xl font-bold pb-2 sm:pb-6">
                    Une offre simple
                  </h2>
                  <p className="text-gray-600 text-md sm:text-lg lg:text-xl leading-loose">
                    Nous avons sélectionné un modèle unique de skis performants
                    et s'adaptant à tous les niveaux.
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center shoe-image bg-white overflow-hidden">
                <img
                  src="/wintr-travel-rapide.jpg"
                  alt="Une famille réserve son séjour au ski"
                />
              </div>
              <div className="flex justify-center items-center">
                <div className="max-w-md mx-8 sm:mx-auto shoe-description">
                  <h2 className="text-2xl sm:text-3xl font-bold pb-2 sm:pb-6">
                    Plus rapide, de la réservation au pied des pistes.
                  </h2>
                  <p className="text-gray-600 text-md sm:text-lg lg:text-xl leading-loose">
                    Réservez votre matériel en quelques clics. Nous vous livrons
                    à l'adresse de votre choix pour vous éviter les files
                    d'attente.
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center helmet-image bg-white overflow-hidden">
                <img
                  src="/wintr-travel-confort.jpg"
                  alt="Un télécabine monte des gens en haut des pistes de ski"
                />
              </div>
              <div className="flex justify-center items-center">
                <div className="max-w-md mx-8 sm:mx-auto helmet-description">
                  <h2 className="text-2xl sm:text-3xl font-bold pb-2 sm:pb-6">
                    Un package complet
                  </h2>
                  <p className="text-gray-600 text-md sm:text-lg lg:text-xl leading-loose">
                    Notre offre inclut skis, chaussures, casque et forfait pour
                    que vous puissiez profiter pleinement de vos vacances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article className="text-center px-4 sm:px-10 py-10 sm:py-16">
          <h2 className="font-semibold text-gray-800 text-2xl sm:text-3xl leading-tight mb-6 sm:mb-10">
            Demandez l'avis de nos clients.
          </h2>
          <div className="flex flex-col sm:flex-row justify-between items-center tracking-wide">
            <div className="flex-1 sm:px-6 lg:px-10 flex flex-col items-center">
              <Icon path={mdiFormatQuoteOpen} size={1.5} color="#0CB3FA" />
              <p className="py-1 sm:py-3 text-gray-800 font-medium">
                Merci Wintr Travel pour ce service simple et efficace!
              </p>
              <p className="text-gray-600">Jean-Michel Sansidée</p>
            </div>
            <div className="flex-1 sm:px-6 lg:px-10 flex flex-col items-center py-6 sm:py-0">
              <Icon path={mdiFormatQuoteOpen} size={1.5} color="#0CB3FA" />
              <p className="py-1 sm:py-3 text-gray-800 font-medium">
                J'ai pu annuler ma réservation sans problème et ai reçu le
                remboursement dans la foulée. Merci beaucoup!
              </p>
              <p className="text-gray-600">Sandrine Prèdesessous</p>
            </div>
            <div className="flex-1 sm:px-6 lg:px-10 flex flex-col items-center">
              <Icon path={mdiFormatQuoteOpen} size={1.5} color="#0CB3FA" />
              <p className="py-1 sm:py-3 text-gray-800 font-medium">
                Un service incroyable, une équipe de rêve, je n'envisage plus ma
                vie sans Wintr Travel!
              </p>
              <p className="text-gray-600">Patrick Sébastien</p>
            </div>
          </div>
        </article>
        <article className="text-center px-4 sm:px-10 py-10 sm:py-16 bg-primary-blue">
          <h2 className="font-semibold text-white text-2xl sm:text-3xl leading-tight mb-2">
            Réservez maintenant !
          </h2>
          <p className="text-white mb-6">
            Et retrouvez le plaisir du ski sans contraintes.
          </p>
          <Button classes="w-auto uppercase tracking-wide">
            Réservez des skis
          </Button>
        </article>
      </section>
      {/* <PackContent className="md:hidden mx-4 md:mx-6 mt-2 mb-6" title /> */}

      <style jsx>{`
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .grid {
          grid-auto-rows: 250px;
          grid-template-areas:
            'skiimg'
            'skidesc'
            'shoeimg'
            'shoedesc'
            'helmetimg'
            'helmetdesc';
        }
        .ski-image {
          grid-area: skiimg;
        }
        .ski-description {
          grid-area: skidesc;
        }
        .shoe-image {
          grid-area: shoeimg;
        }
        .shoe-description {
          grid-area: shoedesc;
        }
        .helmet-image {
          grid-area: helmetimg;
        }
        .helmet-description {
          grid-area: helmetdesc;
        }

        @media (min-width: 640px) {
          .grid {
            grid-auto-rows: 350px;
            grid-template-areas:
              'skiimg skidesc'
              'shoedesc shoeimg'
              'helmetimg helmetdesc';
          }
        }

        @media (min-width: 768px) {
          .hero {
            position: relative;
            width: 100vw;
            height: 90vh;
          }
          .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('/wintr-travel-home.webp');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
          }
          .hero-content {
            position: relative;
            padding: 5rem 0;
          }
        }

        @media (min-width: 1024px) {
          .grid {
            grid-auto-rows: 400px;
          }
        }

        @media (min-width: 1280px) {
          .grid {
            grid-auto-rows: 500px;
          }
        }
      `}</style>
    </Layout>
  );
};

export async function getStaticProps() {
  const response = await fetch('https://catalog.wintr.travel/v1/catalog.json');
  const catalog = await response.json();

  return {
    props: {
      catalog,
    },
  };
}

export default Index;
