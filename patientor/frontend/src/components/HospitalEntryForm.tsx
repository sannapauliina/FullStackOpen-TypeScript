import { useState } from "react";
import axios from "axios";
import patientService from "../services/patients";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const HospitalEntryForm = ({
  patient,
  setPatient,
  setError,
  setShowForm,
  diagnoses,
}) => {
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newEntry = {
      type: "Hospital",
      date: form.date.value,
      specialist: form.specialist.value,
      description: form.description.value,
      diagnosisCodes: selectedCodes,
      discharge: {
        date: form.dischargeDate.value,
        criteria: form.dischargeCriteria.value,
      },
    };

    try {
      const updatedPatient = await patientService.addEntry(
        patient.id,
        newEntry,
      );
      setPatient(updatedPatient);
      setShowForm(null);
      setError(null);
      form.reset();
      setSelectedCodes([]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || "Unknown error");
        form.reset();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <div>
        <label>Date</label>
        <input name="date" type="date" required />
      </div>

      <div>
        <label>Specialist</label>
        <input name="specialist" required />
      </div>

      <div>
        <label>Description</label>
        <input name="description" required />
      </div>

      <FormControl fullWidth style={{ marginTop: "1rem" }}>
        <InputLabel>Diagnosis codes</InputLabel>
        <Select
          multiple
          name="diagnosisCodes"
          value={selectedCodes}
          onChange={(e) => setSelectedCodes(e.target.value)}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code} — {d.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{ marginTop: "1rem" }}>
        <label>Discharge date</label>
        <input name="dischargeDate" type="date" required />
      </div>

      <div>
        <label>Discharge criteria</label>
        <input name="dischargeCriteria" required />
      </div>

      <button type="submit" style={{ marginTop: "1rem" }}>
        Add
      </button>
    </form>
  );
};

export default HospitalEntryForm;
