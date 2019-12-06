import Nav from './Nav'
import Footer from './Footer'

const Layout = props => (
  <div className="relative min-h-screen">
    <div className="pb-10">
      <Nav background="primary" />
      {props.children}
    </div>
    <Footer />
  </div>
)

export default Layout