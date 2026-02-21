import React from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { FileText, Download, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { inspections } from '../data/mockData';
import { downloadTextFile } from '../utils/actions';
import { toast } from 'sonner';

export function Inspections() {
  const navigate = useNavigate();
  const [inspectionList, setInspectionList] = React.useState(inspections);

  const getStatusIcon = (status: string) => {
    if (status === 'Completed') return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (status === 'Pending') return <Clock className="h-5 w-5 text-amber-600" />;
    return <AlertCircle className="h-5 w-5 text-red-600" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'Completed') return 'bg-green-100 text-green-800 border-green-300';
    if (status === 'Pending') return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getTypeColor = (type: string) => {
    if (type === 'Routine') return 'bg-blue-100 text-blue-800 border-blue-300';
    if (type === 'Special') return 'bg-purple-100 text-purple-800 border-purple-300';
    return 'bg-orange-100 text-orange-800 border-orange-300';
  };

  const handleSchedule = () => {
    const now = new Date();
    const id = `INS-${String(inspectionList.length + 1).padStart(3, '0')}`;
    const newInspection = {
      id,
      assetId: 'BRG-001',
      assetName: 'Attock Bridge',
      type: 'Routine' as const,
      date: now.toISOString().slice(0, 10),
      status: 'Pending' as const,
      inspector: 'Engr. Ahmed Khan',
      findings: '',
    };
    setInspectionList((prev) => [newInspection, ...prev]);
    toast.success('New inspection scheduled');
  };

  const handleDownload = (inspection: (typeof inspections)[number]) => {
    const body = [
      'Pakistan Structural Health Monitoring Portal',
      `Inspection ID: ${inspection.id}`,
      `Asset: ${inspection.assetName} (${inspection.assetId})`,
      `Type: ${inspection.type}`,
      `Date: ${inspection.date}`,
      `Inspector: ${inspection.inspector}`,
      `Status: ${inspection.status}`,
      `Findings: ${inspection.findings || 'No findings recorded.'}`,
    ].join('\n');
    downloadTextFile(`${inspection.id}-report.txt`, body);
    toast.success('Inspection report downloaded');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Inspections & Reports</h2>
          <p className="text-gray-600 mt-1">Structural inspection records and assessment reports</p>
        </div>
        <Button onClick={handleSchedule}>
          <FileText className="h-4 w-4 mr-2" />
          Schedule New Inspection
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Inspections</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {inspectionList.length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-semibold text-green-600 mt-1">
                  {inspectionList.filter(i => i.status === 'Completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-amber-600 mt-1">
                  {inspectionList.filter(i => i.status === 'Pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-semibold text-red-600 mt-1">
                  {inspectionList.filter(i => i.status === 'Overdue').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inspections List */}
      <Card>
        <CardHeader>
          <CardTitle>Inspection Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inspectionList.map(inspection => (
              <div key={inspection.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      {getStatusIcon(inspection.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{inspection.assetName}</h3>
                      <p className="text-sm text-gray-600 mt-1">ID: {inspection.assetId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getTypeColor(inspection.type)}>
                      {inspection.type}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(inspection.status)}>
                      {inspection.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Inspection Date</p>
                    <p className="font-medium text-gray-900">{inspection.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Inspector</p>
                    <p className="font-medium text-gray-900">{inspection.inspector}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Inspection ID</p>
                    <p className="font-medium text-gray-900">{inspection.id}</p>
                  </div>
                </div>

                {inspection.findings && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Findings & Observations</p>
                    <p className="text-sm text-gray-600">{inspection.findings}</p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/asset/${inspection.assetId}`)}>
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {inspection.status === 'Completed' && (
                    <Button variant="outline" size="sm" onClick={() => handleDownload(inspection)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF Report
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inspection Form Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Standard Inspection Checklist (Preview)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Structural Assessment</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Visual inspection of structural elements
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Crack mapping and documentation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Spalling and concrete deterioration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Reinforcement corrosion assessment
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Load-bearing capacity evaluation
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Seismic Assessment</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Seismic irregularity check
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Joint opening and drift observations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Non-structural hazard screening
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Retrofitting adequacy verification
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Occupancy safety recommendation
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Flood Assessment</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Scour and erosion condition
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Debris accumulation check
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Drainage and water ingress verification
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Foundation saturation and settlement
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Access and serviceability status
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Fire Assessment</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Heat damage on critical members
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Spalling and reinforcement exposure
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Fireproofing system condition
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Temporary shoring requirements
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  Recommendations for rehabilitation
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
