import Navbar from '@/App/Navbar';
import Footer from '@/App/Footer';

const Layout = (props) => (
  <>
    <Navbar classes="bg-white" hideNavLinks={props.hideNavLinks} />
    <main>{props.children}</main>
    {!props.withoutFooter && <Footer maxWidth={props.footerMaxWidth} />}
  </>
);

export default Layout;
