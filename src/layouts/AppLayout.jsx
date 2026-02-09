import "../App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../widgets/Header";
import Footer from "../widgets/Footer";

export default function AppLayout() {
  const location = useLocation();
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Outlet key={location.key} />
      </main>
      <Footer />
    </div>
  );
}
