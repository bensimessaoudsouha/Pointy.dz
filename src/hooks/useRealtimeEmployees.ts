import { useState, useEffect, useCallback } from 'react';
import { Employee, generateEmployees } from '@/data/mockData';

export function useRealtimeEmployees(initialCount: number = 250) {
  const [employees, setEmployees] = useState<Employee[]>(() => generateEmployees(initialCount));
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEmployees(prev => {
        const updated = [...prev];
        // Randomly update 1-3 employees
        const updateCount = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < updateCount; i++) {
          const idx = Math.floor(Math.random() * updated.length);
          const emp = updated[idx];
          
          // Toggle status or update location
          if (Math.random() > 0.5) {
            updated[idx] = {
              ...emp,
              status: emp.status === 'IN' ? 'OUT' : 'IN',
              lastDetected: new Date(),
            };
          } else {
            const zones = ['Floor 1', 'Floor 2', 'Floor 3', 'Lobby', 'Cafeteria', 'Meeting Rooms'];
            updated[idx] = {
              ...emp,
              zone: zones[Math.floor(Math.random() * zones.length)],
              lastDetected: new Date(),
            };
          }
        }
        
        return updated;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getStats = useCallback(() => {
    const onSite = employees.filter(e => e.status === 'IN').length;
    const checkedInToday = employees.filter(e => e.checkInTime).length;
    const absent = employees.filter(e => !e.checkInTime).length;
    const locations = new Set(employees.map(e => e.location)).size;
    
    return { onSite, checkedInToday, absent, locations };
  }, [employees]);
  
  return { employees, getStats };
}
