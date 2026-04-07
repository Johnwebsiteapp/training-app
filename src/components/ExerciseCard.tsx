"use client";
import { useState } from "react";
import type { Exercise } from "@/data/trainingPlan";

interface ExerciseCardProps {
  exercise: Exercise;
  completed: boolean;
  note: string;
  onToggleComplete: () => void;
  onNoteChange: (note: string) => void;
  onStartRest: () => void;
}

export default function ExerciseCard({
  exercise,
  completed,
  note,
  onToggleComplete,
  onNoteChange,
  onStartRest,
}: ExerciseCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showNote, setShowNote] = useState(false);

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        completed
          ? "bg-gray-900/40 border-gray-800/50 opacity-50"
          : "bg-gray-900/80 border-gray-700/50"
      }`}
    >
      <div
        className="flex items-start gap-3 p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Number */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
            completed
              ? "bg-gray-800 text-gray-600"
              : "bg-[#c8ff00]/10 text-[#c8ff00]"
          }`}
        >
          {exercise.number}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-sm leading-tight ${
              completed ? "text-gray-600 line-through" : "text-white"
            }`}
          >
            {exercise.name}
          </h3>
          {exercise.tip && (
            <p className="text-xs text-gray-500 mt-1 italic">
              {exercise.tip}
            </p>
          )}
        </div>

        {/* Sets */}
        <span
          className={`flex-shrink-0 text-sm font-bold whitespace-nowrap ${
            completed ? "text-gray-700" : "text-[#c8ff00]"
          }`}
        >
          {exercise.sets}
        </span>
      </div>

      {/* Expanded actions */}
      {expanded && (
        <div className="px-4 pb-4 pt-0 flex flex-col gap-3 border-t border-gray-800/50">
          <div className="flex gap-2 pt-3">
            {/* Complete button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete();
              }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                completed
                  ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  : "bg-[#c8ff00] text-black hover:bg-[#d4ff33]"
              }`}
            >
              {completed ? "Cofnij" : "Ukończone ✓"}
            </button>

            {/* Rest timer button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartRest();
              }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              ⏱ Przerwa 90s
            </button>
          </div>

          {/* Note toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowNote(!showNote);
            }}
            className="text-xs text-gray-500 hover:text-gray-300 text-left transition-colors"
          >
            {showNote ? "Ukryj notatkę" : "📝 Dodaj notatkę"}
          </button>

          {showNote && (
            <textarea
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder="Twoja notatka (np. ciężar, samopoczucie...)"
              className="w-full bg-gray-800/80 border border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-[#c8ff00]/50"
              rows={2}
            />
          )}
        </div>
      )}
    </div>
  );
}
