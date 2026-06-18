import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import type { DiaryEntry } from "./types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const { data } = await axios.get<DiaryEntry[]>(
          "http://localhost:3000/api/diaries",
        );
        setDiaries(data);
      } catch (e) {
        console.error("Failed to fetch diaries:", e);
      }
    };

    fetchDiaries();
  }, []);

  const addDiary = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const newEntry = {
        date,
        weather,
        visibility,
        comment,
      };

      const { data } = await axios.post<DiaryEntry>(
        "http://localhost:3000/api/diaries",
        newEntry,
      );

      setDiaries(diaries.concat(data));

      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (!e.response) {
          setError("Network error: backend is not responding");
        } else {
          const axiosError = e as AxiosError<{ error: string }>;
          setError(axiosError.response.data?.error || "Unknown error");
        }
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Flight Diaries</h1>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>Error: {error}</div>
      )}

      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        {/* DATE */}
        <div>
          date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* WEATHER */}
        <div>
          weather:
          {["sunny", "rainy", "cloudy", "stormy", "windy"].map((w) => (
            <label key={w} style={{ marginLeft: "0.5rem" }}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={(e) => setWeather(e.target.value)}
              />
              {w}
            </label>
          ))}
        </div>

        {/* VISIBILITY */}
        <div>
          visibility:
          {["great", "good", "ok", "poor"].map((v) => (
            <label key={v} style={{ marginLeft: "0.5rem" }}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={(e) => setVisibility(e.target.value)}
              />
              {v}
            </label>
          ))}
        </div>

        {/* COMMENT */}
        <div>
          comment:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>
      <ul>
        {diaries.map((d) => (
          <li key={d.id}>
            <strong>{d.date}</strong> — {d.weather}, {d.visibility}
            {d.comment && <div>Comment: {d.comment}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
