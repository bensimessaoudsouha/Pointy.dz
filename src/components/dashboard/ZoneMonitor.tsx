import { useMemo } from 'react';
import { Zone } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Users, AlertTriangle, Building2 } from 'lucide-react';

interface ZoneMonitorProps {
  zones: Zone[];
}

export function ZoneMonitor({ zones }: ZoneMonitorProps) {
  const groupedByBuilding = useMemo(() => {
    const grouped: Record<string, Zone[]> = {};
    zones.forEach(zone => {
      if (!grouped[zone.building]) {
        grouped[zone.building] = [];
      }
      grouped[zone.building].push(zone);
    });
    return grouped;
  }, [zones]);
  
  const getCapacityStatus = (zone: Zone) => {
    const ratio = zone.currentOccupancy / zone.capacity;
    if (ratio >= 1) return 'critical';
    if (ratio >= 0.8) return 'warning';
    return 'normal';
  };
  
  const getCapacityColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-destructive';
      case 'warning': return 'text-warning';
      default: return 'text-success';
    }
  };
  
  const getProgressColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive';
      case 'warning': return 'bg-warning';
      default: return 'bg-success';
    }
  };
  
  return (
    <div className="space-y-6">
      {Object.entries(groupedByBuilding).map(([building, buildingZones]) => (
        <div key={building} className="rounded-lg border bg-card overflow-hidden">
          <div className="p-4 border-b bg-muted/30 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">{building}</h3>
            <span className="text-sm text-muted-foreground ml-auto">
              {buildingZones.reduce((sum, z) => sum + z.currentOccupancy, 0)} workers
            </span>
          </div>
          
          <div className="p-4 grid gap-3">
            {buildingZones.map(zone => {
              const status = getCapacityStatus(zone);
              const percentage = Math.min(100, (zone.currentOccupancy / zone.capacity) * 100);
              
              return (
                <div 
                  key={zone.id}
                  className={cn(
                    'p-3 rounded-md border',
                    status === 'critical' && 'zone-critical',
                    status === 'warning' && 'zone-warning',
                    status === 'normal' && 'zone-normal',
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{zone.name}</span>
                      {status !== 'normal' && (
                        <AlertTriangle className={cn('h-4 w-4', getCapacityColor(status))} />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className={cn('font-medium', getCapacityColor(status))}>
                        {zone.currentOccupancy}
                      </span>
                      <span className="text-muted-foreground">/ {zone.capacity}</span>
                    </div>
                  </div>
                  
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn('h-full rounded-full transition-all duration-500', getProgressColor(status))}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
