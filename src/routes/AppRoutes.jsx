import { Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import ChannelPage from "../pages/ChannelPage";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/channel" element={<ChannelPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
