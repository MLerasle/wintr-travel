import { useEffect } from 'react';
import Head from 'next/head';

import Layout from '@/Layout/Layout';
import MainSection from '@/UI/MainSection';

import * as gtag from 'lib/gtag';

const About = () => {
  useEffect(() => {
    gtag.pageView('À propos', '/about');
  }, []);

  return (
    <Layout>
      <Head>
        <title>À propos - Wintr Travel</title>
      </Head>
      <MainSection>
        <header className="sm:text-center px-4 sm:px-10 py-8 sm:py-12">
          <h1 className="heading">Qui sommes-nous?</h1>
        </header>
        <section className="md:text-lg pb-10 sm:pb-16 px-4 xl:px-0 text-gray-600 leading-loose">
          <p>
            Nunc faucibus orci eu scelerisque faucibus. Donec id pellentesque
            ligula. In placerat vulputate luctus. Cras velit mi, ultrices eget
            tempus sed, porttitor a dolor. Aenean eu magna ante. Morbi elementum
            faucibus mi vel mollis. Donec eu mi metus. In gravida sollicitudin
            lacus, ac hendrerit lorem rutrum eget. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <p className="py-3">
            Nunc faucibus orci eu scelerisque faucibus. Donec id pellentesque
            ligula. In placerat vulputate luctus. Cras velit mi, ultrices eget
            tempus sed, porttitor a dolor. Aenean eu magna ante. Morbi elementum
            faucibus mi vel mollis. Donec eu mi metus. In gravida sollicitudin
            lacus, ac hendrerit lorem rutrum eget. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <p className="py-3">
            Nunc faucibus orci eu scelerisque faucibus. Donec id pellentesque
            ligula.
          </p>
          <p className="py-3">
            Nunc faucibus orci eu scelerisque faucibus. Donec id pellentesque
            ligula. In placerat vulputate luctus. Cras velit mi, ultrices eget
            tempus sed, porttitor a dolor. Aenean eu magna ante. Morbi elementum
            faucibus mi vel mollis. Donec eu mi metus.
          </p>
          <p className="py-3">
            Nunc faucibus orci eu scelerisque faucibus. Donec id pellentesque
            ligula. In placerat vulputate luctus. Cras velit mi, ultrices eget
            tempus sed, porttitor a dolor. Aenean eu magna ante. Morbi elementum
            faucibus mi vel mollis. Donec eu mi metus. In gravida sollicitudin
            lacus, ac hendrerit lorem rutrum eget. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <h2 className="py-4 text-2xl font-bold text-gray-900">Lorem Ipsum</h2>
          <p className="py-3">
            Nunc faucibus orci eu scelerisque faucibus. Donec id pellentesque
            ligula. In placerat vulputate luctus. Cras velit mi, ultrices eget
            tempus sed, porttitor a dolor. Aenean eu magna ante. Morbi elementum
            faucibus mi vel mollis. Donec eu mi metus. In gravida sollicitudin
            lacus, ac hendrerit lorem rutrum eget. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </section>
      </MainSection>
    </Layout>
  );
};

export default About;
