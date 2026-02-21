import React from 'react';
import { Badge } from './ui/badge';

interface StatusBadgeProps {
  status: 'Safe' | 'Watch' | 'Critical';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors = {
    Safe: 'bg-green-100 text-green-800 border-green-300',
    Watch: 'bg-amber-100 text-amber-800 border-amber-300',
    Critical: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <Badge variant="outline" className={`${colors[status]} border`}>
      {status}
    </Badge>
  );
}
