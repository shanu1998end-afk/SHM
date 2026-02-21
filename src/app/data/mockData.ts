// Mock data for Pakistan Structural Health Monitoring Portal

export interface Asset {
  id: string;
  type: 'Bridge' | 'Building';
  name: string;
  province: string;
  district: string;
  location: { lat: number; lng: number };
  yearBuilt: number;
  structuralSystem: string;
  conditionRating: number; // 0-100
  riskLevel: 'Safe' | 'Watch' | 'Critical';
  lastInspection: string;
  owner: string;
  importance: 'Critical' | 'Important' | 'Normal';
}

export interface Inspection {
  id: string;
  assetId: string;
  assetName: string;
  type: 'Routine' | 'Special' | 'Post-Disaster';
  date: string;
  status: 'Completed' | 'Pending' | 'Overdue';
  inspector: string;
  findings: string;
}

export interface Sensor {
  id: string;
  assetId: string;
  type: 'Accelerometer';
  location: string;
  reading: number;
  unit: string;
  threshold: number;
  status: 'Normal' | 'Warning' | 'Exceeded';
  lastUpdate: string;
  naturalFrequencyHz?: number;
  baselineFrequencyHz?: number;
  dampingRatioPct?: number;
  modeShapeLabel?: string;
  daqUnitId?: string;
  reconstructionError?: number;
  temperatureC?: number;
  humidityPct?: number;
}

export interface Alert {
  id: string;
  assetId: string;
  assetName: string;
  riskType: 'Structural' | 'Seismic' | 'Flood' | 'AI Anomaly';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  message: string;
  timestamp: string;
}

export interface EdgeUnit {
  id: string;
  assetId: string;
  model: 'Jetson Nano' | 'Jetson Orin Nano';
  powerSource: 'Solar + LiFePO4';
  satLink: 'Online' | 'Intermittent' | 'Offline';
  localStorageGb: number;
  cpuLoadPct: number;
  anomalyModelVersion: string;
  uptimePct: number;
}

export interface DamageAssessment {
  id: string;
  assetId: string;
  assetName: string;
  eventType: 'Flood' | 'Earthquake' | 'Landslide';
  damageSeverity: 'Minor' | 'Moderate' | 'Severe' | 'Collapse';
  assessmentStatus: 'Pending' | 'Rapid Visual' | 'Detailed' | 'Completed';
  date: string;
}

