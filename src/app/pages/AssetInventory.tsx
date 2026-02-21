import React from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { StatusBadge } from '../components/StatusBadge';
import { Search, Filter, Eye } from 'lucide-react';
import { assets } from '../data/mockData';

export function AssetInventory() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [provinceFilter, setProvinceFilter] = React.useState('all');

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || asset.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || asset.riskLevel === statusFilter;
    const matchesProvince = provinceFilter === 'all' || asset.province === provinceFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesProvince;
  });

  const provinces = [...new Set(assets.map(a => a.province))];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Asset Inventory</h2>
        <p className="text-gray-600 mt-1">Complete registry of monitored infrastructure assets</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Asset Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Bridge">Bridge</SelectItem>
                <SelectItem value="Building">Building</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Safe">Safe</SelectItem>
                <SelectItem value="Watch">Watch</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>

            {/* Province Filter */}
            <Select value={provinceFilter} onValueChange={setProvinceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Province" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Provinces</SelectItem>
                {provinces.map(province => (
                  <SelectItem key={province} value={province}>{province}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredAssets.length} of {assets.length} assets
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
                setStatusFilter('all');
                setProvinceFilter('all');
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Infrastructure Assets Registry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Asset ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Asset Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Year Built</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Structural System</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Condition</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Risk Level</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Last Inspection</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{asset.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{asset.type}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 font-medium">{asset.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {asset.district}, {asset.province}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{asset.yearBuilt}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{asset.structuralSystem}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              asset.conditionRating >= 70 ? 'bg-green-500' :
                              asset.conditionRating >= 40 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${asset.conditionRating}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-700">{asset.conditionRating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={asset.riskLevel} />
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{asset.lastInspection}</td>
                    <td className="py-3 px-4">
                      <Link to={`/asset/${asset.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </td>
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
