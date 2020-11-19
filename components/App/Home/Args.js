const Args = () => (
  <>
    <section className="text-center px-4 sm:px-10 pt-6 pb-10 sm:py-16">
      <h2 className="heading">Nous vous livrons dans votre résidence.</h2>
      <p className="argument">
        Plus besoin de chercher un magasin, d'attendre son matériel, ni de le
        porter. Nous nous occupons de tout.
      </p>
    </section>
    <section>
      <div className="flex justify-center bg-gray-100">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2">
          <div className="home-args-image-1 overflow-hidden img-container"></div>
          <div className="flex justify-center items-center">
            <div className="max-w-md mx-8 sm:mx-auto py-10 home-args-desc-1">
              <h2 className="heading">Une offre simple</h2>
              <p className="argument">
                Nous offrons un modèle unique de skis performants et s'adaptant
                à tous les niveaux.
              </p>
            </div>
          </div>
          <div className="home-args-image-2 overflow-hidden img-container"></div>
          <div className="flex justify-center items-center">
            <div className="max-w-md mx-8 sm:mx-auto py-10 home-args-desc-2">
              <h2 className="heading">Un service confortable</h2>
              <p className="argument">
                Réservez votre matériel en quelques clics. Nous vous livrons à
                l'adresse de votre choix.
              </p>
            </div>
          </div>
          <div className="home-args-image-3 overflow-hidden img-container"></div>
          <div className="flex justify-center items-center">
            <div className="max-w-md mx-8 sm:mx-auto py-10 home-args-desc-3">
              <h2 className="heading">Un package complet</h2>
              <p className="argument">
                Tout est inclus: skis, chaussures, casque, forfait et assurance
                casse/vol pour que vous profitiez pleinement de vos vacances.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <style jsx>
      {`
        .img-container {
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }
        .grid {
          max-width: 1520px;
          grid-auto-rows: 250px auto 250px auto 250px auto;
          grid-template-areas:
            'arg1img'
            'arg1desc'
            'arg2img'
            'arg2desc'
            'arg3img'
            'arg3desc';
        }
        .home-args-image-1 {
          grid-area: arg1img;
        }
        .home-args-desc-1 {
          grid-area: arg1desc;
        }
        .home-args-image-2 {
          grid-area: arg2img;
        }
        .home-args-desc-2 {
          grid-area: arg2desc;
        }
        .home-args-image-3 {
          grid-area: arg3img;
        }
        .home-args-desc-3 {
          grid-area: arg3desc;
        }

        @media (min-width: 640px) {
          .grid {
            grid-auto-rows: 350px;
            grid-template-areas:
              'arg1img arg1desc'
              'arg2desc arg2img'
              'arg3img arg3desc';
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
      `}
    </style>
  </>
);

export default Args;
