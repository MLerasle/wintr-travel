import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import MainSection from '@/UI/MainSection';

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
        <header className="text-center px-4 sm:px-10 py-10 sm:py-16 bg-dark-blue">
          <h1 className="heading text-gray-100">À propos de Wintr Travel</h1>
        </header>
        <div className="flex justify-center bg-gray-100">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2">
            <div className="about-image-1 overflow-hidden img-container"></div>
            <div className="flex justify-center items-center">
              <div className="max-w-md mx-8 sm:mx-auto py-10 home-args-desc-1">
                <h2 className="heading">Qui sommes-nous?</h2>
                <p className="argument mt-4">
                  Wintr Travel est une marque audacieuse, qui, depuis 3 ans,
                  façonne en France des équipements pensés pour le grand public.
                  Wintr Travel réinvente l'industrie de l’équipement de ski en
                  positionnant les nouveaux outils du numérique au service d’une
                  production humaine, durable, et ancrée dans la diversité des
                  territoires.
                </p>
              </div>
            </div>
            <div className="about-image-2 overflow-hidden img-container"></div>
            <div className="flex justify-center items-center">
              <div className="max-w-md mx-8 sm:mx-auto py-10 home-args-desc-2">
                <h2 className="heading">Notre offre</h2>
                <p className="argument mt-4">
                  Wintr Travel propose la location clé en main de l’équipement
                  de ski au travers de sa marque{' '}
                  <Link href="/brand">
                    <a className="font-semibold underline">Wintr</a>
                  </Link>{' '}
                  conçue pour répondre aux exigences des amateurs de skis
                  alliant sécurité, simplicité et nouvelles technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MainSection>

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
              'arg2desc';
          }
          .about-image-1 {
            grid-area: arg1img;
          }
          .home-args-desc-1 {
            grid-area: arg1desc;
          }
          .about-image-2 {
            grid-area: arg2img;
          }
          .home-args-desc-2 {
            grid-area: arg2desc;
          }

          @media (min-width: 640px) {
            .grid {
              grid-auto-rows: 350px;
              grid-template-areas:
                'arg1img arg1desc'
                'arg2desc arg2img';
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
};

export default About;
