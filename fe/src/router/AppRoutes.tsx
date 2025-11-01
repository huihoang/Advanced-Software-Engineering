import { Route, Routes } from "react-router-dom";

import { PATH } from "@/constants";
import { AuthLayout, MainLayout } from "@/layouts";
import {
  AppointmentDetailPage,
  DoctorProfilePage,
  DoctorsPage,
  HomePage,
  LoginPage,
  NotFound,
} from "@/pages";

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
        <Route
          path={PATH.APPOINTMENT_DETAIL(":id")}
          element={<AppointmentDetailPage />}
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
