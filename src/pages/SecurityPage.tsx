import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useRealtimeEmployees } from '@/hooks/useRealtimeEmployees';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, subDays } from 'date-fns';
import { CalendarIcon, Search, Download, LogIn, LogOut, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SecurityLog {
  id: string;
  employeeId: string;
  employeeName: string;
  action: 'entry' | 'exit' | 'denied';
  location: string;
  zone: string;
  timestamp: Date;
  method: 'badge' | 'biometric' | 'manual';
}

const SecurityPage = () => {
  const { employees } = useRealtimeEmployees(50);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [date, setDate] = useState<Date>();
  
  // Generate mock security logs
  const logs = useMemo<SecurityLog[]>(() => {
    const generatedLogs: SecurityLog[] = [];
    const actions: SecurityLog['action'][] = ['entry', 'exit', 'denied'];
    const methods: SecurityLog['method'][] = ['badge', 'biometric', 'manual'];
    const zones = ['Main Entrance', 'Parking Gate', 'Floor 1', 'Floor 2', 'Server Room', 'Executive Wing'];
    
    for (let i = 0; i < 100; i++) {
      const emp = employees[Math.floor(Math.random() * employees.length)];
      if (!emp) continue;
      
      const action = Math.random() > 0.05 
        ? (Math.random() > 0.5 ? 'entry' : 'exit')
        : 'denied';
      
      generatedLogs.push({
        id: `log-${i}`,
        employeeId: emp.id,
        employeeName: emp.name,
        action,
        location: emp.location,
        zone: zones[Math.floor(Math.random() * zones.length)],
        timestamp: subDays(new Date(), Math.random() * 7),
        method: methods[Math.floor(Math.random() * methods.length)],
      });
    }
    
    return generatedLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [employees]);
  
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = log.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        log.employeeId.toLowerCase().includes(search.toLowerCase());
      const matchesAction = actionFilter === 'all' || log.action === actionFilter;
      const matchesDate = !date || log.timestamp.toDateString() === date.toDateString();
      return matchesSearch && matchesAction && matchesDate;
    });
  }, [logs, search, actionFilter, date]);
  
  const getActionBadge = (action: SecurityLog['action']) => {
    switch (action) {
      case 'entry':
        return (
          <Badge className="bg-success/10 text-success hover:bg-success/20">
            <LogIn className="h-3 w-3 mr-1" />
            Entry
          </Badge>
        );
      case 'exit':
        return (
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
            <LogOut className="h-3 w-3 mr-1" />
            Exit
          </Badge>
        );
      case 'denied':
        return (
          <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">
            <ShieldAlert className="h-3 w-3 mr-1" />
            Denied
          </Badge>
        );
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Security & Access Logs</h2>
            <p className="text-muted-foreground">Audit trail of all entry/exit events and access attempts</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Events Today</p>
            <p className="text-2xl font-bold">
              {logs.filter(l => l.timestamp.toDateString() === new Date().toDateString()).length}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Entry Events</p>
            <p className="text-2xl font-bold text-success">
              {logs.filter(l => l.action === 'entry').length}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Exit Events</p>
            <p className="text-2xl font-bold text-primary">
              {logs.filter(l => l.action === 'exit').length}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Access Denied</p>
            <p className="text-2xl font-bold text-destructive">
              {logs.filter(l => l.action === 'denied').length}
            </p>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="entry">Entry</SelectItem>
              <SelectItem value="exit">Exit</SelectItem>
              <SelectItem value="denied">Denied</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          {date && (
            <Button variant="ghost" onClick={() => setDate(undefined)}>
              Clear
            </Button>
          )}
        </div>
        
        {/* Logs Table */}
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-striped">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">Timestamp</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Employee</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Action</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Location</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Zone</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Method</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.slice(0, 50).map(log => (
                  <tr 
                    key={log.id} 
                    className={cn(
                      "border-b last:border-0 hover:bg-muted/30",
                      log.action === 'denied' && "bg-destructive/5"
                    )}
                  >
                    <td className="p-4 font-mono text-sm">
                      {format(log.timestamp, 'MMM d, HH:mm:ss')}
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{log.employeeName}</p>
                        <p className="text-xs text-muted-foreground font-mono">{log.employeeId}</p>
                      </div>
                    </td>
                    <td className="p-4">{getActionBadge(log.action)}</td>
                    <td className="p-4 text-muted-foreground">{log.location}</td>
                    <td className="p-4 text-muted-foreground">{log.zone}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="capitalize">
                        {log.method}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t text-sm text-muted-foreground">
            Showing {Math.min(50, filteredLogs.length)} of {filteredLogs.length} log entries
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SecurityPage;
