import {
  useState
} from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
