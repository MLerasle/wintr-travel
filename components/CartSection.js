import Header from './Header'

const cartSection = props => (
  <section className="my-6 pt-6 border-t border-gray-300">
    {
      props.title &&
      <Header className="text-xs sm:text-sm uppercase tracking-wide">
        {props.title}
      </Header>
    }
    {props.children}
  </section>
)

export default cartSection