import { Card } from '@/components/ui/card';
import { Brain, Smartphone, Hospital, Shield } from 'lucide-react';

const FutureScope = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'Real IoT Integration',
      description: 'Connect actual bike-mounted crash sensors with accelerometer and GPS modules for real-time accident detection.',
    },
    {
      icon: Brain,
      title: 'AI/ML Analysis',
      description: 'Advanced machine learning models will analyze sensor data, camera feeds, and historical patterns to predict and detect accidents with high accuracy.',
    },
    {
      icon: Hospital,
      title: 'Auto-Notification System',
      description: 'Automatic alerts to nearby hospitals, ambulances, and police stations with optimal route suggestions for emergency response.',
    },
    {
      icon: Shield,
      title: 'Smart Severity Prediction',
      description: 'AI-powered severity assessment using impact force, vehicle speed, and collision patterns to prioritize emergency response.',
    },
  ];

  return (
    <div className="mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">AI & IoT Integration (Future Scope)</h2>
        <p className="text-muted-foreground">
          The next generation of SafeRide will integrate cutting-edge technologies to create a truly intelligent emergency response system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Autonomous Emergency Response</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Future versions will feature fully autonomous emergency response coordination, leveraging AI to 
              automatically dispatch resources, calculate optimal routes, and coordinate between multiple 
              emergency services without human intervention, reducing response time by up to 60%.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FutureScope;
