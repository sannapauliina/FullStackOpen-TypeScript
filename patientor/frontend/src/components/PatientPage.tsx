import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient, Diagnosis } from "../types";
import patientService from "../services/patients";
import EntryDetails from "./EntryDetails";
import axios from "axios";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const data = await patientService.getById(id);
        setPatient(data);
      }
    };
    void fetchPatient();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;

    const form = e.target as HTMLFormElement;

    const newEntry = {
      type: "HealthCheck",
      date: form.date.value,
      specialist: form.specialist.value,
      description: form.description.value,
      healthCheckRating: Number(form.healthCheckRating.value),
    };

    try {
      const updatedPatient = await patientService.addEntry(
        patient.id,
        newEntry,
      );
      setPatient(updatedPatient);
      setShowForm(false);
      setError(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || "Unknown error");
        form.reset();
      }
    }
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of birth: {patient.dateOfBirth}</p>

      <button
        onClick={() => {
          setError(null);
          setShowForm(true);
        }}
      >
        Add HealthCheck entry
      </button>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <div>
            <label>Date</label>
            <input name="date" />
          </div>

          <div>
            <label>Specialist</label>
            <input name="specialist" />
          </div>

          <div>
            <label>Description</label>
            <input name="description" />
          </div>

          <div>
            <label>HealthCheckRating</label>
            <input name="healthCheckRating" />
          </div>

          <button type="submit">Add</button>
        </form>
      )}

      <h3>Entries</h3>

      {patient.entries.length === 0 && <p>No entries yet.</p>}

      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
