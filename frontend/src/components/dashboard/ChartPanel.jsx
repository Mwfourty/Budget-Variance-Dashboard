import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { useTheme } from '../../context/ThemeContext.jsx';

const PIE_COLORS = ['#F2600E', '#FF9F5F', '#FFC49C', '#7E2C05', '#D14C05'];

function formatCurrency(value) {
  return `R${(value / 1000).toFixed(0)}k`;
}

export default function ChartPanel({ chartType, data, pieData }) {
  const { isDark } = useTheme();
  const gridColor = isDark ? '#1C1C1C' : '#E9E9E6';
  const axisColor = isDark ? '#8B8B86' : '#666663';
  const tooltipStyle = {
    backgroundColor: isDark ? '#0A0A0A' : '#FFFFFF',
    border: `1px solid ${isDark ? '#1C1C1C' : '#E9E9E6'}`,
    borderRadius: 12,
    color: isDark ? '#F4F4F2' : '#1F1F1E',
    fontSize: 13
  };

  if (chartType === 'line') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="period" stroke={axisColor} tickLine={false} axisLine={false} fontSize={12} />
          <YAxis stroke={axisColor} tickLine={false} axisLine={false} fontSize={12} tickFormatter={formatCurrency} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatCurrency(v)} />
          <Legend wrapperStyle={{ fontSize: 12, color: axisColor }} />
          <Line type="monotone" dataKey="allocated" name="Allocated" stroke="#8B8B86" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="actual" name="Actual" stroke="#F2600E" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === 'pie') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={pieData} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="85%" paddingAngle={2}>
            {pieData.map((entry, index) => (
              <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatCurrency(v)} />
          <Legend wrapperStyle={{ fontSize: 12, color: axisColor }} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis dataKey="period" stroke={axisColor} tickLine={false} axisLine={false} fontSize={12} />
        <YAxis stroke={axisColor} tickLine={false} axisLine={false} fontSize={12} tickFormatter={formatCurrency} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatCurrency(v)} cursor={{ fill: gridColor }} />
        <Legend wrapperStyle={{ fontSize: 12, color: axisColor }} />
        <Bar dataKey="allocated" name="Allocated" fill="#D6D6D2" radius={[6, 6, 0, 0]} />
        <Bar dataKey="actual" name="Actual" fill="#F2600E" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
