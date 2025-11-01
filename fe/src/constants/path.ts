export const PATH = {
  HOME: "/",
  LOGIN: "/login",

  DOCTORS: "/doctors",
  DOCTOR_PROFILE: (doctorId: number | string) => `/doctors/${doctorId}`,
  POSTS: "/posts",

  APPOINTMENT_DETAIL: (appointmentId: number | string) =>
    `/appointments/${appointmentId}`,

  PROFILE: "/profile",
  SETTINGS: "/SETTINGS",
};
