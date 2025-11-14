import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AccidentAlert } from '@/types/accident';

interface MapViewProps {
  alerts: AccidentAlert[];
}

const MapView = ({ alerts }: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map centered on Tamil Nadu
    mapRef.current = L.map(mapContainerRef.current).setView([11.1271, 78.6569], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Remove markers for alerts that no longer exist
    Object.keys(markersRef.current).forEach((id) => {
      if (!alerts.find((alert) => alert.id === id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });

    // Add or update markers
    alerts.forEach((alert) => {
      const getMarkerColor = (severity: string) => {
        switch (severity) {
          case 'High':
            return '#ef4444';
          case 'Medium':
            return '#f97316';
          case 'Low':
            return '#22c55e';
          default:
            return '#3b82f6';
        }
      };

      const color = getMarkerColor(alert.severity);
      
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background-color: ${color};
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: ${alert.status === 'Active' ? 'pulse 2s infinite' : 'none'};
          ">
            <div style="
              width: 8px;
              height: 8px;
              background-color: white;
              border-radius: 50%;
            "></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      if (markersRef.current[alert.id]) {
        // Update existing marker
        markersRef.current[alert.id].setIcon(icon);
      } else {
        // Create new marker
        const marker = L.marker([alert.location.lat, alert.location.lng], { icon })
          .addTo(mapRef.current!)
          .bindPopup(`
            <div style="font-family: system-ui, -apple-system, sans-serif;">
              <strong style="color: ${color}; font-size: 14px;">${alert.severity} Severity</strong><br/>
              <span style="font-size: 12px; color: #666;">Vehicle: ${alert.vehicleId}</span><br/>
              <span style="font-size: 11px; color: #999;">Status: ${alert.status}</span>
            </div>
          `);
        
        markersRef.current[alert.id] = marker;
      }
    });
  }, [alerts]);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainerRef} className="w-full h-full" />
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default MapView;
