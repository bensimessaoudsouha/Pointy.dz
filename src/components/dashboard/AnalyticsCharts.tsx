import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { 
  generateDailyStats, 
  generateHourlyPresence, 
  generateDepartmentStats 
} from '@/data/mockData';
import { Employee } from '@/data/mockData';
import { useMemo } from 'react';

interface AnalyticsChartsProps {
  employees: Employee[];
}

const COLORS = ['hsl(217, 91%, 40%)', 'hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)', 'hsl(0, 84%, 60%)', 'hsl(262, 83%, 58%)'];

export function AnalyticsCharts({ employees }: AnalyticsChartsProps) {
  const dailyStats = useMemo(() => generateDailyStats(14), []);
  const hourlyPresence = useMemo(() => generateHourlyPresence(), []);
  const departmentStats = useMemo(() => generateDepartmentStats(employees), [employees]);
  
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Daily Attendance Trend */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="font-semibold mb-4">Daily Attendance Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dailyStats}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              className="text-muted-foreground"
            />
            <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="present" 
              stroke="hsl(142, 76%, 36%)" 
              strokeWidth={2}
              dot={false}
              name="Present"
            />
            <Line 
              type="monotone" 
              dataKey="late" 
              stroke="hsl(38, 92%, 50%)" 
              strokeWidth={2}
              dot={false}
              name="Late"
            />
            <Line 
              type="monotone" 
              dataKey="absent" 
              stroke="hsl(0, 84%, 60%)" 
              strokeWidth={2}
              dot={false}
              name="Absent"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Peak Hours */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="font-semibold mb-4">Peak Working Hours</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={hourlyPresence}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="hour" tick={{ fontSize: 11 }} className="text-muted-foreground" />
            <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Bar 
              dataKey="count" 
              fill="hsl(217, 91%, 40%)" 
              radius={[4, 4, 0, 0]}
              name="Workers Present"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Department Distribution */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="font-semibold mb-4">Presence by Department</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={departmentStats}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="present"
              nameKey="name"
              label={({ name, rate }) => `${name}: ${rate}%`}
              labelLine={false}
            >
              {departmentStats.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Department Attendance Rate */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="font-semibold mb-4">Attendance Rate by Department</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={departmentStats} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={80} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value) => `${value}%`}
            />
            <Bar 
              dataKey="rate" 
              fill="hsl(217, 91%, 40%)" 
              radius={[0, 4, 4, 0]}
              name="Attendance Rate"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
