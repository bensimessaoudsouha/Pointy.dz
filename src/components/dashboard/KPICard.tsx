import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  live?: boolean;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeLabel,
  icon: Icon, 
  variant = 'default',
  live = false 
}: KPICardProps) {
  const variantStyles = {
    default: 'bg-card border-border',
    success: 'bg-success/5 border-success/20',
    warning: 'bg-warning/5 border-warning/20',
    danger: 'bg-destructive/5 border-destructive/20',
  };
  
  const iconStyles = {
    default: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-destructive/10 text-destructive',
  };
  
  return (
    <div className={cn(
      'relative rounded-lg border p-6 transition-all card-hover',
      variantStyles[variant]
    )}>
      {live && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-xs text-success font-medium">LIVE</span>
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight animate-count-up">{value}</p>
          {change !== undefined && (
            <p className={cn(
              'text-sm font-medium flex items-center gap-1',
              change >= 0 ? 'text-success' : 'text-destructive'
            )}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
              {changeLabel && <span className="text-muted-foreground font-normal">{changeLabel}</span>}
            </p>
          )}
        </div>
        
        <div className={cn('rounded-lg p-3', iconStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
