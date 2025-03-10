// src/components/dashboard/CreditScoreIndicator.tsx
import React from "react";

interface CreditScoreIndicatorProps {
  score: number;
}

export default function CreditScoreIndicator({
  score,
}: CreditScoreIndicatorProps) {
  // Determine the risk level and corresponding colors
  const getRisk = (score: number) => {
    if (score >= 750) return { level: "Excellent", color: "bg-green-500" };
    if (score >= 700) return { level: "Good", color: "bg-green-400" };
    if (score >= 650) return { level: "Fair", color: "bg-yellow-400" };
    if (score >= 600) return { level: "Poor", color: "bg-orange-400" };
    return { level: "Very Poor", color: "bg-red-500" };
  };

  const { level, color } = getRisk(score);

  // Calculate the percentage for the progress bar (assuming range 300-850)
  const percentage = Math.max(0, Math.min(100, ((score - 300) / 550) * 100));

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <span className="text-3xl font-bold">{score}</span>
        <span className={`px-3 py-1 rounded-full text-white text-sm ${color}`}>
          {level}
        </span>
      </div>

      {/* Progress bar track */}
      <div className="h-2 w-full bg-gray-200 rounded-full">
        {/* Progress bar fill */}
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Scale labels */}
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>300</span>
        <span>Poor</span>
        <span>Fair</span>
        <span>Good</span>
        <span>850</span>
      </div>

      {/* Score interpretation */}
      <div className="mt-4 text-sm">
        {level === "Excellent" &&
          "You qualify for the best loan rates available."}
        {level === "Good" &&
          "You qualify for most loans with competitive rates."}
        {level === "Fair" && "You qualify for standard loan rates."}
        {level === "Poor" && "You may face higher interest rates on loans."}
        {level === "Very Poor" && "You may need a guarantor for loan approval."}
      </div>
    </div>
  );
}
