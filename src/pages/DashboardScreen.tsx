import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Compass, Sparkles, Clock, Zap, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import MobileLayout from '@/components/layout/MobileLayout';
import BottomNav from '@/components/layout/BottomNav';

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, credits, suggestedItineraries, setCurrentItinerary } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleItineraryClick = (itinerary: typeof suggestedItineraries[0]) => {
    setCurrentItinerary(itinerary);
    navigate('/itinerary');
  };

  return (
    <MobileLayout showNav>
      <div className="min-h-screen px-5 pt-12 pb-6">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">
              {getGreeting()}, {user?.name?.split(' ')[0] || 'Explorer'}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
              <MapPin size={14} className="text-primary" />
              <span className="text-sm font-medium">Bengaluru</span>
            </div>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-medium"
          >
            <span className="text-primary-foreground font-bold text-lg">
              {user?.name?.[0] || 'D'}
            </span>
          </motion.div>
        </motion.header>

        {/* Credits Banner */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-card to-surface-subtle rounded-2xl p-5 mb-8 border border-border shadow-soft"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Credits</p>
                <p className="text-xl font-bold text-foreground">{credits} free itineraries</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/paywall')}
              className="text-gold border-gold/30 hover:bg-gold/10"
            >
              Upgrade
            </Button>
          </div>
        </motion.div>

        {/* Quick Action */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/custom-plan')}
            className="w-full bg-card rounded-2xl p-5 text-left border border-border shadow-soft hover:shadow-medium transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold font-heading text-foreground">Custom Plan</h3>
                <p className="text-sm text-muted-foreground mt-1">Craft your perfect day</p>
              </div>
            </div>
          </motion.button>
        </motion.div>

        {/* Suggested Itineraries */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-heading text-foreground">Suggested For You</h2>
            <span className="text-sm text-muted-foreground">Based on your preferences</span>
          </div>

          <div className="space-y-4">
            {suggestedItineraries.map((itinerary, index) => (
              <motion.div
                key={itinerary.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleItineraryClick(itinerary)}
                className="bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-medium transition-all cursor-pointer"
              >
                <div className="flex">
                  <div className="w-28 h-32 bg-muted flex-shrink-0">
                    <img
                      src={itinerary.image}
                      alt={itinerary.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="font-semibold font-heading text-foreground mb-1">
                      {itinerary.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {itinerary.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock size={14} />
                        {itinerary.duration}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Zap size={14} />
                        {itinerary.activityCount} activities
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-gold" />
            Looks like a great day ahead ✨
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
};

export default DashboardScreen;
