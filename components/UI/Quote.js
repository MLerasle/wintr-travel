import Icon from '@mdi/react';
import { mdiFormatQuoteOpen } from '@mdi/js';

import Card from '@/UI/Card';

const Quote = (props) => (
  <Card subclasses={`p-4 md:p-8 ${props.subclasses}`}>
    <blockquote className="relative pl-4 sm:pl-6">
      <Icon
        path={mdiFormatQuoteOpen}
        size={1.2}
        color="#A0AEC0"
        className="absolute -left-1 opacity-50"
      />
      <p className="pb-2 italic">{props.children}</p>
      <cite className="text-sm font-bold not-italic">{props.author}</cite>
    </blockquote>
  </Card>
);

export default Quote;
