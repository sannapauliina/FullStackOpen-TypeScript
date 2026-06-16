import type { CoursePart } from "./types";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
          <br />
          {part.description}
        </p>
      );

    case "group":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
          <br />
          Group projects: {part.groupProjectCount}
        </p>
      );

    case "background":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
          <br />
          {part.description}
          <br />
          Background material: {part.backgroundMaterial}
        </p>
      );

    case "special":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
          <br />
          {part.description}
          <br />
          Requirements: {part.requirements.join(", ")}
        </p>
      );

    default:
      const _exhaustive: never = part;
      return _exhaustive;
  }
};

export default Part;
