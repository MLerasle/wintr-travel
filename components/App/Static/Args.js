import Image from 'next/image';

const Args = () => (
  <>
    <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
      <div className="relative max-w-xl mx-auto px-4 lg:max-w-7xl">
        <div className="relative">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Livraison sans contact dans votre résidence.
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
            Plus besoin d'aller chercher votre matériel en magasin.
            <br />
            Nous nous occupons de tout dans le respect des précautions
            sanitaires.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
              Une offre simple
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              Nous offrons un modèle unique de skis modernes et s'adaptant à
              tous les niveaux.
            </p>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <Image
              className="relative mx-auto sm:rounded-xl"
              src="/images/home-wintr-travel-2-lg.jpg"
              alt="Des skis sur la piste"
              width={600}
              height={400}
            />
          </div>
        </div>
        <div className="relative mt-12 sm:mt-16 lg:mt-24">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="lg:col-start-2">
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                Un service confortable
              </h3>
              <p className="mt-3 text-lg text-gray-500">
                Réservez votre matériel en quelques clics. Nous vous livrons à
                l'adresse de votre choix.
              </p>
            </div>

            <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
              <Image
                className="relative mx-auto sm:rounded-xl"
                src="/images/home-wintr-travel-3-lg.jpg"
                alt="Une famille réservant son séjour au ski."
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
        <div className="relative mt-12 sm:mt-16 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
              Un package complet
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              Tout est inclus: skis, chaussures, casque, forfait et assurance
              casse/vol pour que vous profitiez pleinement de vos vacances.
            </p>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <Image
              className="relative mx-auto sm:rounded-xl"
              src="/images/home-wintr-travel-4-lg.jpg"
              alt="Un couple profite du paysage des montagnes sur une piste de skis."
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Args;
