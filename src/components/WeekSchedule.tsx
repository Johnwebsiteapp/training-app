"use client";
import Link from "next/link";
import { trainingPlan } from "@/data/trainingPlan";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function WeekSchedule() {
  const today = new Date().getDay(); // 0=Sun, 1=Mon, ...
  const dayMap: Record<number, number> = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
  const todayId = dayMap[today] || 0;

  const [completedExercises] = useLocalStorage<Record<string, boolean>>(
    "completed-exercises",
    {}
  );

  const getDayProgress = (dayId: number) => {
    const day = trainingPlan.find((d) => d.id === dayId);
    if (!day || day.content.type === "rest") return null;
    const exercises = day.content.exercises;
    const done = exercises.filter((e) => completedExercises[e.id]).length;
    return { done, total: exercises.length };
  };

  return (
    <div className="space-y-3">
      {trainingPlan.map((day) => {
        const isToday = day.id === todayId;
        const progress = getDayProgress(day.id);

        return (
          <Link key={day.id} href={`/day/${day.id}`}>
            <div
              className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all hover:scale-[1.01] active:scale-[0.99] ${
                isToday
                  ? "bg-gray-800/80 border-[#c8ff00]/40 shadow-lg shadow-[#c8ff00]/5"
                  : "bg-gray-900/60 border-gray-800/50 hover:border-gray-700"
              }`}
            >
              {/* Day badge */}
              <div
                className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                style={{ backgroundColor: day.color + "20" }}
              >
                <span
                  className="text-[10px] font-bold"
                  style={{ color: day.color }}
                >
                  {day.dayShort}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-base">
                    {day.name}
                  </h3>
                  {isToday && (
                    <span className="text-[10px] font-bold bg-[#c8ff00] text-black px-2 py-0.5 rounded-full">
                      DZIŚ
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-xs mt-0.5">{day.category}</p>
              </div>

              {/* Progress */}
              {progress && (
                <div className="flex-shrink-0 text-right">
                  <span
                    className={`text-sm font-bold ${
                      progress.done === progress.total
                        ? "text-[#c8ff00]"
                        : "text-gray-500"
                    }`}
                  >
                    {progress.done}/{progress.total}
                  </span>
                </div>
              )}

              {day.content.type === "rest" && (
                <span className="text-gray-600 text-xs">🧘</span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
