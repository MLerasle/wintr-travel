import Navbar from '@/Layout/Navbar';
import Footer from '@/Layout/Footer';
import CookieBanner from '@/UI/CookieBanner';

const Layout = (props) => (
  <>
    <Navbar />
    {/* Ensures that localStorage is available to render the cookie banner */}
    {typeof window !== 'undefined' && <CookieBanner />}
    <main>{props.children}</main>
    <Footer />
  </>
);

export default Layout;
