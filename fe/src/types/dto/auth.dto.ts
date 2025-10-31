export type LoginReqDto = {
  username: string;
  password: string;
};

export type LoginResDto = {
  access_token: string;
  refresh_token: string;
};
