type Part = {
  name: string;
  exerciseCount: number;
};

type ContentProps = {
  parts: Part[];
};

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((p) => (
        <p key={p.name}>
          {p.name} {p.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
