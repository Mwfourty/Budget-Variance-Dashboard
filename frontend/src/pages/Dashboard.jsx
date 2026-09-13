import { useEffect, useMemo, useState } from 'react';
import { BarChart3, LineChart, PieChart } from 'lucide-react';
import axiosClient from '../api/axiosClient.js';
import TopHeader from '../components/dashboard/TopHeader.jsx';
import ChartPanel from '../components/dashboard/ChartPanel.jsx';
import SummaryPanel from '../components/dashboard/SummaryPanel.jsx';
import FinancialTable from '../components/dashboard/FinancialTable.jsx';
import AdminSummaryPanel from '../components/dashboard/AdminSummaryPanel.jsx';
import AddEntryModal from '../components/dashboard/AddEntryModal.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { mockChartData, mockSummary, mockTableRows, mockDepartmentStatus } from '../data/mockData.js';

export default function Dashboard() {
  const { isAdmin } = useAuth();
  const [period, setPeriod] = useState('month');
  const [quarter, setQuarter] = useState('Q3');
  const [chartType, setChartType] = useState('bar');
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [saveError, setSaveError] = useState('');
  const [statusError, setStatusError] = useState('');

  const [chartData, setChartData] = useState(mockChartData);
  const [summary, setSummary] = useState(mockSummary);
  const [rows, setRows] = useState(mockTableRows);
  const [departments, setDepartments] = useState(mockDepartmentStatus);
  const chartIcons = { bar: BarChart3, line: LineChart, pie: PieChart };
  const chartOrder = ['bar', 'line', 'pie'];
  const ChartIcon = chartIcons[chartType] || BarChart3;

  const cycleChartType = () => {
    const nextIndex = (chartOrder.indexOf(chartType) + 1) % chartOrder.length;
    setChartType(chartOrder[nextIndex]);
  };

  // Pull live figures from the Spring Boot API whenever the filters change;
  // fall back to the bundled mock dataset if the API isn't reachable yet.
  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        const { data } = await axiosClient.get('/dashboard', { params: { period, quarter } });
        if (cancelled) return;
        setChartData(data.chartData ?? mockChartData);
        setSummary(data.summary ?? mockSummary);
        setRows(data.rows ?? mockTableRows);
        setDepartments(data.departments ?? mockDepartmentStatus);
      } catch {
        if (cancelled) return;
        setChartData(mockChartData);
        setSummary(mockSummary);
        setRows(mockTableRows);
        setDepartments(mockDepartmentStatus);
      }
    }

    loadDashboard();
    return () => {
      cancelled = true;
    };
  }, [period, quarter]);

  const pieData = useMemo(
    () => rows.map((row) => ({ name: row.department, value: row.actual })),
    [rows]
  );

  const handleDeleteRow = async (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
    try {
      await axiosClient.delete(`/budgets/${id}`);
    } catch {
      // Optimistic update stands even if the API call fails silently here;
      // a toast/error surface can be wired in once the endpoint is live.
    }
  };

  const handleAddEntry = async (entry) => {
    const { id, ...entryData } = entry;
    setSaveError('');

    try {
      let savedRow;
      if (id) {
        const { data } = await axiosClient.put(`/budgets/${id}`, entryData);
        savedRow = data;
      } else {
        const { data } = await axiosClient.post('/budgets', entryData);
        savedRow = data;
      }

      setRows((prev) => id
        ? prev.map((row) => (row.id === id ? savedRow : row))
        : [...prev, savedRow]);
      setEditingRow(null);
      setModalOpen(false);
    } catch (error) {
      setSaveError(error.response?.data?.message || 'Could not save this budget entry. Please try again.');
    }
  };

  const handleStatusChange = async (id, status) => {
    setStatusError('');
    try {
      const { data } = await axiosClient.patch(`/v1/budgets/${id}/status`, { status });
      const nextStatus = data.status.toLowerCase();
      setRows((prev) => prev.map((row) => (
        row.id === id ? { ...row, status: nextStatus } : row
      )));
      setDepartments((prev) => prev.map((department) => (
        department.id === id ? { ...department, status: nextStatus } : department
      )));
    } catch (error) {
      setStatusError(error.response?.data?.message || 'Could not update the log status. Please try again.');
    }
  };

  return (
    <div>
      <TopHeader
        period={period}
        onPeriodChange={setPeriod}
        quarter={quarter}
        onQuarterChange={setQuarter}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex flex-col gap-8">
          <div className="relative">
            <button
              type="button"
              onClick={cycleChartType}
              title="Cycle chart type"
              aria-label="Cycle chart type"
              className="absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full
                         bg-graphite-200 text-graphite-600 transition-colors duration-150 hover:bg-ember-100 hover:text-ember-600
                         dark:bg-graphite-800 dark:text-graphite-300 dark:hover:bg-ember-500/20 dark:hover:text-ember-400"
            >
              <ChartIcon className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <div className="dark-surface h-[280px] rounded-2xl border border-transparent bg-graphite-100/70 p-3 sm:h-[320px] sm:p-5 md:h-[360px] md:p-6 dark:border-oled-border">
              <ChartPanel chartType={chartType} data={chartData} pieData={pieData} />
            </div>
          </div>
          <FinancialTable
            rows={rows}
            onAdd={() => { setSaveError(''); setEditingRow(null); setModalOpen(true); }}
            onDelete={handleDeleteRow}
            onSubmit={(id) => handleStatusChange(id, 'pending')}
            onEdit={(row) => {
              setEditingRow(row);
              setModalOpen(true);
            }}
          />
        </div>

        <div className="flex flex-col gap-8">
          <SummaryPanel totalVariance={summary.totalVariance} budgetUtilization={summary.budgetUtilization} />
          <AdminSummaryPanel
            departments={departments}
            isAdmin={isAdmin}
            onStatusChange={handleStatusChange}
            className="hidden md:flex"
          />
          {statusError && <p role="alert" className="text-sm text-negative">{statusError}</p>}
        </div>
      </div>

      <AddEntryModal
        key={`${editingRow?.id ?? 'new'}-${isModalOpen}`}
        open={isModalOpen}
        entry={editingRow}
        error={saveError}
        onClose={() => { setSaveError(''); setEditingRow(null); setModalOpen(false); }}
        onSubmit={handleAddEntry}
      />
    </div>
  );
}
