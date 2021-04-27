import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import MainSection from '@/UI/MainSection';
import PageHeader from '@/UI/PageHeader';
import Questions from '@/App/Static/Questions';

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
        <PageHeader title="Questions fréquentes">
          Vous ne trouvez pas la réponse que vous cherchez?{' '}
          <Link href="/contact">
            <a className="link cursor-pointer hover:text-gray-600">
              Contactez-nous.
            </a>
          </Link>
        </PageHeader>
        <Questions />
      </MainSection>
    </>
  );
};

export default Faq;
