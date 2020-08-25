import Nav from '@/App/Nav';
import Footer from '@/App/Footer';

const Layout = (props) => (
  <>
    {/* <div className="relative min-h-screen flex flex-col">
      <Nav classes="bg-white" />
      <div className="flex flex-col flex-grow">{props.children}</div>
      <Footer />
    </div> */}
    <Nav classes="bg-white" />
    <main>{props.children}</main>
    <Footer />
  </>
);

export default Layout;
