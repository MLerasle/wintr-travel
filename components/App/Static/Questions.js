import Question from '@/App/Static/Question';

const Questions = () => (
  <div className="max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
      <div className="space-y-6 divide-y divide-gray-200">
        <Question query="Où en est ma commande ?">
          <p className="text-base text-gray-500 py-1">
            Nous travaillons avec notre propre transporteur pour nous assurer de
            la livraison dans les meilleures conditions.
          </p>
          <p className="text-base text-gray-500 py-1">
            L’équipe de Wintr Travel prendra contact avec vous quelques jours
            avant votre arrivée si des informations sont manquantes.
          </p>
          <p className="text-base text-gray-500 py-1">
            Vous pouvez nous contacter à tout moment, nous sommes disponibles à
            toute heure pour vous répondre.
          </p>
        </Question>
        <Question query="Je me suis trompé(e) d’adresse ou de taille lors de ma commande, que faire ?">
          <p className="text-base text-gray-500 py-1">
            Cela arrive même au meilleur !
          </p>
          <p className="text-base text-gray-500 py-1">
            Sachez que votre commande, une fois validée, est envoyée
            immédiatement à nos équipes et vous avez la possibilité de la
            modifier ou de la compléter au besoin.
          </p>
          <p className="text-base text-gray-500 py-1">
            Cliquez simplement sur le lien contenu dans le mail de confirmation
            de votre commande et effectuez directement en ligne les
            modifications souhaitées.
          </p>
          <p className="text-base text-gray-500 py-1">
            Si vous avez perdu ledit mail ou si vous rencontrez la moindre
            difficulté, contactez nous simplement et nous serons ravis de faire
            les modifications nécessaires.
          </p>
        </Question>
        <Question query="Comment vous contacter ?">
          <p className="text-base text-gray-500 py-1">
            Pour nous contacter, vous pouvez nous envoyer un email à{' '}
            <a href="mailto:support@wintr.travel" className="text-primary-blue">
              support@wintr.travel
            </a>{' '}
            ou nous laisser un message dans le chat, nous répondrons au plus
            vite.
          </p>
        </Question>
        <Question query="Quels sont les coûts et délais de livraison ?">
          <p className="text-base text-gray-500 py-1">
            Les commandes sont préparées dans les 48 heures avant votre arrivée.
            Les coûts de livraison sont offerts et nous nous engageons à vous
            livrer au mieux dans le créneau défini lors de la commande.
          </p>
          <p className="text-base text-gray-500 py-1">
            Si vous avez des retards ou souhaitez modifier le créneau, c’est
            simple il suffit de nous contacter.
          </p>
        </Question>
        <Question query="Quels sont les moyens de paiement pour régler ma commande ?">
          <p className="text-base text-gray-500 py-1">
            Nous proposons le paiement sécurisé par carte bancaire (Visa,
            Mastercard ou American Express).
          </p>
          <p className="text-base text-gray-500 py-1">
            Vous pouvez également payer en un clic via Apple Pay ou Google Pay.
          </p>
        </Question>
        <Question query="Puis-je annuler ma commande ?">
          <p className="text-base text-gray-500 py-1">
            Nous regrettons fortement votre choix !
          </p>
          <p className="text-base text-gray-500 py-1">
            Sachez que vous pouvez annuler votre commande sans frais jusqu'à 24
            heures avant votre arrivée.
          </p>
          <p className="text-base text-gray-500 py-1">
            Vous serez intégralement remboursés dans un délai de 48 heures.
          </p>
        </Question>
      </div>
    </div>
  </div>
);

export default Questions;
