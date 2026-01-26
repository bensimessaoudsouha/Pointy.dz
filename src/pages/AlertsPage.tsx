import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { useAlerts } from "@/hooks/useAlerts";
import { Bell } from "lucide-react";

const AlertsPage = () => {
  const { alerts, unreadCount, resolveAlert, dismissAlert } = useAlerts();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Security Alerts & Critical Events
            </h2>
            <p className="text-muted-foreground">
              AI-detected fraud attempts, late arrivals, and system issues
            </p>
          </div>
          {unreadCount > 0 && (
            <div className="flex items-center gap-2 text-warning">
              <Bell className="h-5 w-5" />
              <span className="font-medium">{unreadCount} critical alerts</span>
            </div>
          )}
        </div>

        <AlertsPanel
          alerts={alerts}
          onResolve={resolveAlert}
          onDismiss={dismissAlert}
        />
      </div>
    </DashboardLayout>
  );
};

export default AlertsPage;
