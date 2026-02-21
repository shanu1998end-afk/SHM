import React from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { StatusBadge } from '../components/StatusBadge';
import { Building2, CloudRain, AlertTriangle, ClipboardCheck, ShieldCheck, Siren, BellRing } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { conditionTrendData, assets, alerts, inspections } from '../data/mockData';
import { Button } from '../components/ui/button';
import { PakistanAssetMap } from '../components/PakistanAssetMap';

export function Dashboard() {
  const bridgesCount = assets.filter((asset) => asset.type === 'Bridge').length;
  const buildingsCount = assets.filter((asset) => asset.type === 'Building').length;
  const criticalCount = assets.filter((asset) => asset.riskLevel === 'Critical').length;
  const inspectionsDue = inspections.filter((inspection) => inspection.status !== 'Completed').length;
  const recentHazardImpacts = alerts.filter((alert) => alert.riskType === 'Flood' || alert.riskType === 'Seismic').length;
  const criticalAlerts = alerts.filter((alert) => alert.severity === 'Critical' || alert.severity === 'High');

  const COLORS = {
    Safe: '#22c55e',
    Watch: '#f59e0b',
    Critical: '#ef4444',
  };

  const leftRailCards = [
    {
      title: 'Bridges Monitored',
      value: bridgesCount,
      icon: Building2,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700',
      valueColor: 'text-slate-900',
    },
    {
      title: 'Govt. Buildings Monitored',
      value: buildingsCount,
      icon: Building2,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-700',
      valueColor: 'text-slate-900',
    },
    {
      title: 'Critical Structures',
      value: criticalCount,
      icon: AlertTriangle,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-700',
      valueColor: 'text-red-600',
    },
    {
      title: 'Inspections Due',
      value: inspectionsDue,
      icon: ClipboardCheck,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700',
      valueColor: 'text-amber-600',
    },
    {
      title: 'Recent Hazard Impacts',
      value: recentHazardImpacts,
      icon: ShieldCheck,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
      valueColor: 'text-emerald-600',
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white/85 backdrop-blur p-4 shadow-[0_8px_30px_rgba(2,6,23,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Infra Early Warning System - Control Room</h2>
            <p className="text-sm text-slate-600 mt-1">Real-time national structural health snapshot</p>
          </div>
          <div className="flex flex-wrap gap-3">
          <Link to="/asset/BRG-001">
              <Button variant="outline" size="sm">Open Bridge Detail</Button>
          </Link>
          <Link to="/asset/BLD-002">
              <Button variant="outline" size="sm">Open Building Detail</Button>
          </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-3 space-y-3">
          {leftRailCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="bg-white/88 border-slate-200 shadow-[0_6px_20px_rgba(2,6,23,0.08)]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`${item.iconBg} rounded-lg p-2.5`}>
                      <Icon className={`h-5 w-5 ${item.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                      <p className={`text-3xl leading-none mt-1 font-bold ${item.valueColor}`}>{item.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="xl:col-span-6 bg-white/80 border-slate-200 shadow-[0_10px_30px_rgba(2,6,23,0.1)]">
          <CardContent className="p-3">
            <PakistanAssetMap assets={assets} height={420} />
          </CardContent>
        </Card>

        <div className="xl:col-span-3 space-y-4">
          <Card className="overflow-hidden border-red-200 bg-white/90 shadow-[0_8px_24px_rgba(239,68,68,0.15)]">
            <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-3">
              <div className="flex items-center gap-2 font-semibold">
                <Siren className="h-4 w-4" />
                Critical Alerts
              </div>
              <span className="text-3xl font-bold leading-none">{criticalAlerts.length}</span>
            </div>
            <CardContent className="p-4">
              <div className="text-sm text-slate-700">
                <span className="font-semibold">{assets.filter((asset) => asset.type === 'Bridge' && asset.riskLevel === 'Critical').length} Bridges</span>
                <span className="mx-1">|</span>
                <span className="font-semibold">{assets.filter((asset) => asset.type === 'Building' && asset.riskLevel === 'Critical').length} Building</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-blue-200 bg-white/90 shadow-[0_8px_24px_rgba(59,130,246,0.14)]">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-3 font-semibold">
              <BellRing className="h-4 w-4" />
              Recent Incidents
            </div>
            <CardContent className="p-4 space-y-4">
              {alerts.slice(0, 2).map((alert) => (
                <div key={alert.id} className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                  <p className="text-sm font-semibold text-slate-800">{alert.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{alert.timestamp}</p>
                </div>
              ))}
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-800 flex items-center gap-2">
                <CloudRain className="h-3.5 w-3.5" />
                Early warning feed active for high-risk zones.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card className="bg-white/88 border-slate-200 shadow-[0_8px_24px_rgba(2,6,23,0.09)]">
          <CardHeader className="pb-1">
            <CardTitle>Structural Condition Trend</CardTitle>
            <p className="text-sm text-slate-500">Last 12 Months</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={conditionTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="safe" stroke={COLORS.Safe} strokeWidth={3} dot={false} name="Safe" />
                <Line type="monotone" dataKey="watch" stroke={COLORS.Watch} strokeWidth={3} dot={false} name="Watch" />
                <Line type="monotone" dataKey="critical" stroke={COLORS.Critical} strokeWidth={3} dot={false} name="Critical" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/88 border-slate-200 shadow-[0_8px_24px_rgba(2,6,23,0.09)]">
        <CardHeader>
          <CardTitle>Critical & Watch List Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Asset ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Last Inspection</th>
                </tr>
              </thead>
              <tbody>
                {assets
                  .filter((asset) => asset.riskLevel !== 'Safe')
                  .map((asset) => (
                    <tr key={asset.id} className="border-b border-slate-100 hover:bg-blue-50/40">
                      <td className="py-3 px-4 text-sm font-medium text-slate-900">{asset.id}</td>
                      <td className="py-3 px-4 text-sm text-slate-900">{asset.name}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{asset.type}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{asset.district}, {asset.province}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={asset.riskLevel} />
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">{asset.lastInspection}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
