export interface Employee {
  id: string;
  name: string;
  department: string;
  status: 'IN' | 'OUT';
  location: string;
  zone: string;
  lastDetected: Date;
  checkInTime?: Date;
  checkOutTime?: Date;
  avatar?: string;
}

export interface Zone {
  id: string;
  name: string;
  building: string;
  capacity: number;
  currentOccupancy: number;
}

export interface Alert {
  id: string;
  type: 'overcrowding' | 'missing' | 'unauthorized' | 'late';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  resolved: boolean;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  status: 'present' | 'absent' | 'late' | 'early-leave';
  totalHours: number;
}

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Legal', 'IT Support'];
const buildings = ['HQ Building A', 'HQ Building B', 'Warehouse', 'R&D Center'];
const zones = ['Floor 1', 'Floor 2', 'Floor 3', 'Lobby', 'Cafeteria', 'Meeting Rooms', 'Server Room', 'Parking'];

const firstNames = ['Ahmed', 'Fatima', 'Mohamed', 'Amina', 'Youssef', 'Sara', 'Karim', 'Nadia', 'Omar', 'Leila', 'Hassan', 'Yasmine', 'Ali', 'Samira', 'Rachid', 'Khadija'];
const lastNames = ['Benali', 'Mansouri', 'Boudjema', 'Larbi', 'Hadj', 'Belkacem', 'Zerhouni', 'Benmoussa', 'Khelifi', 'Rahmani', 'Saidi', 'Cherif', 'Hamidi', 'Ouali', 'Messaoudi'];

function generateEmployeeId(): string {
  return `EMP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
}

function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function generateEmployees(count: number): Employee[] {
  const employees: Employee[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < count; i++) {
    const isIn = Math.random() > 0.2;
    const building = randomFromArray(buildings);
    const checkInTime = randomDate(new Date(today.getTime() + 7 * 60 * 60 * 1000), new Date(today.getTime() + 10 * 60 * 60 * 1000));
    
    employees.push({
      id: generateEmployeeId(),
      name: `${randomFromArray(firstNames)} ${randomFromArray(lastNames)}`,
      department: randomFromArray(departments),
      status: isIn ? 'IN' : 'OUT',
      location: building,
      zone: randomFromArray(zones),
      lastDetected: randomDate(new Date(Date.now() - 60 * 60 * 1000), new Date()),
      checkInTime: checkInTime,
      checkOutTime: isIn ? undefined : randomDate(new Date(today.getTime() + 16 * 60 * 60 * 1000), new Date(today.getTime() + 18 * 60 * 60 * 1000)),
    });
  }
  
  return employees;
}

export function generateZones(): Zone[] {
  const zoneData: Zone[] = [];
  
  buildings.forEach(building => {
    zones.slice(0, 5).forEach(zone => {
      const capacity = Math.floor(Math.random() * 50) + 20;
      const occupancy = Math.floor(Math.random() * (capacity + 10));
      
      zoneData.push({
        id: `${building}-${zone}`.toLowerCase().replace(/\s+/g, '-'),
        name: zone,
        building,
        capacity,
        currentOccupancy: Math.min(occupancy, capacity + 5),
      });
    });
  });
  
  return zoneData;
}

export function generateAlerts(): Alert[] {
  return [
    {
      id: '1',
      type: 'overcrowding',
      message: 'Floor 2 in HQ Building A has exceeded 90% capacity',
      severity: 'high',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      resolved: false,
    },
    {
      id: '2',
      type: 'missing',
      message: 'Critical employee Mohamed Benali not detected in assigned zone',
      severity: 'medium',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      resolved: false,
    },
    {
      id: '3',
      type: 'unauthorized',
      message: 'Unauthorized access attempt at Server Room - R&D Center',
      severity: 'high',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      resolved: false,
    },
    {
      id: '4',
      type: 'late',
      message: '12 employees arrived late today (after 9:30 AM)',
      severity: 'low',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      resolved: true,
    },
    {
      id: '5',
      type: 'overcrowding',
      message: 'Cafeteria approaching maximum capacity (85%)',
      severity: 'medium',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      resolved: false,
    },
  ];
}

export function generateAttendanceData(employees: Employee[], days: number): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  const today = new Date();
  
  for (let d = 0; d < days; d++) {
    const date = new Date(today);
    date.setDate(date.getDate() - d);
    date.setHours(0, 0, 0, 0);
    
    employees.forEach(emp => {
      const isPresent = Math.random() > 0.1;
      const isLate = isPresent && Math.random() > 0.85;
      const isEarlyLeave = isPresent && !isLate && Math.random() > 0.9;
      
      const checkIn = isPresent
        ? new Date(date.getTime() + (isLate ? 10 : 8) * 60 * 60 * 1000 + Math.random() * 60 * 60 * 1000)
        : null;
      
      const checkOut = isPresent
        ? new Date(date.getTime() + (isEarlyLeave ? 15 : 17) * 60 * 60 * 1000 + Math.random() * 60 * 60 * 1000)
        : null;
      
      const totalHours = checkIn && checkOut
        ? (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60)
        : 0;
      
      records.push({
        id: `${emp.id}-${date.toISOString().split('T')[0]}`,
        employeeId: emp.id,
        employeeName: emp.name,
        date,
        checkIn,
        checkOut,
        status: !isPresent ? 'absent' : isLate ? 'late' : isEarlyLeave ? 'early-leave' : 'present',
        totalHours: Math.round(totalHours * 10) / 10,
      });
    });
  }
  
  return records;
}

export function generateDailyStats(days: number = 30) {
  const stats = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    stats.push({
      date: date.toISOString().split('T')[0],
      present: Math.floor(Math.random() * 50) + 200,
      absent: Math.floor(Math.random() * 20) + 5,
      late: Math.floor(Math.random() * 15) + 2,
    });
  }
  
  return stats;
}

export function generateHourlyPresence() {
  const hours = [];
  
  for (let h = 6; h <= 20; h++) {
    hours.push({
      hour: `${h}:00`,
      count: h < 8 ? Math.floor(Math.random() * 20) + 10
           : h < 10 ? Math.floor(Math.random() * 100) + 150
           : h < 12 ? Math.floor(Math.random() * 30) + 220
           : h < 14 ? Math.floor(Math.random() * 40) + 180
           : h < 17 ? Math.floor(Math.random() * 30) + 210
           : h < 19 ? Math.floor(Math.random() * 80) + 100
           : Math.floor(Math.random() * 30) + 20,
    });
  }
  
  return hours;
}

export function generateDepartmentStats(employees: Employee[]) {
  const deptStats: Record<string, { total: number; present: number }> = {};
  
  employees.forEach(emp => {
    if (!deptStats[emp.department]) {
      deptStats[emp.department] = { total: 0, present: 0 };
    }
    deptStats[emp.department].total++;
    if (emp.status === 'IN') {
      deptStats[emp.department].present++;
    }
  });
  
  return Object.entries(deptStats).map(([name, stats]) => ({
    name,
    total: stats.total,
    present: stats.present,
    rate: Math.round((stats.present / stats.total) * 100),
  }));
}
