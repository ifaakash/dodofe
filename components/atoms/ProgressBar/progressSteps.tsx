"use client";

import cx from "classnames";

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressSteps({ currentStep, totalSteps }: ProgressStepsProps) {
  return (
    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all duration-300 ease-in-out"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  );
}