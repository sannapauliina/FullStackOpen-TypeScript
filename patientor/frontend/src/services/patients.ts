import axios from "axios";
import { Patient, NewEntry } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const getById = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: Patient) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

const addEntry = async (id: string, entry: NewEntry): Promise<Patient> => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry,
  );
  return data;
};

export default {
  getAll,
  getById,
  create,
  addEntry,
};
