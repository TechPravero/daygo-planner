import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Clock, MapPin, Check, ChevronRight, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import MobileLayout from '@/components/layout/MobileLayout';

const ItineraryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentItinerary } = useApp();

  if (!currentItinerary) {
    navigate('/dashboard');
    return null;
  }

  const allCompleted = currentItinerary.activities.every(a => a.completed);
  const completedCount = currentItinerary.activities.filter(a => a.completed).length;

  return (
    <MobileLayout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 glass border-b border-border px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-lg font-bold font-heading text-foreground">
                  {currentItinerary.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {completedCount}/{currentItinerary.activities.length} completed
                </p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={currentItinerary.image}
            alt={currentItinerary.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 bg-card/90 backdrop-blur px-3 py-1.5 rounded-full">
                <Clock size={14} />
                {currentItinerary.duration}
              </span>
              <span className="flex items-center gap-1 bg-card/90 backdrop-blur px-3 py-1.5 rounded-full">
                <MapPin size={14} />
                {currentItinerary.activityCount} stops
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="px-5 py-6 pb-32">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-6">
              {currentItinerary.activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate(`/activity/${activity.id}`)}
                  className="relative pl-12 cursor-pointer group"
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-3 top-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      activity.completed
                        ? 'bg-primary border-primary'
                        : 'bg-card border-border group-hover:border-primary'
                    }`}
                  >
                    {activity.completed && <Check size={12} className="text-primary-foreground" />}
                  </div>

                  {/* Activity Card */}
                  <div
                    className={`bg-card rounded-2xl p-4 border transition-all ${
                      activity.completed
                        ? 'border-primary/30 shadow-soft'
                        : 'border-border group-hover:border-primary/50 group-hover:shadow-medium'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className="text-sm font-medium text-primary">{activity.time}</span>
                        <h3 className="font-semibold font-heading text-foreground mt-1">
                          {activity.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {activity.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center gap-3 mt-3">
                          {activity.travelTime !== '-' && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock size={12} />
                              {activity.travelTime} travel
                            </span>
                          )}
                          <span className="text-xs bg-gold/20 text-gold-dark px-2 py-1 rounded-full font-medium">
                            {activity.reason}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-muted-foreground ml-2 flex-shrink-0" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Actions */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-5 glass border-t border-border">
          {allCompleted ? (
            <Button
              onClick={() => navigate('/recap')}
              className="w-full h-14 text-base font-semibold rounded-2xl shadow-strong gradient-gold"
            >
              <Share2 className="mr-2" size={20} />
              View Day Recap
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / currentItinerary.activities.length) * 100}%` }}
                  className="h-full gradient-primary rounded-full"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Complete all activities to unlock your day recap ✨
              </p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default ItineraryScreen;
