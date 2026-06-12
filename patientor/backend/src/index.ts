import express from "express";
import cors from "cors";
import diagnoseService from "./services/diagnoseService";
import patientService from "./services/patientService";
import { parseNewPatient } from "./zodSchemas";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/patients", (req, res) => {
  try {
    const newPatient = parseNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e: unknown) {
    let errorMessage = "Something went wrong.";
    if (e instanceof Error) {
      errorMessage += " Error: " + e.message;
    }
    res.status(400).send(errorMessage);
  }
});

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
  res.json(diagnoseService.getDiagnoses());
});

app.get("/api/patients", (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
