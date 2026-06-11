import { Gender, Patient } from "./types/patient";

export const toNewPatient = (object: any): Omit<Patient, "id"> => {
  const newPatient: Omit<Patient, "id"> = {
    name: parseString(object.name),
    dateOfBirth: parseString(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
  };

  return newPatient;
};

const parseString = (value: any): string => {
  if (!value || typeof value !== "string") {
    throw new Error("Incorrect or missing string value");
  }
  return value;
};

const parseGender = (value: any): Gender => {
  if (!value || !isGender(value)) {
    throw new Error("Incorrect or missing gender");
  }
  return value;
};

export const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
