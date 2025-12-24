import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WorldTVPage from "../pages/WorldTVPage";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/category/world" replace />} />
        <Route path="/category/:slug" element={<WorldTVPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
