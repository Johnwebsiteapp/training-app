"use client";
import { useState } from "react";

export interface UserProfile {
  name: string;
  age: string;
  height: string;
  weight: string;
  goal: string;
}

interface OnboardingModalProps {
  onComplete: (profile: UserProfile) => void;
}

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
  });

  const steps = [
    {
      key: "name" as const,
      label: "Jak masz na imię?",
      placeholder: "Twoje imię",
      type: "text",
      required: true,
    },
    {
      key: "age" as const,
      label: "Ile masz lat?",
      placeholder: "np. 25",
      type: "number",
      required: false,
    },
    {
      key: "height" as const,
      label: "Jaki masz wzrost? (cm)",
      placeholder: "np. 180",
      type: "number",
      required: false,
    },
    {
      key: "weight" as const,
      label: "Ile ważysz? (kg)",
      placeholder: "np. 75",
      type: "number",
      required: false,
    },
    {
      key: "goal" as const,
      label: "Co chcesz osiągnąć na siłowni?",
      placeholder: "np. Zbudować masę mięśniową, schudnąć...",
      type: "textarea",
      required: false,
    },
  ];

  const currentStep = steps[step];
  const isLast = step === steps.length - 1;
  const canProceed = !currentStep.required || profile[currentStep.key].trim() !== "";

  const handleNext = () => {
    if (!canProceed) return;
    if (isLast) {
      onComplete(profile);
    } else {
      setStep(step + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentStep.type !== "textarea" && canProceed) {
      handleNext();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-md px-6">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-12">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step
                  ? "w-8 bg-[#c8ff00]"
                  : i < step
                  ? "w-4 bg-[#c8ff00]/40"
                  : "w-4 bg-gray-800"
              }`}
            />
          ))}
        </div>

        {/* Step label */}
        <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
          Krok {step + 1} z {steps.length}
        </p>
        <h1 className="text-2xl font-black text-white mb-8">
          {currentStep.label}
        </h1>

        {/* Input */}
        {currentStep.type === "textarea" ? (
          <textarea
            value={profile[currentStep.key]}
            onChange={(e) =>
              setProfile({ ...profile, [currentStep.key]: e.target.value })
            }
            placeholder={currentStep.placeholder}
            className="w-full bg-gray-900/80 border border-gray-700 rounded-2xl px-5 py-4 text-lg text-white placeholder-gray-600 resize-none focus:outline-none focus:border-[#c8ff00]/50 transition-colors"
            rows={4}
            autoFocus
          />
        ) : (
          <input
            type={currentStep.type}
            value={profile[currentStep.key]}
            onChange={(e) =>
              setProfile({ ...profile, [currentStep.key]: e.target.value })
            }
            onKeyDown={handleKeyDown}
            placeholder={currentStep.placeholder}
            className="w-full bg-gray-900/80 border border-gray-700 rounded-2xl px-5 py-4 text-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#c8ff00]/50 transition-colors"
            autoFocus
          />
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3.5 bg-gray-800 text-gray-300 font-semibold rounded-2xl hover:bg-gray-700 transition-colors"
            >
              ←
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex-1 py-3.5 font-bold rounded-2xl text-base transition-all ${
              canProceed
                ? "bg-[#c8ff00] text-black hover:bg-[#d4ff33] active:scale-[0.98]"
                : "bg-gray-800 text-gray-600 cursor-not-allowed"
            }`}
          >
            {isLast ? "Zaczynamy! 💪" : "Dalej →"}
          </button>
        </div>

        {/* Skip option for optional fields */}
        {!currentStep.required && (
          <button
            onClick={handleNext}
            className="w-full mt-3 text-gray-600 text-sm hover:text-gray-400 transition-colors"
          >
            Pomiń
          </button>
        )}
      </div>
    </div>
  );
}
