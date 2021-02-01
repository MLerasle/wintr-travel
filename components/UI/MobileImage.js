import Heading from '@/UI/Heading';

const MobileImage = () => (
  <div className="md:hidden relative">
    <div className="mobile-image background-image h-48">
      <div className="h-48 w-full bg-black bg-opacity-25"></div>
    </div>
    <Heading className="homeTitle">
      Livraison de skis au pied des pistes.
    </Heading>
  </div>
);

export default MobileImage;
