import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      // Expands the Telegram WebApp to full screen
      window.Telegram.WebApp.expand();
    }
  }, []);

  return <AppRoutes />;
}

export default App;
