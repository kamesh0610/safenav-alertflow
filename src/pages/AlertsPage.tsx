import { PageHeader } from '@/components/PageHeader';
import AlertCard from '@/components/dashboard/AlertCard';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAlerts } from '@/contexts/AlertContext';

const AlertsPage = () => {
  const { alerts, handleResolve } = useAlerts();
  
  const activeAlerts = alerts.filter((a) => a.status === 'Active');
  const resolvedAlerts = alerts.filter((a) => a.status === 'Resolved');

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Accident Alerts"
        description="Monitor and manage all accident notifications"
        badge={`${activeAlerts.length} Active`}
        icon={AlertCircle}
      />

      <main className="p-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Alerts ({alerts.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeAlerts.length})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved ({resolvedAlerts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {alerts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No alerts detected. System is monitoring...
              </p>
            ) : (
              alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} onResolve={handleResolve} />
              ))
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activeAlerts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No active alerts at the moment.
              </p>
            ) : (
              activeAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} onResolve={handleResolve} />
              ))
            )}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {resolvedAlerts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No resolved alerts yet.
              </p>
            ) : (
              resolvedAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} onResolve={handleResolve} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AlertsPage;
