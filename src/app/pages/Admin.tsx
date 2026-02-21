import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Users, Building2, Settings, FileText, Database, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { assets } from '../data/mockData';
import { downloadTextFile, toCsv } from '../utils/actions';
import { toast } from 'sonner';

export function Admin() {
  const exportRows = assets.map((asset) => ({
    assetId: asset.id,
    type: asset.type,
    name: asset.name,
    province: asset.province,
    district: asset.district,
    conditionRating: asset.conditionRating,
    riskLevel: asset.riskLevel,
    lastInspection: asset.lastInspection,
  }));

  const handleExport = (format: 'csv' | 'json' | 'pdf') => {
    const now = new Date().toISOString().slice(0, 19).replace(/:/g, '-');

    if (format === 'csv') {
      downloadTextFile(`pshmp-assets-${now}.csv`, toCsv(exportRows), 'text/csv;charset=utf-8');
      toast.success('CSV exported successfully');
      return;
    }

    if (format === 'json') {
      downloadTextFile(`pshmp-assets-${now}.json`, JSON.stringify(exportRows, null, 2), 'application/json;charset=utf-8');
      toast.success('JSON exported successfully');
      return;
    }

    const report = [
      'Pakistan Structural Health Monitoring Portal',
      'Administrative Export Report',
      `Generated: ${new Date().toLocaleString('en-PK')}`,
      '',
      ...exportRows.map((row) => `${row.assetId} | ${row.name} | ${row.riskLevel} | ${row.conditionRating}`),
    ].join('\n');
    downloadTextFile(`pshmp-assets-${now}.txt`, report);
    toast.success('PDF-style report exported');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Administration & Settings</h2>
        <p className="text-gray-600 mt-1">System configuration and user management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
                <p className="text-sm text-gray-600">
                  Manage user accounts, roles, and permissions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Asset Management</h3>
                <p className="text-sm text-gray-600">
                  Add, edit, or remove assets from the registry
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Inspection Settings</h3>
                <p className="text-sm text-gray-600">
                  Configure inspection frequency and criteria
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Condition Rating</h3>
                <p className="text-sm text-gray-600">
                  Define condition rating criteria and thresholds
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <Database className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Data Export</h3>
                <p className="text-sm text-gray-600">
                  Export data in various formats for analysis
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Security Settings</h3>
                <p className="text-sm text-gray-600">
                  Audit logs, security policies, and access control
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Organization Settings</h4>
              <p className="text-sm text-gray-600">
                Configure organization-wide preferences, default values, and system behavior
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Notification Preferences</h4>
              <p className="text-sm text-gray-600">
                Set up email alerts, SMS notifications, and dashboard alerts for critical events
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Integration & API</h4>
              <p className="text-sm text-gray-600">
                Configure integrations with external systems, weather services, and seismic monitoring networks
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inspection Frequency Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Routine inspection interval</label>
              <Select defaultValue="90">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">Every 30 days</SelectItem>
                  <SelectItem value="60">Every 60 days</SelectItem>
                  <SelectItem value="90">Every 90 days</SelectItem>
                  <SelectItem value="180">Every 180 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Critical asset follow-up window (days)</label>
              <Input defaultValue="15" className="mt-1" />
            </div>
            <Button className="w-full" onClick={() => toast.success('Inspection frequency rules saved')}>
              Save Frequency Rules
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Condition Rating Criteria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="font-medium text-green-800">Safe</p>
                <p className="text-sm text-green-700">Condition score 70 - 100</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div>
                <p className="font-medium text-amber-800">Watch</p>
                <p className="text-sm text-amber-700">Condition score 40 - 69</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div>
                <p className="font-medium text-red-800">Critical</p>
                <p className="text-sm text-red-700">Condition score below 40</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => toast.success('Condition criteria updated')}>
              Update Criteria
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Roles & Data Export</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Role Access Matrix</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Admin: Full configuration, user roles, and exports</p>
              <p>• Engineer: Inspections, updates, and field assessments</p>
              <p>• Viewer: Dashboards, alerts, and reports view-only</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Data Export</h4>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => handleExport('csv')}>Export CSV</Button>
              <Button variant="outline" onClick={() => handleExport('pdf')}>Export PDF</Button>
              <Button variant="outline" onClick={() => handleExport('json')}>Export JSON</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
