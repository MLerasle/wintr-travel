import Navbar from '@/App/Navbar';
import Footer from '@/App/Footer';
import CookieBanner from '@/UI/CookieBanner';

const Layout = (props) => (
  <>
    {!props.withoutNavbar && <Navbar classes="bg-white" />}
    <main>{props.children}</main>
    {!props.withoutFooter && <Footer maxWidth={props.footerMaxWidth} />}
    {/* Ensures that localStorage is available to render the cookie banner */}
    {typeof window !== 'undefined' && <CookieBanner />}
  </>
);

export default Layout;
