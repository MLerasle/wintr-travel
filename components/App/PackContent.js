import useTranslation from 'next-translate/useTranslation';

import Heading from '@/UI/Heading';
import PackItem from '@/App/PackItem';

const PackContent = (props) => {
  const { t } = useTranslation();

  const items = [
    t('common:pack.skis'),
    t('common:pack.shoes'),
    t('common:pack.helmet'),
    t('common:pack.insurance'),
    t('common:pack.skipass'),
  ];

  let heading = null;
  if (props.title) {
    heading = (
      <Heading className="text-lg pb-4">{t('common:pack.content')}:</Heading>
    );
  }

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-md p-4 ${props.className}`}
    >
      {heading}
      <ul className="text-gray-600">
        {items.map((item) => (
          <PackItem item={item} key={item} />
        ))}
      </ul>
    </div>
  );
};

export default PackContent;
