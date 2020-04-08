import Header from './Header'
import Icon from '@mdi/react'
import { mdiInformationOutline } from '@mdi/js'

const cartSection = props => (
  <section className="my-6 pt-6 border-t border-gray-300">
    {
      props.title &&
      <Header className="text-xs sm:text-sm uppercase tracking-wide">
        {props.title}
        {
          props.icon &&
          <Icon
            path={mdiInformationOutline}
            size={0.8}
            className="ml-2 cursor-pointer"
            color="#0CB3FA"
            onClick={props.onIconClicked}
            onMouseEnter={props.onIconMouseEnter}
            onMouseLeave={props.onIconMouseLeave}
          />
        }
      </Header>
    }
    {props.children}
  </section>
)

export default cartSection