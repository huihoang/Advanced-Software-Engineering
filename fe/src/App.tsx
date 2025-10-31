import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthLayout, MainLayout } from "./layouts";
import { LoginPage, HomePage, DoctorsPage, NotFound } from "./pages";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="doctors" element={<DoctorsPage />} />
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
