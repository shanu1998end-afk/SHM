import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Activity, TrendingUp, BarChart3, ShieldAlert, CheckCircle2, AlertTriangle, Cpu, BatteryCharging, Satellite } from 'lucide-react';
import { assets, anomalyTrendData, edgeUnits, frequencyDriftData } from '../data/mockData';
import { LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { StatusBadge } from '../components/StatusBadge';

export function Monitoring() {
  const criticalAssets = assets.filter((asset) => asset.riskLevel === 'Critical').length;
  const watchAssets = assets.filter((asset) => asset.riskLevel === 'Watch').length;
  const safeAssets = assets.filter((asset) => asset.riskLevel === 'Safe').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Infra Structural Health Monitoring</h2>
        <p className="text-gray-600 mt-1">Real-time vibration intelligence using edge DAQ + autoencoder anomaly detection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Activity className="h-10 w-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Safe Assets</h3>
            <p className="text-3xl font-semibold text-green-700">{safeAssets}</p>
            <p className="text-sm text-gray-600 mt-2">Operating within acceptable limits</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-10 w-10 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Watch Assets</h3>
            <p className="text-3xl font-semibold text-amber-700">{watchAssets}</p>
            <p className="text-sm text-gray-600 mt-2">Need targeted inspections and review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <ShieldAlert className="h-10 w-10 text-red-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Critical Assets / Alerts</h3>
            <p className="text-3xl font-semibold text-red-700">{criticalAssets}</p>
            <p className="text-sm text-gray-600 mt-2">Immediate field validation recommended</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Natural Frequency Drift (Bridge Baseline vs Current)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={frequencyDriftData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="baseline" stroke="#2563eb" strokeWidth={2} name="Healthy Baseline (Hz)" />
                <Line type="monotone" dataKey="current" stroke="#dc2626" strokeWidth={2} name="Current (Hz)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Autoencoder Reconstruction Error Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={anomalyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="anomalies" fill="#f97316" name="Detected anomalies" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>On-Bridge Processing Units (DAQ + AI Edge)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {edgeUnits.map((unit) => (
              <div key={unit.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">{unit.id}</p>
                  <StatusBadge status={unit.uptimePct > 98 ? 'Safe' : unit.uptimePct > 95 ? 'Watch' : 'Critical'} />
                </div>
                <div className="space-y-1 text-sm text-gray-700">
                  <p className="flex items-center gap-2"><Cpu className="h-4 w-4" />{unit.model} • {unit.cpuLoadPct}% CPU</p>
                  <p className="flex items-center gap-2"><BatteryCharging className="h-4 w-4" />{unit.powerSource}</p>
                  <p className="flex items-center gap-2"><Satellite className="h-4 w-4" />Satellite: {unit.satLink}</p>
                  <p>Storage: {unit.localStorageGb} GB SSD</p>
                  <p>Model: {unit.anomalyModelVersion}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SHM Workflow Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Inspect</h4>
              </div>
              <p className="text-sm text-gray-600">Sensors capture ambient vibration from decks and girders</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">Process</h4>
              </div>
              <p className="text-sm text-gray-600">Jetson DAQ performs filtering, FFT, and feature extraction</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-amber-600" />
                <h4 className="font-semibold text-gray-900">Assess</h4>
              </div>
              <p className="text-sm text-gray-600">Autoencoder compares real-time data against healthy state</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-red-600" />
                <h4 className="font-semibold text-gray-900">Act</h4>
              </div>
              <p className="text-sm text-gray-600">Control room triggers SMS/Email/WhatsApp alerts to officials</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
