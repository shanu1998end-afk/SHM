import React from 'react';
import { Badge } from './ui/badge';

interface RiskBadgeProps {
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}

export function RiskBadge({ severity }: RiskBadgeProps) {
  const colors = {
    Low: 'bg-blue-100 text-blue-800 border-blue-300',
    Medium: 'bg-amber-100 text-amber-800 border-amber-300',
    High: 'bg-orange-100 text-orange-800 border-orange-300',
    Critical: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <Badge variant="outline" className={`${colors[severity]} border`}>
      {severity}
    </Badge>
  );
}
