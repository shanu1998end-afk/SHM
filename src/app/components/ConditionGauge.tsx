import React from 'react';

interface ConditionGaugeProps {
  value: number; // 0-100
  size?: number;
}

export function ConditionGauge({ value, size = 120 }: ConditionGaugeProps) {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const getColor = (val: number) => {
    if (val >= 70) return '#22c55e'; // green
    if (val >= 40) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const color = getColor(value);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        <span className="text-xs text-gray-500">Score</span>
      </div>
    </div>
  );
}
