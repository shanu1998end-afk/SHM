import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { CloudRain, Mountain, Waves, AlertTriangle, ClipboardCheck, Send } from 'lucide-react';
import { damageAssessments } from '../data/mockData';
import { toast } from 'sonner';

export function PostDisaster() {
  const [selectedEvent, setSelectedEvent] = React.useState<string>('all');
  const [assessmentList, setAssessmentList] = React.useState(damageAssessments);

  const eventTypes = ['Flood', 'Earthquake', 'Landslide'];

  const getEventIcon = (eventType: string) => {
    if (eventType === 'Flood') return Waves;
    if (eventType === 'Earthquake') return Mountain;
    if (eventType === 'Landslide') return Mountain;
    return AlertTriangle;
  };

  const getSeverityColor = (severity: string) => {
    if (severity === 'Minor') return 'bg-blue-100 text-blue-800 border-blue-300';
    if (severity === 'Moderate') return 'bg-amber-100 text-amber-800 border-amber-300';
    if (severity === 'Severe') return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Completed') return 'bg-green-100 text-green-800 border-green-300';
    if (status === 'Detailed') return 'bg-blue-100 text-blue-800 border-blue-300';
    if (status === 'Rapid Visual') return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const filteredAssessments = selectedEvent === 'all' 
    ? assessmentList 
    : assessmentList.filter(a => a.eventType === selectedEvent);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Post-Disaster Assessment</h2>
        <p className="text-gray-600 mt-1">Rapid damage assessment and recovery tracking</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Assessments</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {assessmentList.length}
                </p>
              </div>
              <ClipboardCheck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Flood Events</p>
                <p className="text-2xl font-semibold text-blue-600 mt-1">
                  {assessmentList.filter(a => a.eventType === 'Flood').length}
                </p>
              </div>
              <Waves className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Earthquake Events</p>
                <p className="text-2xl font-semibold text-orange-600 mt-1">
                  {assessmentList.filter(a => a.eventType === 'Earthquake').length}
                </p>
              </div>
              <Mountain className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-semibold text-green-600 mt-1">
                  {assessmentList.filter(a => a.assessmentStatus === 'Completed').length}
                </p>
              </div>
              <ClipboardCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Filter by Event Type:</label>
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {eventTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="ml-auto">
              <Button onClick={() => {
                const id = `DMA-${String(assessmentList.length + 1).padStart(3, '0')}`;
                setAssessmentList((prev) => [
                  {
                    id,
                    assetId: 'BRG-001',
                    assetName: 'Attock Bridge',
                    eventType: 'Flood',
                    damageSeverity: 'Minor',
                    assessmentStatus: 'Pending',
                    date: new Date().toISOString().slice(0, 10),
                  },
                  ...prev,
                ]);
                toast.success('New assessment created');
              }}>
                <CloudRain className="h-4 w-4 mr-2" />
                Create New Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessments List */}
      <Card>
        <CardHeader>
          <CardTitle>Damage Assessment Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAssessments.map(assessment => {
              const EventIcon = getEventIcon(assessment.eventType);
              return (
                <div key={assessment.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 p-3 rounded-lg">
                        <EventIcon className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {assessment.assetName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Asset ID: {assessment.assetId} • Assessment ID: {assessment.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                        {assessment.eventType}
                      </Badge>
                      <Badge variant="outline" className={getSeverityColor(assessment.damageSeverity)}>
                        {assessment.damageSeverity} Damage
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Event Type</p>
                      <p className="font-medium text-gray-900">{assessment.eventType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Damage Severity</p>
                      <p className="font-medium text-gray-900">{assessment.damageSeverity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Assessment Status</p>
                      <Badge variant="outline" className={getStatusColor(assessment.assessmentStatus)}>
                        {assessment.assessmentStatus}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Assessment Date</p>
                      <p className="font-medium text-gray-900">{assessment.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={() => toast.info(`Assessment ${assessment.id} opened`)}>
                      <ClipboardCheck className="h-4 w-4 mr-2" />
                      View Assessment
                    </Button>
                    {assessment.assessmentStatus === 'Rapid Visual' && (
                      <Button size="sm" onClick={() => {
                        setAssessmentList((prev) =>
                          prev.map((item) =>
                            item.id === assessment.id
                              ? { ...item, assessmentStatus: 'Detailed' }
                              : item,
                          ),
                        );
                        toast.success('Assessment escalated for detailed review');
                      }}>
                        <Send className="h-4 w-4 mr-2" />
                        Send for Detailed Assessment
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredAssessments.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <CloudRain className="h-16 w-16 mx-auto mb-3 opacity-50" />
                <p className="text-lg">No assessments found</p>
                <p className="text-sm mt-1">No damage assessments for the selected event type</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rapid Visual Screening Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Rapid Visual Screening (RVS) Protocol</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Immediate Post-Event Actions</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <span>Deploy rapid assessment teams within 24-48 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <span>Document visible damage through photos and notes</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <span>Tag structures: Green (Safe), Yellow (Restricted), Red (Unsafe)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <span>Prioritize critical infrastructure for detailed assessment</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Damage Classification</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className={getSeverityColor('Minor')}>Minor</Badge>
                  <span>Cosmetic damage, structure safe for occupancy</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className={getSeverityColor('Moderate')}>Moderate</Badge>
                  <span>Visible structural damage, restricted access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className={getSeverityColor('Severe')}>Severe</Badge>
                  <span>Major structural damage, unsafe conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className={getSeverityColor('Collapse')}>Collapse</Badge>
                  <span>Partial or complete structural failure</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
