import { useEffect } from 'react';
import Head from 'next/head';

import MainSection from '@/UI/MainSection';
import Question from '@/App/Faq/Question';

import * as gtag from 'lib/gtag';

const Faq = () => {
  useEffect(() => {
    gtag.pageView('FAQ', '/faq');
  }, []);

  return (
    <>
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

        <ul className="px-4 xl:px-0 max-w-screen-lg mx-auto mt-10">
          <Question query="Où en est ma commande ?">
            <p className="py-1">
              Nous travaillons avec notre propre transporteur pour nous assurer
              de la livraison dans les meilleures conditions.
            </p>
            <p className="py-1">
              L’équipe de Wintr Travel prendra contact avec vous quelques jours
              avant votre arrivée si des informations sont manquantes.
            </p>
            <p className="py-1">
              Vous pouvez nous contacter à tout moment, nous sommes disponibles
              à toute heure pour vous répondre.
            </p>
          </Question>
          <Question query="Je me suis trompé(e) d’adresse ou de taille lors de ma commande, que faire ?">
            <p className="py-1">Cela arrive même au meilleur !</p>
            <p className="py-1">
              Sachez que votre commande, une fois validée, est envoyée
              immédiatement à nos équipes et vous avez la possibilité de la
              modifier ou de la compléter au besoin.
            </p>
            <p className="py-1">
              Cliquez simplement sur le lien contenu dans le mail de
              confirmation de votre commande et effectuez directement en ligne
              les modifications souhaitées.
            </p>
            <p className="py-1">
              Si vous avez perdu ledit mail ou si vous rencontrez la moindre
              difficulté, contactez nous simplement et nous serons ravis de
              faire les modifications nécessaires.
            </p>
          </Question>
          <Question query="Comment vous contacter ?">
            <p className="py-1">
              Pour nous contacter, vous pouvez nous envoyer un email à{' '}
              <a
                href="mailto:support@wintr.travel"
                className="text-primary-blue"
              >
                support@wintr.travel
              </a>{' '}
              ou nous laisser un message dans le chat, nous répondrons au plus
              vite.
            </p>
          </Question>
          <Question query="Quels sont les coûts et délais de livraison ?">
            <p className="py-1">
              Les commandes sont préparées dans les 48 heures avant votre
              arrivée. Les coûts de livraison sont offerts et nous nous
              engageons à vous livrer au mieux dans le créneau défini lors de la
              commande.
            </p>
            <p className="py-1">
              Si vous avez des retards ou souhaitez modifier le créneau, c’est
              simple il suffit de nous contacter.
            </p>
          </Question>
          <Question query="Quels sont les moyens de paiement pour régler ma commande ?">
            <p className="py-1">
              Nous proposons le paiement sécurisé par carte bancaire (Visa,
              Mastercard ou American Express).
            </p>
            <p className="py-1">
              Vous pouvez également payer en un clic via Apple Pay ou Google
              Pay.
            </p>
          </Question>
          <Question query="Puis-je annuler ma commande ?">
            <p className="py-1">Nous regrettons fortement votre choix !</p>
            <p className="py-1">
              Sachez que vous pouvez annuler votre commande sans frais jusqu'à
              24 heures avant votre arrivée.
            </p>
            <p className="py-1">
              Vous serez intégralement remboursés dans un délai de 48 heures.
            </p>
          </Question>
        </ul>
      </MainSection>
    </>
  );
};

export default Faq;
