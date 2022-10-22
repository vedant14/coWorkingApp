import { AuthProvider } from "../context/AuthContext";
import { ReactNotifications } from "react-notifications-component";
import "../styles/global.css";
import "react-notifications-component/dist/theme.css";
export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ReactNotifications />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
