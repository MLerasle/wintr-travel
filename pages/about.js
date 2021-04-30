import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { IconContext } from 'react-icons';

import { HiOutlineSparkles, HiOutlineCube } from 'react-icons/hi';

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
      <div className="relative bg-green-800">
        <div className="absolute inset-0">
          <Image
            className="h-full w-full object-cover"
            src="/images/about-wintr-travel-1.jpg"
            alt="Des skieurs sur une piste"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
          <div
            className="absolute inset-0 bg-green-800"
            style={{ mixBlendMode: 'multiply' }}
            aria-hidden="true"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-3xl leading-10 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-none lg:text-5xl">
            À propos de Wintr Travel
          </h1>
          <p className="mt-4 max-w-3xl text-xl leading-normal text-green-50">
            Chez Wintr Travel, nous pensons que réserver ses vacances au ski
            devrait être simple et qu'un séjour se doit d'être agréable pour
            être réussi. C'est pour cette raison que nous avons créé un service
            de livraison de skis et forfait en résidence avec un système de
            réservation épuré.
          </p>
        </div>
      </div>

      <div className="py-16 bg-white overflow-hidden lg:py-24">
        <div className="relative max-w-xl mx-auto px-4 lg:max-w-7xl sm:px-6 lg:px-8">
          <div className="relative lg:grid lg:grid-cols-2 lg:gap-32 lg:items-center">
            <div className="relative">
              <div>
                <span className="h-12 w-12 rounded-md flex items-center justify-center bg-green-600">
                  <IconContext.Provider
                    value={{ className: 'h-6 w-6 text-white' }}
                  >
                    <HiOutlineSparkles />
                  </IconContext.Provider>
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Une solution moderne
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Vous n'avez pas besoin de créer un compte pour réserver. Nous
                  proposons un modèle unique de skis opur que vous n'ayez plus à
                  choisir. Nous vous livrons vos skis pour que vous n'ayez plus
                  à chercher un magasin en station. Et nous vous livrons même le
                  forfait pour que vous ne perdiez plus de temps.
                </p>
                <div className="mt-6">
                  <Link href="/">
                    <a className="btn btn-primary">Réserver maintenant</a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
              <Image
                className="relative mx-auto sm:rounded-xl"
                src="/images/about-wintr-travel-2.png"
                alt="Page d'accueil du site Wintr Travel"
                width={576}
                height={384}
              />
            </div>
          </div>
          <div className="relative mt-12 sm:mt-16 lg:mt-24">
            <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-32 lg:items-center">
              <div className="lg:col-start-2">
                <div>
                  <span className="h-12 w-12 rounded-md flex items-center justify-center bg-green-600">
                    <IconContext.Provider
                      value={{ className: 'h-6 w-6 text-white' }}
                    >
                      <HiOutlineCube />
                    </IconContext.Provider>
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                    Une offre complète
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    Il n'y a pas de secret: si vous voulez skier, il vous faut
                    des skis, des chaussures, des bâtons et un forfait. Et si
                    vous voulez en plus du confort et de la sécurité, vous aurez
                    besoin d'un casque et d'une assurance contre la casse et le
                    vol de votre matériel. Bonne nouvelle, tout est inclus dans
                    notre offre.
                  </p>
                  <div className="mt-6">
                    <Link href="/">
                      <a className="btn btn-primary">Réserver maintenant</a>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                <Image
                  className="relative mx-auto sm:rounded-xl"
                  src="/images/about-wintr-travel-3.jpeg"
                  alt="Un skieur profite de ses vacances au ski."
                  width={576}
                  height={384}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
        <div className="relative max-w-xl mx-auto px-4 lg:max-w-7xl">
          <div className="relative">
            <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Un service tourné vers l'avenir
            </h2>
            <p className="mt-8 max-w-3xl mx-auto text-center text-xl text-gray-500">
              Adrien, Bruno, Maxime et Stéphane ont fondé Wintr Travel en 2019
              pour révolutionner une industrie vieillissante et répondre aux
              attentes de la nouvelle génération.
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
              Leur vision était de simplifier au maximum la réservation de votre
              séjour au ski et de rendre ce dernier aussi confortable que
              possible en réduisant les contraintes traditionnelles qui y sont
              associées.
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
              Ce service conviendra parfaitement aux familles ou aux personnes
              skiant une ou deux fois par an et désireuses de gagner du temps
              pour profiter au maximum de leurs vacances.
            </p>
          </div>
        </div>
      </div>

      <div className="relative py-16">
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl lg:max-w-7xl">
          <div className="relative rounded-md px-6 py-10 bg-gray-800 overflow-hidden shadow-xl sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
            >
              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 1463 360"
              >
                <path
                  className="text-gray-600 text-opacity-40"
                  fill="currentColor"
                  d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                />
                <path
                  className="text-gray-700 text-opacity-40"
                  fill="currentColor"
                  d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                />
              </svg>
            </div>
            <div className="relative">
              <div className="sm:text-center">
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Prêts à tenter l'expérience?
                </h2>
                <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-100">
                  Réservez dès maintenant vos prochaines vacances au ski.
                </p>
                <Link href="/">
                  <a className="btn btn-primary btn-large mt-8">
                    Réserver maintenant
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
