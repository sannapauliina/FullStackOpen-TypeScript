import patients from "../../data/patients";
import { NonSensitivePatient, Patient, Entry } from "../types/patient";
import { v1 as uuid } from "uuid";

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

const getById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addEntry = (id: string, entry: Omit<Entry, "id">): Patient => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry = {
    ...(entry as Entry),
    id: uuid(),
  };

  patient.entries.push(newEntry);
  return patient;
};

export default {
  getNonSensitivePatients,
  addPatient,
  getById,
  addEntry,
};
