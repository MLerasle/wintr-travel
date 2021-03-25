import Navbar from '@/Layout/Navbar';
import Footer from '@/Layout/Footer';
import CookieBanner from '@/UI/CookieBanner';

const Layout = (props) => (
  <>
    {!props.withoutNavbar && <Navbar classes="bg-white" />}
    <main>{props.children}</main>
    <Footer />
    {/* Ensures that localStorage is available to render the cookie banner */}
    {typeof window !== 'undefined' && <CookieBanner />}
  </>
);

export default Layout;
