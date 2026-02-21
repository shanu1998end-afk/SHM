import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { AlertCard } from '../components/AlertCard';
import { RiskBadge } from '../components/RiskBadge';
import { AlertTriangle, Bell, CheckCircle } from 'lucide-react';
import { alerts } from '../data/mockData';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export function Alerts() {
  const [activeAlerts, setActiveAlerts] = React.useState(alerts);

  // Risk matrix data
  const riskMatrix = [
    { likelihood: 'Very High', impact: ['Medium', 'High', 'Critical', 'Critical', 'Critical'] },
    { likelihood: 'High', impact: ['Medium', 'Medium', 'High', 'Critical', 'Critical'] },
    { likelihood: 'Medium', impact: ['Low', 'Medium', 'Medium', 'High', 'Critical'] },
    { likelihood: 'Low', impact: ['Low', 'Low', 'Medium', 'Medium', 'High'] },
    { likelihood: 'Very Low', impact: ['Low', 'Low', 'Low', 'Medium', 'Medium'] },
  ];

  const impactLabels = ['Negligible', 'Minor', 'Moderate', 'Major', 'Catastrophic'];

  const getRiskColor = (risk: string) => {
    if (risk === 'Low') return 'bg-green-500';
    if (risk === 'Medium') return 'bg-amber-500';
    if (risk === 'High') return 'bg-orange-500';
    if (risk === 'Critical') return 'bg-red-500';
    return 'bg-gray-300';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Infra Alerts & Risk Assessment</h2>
        <p className="text-gray-600 mt-1">AI anomaly alerts, structural risk levels, and official notification pipeline</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{activeAlerts.length}</p>
              </div>
              <Bell className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Alerts</p>
                <p className="text-2xl font-semibold text-red-600 mt-1">
                  {activeAlerts.filter(a => a.severity === 'Critical').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Notifications Sent (24h)</p>
                <p className="text-2xl font-semibold text-green-600 mt-1">26</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Alerts Panel</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setActiveAlerts([]);
                toast.success('All alerts marked as read');
              }}
            >
              Mark All as Read
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeAlerts.length > 0 ? (
              activeAlerts.map(alert => (
                <div key={alert.id}>
                  <AlertCard alert={alert} />
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <CheckCircle className="h-16 w-16 mx-auto mb-3 opacity-50" />
                <p className="text-lg">No active alerts</p>
                <p className="text-sm mt-1">All systems operating normally</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Risk Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Matrix Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Risk Level = Likelihood × Impact
                </p>
              </div>
              
              <table className="border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 bg-gray-100 p-3 text-sm font-semibold text-gray-700">
                      Likelihood ↓ / Impact →
                    </th>
                    {impactLabels.map(label => (
                      <th key={label} className="border border-gray-300 bg-gray-100 p-3 text-sm font-semibold text-gray-700 min-w-24">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {riskMatrix.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      <td className="border border-gray-300 bg-gray-100 p-3 text-sm font-semibold text-gray-700">
                        {row.likelihood}
                      </td>
                      {row.impact.map((risk, colIdx) => (
                        <td
                          key={colIdx}
                          className={`border border-gray-300 p-3 text-center ${getRiskColor(risk)}`}
                        >
                          <span className="text-sm font-medium text-white drop-shadow">
                            {risk}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Legend */}
              <div className="mt-6 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-700">Low Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-amber-500 rounded"></div>
                  <span className="text-sm text-gray-700">Medium Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500 rounded"></div>
                  <span className="text-sm text-gray-700">High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-700">Critical Risk</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Structural Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Autoencoder reconstruction error exceeded</span>
                <RiskBadge severity="Critical" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Natural frequency drift beyond tolerance</span>
                <RiskBadge severity="Medium" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Mode shape deviation detected</span>
                <RiskBadge severity="Medium" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seismic Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">High seismic zone asset</span>
                <RiskBadge severity="High" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Retrofitting required</span>
                <RiskBadge severity="Medium" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Ambient vibration profile shift</span>
                <RiskBadge severity="Low" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flood Risk Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Located in flood zone</span>
                <RiskBadge severity="Medium" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Recent flood event</span>
                <RiskBadge severity="High" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">DAQ communication latency spike</span>
                <RiskBadge severity="Low" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Control Room Notification Channels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-900 mb-1">SMS Dispatch</p>
              <p>Critical anomaly alerts to bridge engineers and district officers within 60 seconds.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-900 mb-1">Email Reports</p>
              <p>Structured event summaries with frequency drift and MSE history to decision makers.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-900 mb-1">WhatsApp Escalation</p>
              <p>Rapid escalation for site-response teams when severity reaches High or Critical.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
