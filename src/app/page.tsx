"use client";
import WeekSchedule from "@/components/WeekSchedule";
import OnboardingModal from "@/components/OnboardingModal";
import type { UserProfile } from "@/components/OnboardingModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useWeeklyReset } from "@/hooks/useWeeklyReset";
import Link from "next/link";

export default function Home() {
  const today = new Date().getDay();
  const dayMap: Record<number, number> = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
  const todayId = dayMap[today] || 1;

  const [userProfile, setUserProfile, isLoaded] =
    useLocalStorage<UserProfile | null>("user-profile", null);

  useWeeklyReset();

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  if (!isLoaded) return null;

  if (!userProfile) {
    return <OnboardingModal onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="px-5 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 bg-[#c8ff00] rounded-lg flex items-center justify-center">
            <span className="text-black font-black text-xs">PP</span>
          </div>
          <span className="text-gray-500 text-xs font-semibold uppercase tracking-widest">
            Push / Pull
          </span>
        </div>
        <h1 className="text-3xl font-black mt-4 leading-tight">
          Cześć, {userProfile.name}!
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Plan dla początkujących. Filtruj dyscypliną i trenuj.
        </p>
      </header>

      {/* Quick start */}
      <div className="px-5 mb-6">
        <Link href={`/day/${todayId}`}>
          <button className="w-full py-4 bg-[#c8ff00] text-black font-bold rounded-2xl text-base hover:bg-[#d4ff33] transition-colors active:scale-[0.98]">
            ROZPOCZNIJ TRENING →
          </button>
        </Link>
      </div>

      {/* Week schedule */}
      <div className="px-5 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
            Ten tydzień
          </h2>
        </div>
        <WeekSchedule />
      </div>

      {/* Key rules */}
      <div className="px-5 pb-24">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
          Kluczowe zasady
        </h2>
        <div className="space-y-3">
          {[
            {
              label: "PROGRESJA",
              text: "Co 1-2 tygodnie dodaj 2,5 kg do sztangi lub 1 powt. do serii",
              color: "#FF3366",
            },
            {
              label: "BIAŁKO",
              text: "1,6 - 2 g na kg masy ciała dziennie — fundament rekompo",
              color: "#c8ff00",
            },
            {
              label: "KALORIE",
              text: "Lekki deficyt 100-200 kcal. Nie głoduj — chcesz budować mięśnie",
              color: "#00E5A0",
            },
            {
              label: "SEN",
              text: "7-9 godzin. Tam rosną mięśnie, nie na siłowni",
              color: "#FFB800",
            },
          ].map((rule) => (
            <div
              key={rule.label}
              className="bg-gray-900/60 border border-gray-800/50 rounded-xl p-4 flex gap-3"
            >
              <span
                className="text-xs font-bold whitespace-nowrap"
                style={{ color: rule.color }}
              >
                {rule.label}
              </span>
              <span className="text-gray-400 text-xs">{rule.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#111]/95 backdrop-blur-lg border-t border-gray-800/50 z-40">
        <div className="max-w-md mx-auto flex justify-around py-3">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 text-[#c8ff00]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-[10px] font-semibold">Dashboard</span>
          </Link>
          <Link
            href={`/day/${todayId}`}
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-[10px] font-semibold">Trening</span>
          </Link>
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
