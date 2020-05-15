import useTranslation from 'next-translate/useTranslation';
import Header from '@/UI/Header';

const MobileImage = () => {
  const { t } = useTranslation();

  return (
    <div className="md:hidden relative">
      <div className="mobile-image background-image h-64"></div>
      <Header className="homeTitle">{t('common:form.title')}</Header>
    </div>
  );
};

export default MobileImage;