// Mock Assets
export const assets: Asset[] = [
  {
    id: 'BRG-001',
    type: 'Bridge',
    name: 'Attock Bridge',
    province: 'Punjab',
    district: 'Attock',
    location: { lat: 33.7676, lng: 72.3645 },
    yearBuilt: 1985,
    structuralSystem: 'Prestressed Concrete',
    conditionRating: 72,
    riskLevel: 'Safe',
    lastInspection: '2026-01-15',
    owner: 'NHA',
    importance: 'Critical',
  },
  {
    id: 'BRG-002',
    type: 'Bridge',
    name: 'Kohat Tunnel Bridge',
    province: 'KPK',
    district: 'Kohat',
    location: { lat: 33.5869, lng: 71.4416 },
    yearBuilt: 2003,
    structuralSystem: 'Steel Composite',
    conditionRating: 45,
    riskLevel: 'Watch',
    lastInspection: '2025-12-10',
    owner: 'NHA',
    importance: 'Critical',
  },
  {
    id: 'BRG-003',
    type: 'Bridge',
    name: 'Indus River Bridge',
    province: 'Sindh',
    district: 'Sukkur',
    location: { lat: 27.7052, lng: 68.8574 },
    yearBuilt: 1962,
    structuralSystem: 'RCC Arch',
    conditionRating: 28,
    riskLevel: 'Critical',
    lastInspection: '2026-02-01',
    owner: 'NHA',
    importance: 'Critical',
  },
  {
    id: 'BLD-001',
    type: 'Building',
    name: 'Civil Secretariat Lahore',
    province: 'Punjab',
    district: 'Lahore',
    location: { lat: 31.5497, lng: 74.3436 },
    yearBuilt: 1954,
    structuralSystem: 'Masonry Load Bearing',
    conditionRating: 58,
    riskLevel: 'Watch',
    lastInspection: '2025-11-20',
    owner: 'Provincial C&W',
    importance: 'Critical',
  },
  {
    id: 'BLD-002',
    type: 'Building',
    name: 'NDMA Headquarters',
    province: 'Islamabad',
    district: 'Islamabad',
    location: { lat: 33.6844, lng: 73.0479 },
    yearBuilt: 2008,
    structuralSystem: 'RCC Frame',
    conditionRating: 88,
    riskLevel: 'Safe',
    lastInspection: '2026-01-25',
    owner: 'NDMA',
    importance: 'Critical',
  },
  {
    id: 'BRG-004',
    type: 'Bridge',
    name: 'Jhelum River Bridge',
    province: 'Punjab',
    district: 'Jhelum',
    location: { lat: 32.9425, lng: 73.7257 },
    yearBuilt: 1978,
    structuralSystem: 'RCC Girder',
    conditionRating: 65,
    riskLevel: 'Safe',
    lastInspection: '2026-01-08',
    owner: 'NHA',
    importance: 'Important',
  },
  {
    id: 'BLD-003',
    type: 'Building',
    name: 'Governor House Peshawar',
    province: 'KPK',
    district: 'Peshawar',
    location: { lat: 34.0151, lng: 71.5249 },
    yearBuilt: 1947,
    structuralSystem: 'Brick Masonry',
    conditionRating: 42,
    riskLevel: 'Watch',
    lastInspection: '2025-12-15',
    owner: 'Provincial C&W',
    importance: 'Critical',
  },
  {
    id: 'BRG-005',
    type: 'Bridge',
    name: 'Makran Coastal Highway Bridge',
    province: 'Balochistan',
    district: 'Gwadar',
    location: { lat: 25.1264, lng: 62.3250 },
    yearBuilt: 2004,
    structuralSystem: 'Prestressed Concrete',
    conditionRating: 78,
    riskLevel: 'Safe',
    lastInspection: '2026-01-20',
    owner: 'NHA',
    importance: 'Important',
  },
];

// Mock Inspections
export const inspections: Inspection[] = [
  {
    id: 'INS-001',
    assetId: 'BRG-001',
    assetName: 'Attock Bridge',
    type: 'Routine',
    date: '2026-01-15',
    status: 'Completed',
    inspector: 'Engr. Ahmed Khan',
    findings: 'Minor surface cracks observed on Pier 3. Bearing pads showing normal wear.',
  },
  {
    id: 'INS-002',
    assetId: 'BRG-003',
    assetName: 'Indus River Bridge',
    type: 'Special',
    date: '2026-02-01',
    status: 'Completed',
    inspector: 'Engr. Fatima Ali',
    findings: 'Significant corrosion in reinforcement. Spalling observed. Immediate intervention required.',
  },
  {
    id: 'INS-003',
    assetId: 'BLD-001',
    assetName: 'Civil Secretariat Lahore',
    type: 'Routine',
    date: '2026-02-15',
    status: 'Pending',
    inspector: 'Engr. Hassan Raza',
    findings: '',
  },
  {
    id: 'INS-004',
    assetId: 'BRG-002',
    assetName: 'Kohat Tunnel Bridge',
    type: 'Routine',
    date: '2026-01-25',
    status: 'Overdue',
    inspector: 'Engr. Zainab Sheikh',
    findings: '',
  },
];

