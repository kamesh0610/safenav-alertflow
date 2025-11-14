import { useEffect, useState } from 'react';
import { AccidentAlert } from '@/types/accident';
import { generateAccidentAlert, getRandomInterval } from '@/utils/accidentGenerator';
import { toast } from 'sonner';
import { PageHeader } from '@/components/PageHeader';
import StatsPanel from '@/components/dashboard/StatsPanel';
import MapView from '@/components/dashboard/MapView';
import AlertCard from '@/components/dashboard/AlertCard';
import { LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  const [alerts, setAlerts] = useState<AccidentAlert[]>([]);

  useEffect(() => {
    const generateAlert = () => {
      const newAlert = generateAccidentAlert();
      setAlerts((prev) => [newAlert, ...prev]);
      
      toast.error('🚨 New Accident Detected!', {
        description: `${newAlert.severity} severity at Vehicle ${newAlert.vehicleId}`,
      });
    };

    generateAlert();
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
    <div className="min-h-screen bg-background">
      <PageHeader
        title="SafeRide Dashboard"
        description="Real-time highway emergency monitoring system"
        badge="Live"
        icon={LayoutDashboard}
      />

      <main className="p-6 space-y-6">
        <StatsPanel totalAlerts={alerts.length} activeAlerts={activeAlerts} resolvedAlerts={resolvedAlerts} />
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Live Accident Map</h2>
          <MapView alerts={alerts} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Alerts</h2>
            <span className="text-sm text-muted-foreground">{alerts.length} total alerts</span>
          </div>
          <div className="space-y-4">
            {alerts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No alerts detected. System is monitoring...
              </p>
            ) : (
              alerts.slice(0, 10).map((alert) => (
                <AlertCard key={alert.id} alert={alert} onResolve={handleResolve} />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
