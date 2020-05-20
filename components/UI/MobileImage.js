import useTranslation from 'next-translate/useTranslation';
import Heading from '@/UI/Heading';

const MobileImage = () => {
  const { t } = useTranslation();

  return (
    <div className="md:hidden relative">
      <div className="mobile-image background-image h-64"></div>
      <Heading className="homeTitle">{t('common:form.title')}</Heading>
    </div>
  );
};

export default MobileImage;
