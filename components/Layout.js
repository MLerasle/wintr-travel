import Nav from './nav'
import Footer from './Footer'

const Layout = props => (
  <div className="relative min-h-screen flex flex-col justify-between">
    <Nav background="primary" />
    <div className="pb-10 flex-grow flex">
      {props.children}
    </div>
    <Footer />
  </div>
)

export default Layout