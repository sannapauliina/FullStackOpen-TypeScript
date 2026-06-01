interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  dailyHours: number[];
  target: number;
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map((n) => Number(n));

  if (isNaN(target) || dailyHours.some((n) => isNaN(n))) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    dailyHours,
    target,
  };
};

export const calculateExercises = (
  dailyHours: number[],
  target: number,
): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((h) => h > 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;

  const success = average >= target;

  let rating = 1;
  let ratingDescription = "You need to work harder";

  if (average >= target) {
    rating = 3;
    ratingDescription = "Great job!";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { dailyHours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
