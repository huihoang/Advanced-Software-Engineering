import { PATH } from "@/constants";
import { AuthLayout, MainLayout } from "@/layouts";
import {
  AppointmentDetailPage,
  DoctorProfilePage,
  DoctorsPage,
  HomePage,
  LoginPage,
  NotFound,
  PatientProfilePage,
  RegisterPage,
} from "@/pages";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        {/* <Route
          path={PATH.DEPARTMENT_DETAIL(":id")}
          element={<DepartmentDetail />}
        /> */}
        <Route path={PATH.DOCTORS} element={<DoctorsPage />} />
        <Route
          path={PATH.DOCTOR_PROFILE(":id")}
          element={<DoctorProfilePage />}
        />
        <Route
          path={PATH.PATIENT_PROFILE(":id")}
          element={<PatientProfilePage />}
        />
        <Route
          path={PATH.DOCTOR_PROFILE(":id")}
          element={<DoctorProfilePage />}
        />
        <Route
          path={PATH.PATIENT_PROFILE(":id")}
          element={<PatientProfilePage />}
        />
        <Route
          path={PATH.APPOINTMENT_DETAIL(":id")}
          element={<AppointmentDetailPage />}
        />
        <Route path={PATH.SETTINGS} element={<></>} />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        <Route path={PATH.LOGIN} element={<LoginPage />} />
        <Route path={PATH.REGISTER} element={<RegisterPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
