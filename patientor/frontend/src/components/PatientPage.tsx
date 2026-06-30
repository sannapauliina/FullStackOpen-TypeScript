import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient, Diagnosis } from "../types";
import patientService from "../services/patients";
import EntryDetails from "./EntryDetails";
import axios from "axios";

import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  const [formType, setFormType] = useState<string | null>(null);

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
          setFormType("HealthCheck");
        }}
      >
        Add HealthCheck entry
      </button>

      <button
        onClick={() => {
          setError(null);
          setFormType("Hospital");
        }}
      >
        Add Hospital entry
      </button>

      <button
        onClick={() => {
          setError(null);
          setFormType("OccupationalHealthcare");
        }}
      >
        Add OccupationalHealthcare entry
      </button>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {formType === "HealthCheck" && (
        <HealthCheckEntryForm
          patient={patient}
          setPatient={setPatient}
          setError={setError}
          setShowForm={setFormType}
          diagnoses={diagnoses}
        />
      )}

      {formType === "Hospital" && (
        <HospitalEntryForm
          patient={patient}
          setPatient={setPatient}
          setError={setError}
          setShowForm={setFormType}
          diagnoses={diagnoses}
        />
      )}

      {formType === "OccupationalHealthcare" && (
        <OccupationalHealthcareEntryForm
          patient={patient}
          setPatient={setPatient}
          setError={setError}
          setShowForm={setFormType}
          diagnoses={diagnoses}
        />
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