// Mock Sensors
export const sensors: Sensor[] = [
  {
    id: 'SEN-001',
    assetId: 'BRG-001',
    type: 'Accelerometer',
    location: 'Deck Mid-Span (Girder G2)',
    reading: 0.09,
    unit: 'g',
    threshold: 0.15,
    status: 'Normal',
    lastUpdate: '2026-02-10 09:36',
    naturalFrequencyHz: 4.14,
    baselineFrequencyHz: 4.15,
    dampingRatioPct: 1.8,
    modeShapeLabel: 'Mode 1 - Vertical Bending',
    daqUnitId: 'DAQ-BRG-001',
    reconstructionError: 0.017,
    temperatureC: 26.3,
    humidityPct: 48,
  },
  {
    id: 'SEN-002',
    assetId: 'BRG-001',
    type: 'Accelerometer',
    location: 'Pier P1 Cap Beam',
    reading: 0.11,
    unit: 'g',
    threshold: 0.15,
    status: 'Normal',
    lastUpdate: '2026-02-10 09:36',
    naturalFrequencyHz: 4.10,
    baselineFrequencyHz: 4.15,
    dampingRatioPct: 1.9,
    modeShapeLabel: 'Mode 2 - Torsional',
    daqUnitId: 'DAQ-BRG-001',
    reconstructionError: 0.021,
    temperatureC: 26.4,
    humidityPct: 49,
  },
  {
    id: 'SEN-003',
    assetId: 'BRG-001',
    type: 'Accelerometer',
    location: 'Pier P2 Cap Beam',
    reading: 0.13,
    unit: 'g',
    threshold: 0.15,
    status: 'Warning',
    lastUpdate: '2026-02-10 09:36',
    naturalFrequencyHz: 4.07,
    baselineFrequencyHz: 4.15,
    dampingRatioPct: 2.1,
    modeShapeLabel: 'Mode 2 - Torsional',
    daqUnitId: 'DAQ-BRG-001',
    reconstructionError: 0.034,
    temperatureC: 26.6,
    humidityPct: 50,
  },
  {
    id: 'SEN-004',
    assetId: 'BRG-001',
    type: 'Accelerometer',
    location: 'North Abutment Bearing Line',
    reading: 0.07,
    unit: 'g',
    threshold: 0.15,
    status: 'Normal',
    lastUpdate: '2026-02-10 09:36',
    naturalFrequencyHz: 4.18,
    baselineFrequencyHz: 4.15,
    dampingRatioPct: 1.7,
    modeShapeLabel: 'Mode 3 - Longitudinal',
    daqUnitId: 'DAQ-BRG-001',
    reconstructionError: 0.015,
    temperatureC: 26.0,
    humidityPct: 48,
  },
  {
    id: 'SEN-005',
    assetId: 'BRG-001',
    type: 'Accelerometer',
    location: 'South Abutment Bearing Line',
    reading: 0.08,
    unit: 'g',
    threshold: 0.15,
    status: 'Normal',
    lastUpdate: '2026-02-10 09:36',
    naturalFrequencyHz: 4.16,
    baselineFrequencyHz: 4.15,
    dampingRatioPct: 1.8,
    modeShapeLabel: 'Mode 3 - Longitudinal',
    daqUnitId: 'DAQ-BRG-001',
    reconstructionError: 0.016,
    temperatureC: 26.1,
    humidityPct: 49,
  },
  {
    id: 'SEN-006',
    assetId: 'BRG-001',
    type: 'Accelerometer',
    location: 'Deck Quarter-Span North',
    reading: 0.10,
    unit: 'g',
    threshold: 0.15,
    status: 'Normal',
    lastUpdate: '2026-02-10 09:36',
    naturalFrequencyHz: 4.11,
    baselineFrequencyHz: 4.15,
    dampingRatioPct: 1.9,
    modeShapeLabel: 'Mode 1 - Vertical Bending',
    daqUnitId: 'DAQ-BRG-001',
    reconstructionError: 0.022,
    temperatureC: 26.5,
    humidityPct: 50,
  },
  {
    id: 'SEN-007',
    assetId: 'BRG-001',
    type: 'Accelerometer',
    location: 'Deck Quarter-Span South',
    reading: 0.10,
    unit: 'g',
    threshold: 0.15,
    status: 'Normal',
    lastUpdate: '2026-02-10 09:36',
    naturalFrequencyHz: 4.12,
    baselineFrequencyHz: 4.15,
    dampingRatioPct: 1.9,
    modeShapeLabel: 'Mode 1 - Vertical Bending',
    daqUnitId: 'DAQ-BRG-001',
    reconstructionError: 0.020,
    temperatureC: 26.4,
    humidityPct: 49,
  },
  {
    id: 'SEN-008',
    assetId: 'BRG-003',
    type: 'Accelerometer',
    location: 'Pier 4',
    reading: 0.22,
    unit: 'g',
    threshold: 0.18,
    status: 'Exceeded',
    lastUpdate: '2026-02-10 09:25',
    naturalFrequencyHz: 2.41,
    baselineFrequencyHz: 2.93,
    dampingRatioPct: 3.4,
    modeShapeLabel: 'Mode 1 - Vertical Bending',
    daqUnitId: 'DAQ-BRG-003',
    reconstructionError: 0.146,
    temperatureC: 31.8,
    humidityPct: 62,
  },
  {
    id: 'SEN-009',
    assetId: 'BLD-002',
    type: 'Accelerometer',
    location: '5th Floor Column C5',
    reading: 0.05,
    unit: 'g',
    threshold: 0.20,
    status: 'Normal',
    lastUpdate: '2026-02-10 09:35',
    naturalFrequencyHz: 5.27,
    baselineFrequencyHz: 5.31,
    dampingRatioPct: 1.2,
    modeShapeLabel: 'Mode 1 - Sway',
    daqUnitId: 'DAQ-BLD-002',
    reconstructionError: 0.011,
    temperatureC: 24.2,
    humidityPct: 44,
  },
];

