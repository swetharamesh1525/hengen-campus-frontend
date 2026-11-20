export type UserRole =
  | "principal"
  | "accountant"
  | "teacher"
  | "super_admin";

export type User = {
  id: string;
  name: string;
  role: UserRole;
  schoolId: string;
  locale: string;
};

export type MeResponse = {
  data: User;
};