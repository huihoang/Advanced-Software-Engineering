import { GENDER, LOCALE, SORT_TYPE, USER_ROLE } from "@/constants";

export type Locale = `${LOCALE}`;
export type SortType = `${SORT_TYPE}`;
export type UserRole = `${USER_ROLE}`;
export type Gender = `${GENDER}`;

export * from "./pagination";
export * from "./response.dto";
