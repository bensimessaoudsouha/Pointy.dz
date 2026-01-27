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
  TrendingUp,
  Globe,
  Zap,
  Shield,
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
        {/* Market Leadership Banner */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 lg:col-span-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-900 flex items-center gap-2">
                      Made for Algeria 🇩🇿
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-700"
                      >
                        No Hardware Required
                      </Badge>
                    </h3>
                    <p className="text-sm text-purple-700">
                      AI verification using your existing cameras • Compliant
                      with Algerian labor laws • Arabic/French interface
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-900">98.7%</p>
                    <p className="text-xs text-purple-600">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-900">12</p>
                    <p className="text-xs text-purple-600">Cameras</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-green-600 font-medium">
                    Market Reach
                  </p>
                  <p className="text-2xl font-bold text-green-900">1.2M+</p>
                  <p className="text-xs text-green-700">Employees in Algeria</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Competitive Advantages */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="pt-6 text-center">
              <Zap className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold text-blue-900">Real-Time Analytics</p>
              <p className="text-xs text-blue-600 mt-1">
                Live workforce insights
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-purple-50/50">
            <CardContent className="pt-6 text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="font-semibold text-purple-900">Data Privacy</p>
              <p className="text-xs text-purple-600 mt-1">Algerian compliant</p>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="pt-6 text-center">
              <Globe className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="font-semibold text-green-900">Bilingual</p>
              <p className="text-xs text-green-600 mt-1">Arabic & French</p>
            </CardContent>
          </Card>
          <Card className="border-orange-200 bg-orange-50/50">
            <CardContent className="pt-6 text-center">
              <Camera className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <p className="font-semibold text-orange-900">No New Hardware</p>
              <p className="text-xs text-orange-600 mt-1">
                Uses existing cameras
              </p>
            </CardContent>
          </Card>
        </div>

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
