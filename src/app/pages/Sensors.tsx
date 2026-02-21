import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Activity, Radio, TrendingUp, Gauge, Cpu } from 'lucide-react';
import { assets, sensors } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLiveSensors } from '../hooks/useLiveSensors';

export function Sensors() {
  const { sensorData, connected, lastSync } = useLiveSensors(sensors);

  const bridgeAsset = assets.find((asset) => asset.id === 'BRG-001');
  const buildingAsset = assets.find((asset) => asset.id === 'BLD-002');

  const bridgeInstallPoints = [
    {
      id: 'ACC-B1',
      point: 'Deck mid-span (Girder G2)',
      localRef: 'Chainage 40.0 m from North abutment',
      lat: 33.767640,
      lng: 72.364510,
      purpose: 'Captures dominant vertical bending mode',
    },
    {
      id: 'ACC-B2',
      point: 'Pier P1 cap beam near bearing line',
      localRef: 'Chainage 18.0 m from North abutment',
      lat: 33.767552,
      lng: 72.364321,
      purpose: 'Captures support-zone vibration transfer',
    },
    {
      id: 'ACC-B3',
      point: 'Pier P2 cap beam near bearing line',
      localRef: 'Chainage 62.0 m from North abutment',
      lat: 33.767701,
      lng: 72.364690,
      purpose: 'Captures asymmetry/torsional response',
    },
  ];

  const buildingInstallPoints = [
    {
      id: 'ACC-G1',
      point: 'Roof diaphragm center',
      localRef: 'Roof level, Grid C5',
      lat: 33.684405,
      lng: 73.047900,
      purpose: 'Captures peak lateral acceleration',
    },
    {
      id: 'ACC-G2',
      point: 'Mid-height floor',
      localRef: '5th Floor, Column C5',
      lat: 33.684392,
      lng: 73.047928,
      purpose: 'Captures inter-story dynamic behavior',
    },
    {
      id: 'ACC-G3',
      point: 'Base/core wall',
      localRef: '1st Floor core wall near stair shaft',
      lat: 33.684378,
      lng: 73.047884,
      purpose: 'Reference motion for top/base comparison',
    },
  ];

  // Mock sensor trend data
  const sensorTrendData = [
    { time: '00:00', value: 240 },
    { time: '04:00', value: 238 },
    { time: '08:00', value: 245 },
    { time: '12:00', value: 250 },
    { time: '16:00', value: 248 },
    { time: '20:00', value: 245 },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Normal') return 'bg-green-100 text-green-800 border-green-300';
    if (status === 'Warning') return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Infra Sensors & Edge AI Monitoring</h2>
        <p className="text-gray-600 mt-1">Triaxial acceleration sensing, FFT feature extraction, and autoencoder anomaly scoring</p>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className={connected ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'}>
            {connected ? 'Live Stream Connected' : 'Disconnected'}
          </Badge>
          <span className="text-xs text-gray-500">Last sync: {lastSync.toLocaleTimeString('en-PK')}</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sensors</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{sensorData.length}</p>
              </div>
              <Radio className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Normal Status</p>
                <p className="text-2xl font-semibold text-green-600 mt-1">
                  {sensorData.filter(s => s.status === 'Normal').length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Warning</p>
                <p className="text-2xl font-semibold text-amber-600 mt-1">
                  {sensorData.filter(s => s.status === 'Warning').length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Threshold Exceeded</p>
                <p className="text-2xl font-semibold text-red-600 mt-1">
                  {sensorData.filter(s => s.status === 'Exceeded').length}
                </p>
              </div>
              <Gauge className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sensor Type */}
      <Card>
        <CardHeader>
          <CardTitle>Sensor Type Deployed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-gray-200 rounded-lg p-4 max-w-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Accelerometer</h4>
            </div>
            <p className="text-sm text-gray-600">{sensorData.length} sensors active</p>
          </div>
        </CardContent>
      </Card>

      {/* Sensor List */}
      <Card>
        <CardHeader>
          <CardTitle>All Sensors - Live Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Sensor ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Asset</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Latest Reading</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Natural Freq</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mode Shape</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Recon. Error</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">DAQ Unit</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Temp/Humidity</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Threshold</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Last Update</th>
                </tr>
              </thead>
              <tbody>
                {sensorData.map(sensor => (
                  <tr key={sensor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{sensor.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{sensor.assetId}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{sensor.type}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{sensor.location}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-gray-900">
                        {sensor.reading} {sensor.unit}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {sensor.naturalFrequencyHz ? `${sensor.naturalFrequencyHz.toFixed(3)} Hz` : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{sensor.modeShapeLabel ?? '-'}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {sensor.reconstructionError !== undefined ? sensor.reconstructionError.toFixed(4) : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <span className="inline-flex items-center gap-1">
                        <Cpu className="h-3.5 w-3.5" />
                        {sensor.daqUnitId ?? '-'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {sensor.temperatureC !== undefined && sensor.humidityPct !== undefined
                        ? `${sensor.temperatureC.toFixed(1)}°C / ${sensor.humidityPct.toFixed(0)}%`
                        : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {sensor.threshold} {sensor.unit}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={getStatusColor(sensor.status)}>
                        {sensor.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{sensor.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Sample Sensor Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Sensor Data Trend - Natural Frequency (24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensorTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[230, 260]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} name="Frequency proxy" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Edge DAQ units extract frequency-domain features and feed autoencoder models.
              Increasing reconstruction error indicates deviation from the bridge's healthy baseline.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Exact Installation Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Exact Accelerometer Installation Plan (One Bridge + One Building)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
            Placement rationale follows vibration-based SHM practice: for bridges, install at mid-span and near supports to capture global modal response; for buildings, install at roof, mid-height, and base to capture fundamental sway and inter-story dynamics.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Bridge: {bridgeAsset?.name ?? 'BRG-001'}</h4>
              <svg viewBox="0 0 600 220" className="w-full">
                <rect x="40" y="85" width="520" height="24" fill="#6b7280" stroke="#374151" strokeWidth="2" />
                <rect x="145" y="109" width="36" height="80" fill="#6b7280" stroke="#374151" strokeWidth="2" />
                <rect x="420" y="109" width="36" height="80" fill="#6b7280" stroke="#374151" strokeWidth="2" />
                <line x1="20" y1="190" x2="580" y2="190" stroke="#374151" strokeWidth="3" />

                <circle cx="300" cy="97" r="9" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                <text x="315" y="95" fontSize="12" fill="#1e293b" fontWeight="600">ACC-B1</text>

                <circle cx="162" cy="150" r="9" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                <text x="178" y="146" fontSize="12" fill="#1e293b" fontWeight="600">ACC-B2</text>

                <circle cx="438" cy="150" r="9" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                <text x="454" y="146" fontSize="12" fill="#1e293b" fontWeight="600">ACC-B3</text>
              </svg>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Building: {buildingAsset?.name ?? 'BLD-002'}</h4>
              <svg viewBox="0 0 600 220" className="w-full">
                <rect x="180" y="20" width="240" height="165" fill="#6b7280" stroke="#374151" strokeWidth="2" />
                <line x1="180" y1="60" x2="420" y2="60" stroke="#475569" strokeWidth="2" />
                <line x1="180" y1="100" x2="420" y2="100" stroke="#475569" strokeWidth="2" />
                <line x1="180" y1="140" x2="420" y2="140" stroke="#475569" strokeWidth="2" />
                <line x1="160" y1="190" x2="440" y2="190" stroke="#374151" strokeWidth="3" />

                <circle cx="300" cy="30" r="9" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                <text x="315" y="28" fontSize="12" fill="#1e293b" fontWeight="600">ACC-G1</text>

                <circle cx="330" cy="100" r="9" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                <text x="345" y="97" fontSize="12" fill="#1e293b" fontWeight="600">ACC-G2</text>

                <circle cx="270" cy="172" r="9" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                <text x="285" y="169" fontSize="12" fill="#1e293b" fontWeight="600">ACC-G3</text>
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-gray-900 mb-2">Bridge installation points (exact)</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border border-gray-200">
                      <th className="text-left px-3 py-2">ID</th>
                      <th className="text-left px-3 py-2">Location</th>
                      <th className="text-left px-3 py-2">Coordinates</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bridgeInstallPoints.map((point) => (
                      <tr key={point.id} className="border-x border-b border-gray-200">
                        <td className="px-3 py-2 font-medium">{point.id}</td>
                        <td className="px-3 py-2">
                          <p>{point.point}</p>
                          <p className="text-xs text-gray-500">{point.localRef}</p>
                          <p className="text-xs text-gray-500">{point.purpose}</p>
                        </td>
                        <td className="px-3 py-2">
                          <p className="font-mono text-xs">{point.lat.toFixed(6)}, {point.lng.toFixed(6)}</p>
                          <a className="text-blue-700 underline text-xs" href={`https://www.google.com/maps?q=${point.lat},${point.lng}`} target="_blank" rel="noreferrer">Open</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-gray-900 mb-2">Building installation points (exact)</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border border-gray-200">
                      <th className="text-left px-3 py-2">ID</th>
                      <th className="text-left px-3 py-2">Location</th>
                      <th className="text-left px-3 py-2">Coordinates</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buildingInstallPoints.map((point) => (
                      <tr key={point.id} className="border-x border-b border-gray-200">
                        <td className="px-3 py-2 font-medium">{point.id}</td>
                        <td className="px-3 py-2">
                          <p>{point.point}</p>
                          <p className="text-xs text-gray-500">{point.localRef}</p>
                          <p className="text-xs text-gray-500">{point.purpose}</p>
                        </td>
                        <td className="px-3 py-2">
                          <p className="font-mono text-xs">{point.lat.toFixed(6)}, {point.lng.toFixed(6)}</p>
                          <a className="text-blue-700 underline text-xs" href={`https://www.google.com/maps?q=${point.lat},${point.lng}`} target="_blank" rel="noreferrer">Open</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
