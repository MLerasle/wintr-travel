const BookingSummaryLineSkier = ({ skier }) => (
  <div>
    <span className="text-gray-600 text-sm">
      Taille {skier.size ? `${skier.size} cm` : 'inconnue'} -{' '}
    </span>
    <span className="text-gray-600 text-sm">
      Pointure {skier.shoeSize ? skier.shoeSize : 'inconnue'} -{' '}
    </span>
    <span className="text-gray-600 text-sm">
      Casque {skier.headSize ? skier.headSize : 'inconnu'}
    </span>
  </div>
);

export default BookingSummaryLineSkier;
