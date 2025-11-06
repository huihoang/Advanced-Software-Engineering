export const PATH = {
  HOME: "/",
  LOGIN: "/login",

  DOCTORS: "/doctors",
  DOCTOR_PROFILE: (doctorId: number | string) => `/doctors/${doctorId}`,
  PATIENT_PROFILE: (patientId: number | string) => `/patients/${patientId}`,
  POSTS: "/posts",

  APPOINTMENT_DETAIL: (appointmentId: number | string) =>
    `/appointments/${appointmentId}`,
  DEPARTMENT_DETAIL: (id?: string) => `/department/${id ?? ":id"}`,
  SETTINGS: "/SETTINGS",
};
