import { useState, useEffect } from 'react';
import { Alert, generateAlerts } from '@/data/mockData';

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(() => generateAlerts());
  const [unreadCount, setUnreadCount] = useState(0);
  
  useEffect(() => {
    setUnreadCount(alerts.filter(a => !a.resolved).length);
  }, [alerts]);
  
  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const alertTypes: Alert['type'][] = ['overcrowding', 'missing', 'unauthorized', 'late'];
        const messages = {
          overcrowding: 'Zone capacity exceeded in Meeting Rooms',
          missing: 'Employee not detected in expected zone',
          unauthorized: 'Badge scan rejected at restricted area',
          late: 'New late arrival detected',
        };
        const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        
        const newAlert: Alert = {
          id: Date.now().toString(),
          type,
          message: messages[type],
          severity: type === 'unauthorized' ? 'high' : type === 'overcrowding' ? 'medium' : 'low',
          timestamp: new Date(),
          resolved: false,
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  const resolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
  };
  
  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };
  
  return { alerts, unreadCount, resolveAlert, dismissAlert };
}
