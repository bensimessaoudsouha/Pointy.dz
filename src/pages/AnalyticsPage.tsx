import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts';
import { useRealtimeEmployees } from '@/hooks/useRealtimeEmployees';

const AnalyticsPage = () => {
  const { employees } = useRealtimeEmployees(250);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Analytics & Reports</h2>
          <p className="text-muted-foreground">Insights and trends from workforce data</p>
        </div>
        
        <AnalyticsCharts employees={employees} />
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
