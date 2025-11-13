import { AccidentAlert, AccidentSeverity } from '@/types/accident';

// Generate random coordinates within a reasonable highway area
const generateRandomLocation = () => {
  // Simulating a highway area (Tamil Nadu region)
  const baseLat = 11.1271; // Tamil Nadu, India
  const baseLng = 78.6569;
  const variance = 0.5; // About 55km radius
  
  return {
    lat: baseLat + (Math.random() - 0.5) * variance,
    lng: baseLng + (Math.random() - 0.5) * variance,
  };
};

const generateVehicleId = () => {
  const prefix = 'VH';
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}${number}`;
};

const generateSeverity = (): AccidentSeverity => {
  const rand = Math.random();
  if (rand < 0.2) return 'High';
  if (rand < 0.5) return 'Medium';
  return 'Low';
};

export const generateAccidentAlert = (): AccidentAlert => {
  return {
    id: `ACC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    vehicleId: generateVehicleId(),
    location: generateRandomLocation(),
    severity: generateSeverity(),
    timestamp: new Date(),
    status: 'Active',
  };
};

export const getRandomInterval = () => {
  // Fixed interval of 1 minute
  return 60000;
};
