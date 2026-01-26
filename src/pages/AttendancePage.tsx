import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useRealtimeEmployees } from '@/hooks/useRealtimeEmployees';
import { generateAttendanceData } from '@/data/mockData';
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
import { format } from 'date-fns';
import { CalendarIcon, Search, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

const AttendancePage = () => {
  const { employees } = useRealtimeEmployees(100);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [date, setDate] = useState<Date>();
  
  const attendanceRecords = useMemo(() => 
    generateAttendanceData(employees, 7), 
    [employees]
  );
  
  const filteredRecords = useMemo(() => {
    return attendanceRecords
      .filter(r => {
        const matchesSearch = r.employeeName.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
        const matchesDate = !date || r.date.toDateString() === date.toDateString();
        return matchesSearch && matchesStatus && matchesDate;
      })
      .slice(0, 50);
  }, [attendanceRecords, search, statusFilter, date]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Present</Badge>;
      case 'absent':
        return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">Absent</Badge>;
      case 'late':
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Late</Badge>;
      case 'early-leave':
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Early Leave</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Attendance & Time Tracking</h2>
            <p className="text-muted-foreground">Daily check-in/out history and attendance records</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by employee name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
              <SelectItem value="late">Late</SelectItem>
              <SelectItem value="early-leave">Early Leave</SelectItem>
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
              Clear date
            </Button>
          )}
        </div>
        
        {/* Table */}
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-striped">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">Employee</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Check In</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Check Out</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Hours</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map(record => (
                  <tr key={record.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{record.employeeName}</p>
                        <p className="text-xs text-muted-foreground font-mono">{record.employeeId}</p>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {format(record.date, 'MMM d, yyyy')}
                    </td>
                    <td className="p-4 font-mono text-sm">
                      {record.checkIn ? format(record.checkIn, 'HH:mm') : '—'}
                    </td>
                    <td className="p-4 font-mono text-sm">
                      {record.checkOut ? format(record.checkOut, 'HH:mm') : '—'}
                    </td>
                    <td className="p-4 font-mono text-sm">
                      {record.totalHours > 0 ? `${record.totalHours}h` : '—'}
                    </td>
                    <td className="p-4">
                      {getStatusBadge(record.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t text-sm text-muted-foreground">
            Showing {filteredRecords.length} records
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AttendancePage;
