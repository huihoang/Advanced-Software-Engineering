export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  DOCTORS: "/doctors",
  DOCTOR_PROFILE: (doctorId: number | string) => `/doctors/${doctorId}`,
  PATIENT_PROFILE: (patientId: number | string) => `/patients/${patientId}`,

  APPOINTMENT_DETAIL: (appointmentId: number | string) =>
    `/appointments/${appointmentId}`,
  DEPARTMENT_DETAIL: (id?: string) => `/department/${id ?? ":id"}`,
  SETTINGS: "/SETTINGS",
};
