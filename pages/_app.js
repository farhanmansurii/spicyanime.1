import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => { setPageLoading(true); };
    const handleComplete = () => { setPageLoading(false); };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <>
      <Navbar />
      {pageLoading
        ? (<div className="self-center">Loading</div>)
        : (<>
          <Component {...pageProps} key={router.asPath} />;
        </>)}</>
  );
}

export default MyApp;
