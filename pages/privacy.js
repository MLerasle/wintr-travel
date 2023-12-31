import Head from 'next/head';

import MainSection from '@/UI/MainSection';
import PageHeader from '@/UI/PageHeader';
import PrivacyPolicy from '@/App/Static/PrivacyPolicy';

const Privacy = () => {
  return (
    <>
      <Head>
        <title>Confidentialité - Wintr Travel</title>
        <meta
          name="description"
          content="Politique de confidentialité Wintr Travel"
        />
      </Head>
      <MainSection>
        <PageHeader title="Politique de confidentialité" />
        <PrivacyPolicy />
      </MainSection>
    </>
  );
};

export default Privacy;
