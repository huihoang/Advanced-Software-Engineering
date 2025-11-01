import { Routes, Route } from "react-router-dom";

import { AuthLayout, MainLayout } from "@/layouts";
import {
  LoginPage,
  HomePage,
  DoctorsPage,
  NotFound,
  DoctorProfilePage,
} from "@/pages";
import { PATH } from "@/constants";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={PATH.DOCTORS} element={<DoctorsPage />} />
        <Route
          path={PATH.DOCTOR_PROFILE(":id")}
          element={<DoctorProfilePage />}
        />
        <Route path={PATH.SETTINGS} element={<></>} />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        <Route path={PATH.LOGIN} element={<LoginPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
