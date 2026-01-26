import { useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { PresenceTable } from '@/components/dashboard/PresenceTable';
import { ZoneMonitor } from '@/components/dashboard/ZoneMonitor';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts';
import { useRealtimeEmployees } from '@/hooks/useRealtimeEmployees';
import { useAlerts } from '@/hooks/useAlerts';
import { generateZones } from '@/data/mockData';
import { Users, UserCheck, UserX, MapPin } from 'lucide-react';

const Index = () => {
  const { employees, getStats } = useRealtimeEmployees(250);
  const { alerts, resolveAlert, dismissAlert } = useAlerts();
  const zones = useMemo(() => generateZones(), []);
  const stats = getStats();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="On-Site Now"
            value={stats.onSite}
            icon={Users}
            variant="success"
            live
            change={5.2}
            changeLabel="vs yesterday"
          />
          <KPICard
            title="Checked-In Today"
            value={stats.checkedInToday}
            icon={UserCheck}
            change={2.1}
            changeLabel="vs last week"
          />
          <KPICard
            title="Absent Today"
            value={stats.absent}
            icon={UserX}
            variant={stats.absent > 20 ? 'warning' : 'default'}
            change={-8.3}
            changeLabel="vs last week"
          />
          <KPICard
            title="Active Locations"
            value={stats.locations}
            icon={MapPin}
          />
        </div>
        
        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Presence Table - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Real-Time Presence</h2>
            <PresenceTable employees={employees} />
          </div>
          
          {/* Alerts Panel */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Alerts & Notifications</h2>
            <AlertsPanel 
              alerts={alerts} 
              onResolve={resolveAlert}
              onDismiss={dismissAlert}
            />
          </div>
        </div>
        
        {/* Zone Monitor */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Location & Zone Overview</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {zones.slice(0, 8).map(zone => {
              const ratio = zone.currentOccupancy / zone.capacity;
              const status = ratio >= 1 ? 'critical' : ratio >= 0.8 ? 'warning' : 'normal';
              return (
                <div 
                  key={zone.id}
                  className={`p-4 rounded-lg border bg-card ${
                    status === 'critical' ? 'zone-critical' : 
                    status === 'warning' ? 'zone-warning' : 
                    'zone-normal'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{zone.name}</p>
                      <p className="text-xs text-muted-foreground">{zone.building}</p>
                    </div>
                    <span className={`text-lg font-bold ${
                      status === 'critical' ? 'text-destructive' :
                      status === 'warning' ? 'text-warning' :
                      'text-success'
                    }`}>
                      {Math.round((zone.currentOccupancy / zone.capacity) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        status === 'critical' ? 'bg-destructive' :
                        status === 'warning' ? 'bg-warning' :
                        'bg-success'
                      }`}
                      style={{ width: `${Math.min(100, (zone.currentOccupancy / zone.capacity) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {zone.currentOccupancy} / {zone.capacity} workers
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Analytics Preview */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Analytics Overview</h2>
          <AnalyticsCharts employees={employees} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
