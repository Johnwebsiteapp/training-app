"use client";
import { useTimer } from "@/hooks/useTimer";
import { useEffect } from "react";

interface RestTimerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RestTimer({ isOpen, onClose }: RestTimerProps) {
  const { timeLeft, isRunning, isFinished, start, reset } = useTimer(90);

  useEffect(() => {
    if (isOpen) {
      start();
    }
    return () => {
      reset();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((90 - timeLeft) / 90) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-8 p-8">
        <h2 className="text-xl font-bold text-white uppercase tracking-wider">
          {isFinished ? "Czas minął!" : "Przerwa"}
        </h2>

        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg
            className="absolute w-full h-full -rotate-90"
            viewBox="0 0 260 260"
          >
            <circle
              cx="130"
              cy="130"
              r="120"
              fill="none"
              stroke="#1a1a2e"
              strokeWidth="8"
            />
            <circle
              cx="130"
              cy="130"
              r="120"
              fill="none"
              stroke={isFinished ? "#FF3366" : "#c8ff00"}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="text-center z-10">
            <span
              className={`text-6xl font-bold tabular-nums ${
                isFinished ? "text-[#FF3366] animate-pulse" : "text-[#c8ff00]"
              }`}
            >
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
            {isRunning && (
              <p className="text-gray-400 text-sm mt-2">pozostało</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          {isFinished ? (
            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#c8ff00] text-black font-bold rounded-xl text-lg hover:bg-[#d4ff33] transition-colors"
            >
              OK, lecę dalej!
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  reset();
                  onClose();
                }}
                className="px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-xl hover:bg-gray-700 transition-colors"
              >
                Anuluj
              </button>
              <button
                onClick={start}
                className="px-6 py-3 bg-[#c8ff00] text-black font-bold rounded-xl hover:bg-[#d4ff33] transition-colors"
              >
                Restart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
