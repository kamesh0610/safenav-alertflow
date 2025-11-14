import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Smartphone, Hospital, Shield, Camera, Zap, Network, Users, Activity, TrendingUp, AlertCircle, Radio } from 'lucide-react';

const FutureScope = () => {
  const primaryFeatures = [
    {
      icon: Smartphone,
      title: 'Real IoT Sensor Integration',
      description: 'Deploy bike-mounted crash sensors with 6-axis accelerometer, gyroscope, and GPS modules. Sensors detect sudden deceleration, impact force, and orientation changes in milliseconds.',
      specs: ['Real-time telemetry', 'Low-power consumption', '4G/5G connectivity'],
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Brain,
      title: 'AI-Powered Severity Analysis',
      description: 'Deep learning models trained on 100K+ accident scenarios analyze sensor data, vehicle speed, collision angle, and impact force to predict injury severity with 95% accuracy.',
      specs: ['CNN-based detection', 'Real-time inference', 'Edge AI processing'],
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Camera,
      title: 'Computer Vision & Video Analysis',
      description: 'Dashboard cameras with AI vision detect collision events, identify vehicle types, count passengers, and assess damage severity through frame-by-frame analysis.',
      specs: ['Object detection', 'Damage assessment', 'Automated reporting'],
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
    },
    {
      icon: Hospital,
      title: 'Intelligent Emergency Dispatch',
      description: 'Automatically notify nearest hospitals, ambulances, and police with accident details, patient estimates, and optimal routes considering real-time traffic and road conditions.',
      specs: ['Multi-agency coordination', 'Route optimization', 'ETA prediction'],
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
  ];

  const additionalFeatures = [
    {
      icon: Network,
      title: 'Mesh Network Communication',
      description: 'Vehicle-to-vehicle (V2V) communication creates mesh networks to relay accident data in areas with poor connectivity.',
      color: 'text-cyan-500',
    },
    {
      icon: Users,
      title: 'Crowd-Sourced Assistance',
      description: 'Alert nearby trained volunteers and good Samaritans who can provide immediate first aid before professional help arrives.',
      color: 'text-green-500',
    },
    {
      icon: Activity,
      title: 'Vital Signs Monitoring',
      description: 'Integration with wearable devices to monitor heart rate, blood pressure, and oxygen levels post-accident for better triage.',
      color: 'text-orange-500',
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Identify accident hotspots, high-risk time periods, and dangerous road conditions using historical data and weather patterns.',
      color: 'text-indigo-500',
    },
    {
      icon: AlertCircle,
      title: 'Pre-Crash Detection',
      description: 'AI models predict imminent collisions 2-3 seconds before impact, enabling automatic emergency braking and airbag pre-tensioning.',
      color: 'text-yellow-500',
    },
    {
      icon: Radio,
      title: '5G Edge Computing',
      description: 'Ultra-low latency 5G networks with edge computing enable sub-second response times for critical accident detection and alerts.',
      color: 'text-violet-500',
    },
  ];

  return (
    <section className="mt-8">
      <header className="mb-8 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white px-3 py-1">
            <Zap className="w-3 h-3 mr-1" />
            Future Technology
          </Badge>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">AI & IoT Integration (Future Scope)</h2>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
          The next generation of SafeRide will leverage cutting-edge AI, IoT sensors, computer vision, and 5G connectivity 
          to create a fully autonomous emergency response ecosystem with sub-second detection and response capabilities.
        </p>
      </header>

      {/* Primary Features - Large Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {primaryFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card 
              key={feature.title} 
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in border-l-4"
              style={{ 
                borderLeftColor: feature.color.replace('text-', ''),
                animationDelay: `${index * 100}ms` 
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`${feature.bgColor} p-4 rounded-xl`}>
                  <Icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {feature.specs.map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Additional Features - Compact Grid */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Advanced Capabilities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title} 
                className="p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Highlight Card - Autonomous Response */}
      <Card className="p-8 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 border-primary/20 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="bg-gradient-to-br from-primary to-purple-500 p-4 rounded-2xl shadow-lg">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-2xl font-bold">Autonomous Emergency Response Coordination</h3>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                Game Changer
              </Badge>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Future versions will feature fully autonomous emergency response coordination powered by advanced AI. 
              The system will automatically dispatch ambulances, fire trucks, and police; calculate optimal routes 
              considering real-time traffic, road closures, and weather; coordinate between multiple emergency services; 
              and even predict resource requirements based on accident severity—all without human intervention.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-3xl font-bold text-primary mb-1">60%</div>
                <div className="text-sm text-muted-foreground">Faster Response Time</div>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-3xl font-bold text-purple-500 mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Detection Accuracy</div>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-3xl font-bold text-pink-500 mb-1">&lt;1s</div>
                <div className="text-sm text-muted-foreground">Alert Latency</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default FutureScope;
