export const PATH = {
  HOME: "/",
  LOGIN: "/login",

  DOCTORS: "/doctors",
  DOCTOR_PROFILE: (doctorId: number | string) => `/doctors/${doctorId}`,
  POSTS: "/posts",

  PROFILE: "/profile",
  SETTINGS: "/SETTINGS",
};
