import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getById(req.params.id);

  if (!patient) {
    return res.status(404).send({ error: "Patient not found" });
  }

  res.json(patient);
});

router.post("/", (req, res) => {
  const newPatient = patientService.addPatient(req.body);
  res.json(newPatient);
});

export default router;
