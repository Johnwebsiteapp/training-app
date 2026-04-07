"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { UserProfile } from "@/components/OnboardingModal";

export default function SettingsPage() {
  const [savedProfile, setSavedProfile, isLoaded] =
    useLocalStorage<UserProfile | null>("user-profile", null);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isLoaded && savedProfile) {
      setProfile(savedProfile);
    }
  }, [isLoaded, savedProfile]);

  const handleSave = () => {
    if (!profile.name.trim()) return;
    setSavedProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      {/* Header */}
      <div className="px-5 pt-10 pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-gray-500 text-sm mb-4 hover:text-gray-300 transition-colors"
        >
          ← Powrót
        </Link>
        <h1 className="text-2xl font-black">Ustawienia profilu</h1>
        <p className="text-gray-500 text-sm mt-1">
          Edytuj swoje dane treningowe
        </p>
      </div>

      {/* Form */}
      <div className="px-5 space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Imię *
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="Twoje imię"
            className="w-full bg-gray-900/80 border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#c8ff00]/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Wiek
          </label>
          <input
            type="number"
            value={profile.age}
            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
            placeholder="np. 25"
            className="w-full bg-gray-900/80 border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#c8ff00]/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Wzrost (cm)
          </label>
          <input
            type="number"
            value={profile.height}
            onChange={(e) => setProfile({ ...profile, height: e.target.value })}
            placeholder="np. 180"
            className="w-full bg-gray-900/80 border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#c8ff00]/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Waga (kg)
          </label>
          <input
            type="number"
            value={profile.weight}
            onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
            placeholder="np. 75"
            className="w-full bg-gray-900/80 border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#c8ff00]/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Cel treningowy
          </label>
          <textarea
            value={profile.goal}
            onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
            placeholder="np. Zbudować masę mięśniową, schudnąć..."
            rows={4}
            className="w-full bg-gray-900/80 border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-600 resize-none focus:outline-none focus:border-[#c8ff00]/50 transition-colors"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!profile.name.trim()}
          className={`w-full py-3.5 font-bold rounded-2xl text-base transition-all ${
            profile.name.trim()
              ? saved
                ? "bg-[#00E5A0] text-black"
                : "bg-[#c8ff00] text-black hover:bg-[#d4ff33] active:scale-[0.98]"
              : "bg-gray-800 text-gray-600 cursor-not-allowed"
          }`}
        >
          {saved ? "Zapisano ✓" : "Zapisz zmiany"}
        </button>
      </div>

      {/* Profile summary card */}
      {savedProfile && (
        <div className="px-5 mt-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Twój profil
          </h2>
          <div className="bg-gray-900/60 border border-gray-800/50 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Imię</span>
              <span className="text-white font-semibold text-sm">
                {savedProfile.name}
              </span>
            </div>
            {savedProfile.age && (
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Wiek</span>
                <span className="text-white font-semibold text-sm">
                  {savedProfile.age} lat
                </span>
              </div>
            )}
            {savedProfile.height && (
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Wzrost</span>
                <span className="text-white font-semibold text-sm">
                  {savedProfile.height} cm
                </span>
              </div>
            )}
            {savedProfile.weight && (
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Waga</span>
                <span className="text-white font-semibold text-sm">
                  {savedProfile.weight} kg
                </span>
              </div>
            )}
            {savedProfile.goal && (
              <div>
                <span className="text-gray-500 text-sm block mb-1">Cel</span>
                <span className="text-gray-300 text-sm">
                  {savedProfile.goal}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

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
          <Link
            href="/day/1"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-[10px] font-semibold">Profil</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
