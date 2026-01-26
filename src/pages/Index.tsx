import { useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { PresenceTable } from "@/components/dashboard/PresenceTable";
import { ZoneMonitor } from "@/components/dashboard/ZoneMonitor";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { useRealtimeEmployees } from "@/hooks/useRealtimeEmployees";
import { useAlerts } from "@/hooks/useAlerts";
import { generateZones } from "@/data/mockData";
import {
  Users,
  UserCheck,
  UserX,
  MapPin,
  ShieldCheck,
  Camera,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const { employees, getStats } = useRealtimeEmployees(250);
  const { alerts, resolveAlert, dismissAlert } = useAlerts();
  const zones = useMemo(() => generateZones(), []);
  const stats = getStats();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* AI Status Banner */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">
                    AI Verification System Online
                  </h3>
                  <p className="text-sm text-blue-700">
                    All check-ins are automatically verified with facial
                    recognition
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-900">98.7%</p>
                  <p className="text-xs text-blue-600">Verification Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-900">12</p>
                  <p className="text-xs text-blue-600">Active Cameras</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
            title="AI-Verified Today"
            value={stats.checkedInToday}
            icon={ShieldCheck}
            variant="success"
            change={2.1}
            changeLabel="vs last week"
          />
          <KPICard
            title="Pending Verification"
            value={Math.floor(stats.checkedInToday * 0.02)}
            icon={Clock}
            variant="warning"
            change={-15.3}
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
            <h2 className="text-lg font-semibold mb-4">
              Real-Time AI-Verified Presence
            </h2>
            <PresenceTable employees={employees} />
          </div>

          {/* Alerts Panel */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Alerts & Notifications
            </h2>
            <AlertsPanel
              alerts={alerts}
              onResolve={resolveAlert}
              onDismiss={dismissAlert}
            />
          </div>
        </div>

        {/* Zone Monitor */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Location & Zone Overview
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {zones.slice(0, 8).map((zone) => {
              const ratio = zone.currentOccupancy / zone.capacity;
              const status =
                ratio >= 1 ? "critical" : ratio >= 0.8 ? "warning" : "normal";
              return (
                <div
                  key={zone.id}
                  className={`p-4 rounded-lg border bg-card ${
                    status === "critical"
                      ? "zone-critical"
                      : status === "warning"
                        ? "zone-warning"
                        : "zone-normal"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{zone.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {zone.building}
                      </p>
                    </div>
                    <span
                      className={`text-lg font-bold ${
                        status === "critical"
                          ? "text-destructive"
                          : status === "warning"
                            ? "text-warning"
                            : "text-success"
                      }`}
                    >
                      {Math.round(
                        (zone.currentOccupancy / zone.capacity) * 100,
                      )}
                      %
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        status === "critical"
                          ? "bg-destructive"
                          : status === "warning"
                            ? "bg-warning"
                            : "bg-success"
                      }`}
                      style={{
                        width: `${Math.min(100, (zone.currentOccupancy / zone.capacity) * 100)}%`,
                      }}
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
