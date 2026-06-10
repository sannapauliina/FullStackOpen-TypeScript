import { Patient } from "./patient";

export type NonSensitivePatient = Omit<Patient, "ssn">;
