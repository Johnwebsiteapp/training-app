import type { WarmupItem } from "@/data/trainingPlan";

interface WarmupSectionProps {
  items: WarmupItem[];
}

export default function WarmupSection({ items }: WarmupSectionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5 bg-[#c8ff00] rounded-full" />
        <h2 className="text-sm font-bold text-[#c8ff00] uppercase tracking-wider">
          Rozgrzewka — 10 min
        </h2>
      </div>
      <div className="bg-gray-900/60 border border-gray-800/50 rounded-2xl p-4">
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
              <span className="text-[#c8ff00] mt-0.5">•</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
