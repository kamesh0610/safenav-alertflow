import { PageHeader } from '@/components/PageHeader';
import StatsPanel from '@/components/dashboard/StatsPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Clock, MapPin } from 'lucide-react';
import { useAlerts } from '@/contexts/AlertContext';

const StatisticsPage = () => {
  const { alerts, activeAlerts, resolvedAlerts } = useAlerts();
  const highSeverity = alerts.filter((a) => a.severity === 'High').length;
  const mediumSeverity = alerts.filter((a) => a.severity === 'Medium').length;
  const lowSeverity = alerts.filter((a) => a.severity === 'Low').length;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Statistics & Analytics"
        description="Comprehensive overview of accident data and trends"
        icon={BarChart3}
      />

      <main className="p-6 space-y-6">
        <StatsPanel totalAlerts={alerts.length} activeAlerts={activeAlerts} resolvedAlerts={resolvedAlerts} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-red-500" />
                High Severity Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-500">{highSeverity}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {((highSeverity / alerts.length) * 100 || 0).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                Medium Severity Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-500">{mediumSeverity}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {((mediumSeverity / alerts.length) * 100 || 0).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Low Severity Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">{lowSeverity}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {((lowSeverity / alerts.length) * 100 || 0).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Average Response Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">2.3 min</p>
              <p className="text-xs text-muted-foreground mt-1">15% faster than last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Coverage Area
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Tamil Nadu</p>
              <p className="text-xs text-muted-foreground mt-1">All major highways monitored</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                Resolution Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {alerts.length > 0 ? ((resolvedAlerts / alerts.length) * 100).toFixed(1) : 0}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {resolvedAlerts} of {alerts.length} alerts resolved
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StatisticsPage;
