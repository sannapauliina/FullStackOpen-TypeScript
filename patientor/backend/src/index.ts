import express from "express";
import cors from "cors";
import diagnoseService from "./services/diagnoseService";

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
  res.json(diagnoseService.getDiagnoses());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
