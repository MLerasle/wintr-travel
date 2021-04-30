import BookingForm from '@/App/Booking/BookingForm';
// import EmailForm from '@/App/Static/EmailForm';
import Image from 'next/image';

const HeroSection = () => (
  <div className="relative sm:min-h-screen">
    <div className="absolute inset-0 hidden sm:block">
      <Image
        className="h-full w-full object-cover"
        src="/images/home-wintr-travel-lg.jpg"
        alt="Chalet et skis au pied des pistes"
        layout="fill"
        objectFit="cover"
        priority={true}
      />
      <div
        className="absolute inset-0 bg-gray-800 opacity-80"
        style={{ mixBlendMode: 'multiply' }}
      ></div>
    </div>
    <div className="relative sm:py-10 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="px-4 sm:px-6 pt-24 pb-8 sm:py-0 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center relative">
            <div className="absolute inset-0 sm:hidden">
              <Image
                className="h-full w-full object-cover"
                src="/images/home-wintr-travel-lg.jpg"
                alt="Chalet et skis au pied des pistes"
                layout="fill"
                objectFit="cover"
                priority={true}
              />
              <div
                className="absolute inset-0 bg-gray-800 opacity-40"
                style={{ mixBlendMode: 'multiply' }}
              ></div>
            </div>
            <div className="relative">
              <h1 className="pt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                <span className="block">Vos skis livrés et loués</span>
                <span className="sm:text-green-600 block">
                  pour une semaine
                </span>
              </h1>
              <p className="mt-3 text-lg text-gray-100 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl hidden sm:block">
                Réservez votre séjour pour vos prochaines vacances d'hiver.
                <br />
                Nous vous livrerons vos skis et vos forfaits.
              </p>
            </div>
          </div>
          <div className="sm:mt-12 lg:mt-0 lg:col-span-6">
            <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
              <div className="px-4 py-8 sm:px-10">
                <BookingForm />
                {/* <EmailForm /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;
