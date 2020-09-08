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
            className="ml-2 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
            color="#4299E1"
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
