export type Pagination = {
  page: number;
  limit: number;
};

export type PaginatedData<T> = {
  count: number;
  numPages: number;
  data: T[];
};
