import { Card } from '@/components/ui/card';
import { AlertTriangle, CheckCircle2, Activity } from 'lucide-react';

interface StatsPanelProps {
  totalAlerts: number;
  activeAlerts: number;
  resolvedAlerts: number;
}

const StatsPanel = ({ totalAlerts, activeAlerts, resolvedAlerts }: StatsPanelProps) => {
  const stats = [
    {
      label: 'Total Alerts',
      value: totalAlerts,
      icon: Activity,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Active Alerts',
      value: activeAlerts,
      icon: AlertTriangle,
      color: 'text-severity-high',
      bgColor: 'bg-severity-high/10',
    },
    {
      label: 'Resolved',
      value: resolvedAlerts,
      icon: CheckCircle2,
      color: 'text-severity-low',
      bgColor: 'bg-severity-low/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-6 transition-shadow hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsPanel;
