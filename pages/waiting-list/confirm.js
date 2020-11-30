import Head from 'next/head';

import Card from '@/UI/Card';
import MainSection from '@/UI/MainSection';

const Confirm = () => (
  <>
    <Head>
      <title>Commande validée - Wintr Travel</title>
    </Head>
    <MainSection
      parentClass="bg-dark-blue"
      className="py-2 md:py-6 flex justify-center items-center"
    >
      <Card classes="mx-4 max-w-2xl" subclasses="bg-white p-4 md:p-8">
        <div className="">
          <h1 className="md:mb-8 text-2xl sm:text-3xl leading-tight font-semibold text-gray-800">
            Votre inscription est validée!
          </h1>

          <div className="text-gray-700 text-lg">
            <p className="my-8 md:my-4">
              Nous vous contacterons dès que les réservations seront à nouveau
              ouvertes.
            </p>
            <p className="mt-8 md:mt-4">
              Merci beaucoup pour votre confiance et à bientôt.
            </p>
          </div>
        </div>
      </Card>
    </MainSection>
  </>
);

export default Confirm;
