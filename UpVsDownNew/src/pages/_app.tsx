import "@/styles/globals.css";
import "@/styles/normalize.css";
import "@/styles/upvsdown.webflow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Providers from "./providers";
import store from "@/store/store";
import { Provider } from "react-redux";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </Provider>

      <ToastContainer autoClose={3000} draggableDirection="x" />
    </>
  );
}

export default App;