import useTranslation from 'next-translate/useTranslation';

import Header from '@/UI/Header';
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

  let header = null;
  if (props.title) {
    header = (
      <Header className="text-lg pb-4">{t('common:pack.content')}:</Header>
    );
  }

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-md p-4 ${props.className}`}
    >
      {header}
      <ul className="text-gray-600">
        {items.map((item) => (
          <PackItem item={item} key={item} />
        ))}
      </ul>
    </div>
  );
};

export default PackContent;
