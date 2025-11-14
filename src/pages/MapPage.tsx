import { PageHeader } from '@/components/PageHeader';
import MapView from '@/components/dashboard/MapView';
import { Map } from 'lucide-react';
import { useAlerts } from '@/contexts/AlertContext';

const MapPage = () => {
  const { alerts } = useAlerts();

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
