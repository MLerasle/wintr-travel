import { useEffect } from 'react';
import Head from 'next/head';

// import EmailForm from '@/App/Home/EmailForm';
import HomeArgs from '@/App/Home/Args';
// import Testimonials from '@/App/Home/Testimonials';
import HomeCta from '@/App/Home/Cta';

import * as gtag from 'lib/gtag';
import HeroSection from '@/App/Home/HeroSection';

const Index = () => {
  useEffect(() => {
    gtag.pageView('Location et livraison de skis et forfaits', '/');
  }, []);

  return (
    <>
      <Head>
        <title>Location et livraison de skis et forfaits - Wintr Travel</title>
        <meta
          name="description"
          content="Faites-vous livrer vos skis et votre forfait dans votre résidence avec Wintr Travel.
            Réservez dès maintenant vos prochaines vacances au ski!"
        />
      </Head>
      <HeroSection />
      <HomeArgs />
      {/* <Testimonials /> */}
      <HomeCta />
    </>
  );
};

export default Index;
