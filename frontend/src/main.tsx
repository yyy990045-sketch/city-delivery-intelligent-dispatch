import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CityDeliveryProduct from "./features/city-delivery/product/app";
import "./styles/globals.css";

const root = document.getElementById("root");
if (!root) throw new Error("frontend_root_not_found");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/frontend/city-delivery/*" element={<CityDeliveryProduct />} />
        <Route path="*" element={<Navigate to="/frontend/city-delivery/overview" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
