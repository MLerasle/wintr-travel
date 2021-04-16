import { useEffect } from 'react';
import Head from 'next/head';

import MainSection from '@/UI/MainSection';
import PageHeader from '@/UI/PageHeader';
import BackgroundGradient from '@/UI/BackgroundGradient';
import ContactInformations from '@/App/Static/ContactInformations';
import ContactForm from '@/App/Static/ContactForm';

import * as gtag from 'lib/gtag';

const Contact = () => {
  useEffect(() => {
    gtag.pageView('Contact', '/contact');
  }, []);

  return (
    <>
      <Head>
        <title>Contact - Wintr Travel</title>
        <meta name="description" content="Contact Wintr Travel" />
      </Head>
      <MainSection>
        <PageHeader title="Contactez-nous">
          Nous vous répondrons sous 48 heures.
        </PageHeader>

        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:px-8">
            <div className="relative bg-white shadow-xl">
              <h2 className="sr-only">Contactez-nous</h2>

              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="relative overflow-hidden py-10 px-6 bg-gray-700 sm:px-10 xl:p-12">
                  <BackgroundGradient />
                  <h3 className="text-lg font-medium text-white">
                    Informations de contact
                  </h3>
                  <p className="mt-6 text-base text-green-50 max-w-3xl">
                    Si vous avez des questions concernant votre réservation,
                    n'hésitez pas à prendre contact avec nous, nous nous ferons
                    un plaisir de vous aider.
                  </p>
                  <ContactInformations />
                </div>

                <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                  <h3 className="text-lg font-medium text-gray-900">
                    Écrivez-nous
                  </h3>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainSection>
    </>
  );
};

export default Contact;
