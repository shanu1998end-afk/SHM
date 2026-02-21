import React from 'react';
import { Card, CardContent } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: string;
}

export function KPICard({ title, value, icon: Icon, trend, color = 'text-blue-600' }: KPICardProps) {
  const borderColorClass = {
    'text-blue-600': 'border-l-blue-600',
    'text-purple-600': 'border-l-purple-600',
    'text-red-600': 'border-l-red-600',
    'text-amber-600': 'border-l-amber-600',
    'text-orange-600': 'border-l-orange-600',
    'text-green-600': 'border-l-green-600',
  }[color] ?? 'border-l-blue-600';

  return (
    <Card className={`border-l-4 ${borderColorClass}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-semibold text-gray-900">{value}</p>
            {trend && <p className="text-xs text-gray-500 mt-2">{trend}</p>}
          </div>
          <div className={`${color} bg-opacity-10 p-3 rounded-lg`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
