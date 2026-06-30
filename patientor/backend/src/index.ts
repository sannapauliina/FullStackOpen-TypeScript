import express from "express";
import cors from "cors";
import patientService from "./services/patientService";
import patientsRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";
import { EntrySchema } from "./utils";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnosesRouter);

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.post("/api/patients/:id/entries", (req, res) => {
  try {
    const parsedEntry = EntrySchema.parse(req.body);
    const updatedPatient = patientService.addEntry(req.params.id, parsedEntry);
    res.json(updatedPatient);
  } catch (e: unknown) {
    let message = "Something went wrong.";
    if (e instanceof Error) {
      message += " Error: " + e.message;
    }
    res.status(400).send(message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
