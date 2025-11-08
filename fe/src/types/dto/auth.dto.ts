export type LoginReqDto = {
  username: string;
  password: string;
};

export type LoginResDto = {
  accessToken: string;
  refreshToken: string;
};


export type RegisterReqDto = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};