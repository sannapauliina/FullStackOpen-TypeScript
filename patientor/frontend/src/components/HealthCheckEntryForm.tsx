import axios from "axios";
import patientService from "../services/patients";

const HealthCheckEntryForm = ({
  patient,
  setPatient,
  setError,
  setShowForm,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

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
      setShowForm(null);
      setError(null);
      form.reset();
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
  );
};

export default HealthCheckEntryForm;
