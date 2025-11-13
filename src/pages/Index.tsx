import { useState, useEffect } from 'react';
import { AccidentAlert } from '@/types/accident';
import { generateAccidentAlert, getRandomInterval } from '@/utils/accidentGenerator';
import StatsPanel from '@/components/dashboard/StatsPanel';
import AlertCard from '@/components/dashboard/AlertCard';
import MapView from '@/components/dashboard/MapView';
import FutureScope from '@/components/dashboard/FutureScope';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [alerts, setAlerts] = useState<AccidentAlert[]>([]);

  useEffect(() => {
    const generateAlert = () => {
      const newAlert = generateAccidentAlert();
      setAlerts((prev) => [newAlert, ...prev]);
      
      toast.error(`New ${newAlert.severity} Severity Accident Detected`, {
        description: `Vehicle ${newAlert.vehicleId} at ${newAlert.location.lat.toFixed(4)}, ${newAlert.location.lng.toFixed(4)}`,
        duration: 5000,
      });
    };

    const scheduleNext = () => {
      const interval = getRandomInterval();
      return setTimeout(() => {
        generateAlert();
        scheduleNext();
      }, interval);
    };

    // Generate first alert after 2 seconds
    const initialTimeout = setTimeout(generateAlert, 2000);
    
    // Schedule subsequent alerts
    const nextTimeout = setTimeout(() => {
      scheduleNext();
    }, 2000 + getRandomInterval());

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(nextTimeout);
    };
  }, []);

  const handleResolve = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, status: 'Resolved' as const } : alert
      )
    );
    toast.success('Alert Resolved', {
      description: 'Emergency response completed successfully.',
    });
  };

  const activeAlerts = alerts.filter((alert) => alert.status === 'Active').length;
  const resolvedAlerts = alerts.filter((alert) => alert.status === 'Resolved').length;

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <AlertCircle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">SafeRide</h1>
              <p className="text-sm text-muted-foreground">Smart Highway Emergency Response System</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Panel */}
        <StatsPanel
          totalAlerts={alerts.length}
          activeAlerts={activeAlerts}
          resolvedAlerts={resolvedAlerts}
        />

        {/* Map View */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>Live Accident Map</span>
            <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Live
            </span>
          </h2>
          <MapView alerts={alerts} />
        </div>

        {/* Alerts List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
          {alerts.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Monitoring for accidents...</p>
              <p className="text-sm text-muted-foreground mt-2">System will automatically detect and display alerts</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} onResolve={handleResolve} />
              ))}
            </div>
          )}
        </div>

        {/* Future Scope */}
        <FutureScope />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>SafeRide Emergency Response System • Real-time Accident Detection & Management</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
