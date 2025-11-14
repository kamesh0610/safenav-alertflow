import { useEffect, useState } from 'react';
import { AccidentAlert } from '@/types/accident';
import { generateAccidentAlert, getRandomInterval } from '@/utils/accidentGenerator';
import { PageHeader } from '@/components/PageHeader';
import MapView from '@/components/dashboard/MapView';
import { Map } from 'lucide-react';
import { toast } from 'sonner';

const MapPage = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Live Map View"
        description="Real-time accident locations across Tamil Nadu highways"
        badge={`${alerts.length} Active`}
        icon={Map}
      />

      <main className="p-6">
        <div className="h-[calc(100vh-180px)]">
          <MapView alerts={alerts} />
        </div>
      </main>
    </div>
  );
};

export default MapPage;
