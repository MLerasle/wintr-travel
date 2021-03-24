import Card from '@/UI/Card';
import PriceItem from '@/App/Prices/PriceItem';

const PriceCard = ({ category, price }) => (
  <Card
    classes={`sm:w-1/2 ${
      category === 'Adulte' ? 'sm:mr-3' : 'sm:ml-3'
    } mx-4 sm:mx-0 mb-10`}
    subclasses="rounded-lg shadow-md"
  >
    <header className="px-4 md:px-8 pt-6">
      <span className="rounded-full py-1 px-5 text-dark-blue bg-light-blue bg-opacity-75 uppercase tracking-wide font-semibold text-lg">
        {category}
      </span>
      <h2 className="text-6xl font-bold py-4">
        {price}€{' '}
        <span className="text-2xl font-medium text-gray-600">/semaine</span>
      </h2>
    </header>
    <ul className="text-gray-700 bg-gray-50 rounded-b-lg px-4 pt-1 pb-4 md:px-8 md:pt-5 md:pb-8">
      <PriceItem>Skis Wintr</PriceItem>
      <PriceItem>Bâtons</PriceItem>
      <PriceItem>Chaussures</PriceItem>
      <PriceItem>Casque</PriceItem>
      <PriceItem>Forfait {category}</PriceItem>
      <PriceItem>Livraison du matériel + forfait</PriceItem>
      <PriceItem>Assurance Casse / Vol</PriceItem>
    </ul>
  </Card>
);

export default PriceCard;
