import Heading from '@/UI/Heading';

const MobileImage = () => (
  <div className="md:hidden relative">
    <div className="mobile-image background-image h-48">
      <div className="h-48 w-full bg-black bg-opacity-25"></div>
    </div>
    <Heading className="homeTitle">
      Vos skis livrés à Flaine pour une semaine.
    </Heading>
  </div>
);

export default MobileImage;
