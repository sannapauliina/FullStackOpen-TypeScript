import { z } from "zod";

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export const NewDiaryEntrySchema = z.object({
  date: z.string(),
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  comment: z.string(),
});

export type NewDiaryEntry = z.infer<typeof NewDiaryEntrySchema>;
