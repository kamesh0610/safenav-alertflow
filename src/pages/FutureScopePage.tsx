import { PageHeader } from '@/components/PageHeader';
import FutureScope from '@/components/dashboard/FutureScope';
import { Sparkles } from 'lucide-react';

const FutureScopePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Future Technology Roadmap"
        description="Upcoming AI & IoT innovations for smarter emergency response"
        badge="Coming Soon"
        icon={Sparkles}
      />

      <main className="p-6">
        <FutureScope />
      </main>
    </div>
  );
};

export default FutureScopePage;
