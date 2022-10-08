import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css';
import BottomNavbar from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());
function MyApp({ Component, pageProps }) {
  return (
    <>
      <div >
        <Navbar />
        <BottomNavbar />
      </div>
      <div className="sm:pb-24 lg:pb-5 pt-6 lg:pt-24  ">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp;
