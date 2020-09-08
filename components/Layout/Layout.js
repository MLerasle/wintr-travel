import Nav from '@/App/Nav';
import Footer from '@/App/Footer';

const Layout = (props) => (
  <>
    <Nav classes="bg-white" />
    <main>{props.children}</main>
    <Footer maxWidth={props.footerMaxWidth} />
  </>
);

export default Layout;
