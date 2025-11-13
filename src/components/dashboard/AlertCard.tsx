import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AccidentAlert } from '@/types/accident';
import { MapPin, Clock, Car, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

interface AlertCardProps {
  alert: AccidentAlert;
  onResolve: (id: string) => void;
}

const AlertCard = ({ alert, onResolve }: AlertCardProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-severity-high text-white';
      case 'Medium':
        return 'bg-severity-medium text-white';
      case 'Low':
        return 'bg-severity-low text-white';
      default:
        return 'bg-muted';
    }
  };

  const isResolved = alert.status === 'Resolved';

  return (
    <Card className={`p-4 transition-all duration-300 hover:shadow-md ${isResolved ? 'opacity-60' : 'animate-in fade-in slide-in-from-top-2'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${isResolved ? 'bg-severity-low/20' : 'bg-severity-high/20'}`}>
            <Car className={`w-4 h-4 ${isResolved ? 'text-severity-low' : 'text-severity-high'}`} />
          </div>
          <div>
            <p className="font-semibold text-sm">{alert.vehicleId}</p>
            <p className="text-xs text-muted-foreground">{alert.id}</p>
          </div>
        </div>
        <Badge className={getSeverityColor(alert.severity)}>
          {alert.severity}
        </Badge>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="font-mono text-xs">
              {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Time</p>
            <p className="text-xs">{format(alert.timestamp, 'PPpp')}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t">
        <Badge variant={isResolved ? 'secondary' : 'default'} className={isResolved ? 'bg-severity-low/20 text-severity-low' : ''}>
          {isResolved && <CheckCircle2 className="w-3 h-3 mr-1" />}
          {alert.status}
        </Badge>
        
        {!isResolved && (
          <Button
            size="sm"
            onClick={() => onResolve(alert.id)}
            className="bg-severity-low hover:bg-severity-low/90"
          >
            Resolve
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AlertCard;
