import { Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import ChannelPage from "../pages/ChannelPage";
import NotFound from "../pages/NotFound";
import SportsPage from "../pages/Sports";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/channel" element={<ChannelPage />} />
      <Route path="/sports" element={<SportsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
