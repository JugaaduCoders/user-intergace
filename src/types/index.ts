/* eslint-disable @typescript-eslint/no-explicit-any */
export type GenericType = { [key: string]: Record<string, any> };

export type Any = any;

type UserRole = "participant" | "user" | "admin";

export interface User {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type Hackathon = {
  id: number;
  name: string;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date | null;
  createdBy: number | null;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  isPublic: boolean | null;
  maxTeamSize: number | null;
  prizes: string;
  requirements: string;
  overview: string;
  themes: string;
};
