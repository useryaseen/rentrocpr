import "../App.css";
import { Outlet } from "react-router-dom";
import Header from "../widgets/Header";
import Footer from "../widgets/Footer";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
