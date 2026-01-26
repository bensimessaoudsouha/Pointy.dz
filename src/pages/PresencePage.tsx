import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PresenceTable } from '@/components/dashboard/PresenceTable';
import { useRealtimeEmployees } from '@/hooks/useRealtimeEmployees';

const PresencePage = () => {
  const { employees } = useRealtimeEmployees(250);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Real-Time Presence Monitoring</h2>
            <p className="text-muted-foreground">Track employee locations and status across all facilities</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
            </span>
            <span className="text-muted-foreground">Live updates every 3s</span>
          </div>
        </div>
        
        <PresenceTable employees={employees} />
      </div>
    </DashboardLayout>
  );
};

export default PresencePage;
