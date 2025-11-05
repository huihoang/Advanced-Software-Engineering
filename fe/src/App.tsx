import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
