import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ width: "auto" }}/>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
