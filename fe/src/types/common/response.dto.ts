export type ResponseDto<T> = {
  code?: number;
  message: string;
  data: T;
};

export type ExceptionDto = {
  code: number;
  message: string;
};
