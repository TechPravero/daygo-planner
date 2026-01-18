import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import MobileLayout from '@/components/layout/MobileLayout';

const loadingMessages = [
  'Finding the best spots for you...',
  'Optimizing travel distance...',
  'Balancing indoor and outdoor spots...',
  'Adding hidden gems...',
  'Checking opening hours...',
  'Crafting your perfect day...',
];

const GeneratingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { suggestedItineraries, setCurrentItinerary } = useApp();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 2000);

    const timeout = setTimeout(() => {
      // Set a random itinerary as the generated one
      const randomItinerary = suggestedItineraries[Math.floor(Math.random() * suggestedItineraries.length)];
      setCurrentItinerary(randomItinerary);
      navigate('/itinerary');
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate, suggestedItineraries, setCurrentItinerary]);

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-12"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 rounded-full border-4 border-dashed border-primary/30"
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center shadow-strong">
                <Sparkles className="w-10 h-10 text-primary-foreground" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Message */}
        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center"
        >
          <h2 className="text-xl font-semibold font-heading text-foreground mb-2">
            Creating your itinerary
          </h2>
          <p className="text-muted-foreground">{loadingMessages[messageIndex]}</p>
        </motion.div>

        {/* Skeleton Timeline Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 w-full max-w-sm space-y-4"
        >
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4 animate-pulse-soft">
              <div className="w-12 h-12 rounded-xl bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default GeneratingScreen;
