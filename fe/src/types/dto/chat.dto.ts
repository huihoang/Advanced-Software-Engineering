import type { DepartmentDto } from ".";

export type ChatRequestDto = {
  // departments: DepartmentDto[];
  message: string;
};

export type ChatResponseDto = {
  suggested_departments: DepartmentDto[];
};