// Mock Alerts
export const alerts: Alert[] = [
  {
    id: 'ALT-001',
    assetId: 'BRG-003',
    assetName: 'Indus River Bridge',
    riskType: 'AI Anomaly',
    severity: 'Critical',
    message: 'Autoencoder reconstruction error exceeded healthy baseline by 4.8x.',
    timestamp: '2026-02-09 14:25',
  },
  {
    id: 'ALT-002',
    assetId: 'BRG-002',
    assetName: 'Kohat Tunnel Bridge',
    riskType: 'Structural',
    severity: 'Medium',
    message: 'Routine inspection overdue by 15 days.',
    timestamp: '2026-02-08 08:00',
  },
  {
    id: 'ALT-003',
    assetId: 'BLD-003',
    assetName: 'Governor House Peshawar',
    riskType: 'Seismic',
    severity: 'High',
    message: 'Located in high seismic zone. Structural assessment recommended.',
    timestamp: '2026-02-07 10:15',
  },
];

// Mock Damage Assessments
export const damageAssessments: DamageAssessment[] = [
  {
    id: 'DMA-001',
    assetId: 'BRG-006',
    assetName: 'Swat Valley Bridge',
    eventType: 'Flood',
    damageSeverity: 'Moderate',
    assessmentStatus: 'Rapid Visual',
    date: '2026-02-05',
  },
  {
    id: 'DMA-002',
    assetId: 'BLD-004',
    assetName: 'District Headquarters Muzaffarabad',
    eventType: 'Earthquake',
    damageSeverity: 'Minor',
    assessmentStatus: 'Completed',
    date: '2026-01-28',
  },
];

// KPI Summary
export const kpiSummary = {
  totalBridges: 127,
  activeDaqUnits: 104,
  aiAnomalies24h: 8,
  satLinkUptimePct: 98.4,
  structuresAffectedByHazard: 3,
};

