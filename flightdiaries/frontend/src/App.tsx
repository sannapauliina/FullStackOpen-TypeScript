import { useEffect, useState } from "react";
import axios from "axios";
import type { DiaryEntry } from "./types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

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

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Flight Diaries</h1>

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
