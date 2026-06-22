import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient } from "../types";
import patientService from "../services/patients";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

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

      <h3>Entries</h3>
      {patient.entries.length === 0 && <p>No entries yet.</p>}
    </div>
  );
};

export default PatientPage;
