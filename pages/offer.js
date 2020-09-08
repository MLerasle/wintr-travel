import Head from 'next/head';

import Layout from 'components/Layout/Layout';
import GridArg from '@/App/GridArg';

const Offer = () => (
  <Layout footerMaxWidth="max-w-screen-xxl">
    <Head>
      <title>Notre offre - Wintr Travel</title>
    </Head>

    <header className="text-center px-4 sm:px-10 py-10 sm:py-16">
      <GridArg title="Vos vacances au ski en toute simplicité.">
        Nous vous livrons tout ce qu'il vous faut pour un séjour réussi.
      </GridArg>
    </header>

    <div className="flex justify-center bg-gray-200 border-t-2 border-gray-200">
      <div className="w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2">
        <div className="flex justify-center items-center ski-image bg-white">
          <img src="/skis.jpg" alt="Ski Wintr Travel" />
        </div>
        <div className="flex justify-center items-center">
          <div className="max-w-md mx-8 sm:mx-auto py-10 ski-description">
            <GridArg title="Skis Armada Victa 83">
              La légèreté des skis Armada Victa 83 permettent de skier
              simplement et en confiance sur toutes les pistes. Ils conviendront
              donc parfaitement aux skieurs confirmés comme débutants, adultes
              comme enfants.
            </GridArg>
          </div>
        </div>
        <div className="flex justify-center items-center shoe-image bg-white">
          <img src="/shoes.png" alt="Chaussures de ski Wintr Travel" />
        </div>
        <div className="flex justify-center items-center">
          <div className="max-w-md mx-8 sm:mx-auto py-10 shoe-description">
            <GridArg title="Chaussures Atomic Hawx Prime 90">
              Ces chaussures au flex souple assurent votre confort tant sur les
              pistes que dans les files d'attente des remontées mécaniques. Plus
              souple mais techniques, ces chaussures conviendront à ceux qui ne
              skient que quelques jours par an.
            </GridArg>
          </div>
        </div>
        <div className="flex justify-center items-center helmet-image bg-white">
          <img src="/helmet.jpeg" alt="Casque de ski Wintr Travel" />
        </div>
        <div className="flex justify-center items-center">
          <div className="max-w-md mx-8 sm:mx-auto py-10 helmet-description">
            <GridArg title="Casque ski Bollé Backline Visor Premium">
              Le casque de ski Bollé Backline Visor Premium possède un système
              de ventilation réglable, des coussinets d'oreille amovibles, un
              rembourrage en tissu hypoallergénique, un système Click to Fit et
              une visière rotative en polycarbonate avec vue panoramique pour
              profiter pleinement de votre séjour en toute sécurité.
            </GridArg>
          </div>
        </div>
        <div className="flex justify-center items-center skipass-image bg-white overflow-hidden">
          <img src="/skipass.jpg" alt="Forfait Wintr Travel" height="500" />
        </div>
        <div className="flex justify-center items-center">
          <div className="max-w-md mx-8 sm:mx-auto py-10 skipass-description">
            <GridArg title="Forfait pour la durée de votre séjour">
              Afin que vous perdiez le moins de temps possible dans des files
              d'attentes, nous vous livrons votre forfait dans votre résidence
              en même temps que votre matériel.
            </GridArg>
          </div>
        </div>
      </div>
    </div>

    <style jsx>
      {`
        .grid {
          max-width: 1520px;
          grid-auto-rows: 400px auto 400px auto 400px auto;
          grid-template-areas:
            'skiimg'
            'skidesc'
            'shoeimg'
            'shoedesc'
            'helmetimg'
            'helmetdesc'
            'skipassimg'
            'skipassdesc';
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
        .skipass-image {
          grid-area: skipassimg;
        }
        .skipass-description {
          grid-area: skipassdesc;
        }

        @media (min-width: 640px) {
          .grid {
            grid-auto-rows: 500px;
            grid-template-areas:
              'skiimg skidesc'
              'shoedesc shoeimg'
              'helmetimg helmetdesc'
              'skipassdesc skipassimg';
          }
        }
      `}
    </style>
  </Layout>
);

export default Offer;
