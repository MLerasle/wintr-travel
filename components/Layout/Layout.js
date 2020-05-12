import Nav from '@/App/nav'
import Footer from '@/App/Footer'

const Layout = props => (
  <div className="relative min-h-screen flex flex-col justify-between">
    <Nav classes="bg-primary-blue" />
    <div className="pb-10 flex-grow flex">
      {props.children}
    </div>
    <Footer />
  </div>
)

export default Layout