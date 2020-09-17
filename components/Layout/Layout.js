import Navbar from '@/App/Navbar';
import Footer from '@/App/Footer';

const Layout = (props) => (
  <>
    {!props.withoutNavbar && <Navbar classes="bg-white" />}
    <main>{props.children}</main>
    {!props.withoutFooter && <Footer maxWidth={props.footerMaxWidth} />}
  </>
);

export default Layout;
