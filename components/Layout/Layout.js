import Navbar from '@/App/Navbar';
import Footer from '@/App/Footer';
import CookieBanner from '@/UI/CookieBanner';

const Layout = (props) => (
  <>
    {!props.withoutNavbar && <Navbar classes="bg-white" />}
    <main>{props.children}</main>
    {!props.withoutFooter && <Footer maxWidth={props.footerMaxWidth} />}
    <CookieBanner />
  </>
);

export default Layout;
