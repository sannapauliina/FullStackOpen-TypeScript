import { useEffect, useState } from "react";
import axios from "axios";
import type { DiaryEntry } from "./types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

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
      } catch (error) {
        console.error("Failed to fetch diaries:", error);
      }
    };

    fetchDiaries();
  }, []);

  const addDiary = async (event: React.FormEvent) => {
    event.preventDefault();

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
    } catch (error) {
      console.error("Failed to add diary:", error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Flight Diaries</h1>

      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <div>
          date:
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          weather:
          <input
            type="text"
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>

        <div>
          visibility:
          <input
            type="text"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>

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
