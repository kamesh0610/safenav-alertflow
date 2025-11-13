export type AccidentSeverity = 'High' | 'Medium' | 'Low';
export type AccidentStatus = 'Active' | 'Resolved';

export interface AccidentAlert {
  id: string;
  vehicleId: string;
  location: {
    lat: number;
    lng: number;
  };
  severity: AccidentSeverity;
  timestamp: Date;
  status: AccidentStatus;
}
