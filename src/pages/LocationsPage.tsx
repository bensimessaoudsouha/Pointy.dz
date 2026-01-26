import { useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ZoneMonitor } from '@/components/dashboard/ZoneMonitor';
import { generateZones } from '@/data/mockData';

const LocationsPage = () => {
  const zones = useMemo(() => generateZones(), []);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Location & Zone Management</h2>
          <p className="text-muted-foreground">Monitor capacity and occupancy across all buildings and zones</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Zones</p>
            <p className="text-2xl font-bold">{zones.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Over Capacity</p>
            <p className="text-2xl font-bold text-destructive">
              {zones.filter(z => z.currentOccupancy > z.capacity).length}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Occupancy</p>
            <p className="text-2xl font-bold">
              {zones.reduce((sum, z) => sum + z.currentOccupancy, 0)}
            </p>
          </div>
        </div>
        
        <ZoneMonitor zones={zones} />
      </div>
    </DashboardLayout>
  );
};

export default LocationsPage;
