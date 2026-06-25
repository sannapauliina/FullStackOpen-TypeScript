import { Entry, Diagnosis } from "../types";
import { LocalHospital, Work, Favorite } from "@mui/icons-material";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const getDiagnosisName = (code: string) => {
    const diag = diagnoses.find((d) => d.code === code);
    return diag ? diag.name : "";
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <LocalHospital />
          <p>
            <strong>{entry.date}</strong>
          </p>
          <p>{entry.description}</p>
          <p>Specialist: {entry.specialist}</p>

          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {getDiagnosisName(code)}
                </li>
              ))}
            </ul>
          )}

          <p>
            Discharge: {entry.discharge.date} – {entry.discharge.criteria}
          </p>
        </div>
      );

    case "OccupationalHealthcare":
      return (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Work />
          <p>
            <strong>{entry.date}</strong> — Employer: {entry.employerName}
          </p>
          <p>{entry.description}</p>
          <p>Specialist: {entry.specialist}</p>

          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {getDiagnosisName(code)}
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    case "HealthCheck":
      return (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Favorite />
          <p>
            <strong>{entry.date}</strong>
          </p>
          <p>{entry.description}</p>
          <p>Specialist: {entry.specialist}</p>

          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {getDiagnosisName(code)}
                </li>
              ))}
            </ul>
          )}

          <p>Health rating: {entry.healthCheckRating}</p>
        </div>
      );

    default:
      const _exhaustiveCheck: never = entry;
      return _exhaustiveCheck;
  }
};

export default EntryDetails;
