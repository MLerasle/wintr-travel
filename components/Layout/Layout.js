import Nav from '@/App/Nav';
import Footer from '@/App/Footer';

const Layout = (props) => (
  <div className="relative min-h-screen flex flex-col justify-between">
    <Nav classes="bg-gray-800" />
    <div className="mb-20 flex">{props.children}</div>
    <Footer />
  </div>
);

export default Layout;
