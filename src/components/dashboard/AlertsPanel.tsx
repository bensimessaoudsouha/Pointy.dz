import { Alert } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  UserX, 
  ShieldAlert, 
  Clock,
  X,
  CheckCircle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AlertsPanelProps {
  alerts: Alert[];
  onResolve: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function AlertsPanel({ alerts, onResolve, onDismiss }: AlertsPanelProps) {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'overcrowding': return AlertTriangle;
      case 'missing': return UserX;
      case 'unauthorized': return ShieldAlert;
      case 'late': return Clock;
    }
  };
  
  const getAlertStyles = (severity: Alert['severity'], resolved: boolean) => {
    if (resolved) return 'border-muted bg-muted/30 opacity-60';
    switch (severity) {
      case 'high': return 'border-destructive/50 bg-destructive/5';
      case 'medium': return 'border-warning/50 bg-warning/5';
      default: return 'border-primary/50 bg-primary/5';
    }
  };
  
  const getIconStyles = (severity: Alert['severity'], resolved: boolean) => {
    if (resolved) return 'text-muted-foreground';
    switch (severity) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      default: return 'text-primary';
    }
  };
  
  if (alerts.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <CheckCircle className="h-12 w-12 text-success mx-auto mb-3" />
        <p className="font-medium">All Clear</p>
        <p className="text-sm text-muted-foreground">No active alerts at this time</p>
      </div>
    );
  }
  
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Active Alerts</h3>
        <span className="text-sm text-muted-foreground">
          {alerts.filter(a => !a.resolved).length} unresolved
        </span>
      </div>
      
      <div className="divide-y max-h-[400px] overflow-y-auto">
        {alerts.map(alert => {
          const Icon = getAlertIcon(alert.type);
          
          return (
            <div 
              key={alert.id}
              className={cn(
                'p-4 border-l-4 transition-all animate-fade-in',
                getAlertStyles(alert.severity, alert.resolved)
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn('h-5 w-5 mt-0.5 shrink-0', getIconStyles(alert.severity, alert.resolved))} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      'text-xs font-medium uppercase tracking-wider',
                      alert.severity === 'high' && !alert.resolved && 'text-destructive',
                      alert.severity === 'medium' && !alert.resolved && 'text-warning',
                    )}>
                      {alert.severity}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                    </span>
                    {alert.resolved && (
                      <span className="text-xs text-success font-medium">Resolved</span>
                    )}
                  </div>
                  <p className="text-sm">{alert.message}</p>
                </div>
                
                <div className="flex gap-1 shrink-0">
                  {!alert.resolved && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onResolve(alert.id)}
                      className="h-7 text-xs"
                    >
                      Resolve
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDismiss(alert.id)}
                    className="h-7 w-7"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
