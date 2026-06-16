import Part from "./Part";
import type { CoursePart } from "./types";

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((p) => (
        <Part key={p.name} part={p} />
      ))}
    </div>
  );
};

export default Content;
