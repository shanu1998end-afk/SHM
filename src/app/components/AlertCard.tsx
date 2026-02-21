import React from 'react';
import { Card, CardContent } from './ui/card';
import { RiskBadge } from './RiskBadge';
import { AlertTriangle, Activity, Waves, BrainCircuit } from 'lucide-react';
import { Alert } from '../data/mockData';

interface AlertCardProps {
  alert: Alert;
}

export function AlertCard({ alert }: AlertCardProps) {
  const icons = {
    Structural: Activity,
    Seismic: AlertTriangle,
    Flood: Waves,
    'AI Anomaly': BrainCircuit,
  };

  const Icon = icons[alert.riskType];

  return (
    <Card className="border-l-4 border-l-orange-500">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Icon className="h-5 w-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-gray-900">{alert.assetName}</h4>
              <RiskBadge severity={alert.severity} />
            </div>
            <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>{alert.riskType}</span>
              <span>•</span>
              <span>{alert.timestamp}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
