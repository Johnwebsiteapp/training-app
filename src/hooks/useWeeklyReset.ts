"use client";
import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { trainingPlan } from "@/data/trainingPlan";

export interface WeekLog {
  weekStart: string; // ISO date string of Monday
  notes: Record<string, string>; // exerciseId -> note
  completed: Record<string, boolean>;
}

function getMondayOfWeek(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split("T")[0];
}

function getExerciseName(exerciseId: string): string {
  for (const day of trainingPlan) {
    if (day.content.type === "training") {
      const ex = day.content.exercises.find((e) => e.id === exerciseId);
      if (ex) return ex.name;
    }
  }
  return exerciseId;
}

export function formatWeekLabel(weekStart: string): string {
  const d = new Date(weekStart);
  const end = new Date(d);
  end.setDate(end.getDate() + 6);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  return `${d.toLocaleDateString("pl-PL", opts)} – ${end.toLocaleDateString("pl-PL", opts)}`;
}

export function formatNoteEntry(exerciseId: string, note: string): string {
  const name = getExerciseName(exerciseId);
  // Shorten the exercise name to first meaningful part
  const short = name.split("—")[0].trim();
  return `${short}: ${note}`;
}

export function useWeeklyReset() {
  const [currentWeek, setCurrentWeek, weekLoaded] = useLocalStorage<string>(
    "current-week",
    ""
  );
  const [completedExercises, setCompletedExercises] = useLocalStorage<
    Record<string, boolean>
  >("completed-exercises", {});
  const [notes, setNotes] = useLocalStorage<Record<string, string>>(
    "exercise-notes",
    {}
  );
  const [history, setHistory] = useLocalStorage<WeekLog[]>(
    "training-history",
    []
  );

  useEffect(() => {
    if (!weekLoaded) return;

    const thisMonday = getMondayOfWeek(new Date());

    if (currentWeek && currentWeek !== thisMonday) {
      // New week — archive old data and reset
      const hasData =
        Object.keys(completedExercises).length > 0 ||
        Object.values(notes).some((n) => n.trim() !== "");

      if (hasData) {
        const log: WeekLog = {
          weekStart: currentWeek,
          notes: { ...notes },
          completed: { ...completedExercises },
        };
        setHistory((prev) => [log, ...prev].slice(0, 12)); // keep last 12 weeks
      }

      // Reset completed exercises, keep notes empty
      setCompletedExercises({});
      setNotes({});
    }

    if (currentWeek !== thisMonday) {
      setCurrentWeek(thisMonday);
    }
  }, [
    weekLoaded,
    currentWeek,
    completedExercises,
    notes,
    setCurrentWeek,
    setCompletedExercises,
    setNotes,
    setHistory,
    history,
  ]);
}
