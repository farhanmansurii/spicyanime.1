import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <>
      <Navbar />
      <Component {...pageProps} key={router.asPath} />;
    </>
  );
}

export default MyApp;
