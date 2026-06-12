import { z } from "zod";
import { Gender } from "./types/patient";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
});

export const parseNewPatient = (data: unknown) => {
  return NewPatientSchema.parse(data);
};
