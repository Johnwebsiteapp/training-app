import type { CardioSection as CardioType } from "@/data/trainingPlan";

interface CardioSectionProps {
  cardio: CardioType;
}

export default function CardioSection({ cardio }: CardioSectionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5 bg-[#FF3366] rounded-full" />
        <h2 className="text-sm font-bold text-[#FF3366] uppercase tracking-wider">
          Cardio
        </h2>
      </div>
      <div className="bg-gray-900/60 border border-gray-800/50 rounded-2xl overflow-hidden">
        <div className="bg-[#FFB800] px-4 py-2">
          <p className="text-xs font-bold text-black">{cardio.title}</p>
        </div>
        <div className="p-4 space-y-3">
          {cardio.rounds.map((round, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-[#c8ff00] font-bold text-xs whitespace-nowrap min-w-[120px]">
                {round.label}
              </span>
              <span className="text-gray-400 text-xs">{round.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
