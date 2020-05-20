import Heading from '@/UI/Heading';
import Icon from '@mdi/react';
import { mdiInformationOutline } from '@mdi/js';

const cartSection = (props) => (
  <section>
    {props.title && (
      <Heading className="text-xs sm:text-sm uppercase tracking-wide">
        {props.title}
        {props.icon && (
          <Icon
            path={mdiInformationOutline}
            size={0.8}
            className="ml-2 cursor-pointer"
            color="#0CB3FA"
            onClick={props.onIconClicked}
            onMouseEnter={props.onIconMouseEnter}
            onMouseLeave={props.onIconMouseLeave}
          />
        )}
      </Heading>
    )}
    {props.children}
  </section>
);

export default cartSection;
