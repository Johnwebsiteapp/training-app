"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import { trainingPlan } from "@/data/trainingPlan";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ExerciseCard from "@/components/ExerciseCard";
import WarmupSection from "@/components/WarmupSection";
import CardioSection from "@/components/CardioSection";
import RestTimer from "@/components/RestTimer";

export default function DayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const dayId = parseInt(id);
  const day = trainingPlan.find((d) => d.id === dayId);

  const [completedExercises, setCompletedExercises] = useLocalStorage<
    Record<string, boolean>
  >("completed-exercises", {});
  const [notes, setNotes] = useLocalStorage<Record<string, string>>(
    "exercise-notes",
    {}
  );
  const [timerOpen, setTimerOpen] = useState(false);

  // Auto-open timer if one is running in background
  useEffect(() => {
    const savedEnd = localStorage.getItem("rest-timer-end");
    if (savedEnd) {
      const remaining = Math.round((parseInt(savedEnd, 10) - Date.now()) / 1000);
      if (remaining > 0 || remaining > -5) {
        setTimerOpen(true);
      }
    }
  }, []);

  if (!day) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <p>Nie znaleziono dnia treningowego.</p>
      </div>
    );
  }

  const toggleComplete = (exerciseId: string) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  const updateNote = (exerciseId: string, note: string) => {
    setNotes((prev) => ({
      ...prev,
      [exerciseId]: note,
    }));
  };

  const content = day.content;

  // Progress for training days
  const progress =
    content.type === "training"
      ? {
          done: content.exercises.filter((e) => completedExercises[e.id])
            .length,
          total: content.exercises.length,
        }
      : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      {/* Header */}
      <div
        className="px-5 pt-10 pb-6"
        style={{
          background: `linear-gradient(180deg, ${day.color}15 0%, transparent 100%)`,
        }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-gray-500 text-sm mb-4 hover:text-gray-300 transition-colors"
        >
          ← Powrót
        </Link>

        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: day.color + "20",
              color: day.color,
            }}
          >
            {day.dayShort}
          </span>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: day.color + "20",
              color: day.color,
            }}
          >
            {day.name}
          </span>
        </div>

        <h1 className="text-2xl font-black mt-2">
          DZIEŃ {day.id} — {day.name}
        </h1>
        <p className="text-gray-500 text-sm mt-1">{day.category}</p>

        {/* Progress bar */}
        {progress && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-500">Postęp</span>
              <span className="text-[#c8ff00] font-bold">
                {progress.done}/{progress.total}
              </span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#c8ff00] rounded-full transition-all duration-500"
                style={{
                  width: `${(progress.done / progress.total) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="px-5">
        {content.type === "training" ? (
          <>
            {/* Warmup */}
            <WarmupSection items={content.warmup} />

            {/* Exercises */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-[#FF3366] rounded-full" />
                <h2 className="text-sm font-bold text-[#FF3366] uppercase tracking-wider">
                  Trening siłowy
                </h2>
              </div>
              <div className="space-y-3">
                {content.exercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    completed={!!completedExercises[exercise.id]}
                    note={notes[exercise.id] || ""}
                    onToggleComplete={() => toggleComplete(exercise.id)}
                    onNoteChange={(note) => updateNote(exercise.id, note)}
                    onStartRest={() => setTimerOpen(true)}
                  />
                ))}
              </div>
            </div>

            {/* Cardio */}
            <CardioSection cardio={content.cardio} />
          </>
        ) : (
          /* Rest day */
          <div className="space-y-6">
            <div className="bg-gray-900/60 border border-[#FFB800]/20 rounded-2xl p-5">
              <h2 className="text-lg font-bold text-[#FFB800] mb-2">
                Dlaczego to ważne
              </h2>
              <p className="text-gray-400 text-sm">{content.description}</p>
            </div>

            {content.options.map((option, i) => (
              <div
                key={i}
                className="bg-gray-900/60 border border-gray-800/50 rounded-2xl p-5"
              >
                <h3 className="text-[#00E5A0] font-bold text-sm mb-3">
                  {option.title}
                </h3>
                <ul className="space-y-2">
                  {option.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-gray-400 text-sm flex items-start gap-2"
                    >
                      <span className="text-[#00E5A0]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="bg-[#FF3366]/10 border border-[#FF3366]/20 rounded-2xl p-5">
              <p className="text-[#FF3366] font-bold text-sm">
                {content.note}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Rest Timer Modal */}
      <RestTimer isOpen={timerOpen} onClose={() => setTimerOpen(false)} />

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#111]/95 backdrop-blur-lg border-t border-gray-800/50 z-40">
        <div className="max-w-md mx-auto flex justify-around py-3">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-[10px] font-semibold">Dashboard</span>
          </Link>
          <div className="flex flex-col items-center gap-1 text-[#c8ff00]">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-[10px] font-semibold">Trening</span>
          </div>
          <Link
            href="/settings"
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-[10px] font-semibold">Profil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