export const edgeUnits: EdgeUnit[] = [
  {
    id: 'DAQ-BRG-001',
    assetId: 'BRG-001',
    model: 'Jetson Orin Nano',
    powerSource: 'Solar + LiFePO4',
    satLink: 'Online',
    localStorageGb: 512,
    cpuLoadPct: 48,
    anomalyModelVersion: 'ae-v2.3.1',
    uptimePct: 99.2,
  },
  {
    id: 'DAQ-BRG-003',
    assetId: 'BRG-003',
    model: 'Jetson Nano',
    powerSource: 'Solar + LiFePO4',
    satLink: 'Intermittent',
    localStorageGb: 1024,
    cpuLoadPct: 73,
    anomalyModelVersion: 'ae-v2.3.1',
    uptimePct: 95.1,
  },
  {
    id: 'DAQ-BLD-002',
    assetId: 'BLD-002',
    model: 'Jetson Orin Nano',
    powerSource: 'Solar + LiFePO4',
    satLink: 'Online',
    localStorageGb: 512,
    cpuLoadPct: 36,
    anomalyModelVersion: 'ae-v2.3.1',
    uptimePct: 99.7,
  },
];

export const anomalyTrendData = [
  { month: 'Mar 25', mse: 0.021, anomalies: 2 },
  { month: 'Apr 25', mse: 0.024, anomalies: 3 },
  { month: 'May 25', mse: 0.019, anomalies: 1 },
  { month: 'Jun 25', mse: 0.028, anomalies: 4 },
  { month: 'Jul 25', mse: 0.033, anomalies: 5 },
  { month: 'Aug 25', mse: 0.026, anomalies: 2 },
  { month: 'Sep 25', mse: 0.022, anomalies: 2 },
  { month: 'Oct 25', mse: 0.019, anomalies: 1 },
  { month: 'Nov 25', mse: 0.018, anomalies: 1 },
  { month: 'Dec 25', mse: 0.024, anomalies: 2 },
  { month: 'Jan 26', mse: 0.029, anomalies: 4 },
  { month: 'Feb 26', mse: 0.035, anomalies: 8 },
];

export const frequencyDriftData = [
  { month: 'Sep 25', baseline: 3.92, current: 3.89 },
  { month: 'Oct 25', baseline: 3.92, current: 3.88 },
  { month: 'Nov 25', baseline: 3.92, current: 3.86 },
  { month: 'Dec 25', baseline: 3.92, current: 3.85 },
  { month: 'Jan 26', baseline: 3.92, current: 3.84 },
  { month: 'Feb 26', baseline: 3.92, current: 3.82 },
];

// Condition trend data (last 12 months)
export const conditionTrendData = [
  { month: 'Mar 25', safe: 168, watch: 35, critical: 13 },
  { month: 'Apr 25', safe: 165, watch: 38, critical: 13 },
  { month: 'May 25', safe: 163, watch: 39, critical: 14 },
  { month: 'Jun 25', safe: 161, watch: 41, critical: 14 },
  { month: 'Jul 25', safe: 164, watch: 39, critical: 13 },
  { month: 'Aug 25', safe: 166, watch: 37, critical: 13 },
  { month: 'Sep 25', safe: 169, watch: 35, critical: 12 },
  { month: 'Oct 25', safe: 171, watch: 34, critical: 11 },
  { month: 'Nov 25', safe: 173, watch: 33, critical: 10 },
  { month: 'Dec 25', safe: 175, watch: 32, critical: 9 },
  { month: 'Jan 26', safe: 177, watch: 31, critical: 8 },
  { month: 'Feb 26', safe: 178, watch: 30, critical: 8 },
];

// Damage types distribution
export const damageTypeData = [
  { name: 'Cracks', value: 42 },
  { name: 'Spalling', value: 28 },
  { name: 'Corrosion', value: 18 },
  { name: 'Settlement', value: 8 },
  { name: 'Bearing Issues', value: 4 },
];
