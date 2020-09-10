import Navbar from '@/App/Navbar';
import Footer from '@/App/Footer';

const Layout = (props) => (
  <>
    <Navbar classes="bg-white" />
    <main>{props.children}</main>
    <Footer maxWidth={props.footerMaxWidth} />
  </>
);

export default Layout;
