import Head from 'next/head';
import Link from 'next/link';

import MainSection from '@/UI/MainSection';
import PageHeader from '@/UI/PageHeader';
import Questions from '@/App/Static/Questions';

const Faq = () => {
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
