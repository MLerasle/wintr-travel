import Head from 'next/head';

import Layout from 'components/Layout/Layout';

const Offer = () => (
  <Layout>
    <Head>
      <title>Notre offre - Wintr Travel</title>
    </Head>

    <header className="mx-2 my-8 sm:my-12 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
        Vos vacances au ski en toute simplicité.
      </h1>
      <h2 className="text-gray-600 text-lg mt-2">
        Nous vous livrons tout ce qu'il vous faut pour un séjour réussi.
      </h2>
    </header>

    <div className="flex justify-center bg-gray-200 border-t-2 border-gray-200">
      <div className="w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2">
        <div className="flex justify-center items-center ski-image bg-white">
          <img src="/skis.jpg" alt="Ski Wintr Travel" />
        </div>
        <div className="flex flex-col justify-center max-w-md mx-8 sm:mx-auto ski-description">
          <h2 className="text-2xl sm:text-3xl font-bold pb-6">
            Skis Armada Victa 83
          </h2>
          <p className="text-gray-600 text-md sm:text-lg leading-loose">
            La légèreté des skis Armada Victa 83 permettent de skier simplement
            et en confiance sur toutes les pistes. Ils conviendront donc
            parfaitement aux skieurs confirmés comme débutants, adultes comme
            enfants.
          </p>
        </div>
        <div className="flex justify-center items-center shoe-image bg-white">
          <img src="/shoes.png" alt="Chaussures de ski Wintr Travel" />
        </div>
        <div className="flex flex-col justify-center max-w-md mx-8 sm:mx-auto shoe-description">
          <h2 className="text-2xl sm:text-3xl font-bold pb-6">
            Chaussures Atomic Hawx Prime 90
          </h2>
          <p className="text-gray-600 text-md sm:text-lg leading-loose">
            Ces chaussures au flex souple assurent votre confort tant sur les
            pistes que dans les files d'attente des remontées mécaniques. Plus
            souple mais techniques, ces chaussures conviendront à ceux qui ne
            skient que quelques jours par an.
          </p>
        </div>
        <div className="flex justify-center items-center helmet-image bg-white">
          <img src="/helmet.jpeg" alt="Casque de ski Wintr Travel" />
        </div>
        <div className="flex flex-col justify-center max-w-md mx-8 sm:mx-auto helmet-description">
          <h2 className="text-2xl sm:text-3xl font-bold pb-6">
            Casque ski Bollé Backline Visor Premium
          </h2>
          <p className="text-gray-600 text-md sm:text-lg leading-loose">
            Le casque de ski Bollé Backline Visor Premium possède un système de
            ventilation réglable, des coussinets d'oreille amovibles, un
            rembourrage en tissu hypoallergénique, un système Click to Fit et
            une visière rotative en polycarbonate avec vue panoramique pour
            profiter pleinement de votre séjour en toute sécurité.
          </p>
        </div>
        <div className="flex justify-center items-center skipass-image bg-white">
          <img src="/skipass.jpg" alt="Forfait Wintr Travel" height="500" />
        </div>
        <div className="flex flex-col justify-center max-w-md mx-8 sm:mx-auto skipass-description">
          <h2 className="text-2xl sm:text-3xl font-bold pb-6">
            Forfait pour la durée de votre séjour
          </h2>
          <p className="text-gray-600 text-md sm:text-lg leading-loose">
            Afin que vous perdiez le moins de temps possible dans des files
            d'attentes, nous vous livrons votre forfait dans votre résidence en
            même temps que votre matériel.
          </p>
        </div>
      </div>
    </div>

    <style jsx>
      {`
        .grid {
          grid-auto-rows: 400px;
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
