import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import MainSection from '@/UI/MainSection';
import PageHeader from '@/UI/PageHeader';

import * as gtag from 'lib/gtag';

const About = () => {
  useEffect(() => {
    gtag.pageView('À propos', '/about');
  }, []);

  return (
    <>
      <Head>
        <title>À propos - Wintr Travel</title>
        <meta
          name="description"
          content="Notre mission est de faciliter la location de skis en livrant tout le nécessaire à nos clients dans leur résidence."
        />
      </Head>
      <MainSection>
        <PageHeader title="À propos de Wintr Travel" />
        <div className="pb-16 bg-gray-100 overflow-hidden lg:pb-24">
          <div className="relative max-w-xl mx-auto px-4 lg:max-w-7xl">
            <div className="relative lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                  Qui sommes-nous?
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Wintr Travel est une marque audacieuse, qui, depuis 3 ans,
                  façonne en France des équipements pensés pour le grand public.
                  Wintr Travel réinvente l'industrie de l’équipement de ski en
                  positionnant les nouveaux outils du numérique au service d’une
                  production humaine, durable, et ancrée dans la diversité des
                  territoires.
                </p>
              </div>

              <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
                <Image
                  className="relative mx-auto sm:rounded-xl"
                  src="/images/about-wintr-travel-1-lg.jpg"
                  alt="Un skiman qui fabrique des skis."
                  width={600}
                  height={400}
                />
              </div>
            </div>
            <div className="relative mt-12 sm:mt-16 lg:mt-24">
              <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                <div className="lg:col-start-2">
                  <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                    Notre offre
                  </h3>
                  <p className="mt-3 text-lg text-gray-500">
                    Wintr Travel propose la location clé en main de l’équipement
                    de ski au travers de sa marque Wintr conçue pour répondre
                    aux exigences des amateurs de skis alliant sécurité,
                    simplicité et nouvelles technologies.
                  </p>
                </div>

                <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                  <Image
                    className="relative mx-auto sm:rounded-xl"
                    src="/images/about-wintr-travel-2-lg.jpg"
                    alt="Une femme s'équipe avant d'aller skier."
                    width={600}
                    height={400}
                  />
                </div>
              </div>
            </div>
            <div className="relative mt-12 sm:mt-16 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                  Notre philosophie
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Notre philosophie est simple : proposer à tous nos clients des
                  articles de qualité et modernes, quels que soient leur profil
                  et leur pouvoir d'achat. Nous avons à coeur de vous guider en
                  toute bienvaillance et de vous donner de la transparence à
                  toutes les étapes de votre séjour.
                </p>
              </div>

              <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
                <Image
                  className="relative mx-auto sm:rounded-xl"
                  src="/images/about-wintr-travel-3-lg.jpg"
                  alt="Des skieurs profitent de leurs vacances au ski."
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </MainSection>
    </>
  );
};

export default About;
