import { useEffect } from 'react';
import Head from 'next/head';

import Layout from '@/Layout/Layout';
import MainSection from '@/UI/MainSection';
import Question from '@/App/Faq/Question';

import * as gtag from 'lib/gtag';

const Faq = () => {
  useEffect(() => {
    gtag.pageView('FAQ', '/faq');
  }, []);

  return (
    <Layout>
      <Head>
        <title>FAQ - Wintr Travel</title>
      </Head>
      <MainSection>
        <header className="text-center px-4 sm:px-10 py-10 sm:py-16 bg-dark-blue">
          <h1 className="heading text-gray-100">Aide de Wintr Travel.</h1>
          <p className="argument text-gray-300">
            Trouvez les réponses à vos questions.
          </p>
        </header>
        <ul className="max-w-screen-lg mx-auto mt-10">
          <Question query="Comment retourner mes articles ?">
            Voluptate reprehenderit cupidatat dolor qui anim nulla aliquip Lorem
            irure consequat. Lorem dolore occaecat anim incididunt Lorem.
            Cupidatat commodo sit aliquip irure enim anim aute exercitation
            cupidatat veniam eu ullamco adipisicing. Excepteur id Lorem
            adipisicing sit veniam adipisicing sint. Irure sint cupidatat sunt
            id deserunt irure voluptate dolor. Amet elit nisi ipsum amet ea
            fugiat. Pariatur id ex laboris consectetur.
          </Question>
          <Question query="Où en est ma commande ?">
            Voluptate reprehenderit cupidatat dolor qui anim nulla aliquip Lorem
            irure consequat. Lorem dolore occaecat anim incididunt Lorem.
            Cupidatat commodo sit aliquip irure enim anim aute exercitation
            cupidatat veniam eu ullamco adipisicing. Excepteur id Lorem
            adipisicing sit veniam adipisicing sint. Irure sint cupidatat sunt
            id deserunt irure voluptate dolor. Amet elit nisi ipsum amet ea
            fugiat. Pariatur id ex laboris consectetur.
          </Question>
          <Question query="Je me suis trompé(e) d’adresse, de modèle, de taille lors de ma commande, que faire ?">
            Voluptate reprehenderit cupidatat dolor qui anim nulla aliquip Lorem
            irure consequat. Lorem dolore occaecat anim incididunt Lorem.
            Cupidatat commodo sit aliquip irure enim anim aute exercitation
            cupidatat veniam eu ullamco adipisicing. Excepteur id Lorem
            adipisicing sit veniam adipisicing sint. Irure sint cupidatat sunt
            id deserunt irure voluptate dolor. Amet elit nisi ipsum amet ea
            fugiat. Pariatur id ex laboris consectetur.
          </Question>
          <Question query="Que faire s'il manque un produit dans ma commande ?">
            Voluptate reprehenderit cupidatat dolor qui anim nulla aliquip Lorem
            irure consequat. Lorem dolore occaecat anim incididunt Lorem.
            Cupidatat commodo sit aliquip irure enim anim aute exercitation
            cupidatat veniam eu ullamco adipisicing. Excepteur id Lorem
            adipisicing sit veniam adipisicing sint. Irure sint cupidatat sunt
            id deserunt irure voluptate dolor. Amet elit nisi ipsum amet ea
            fugiat. Pariatur id ex laboris consectetur.
          </Question>
          <Question query="Quels sont les coûts et délais de livraison ?">
            Voluptate reprehenderit cupidatat dolor qui anim nulla aliquip Lorem
            irure consequat. Lorem dolore occaecat anim incididunt Lorem.
            Cupidatat commodo sit aliquip irure enim anim aute exercitation
            cupidatat veniam eu ullamco adipisicing. Excepteur id Lorem
            adipisicing sit veniam adipisicing sint. Irure sint cupidatat sunt
            id deserunt irure voluptate dolor. Amet elit nisi ipsum amet ea
            fugiat. Pariatur id ex laboris consectetur.
          </Question>
          <Question query="Quels sont les moyens de paiement pour régler ma commande ?">
            Voluptate reprehenderit cupidatat dolor qui anim nulla aliquip Lorem
            irure consequat. Lorem dolore occaecat anim incididunt Lorem.
            Cupidatat commodo sit aliquip irure enim anim aute exercitation
            cupidatat veniam eu ullamco adipisicing. Excepteur id Lorem
            adipisicing sit veniam adipisicing sint. Irure sint cupidatat sunt
            id deserunt irure voluptate dolor. Amet elit nisi ipsum amet ea
            fugiat. Pariatur id ex laboris consectetur.
          </Question>
          <Question query="Je souhaite annuler ma commande">
            Voluptate reprehenderit cupidatat dolor qui anim nulla aliquip Lorem
            irure consequat. Lorem dolore occaecat anim incididunt Lorem.
            Cupidatat commodo sit aliquip irure enim anim aute exercitation
            cupidatat veniam eu ullamco adipisicing. Excepteur id Lorem
            adipisicing sit veniam adipisicing sint. Irure sint cupidatat sunt
            id deserunt irure voluptate dolor. Amet elit nisi ipsum amet ea
            fugiat. Pariatur id ex laboris consectetur.
          </Question>
        </ul>
      </MainSection>
    </Layout>
  );
};

export default Faq;
