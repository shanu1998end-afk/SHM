import React from 'react';
import { useParams, Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { StatusBadge } from '../components/StatusBadge';
import { ConditionGauge } from '../components/ConditionGauge';
import { ArrowLeft, MapPin, Building, Hammer, Shield, AlertTriangle, Activity, Landmark, Building2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { assets, sensors } from '../data/mockData';
import { Badge } from '../components/ui/badge';
import { AssetLocationMap } from '../components/AssetLocationMap';
import { downloadTextFile } from '../utils/actions';
import { toast } from 'sonner';
import { useLiveSensors } from '../hooks/useLiveSensors';

export function AssetDetail() {
  const { id } = useParams<{ id: string }>();
  const asset = assets.find(a => a.id === id);

  if (!asset) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Asset Not Found</h2>
        <Link to="/inventory">
          <Button className="mt-4">Back to Inventory</Button>
        </Link>
      </div>
    );
  }

  // Mock time-series data for condition score
  const conditionHistory = [
    { date: 'Jan 25', score: 75 },
    { date: 'Feb 25', score: 73 },
    { date: 'Mar 25', score: 72 },
    { date: 'Apr 25', score: 71 },
    { date: 'May 25', score: 70 },
    { date: 'Jun 25', score: 72 },
    { date: 'Jul 25', score: 71 },
    { date: 'Aug 25', score: 72 },
    { date: 'Sep 25', score: 73 },
    { date: 'Oct 25', score: 72 },
    { date: 'Nov 25', score: 72 },
    { date: 'Dec 25', score: 72 },
  ];

  const { sensorData } = useLiveSensors(sensors);
  const assetSensors = sensorData.filter(s => s.assetId === asset.id);
  const isBridge = asset.type === 'Bridge';

  const handleGenerateReport = () => {
    const content = [
      'Pakistan Structural Health Monitoring Portal',
      `Asset Report: ${asset.name}`,
      `Asset ID: ${asset.id}`,
      `Type: ${asset.type}`,
      `Location: ${asset.district}, ${asset.province}`,
      `Condition Score: ${asset.conditionRating}`,
      `Risk Level: ${asset.riskLevel}`,
      `Last Inspection: ${asset.lastInspection}`,
      `Generated At: ${new Date().toLocaleString('en-PK')}`,
    ].join('\n');

    downloadTextFile(`${asset.id}-report.txt`, content);
    toast.success('Asset report generated');
  };

  // Mock damage indicators
  const damageIndicators = asset.type === 'Bridge' ? [
    { name: 'Cracks', severity: 'Low', description: 'Hairline cracks in deck surface' },
    { name: 'Spalling', severity: 'None', description: 'No spalling observed' },
    { name: 'Corrosion', severity: 'Low', description: 'Minor surface rust on exposed steel' },
    { name: 'Settlement', severity: 'None', description: 'No differential settlement' },
    { name: 'Bearing Issues', severity: 'Medium', description: 'Bearing pad wear observed on Pier 3' },
  ] : [
    { name: 'Cracks', severity: 'Medium', description: 'Diagonal cracks in exterior walls' },
    { name: 'Spalling', severity: 'Low', description: 'Minor concrete spalling on columns' },
    { name: 'Settlement', severity: 'None', description: 'No foundation settlement detected' },
    { name: 'Structural Integrity', severity: 'Good', description: 'Frame system performing well' },
  ];

  const getSeverityColor = (severity: string) => {
    if (severity === 'None' || severity === 'Good') return 'bg-green-100 text-green-800 border-green-300';
    if (severity === 'Low') return 'bg-blue-100 text-blue-800 border-blue-300';
    if (severity === 'Medium') return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/inventory">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-gray-900">{asset.name}</h2>
            <StatusBadge status={asset.riskLevel} />
            <Badge variant="outline">{asset.type}</Badge>
          </div>
          <p className="text-gray-600 mt-1">{asset.id} • {asset.district}, {asset.province}</p>
        </div>
        <Button onClick={handleGenerateReport}>Generate Report</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/asset/BRG-001">
          <Button variant="outline" size="sm">
            <Landmark className="h-4 w-4 mr-2" />
            Bridge Detail Sample
          </Button>
        </Link>
        <Link to="/asset/BLD-002">
          <Button variant="outline" size="sm">
            <Building2 className="h-4 w-4 mr-2" />
            Government Building Detail Sample
          </Button>
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Asset Photo */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Asset Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-64 flex items-center justify-center mb-4">
              <div className="text-center text-gray-400">
                <Building className="h-16 w-16 mx-auto mb-2" />
                <p className="text-sm">Asset Photo Placeholder</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Owner Agency</p>
                <p className="font-medium text-gray-900">{asset.owner}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Importance Level</p>
                <p className="font-medium text-gray-900">{asset.importance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Year Built</p>
                <p className="font-medium text-gray-900">{asset.yearBuilt}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Inspection</p>
                <p className="font-medium text-gray-900">{asset.lastInspection}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Map */}
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <AssetLocationMap asset={asset} />
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-500">Coordinates</p>
                <p className="text-sm font-mono text-gray-900">
                  {asset.location.lat.toFixed(4)}°N, {asset.location.lng.toFixed(4)}°E
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">District / Province</p>
                <p className="font-medium text-gray-900">{asset.district}, {asset.province}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Status */}
        <Card>
          <CardHeader>
            <CardTitle>Current Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <ConditionGauge value={asset.conditionRating} size={140} />
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">Condition Rating</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {asset.conditionRating >= 70 ? 'Good' : asset.conditionRating >= 40 ? 'Fair' : 'Poor'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Structural Information */}
      <Card>
        <CardHeader>
          <CardTitle>Structural Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Structural System</p>
                <p className="font-medium text-gray-900">{asset.structuralSystem}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Hammer className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Foundation Type</p>
                <p className="font-medium text-gray-900">
                  {isBridge ? 'Deep Pile Foundation' : 'Spread Footing'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Seismic Zone</p>
                <p className="font-medium text-gray-900">
                  {asset.province === 'KPK' || asset.province === 'Islamabad' ? 'Zone 4 (High)' : 'Zone 2B (Moderate)'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <Activity className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Design Load</p>
                <p className="font-medium text-gray-900">
                  {isBridge ? 'HS-20 / AASHTO Equivalent' : 'Public Occupancy Load Class II'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Retrofitting History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Assessment Note</p>
              <p className="font-medium text-gray-900 mt-1">
                {asset.yearBuilt < 2000 ? 'Legacy asset with periodic strengthening needs' : 'Modern design with standard upkeep'}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Last Retrofitting Action</p>
              <p className="font-medium text-gray-900 mt-1">
                {asset.yearBuilt < 2000 ? '2018 - Member jacketing and bearing maintenance' : 'No major retrofit recorded'}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Current Recommendation</p>
              <p className="font-medium text-gray-900 mt-1">
                {asset.conditionRating < 50 ? 'Detailed retrofit design recommended' : 'Continue preventive maintenance'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Damage Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Damage Indicators & Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {damageIndicators.map((indicator, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-gray-600 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{indicator.name}</h4>
                    <Badge variant="outline" className={getSeverityColor(indicator.severity)}>
                      {indicator.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{indicator.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Condition Score Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Condition Score Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={conditionHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sensor Data */}
        <Card>
          <CardHeader>
            <CardTitle>Active Sensors ({assetSensors.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {assetSensors.length > 0 ? (
              <div className="space-y-3">
                {assetSensors.map(sensor => (
                  <div key={sensor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{sensor.type}</p>
                      <p className="text-sm text-gray-500">{sensor.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        {sensor.reading} {sensor.unit}
                      </p>
                      <Badge
                        variant="outline"
                        className={
                          sensor.status === 'Normal' ? 'bg-green-100 text-green-800' :
                          sensor.status === 'Warning' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {sensor.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No sensors installed on this asset</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
