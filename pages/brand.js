import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Layout from '@/Layout/Layout';
import MainSection from '@/UI/MainSection';
import Quote from '@/UI/Quote';

import * as gtag from 'lib/gtag';

const Brand = () => {
  useEffect(() => {
    gtag.pageView('Marque', '/brand');
  }, []);

  return (
    <Layout>
      <Head>
        <title>La marque Fatch - Wintr Travel</title>
        <meta
          name="description"
          content="La marque de Skis Grand Public, pour les skieurs occasionnels, de niveau débutant à intermédiaire confirmé."
        />
      </Head>
      <MainSection>
        <header className="text-center px-4 sm:px-10 py-10 sm:py-16 bg-dark-blue">
          <h1 className="heading text-gray-100">Fatch™</h1>
          <p className="argument text-gray-300">
            La marque qui réinvente l’équipement de ski grand public.
          </p>
        </header>

        <section className="md:text-lg pb-10 sm:pb-16 max-w-screen-lg mx-auto mt-10 text-gray-600 leading-loose">
          <h2 className="pb-3 text-2xl font-bold text-gray-900">
            1. L'origine de la marque
          </h2>
          <p className="pt-3 pb-6">
            Né en 2016 par des passionnés de skis travaillant dans cette
            industrie depuis 15 ans, Fatch a pour origine une volonté de ses 4
            fondateurs, Bruno, Stéphane, Maxime et Adrien de démocratiser les
            skis de qualité avec un accès plus grand public.
          </p>
          <Image
            src="/images/skiers.jpg"
            alt="Deux co-fondateurs de Wintr Travel au ski"
            layout="responsive"
            width={500}
            height={250}
            className="py-6"
          />
          <h2 className="pt-6 pb-3 text-2xl font-bold text-gray-900">
            2. La fabrication
          </h2>
          <p className="py-3">
            Imaginé en Europe et disposant des certifications ISO/TC 83/SC 4
            nous avons veillés à ce que l’équipement Fatch™ répondent à toutes
            les normes de sécurité tout en fournissant un confort d’utilisation
            inégalé.
          </p>
          <Quote author="Adrien, Co-fondateur de Wintr Travel">
            Chez Fatch™, la transparence est au coeur de nos valeurs : elle nous
            guide chaque jour pour vous proposer des produits fabriqués dans le
            respect de notre charte de qualité, et dont nous sommes fiers de
            vous dévoiler les secrets de production… et ça, ça ne changera
            jamais.
          </Quote>
          <h2 className="pt-6 pb-3 text-2xl font-bold text-gray-900">
            3. Les engagements
          </h2>
          <Quote author="Bruno, Co-fondateur de Wintr Travel">
            Fatch™ n'existerait pas sans les cadeaux que nous offre la nature au
            quotidien. Tout faire pour la préserver est au cœur de notre
            démarche depuis le premier jour.
          </Quote>
          <p className="py-3">
            Notre engagement depuis la création a toujours été de respecter les
            exigences de nos utilisateurs et de proposer un prix juste pour des
            équipements de qualité, moderne et sécurisé. Nous mettons tout en
            oeuvre pour améliorer nos produits et faisons tester ceux-ci grâce à
            nos laboratoires.
          </p>
          <h3 className="py-3 text-xl font-bold underline text-gray-900">
            3.1 S'engager pour un monde plus solidaire
          </h3>
          <h3 className="py-3 text-xl font-bold underline text-gray-900">
            3.2 Diminuer activement notre empreinte carbone
          </h3>
          <h3 className="py-3 text-xl font-bold underline text-gray-900">
            3.3 Sélectionner des partenaires toujours plus fiables et
            responsables
          </h3>
          <h3 className="py-3 text-xl font-bold underline text-gray-900">
            3.4 Réduire notre production d'emballages et de déchets
          </h3>
        </section>
      </MainSection>
    </Layout>
  );
};

export default Brand;
