import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./screens/Home";
import QuotationHistory from "./screens/QuotationHistory";
import NewQuotation from "./screens/NewQuotation";
import CreateQuotation from "./screens/CreateQuotation";
import QuotationPdf from "./screens/QuotationPdf";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="quotation-history" element={<QuotationHistory />} />
        <Route path="new-quotation" element={<NewQuotation />} />
        <Route path="create-quotation" element={<CreateQuotation />} />
        <Route path="create-quotation/:id" element={<CreateQuotation />} />
        <Route path="quotation-pdf" element={<QuotationPdf />} />
      </Route>
    </Routes>
  );
}

export default App;
