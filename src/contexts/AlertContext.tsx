import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AccidentAlert } from '@/types/accident';
import { generateAccidentAlert, getRandomInterval } from '@/utils/accidentGenerator';
import { toast } from 'sonner';

interface AlertContextType {
  alerts: AccidentAlert[];
  handleResolve: (id: string) => void;
  activeAlerts: number;
  resolvedAlerts: number;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<AccidentAlert[]>([]);

  useEffect(() => {
    const generateAlert = () => {
      const newAlert = generateAccidentAlert();
      setAlerts((prev) => [newAlert, ...prev]);
      
      toast.error('🚨 New Accident Detected!', {
        description: `${newAlert.severity} severity at Vehicle ${newAlert.vehicleId}`,
      });
    };

    // Generate first alert immediately
    generateAlert();
    
    // Continue generating alerts at intervals
    const interval = setInterval(generateAlert, getRandomInterval());

    return () => clearInterval(interval);
  }, []);

  const handleResolve = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, status: 'Resolved' as const } : alert
      )
    );
    toast.success('✅ Alert Resolved', {
      description: 'Emergency services have been notified',
    });
  };

  const activeAlerts = alerts.filter((a) => a.status === 'Active').length;
  const resolvedAlerts = alerts.filter((a) => a.status === 'Resolved').length;

  return (
    <AlertContext.Provider value={{ alerts, handleResolve, activeAlerts, resolvedAlerts }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
}
