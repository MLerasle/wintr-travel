import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import MainSection from '@/UI/MainSection';
import Quote from '@/UI/Quote';

import * as gtag from 'lib/gtag';

const Brand = () => {
  useEffect(() => {
    gtag.pageView('Marque', '/brand');
  }, []);

  return (
    <>
      <Head>
        <title>La marque Wintr - Wintr Travel</title>
        <meta
          name="description"
          content="La marque de Skis Grand Public, pour les skieurs occasionnels, de niveau débutant à intermédiaire confirmé."
        />
      </Head>
      <MainSection>
        <header className="text-center px-4 sm:px-10 py-6 md:py-10 bg-dark-blue">
          <h1 className="heading text-gray-100">
            <Image
              src="/images/logo-full.svg"
              alt="Logo Wintr Travel"
              width={150}
              height={100}
            />
          </h1>
          <p className="argument text-gray-300 -mt-4">
            La marque qui réinvente l’équipement de ski grand public.
          </p>
        </header>

        <section className="px-4 xl:px-0 md:text-lg pb-10 sm:pb-16 max-w-screen-lg mx-auto mt-10 text-gray-700">
          <h2 className="pb-2 md:py-4 text-xl md:text-2xl font-bold text-gray-900">
            1. L'origine de la marque
          </h2>
          <p className="pt-3 pb-6 leading-loose">
            Né en 2016 par des passionnés de skis travaillant dans cette
            industrie depuis 15 ans, Wintr a pour origine une volonté de ses 4
            fondateurs, Bruno, Stéphane, Maxime et Adrien de démocratiser les
            skis de qualité avec un accès plus grand public.
          </p>
          <Image
            src="/images/brand-wintr-1.jpg"
            alt="Trois co-fondateurs de Wintr Travel au ski"
            layout="responsive"
            width={500}
            height={250}
            className="py-6"
          />
          <h2 className="mt-6 pb-2 md:py-4 text-xl md:text-2xl font-bold text-gray-900">
            2. La fabrication
          </h2>
          <p className="py-3 leading-loose">
            Imaginé en Europe et disposant des certifications ISO/TC 83/SC 4,
            nous avons veillé à ce que l’équipement Wintr réponde à toutes les
            normes de sécurité tout en fournissant un confort d’utilisation
            inégalé.
          </p>
          <Quote
            author="Adrien, Co-fondateur de Wintr Travel"
            subclasses="mt-4 md:mt-6"
          >
            Chez Wintr, la transparence est au coeur de nos valeurs: elle nous
            guide chaque jour pour vous proposer des produits fabriqués dans le
            respect de notre charte de qualité, et dont nous sommes fiers de
            vous dévoiler les secrets de production… et ça, ça ne changera
            jamais.
          </Quote>
          <h2 className="mt-6 pb-2 md:py-4 text-xl md:text-2xl font-bold text-gray-900">
            3. Les engagements
          </h2>
          <ul className="list-disc px-6 md:px-10 mt-2 pb-4 leading-loose">
            <li>S'engager pour un monde plus solidaire</li>
            <li>Diminuer activement notre empreinte carbone</li>
            <li>
              Sélectionner des partenaires toujours plus fiables et responsables
            </li>
            <li>Réduire notre production d'emballages et de déchets</li>
          </ul>
          <Quote
            author="Bruno, Co-fondateur de Wintr Travel"
            subclasses="my-4 md:my-6"
          >
            Wintr n'existerait pas sans les cadeaux que nous offre la nature au
            quotidien. Tout faire pour la préserver est au cœur de notre
            démarche depuis le premier jour.
          </Quote>
          <p className="py-3 leading-loose">
            Notre engagement depuis la création a toujours été de respecter les
            exigences de nos utilisateurs et de proposer un prix juste pour des
            équipements de qualité, modernes et sécurisés. Nous mettons tout en
            oeuvre pour améliorer nos produits et faisons tester ceux-ci grâce à
            nos laboratoires.
          </p>
        </section>
      </MainSection>
    </>
  );
};

export default Brand;
