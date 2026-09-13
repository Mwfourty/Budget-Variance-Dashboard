// Local fallback data. The dashboard always attempts the real API first
// (see src/api endpoints called from Dashboard.jsx); this only renders
// when that request fails, so the UI stays reviewable without a backend.

export const mockChartData = [
  { period: 'Jan', allocated: 420000, actual: 380000 },
  { period: 'Feb', allocated: 420000, actual: 410000 },
  { period: 'Mar', allocated: 450000, actual: 470000 },
  { period: 'Apr', allocated: 450000, actual: 430000 },
  { period: 'May', allocated: 480000, actual: 455000 },
  { period: 'Jun', allocated: 500000, actual: 512000 },
  { period: 'Jul', allocated: 500000, actual: 468000 },
  { period: 'Aug', allocated: 520000, actual: 495000 }
];

export const mockSummary = {
  totalVariance: 120000,
  budgetUtilization: 66.3
};

export const mockTableRows = [
  {
    id: 'row-1',
    department: 'IT Budget',
    allocated: 520000,
    actual: 495000,
    variance: 25000,
    utilization: 95.2,
    status: 'draft'
  },
  {
    id: 'row-2',
    department: 'HR Budget',
    allocated: 180000,
    actual: 176500,
    variance: 3500,
    utilization: 98.1,
    status: 'pending'
  },
  {
    id: 'row-3',
    department: 'Marketing Budget',
    allocated: 260000,
    actual: 289000,
    variance: -29000,
    utilization: 111.2,
    status: 'approved'
  }
];

export const mockDepartmentStatus = [
  { id: 'dept-1', name: 'IT Budget', status: 'draft' },
  { id: 'dept-2', name: 'HR Budget', status: 'pending' },
  { id: 'dept-3', name: 'Marketing Budget', status: 'approved' },
  { id: 'dept-4', name: 'Operations Budget', status: 'rejected' }
];
