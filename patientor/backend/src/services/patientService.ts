import patients from "../../data/patients";
import { NonSensitivePatient } from "../types/patient";
import { v1 as uuid } from "uuid";
import { Patient } from "../types/patient";

const addPatient = (patient: Omit<Patient, "id">): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatientById,
};
