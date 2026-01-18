import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Instagram, MessageCircle, Twitter, Copy, Calendar, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import MobileLayout from '@/components/layout/MobileLayout';
import { toast } from '@/hooks/use-toast';

const RecapScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentItinerary, user } = useApp();

  if (!currentItinerary) {
    navigate('/dashboard');
    return null;
  }

  const completedActivities = currentItinerary.activities.filter(a => a.completed);
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const generateRecapText = () => {
    return `🌟 My ${currentItinerary.title} in Bengaluru

📅 ${today}

${completedActivities.map((a, i) => `${i + 1}. ${a.name} - ${a.experience || 'Had a great time!'}`).join('\n')}

✨ Planned with DayGo - Your Local Day Planner`;
  };

  const handleShare = (platform: string) => {
    const text = generateRecapText();
    
    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(text);
        toast({ title: 'Copied to clipboard!', description: 'Share your amazing day everywhere ✨' });
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
        break;
      default:
        toast({ title: 'Opening share...', description: 'Choose where to share your day' });
    }
  };

  return (
    <MobileLayout>
      <div className="min-h-screen pb-32">
        {/* Header */}
        <div className="sticky top-0 z-10 glass border-b border-border px-5 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/itinerary')}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold font-heading text-foreground">Day Recap</h1>
              <p className="text-sm text-muted-foreground">Your adventure, captured</p>
            </div>
          </div>
        </div>

        {/* Recap Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="px-5 pt-6"
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gold/20 text-gold-dark px-4 py-2 rounded-full mb-4"
            >
              <Sparkles size={16} />
              <span className="font-medium">You've unlocked your recap!</span>
            </motion.div>
            <h2 className="text-2xl font-bold font-heading text-foreground mb-2">
              {currentItinerary.title}
            </h2>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {today.split(',')[0]}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                Bengaluru
              </span>
            </div>
          </div>
        </motion.div>

        {/* Photo Collage */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-5 mb-6"
        >
          <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
            {completedActivities.slice(0, 4).map((activity, index) => (
              <div
                key={activity.id}
                className={`relative overflow-hidden ${
                  completedActivities.length === 1
                    ? 'col-span-2 aspect-video'
                    : index === 0 && completedActivities.length >= 3
                    ? 'col-span-2 aspect-video'
                    : 'aspect-square'
                }`}
              >
                <img
                  src={activity.image || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400'}
                  alt={activity.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-sm font-medium text-primary-foreground drop-shadow-lg">
                    {activity.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="px-5"
        >
          <h3 className="font-semibold font-heading mb-4">Your journey</h3>
          <div className="space-y-4">
            {completedActivities.map((activity, index) => (
              <div key={activity.id} className="bg-card rounded-xl p-4 border border-border shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{activity.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{activity.time}</p>
                    {activity.experience && (
                      <p className="text-sm text-foreground mt-2 italic">"{activity.experience}"</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Share Section */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-5 glass border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <Share2 className="w-5 h-5 text-foreground" />
            <span className="font-semibold">Share My Day</span>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('instagram')}
              className="flex flex-col items-center gap-2 p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl"
            >
              <Instagram size={24} className="text-white" />
              <span className="text-xs text-white font-medium">Instagram</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('whatsapp')}
              className="flex flex-col items-center gap-2 p-3 bg-green-500 rounded-xl"
            >
              <MessageCircle size={24} className="text-white" />
              <span className="text-xs text-white font-medium">WhatsApp</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('twitter')}
              className="flex flex-col items-center gap-2 p-3 bg-black dark:bg-white dark:text-black rounded-xl"
            >
              <Twitter size={24} className="text-white dark:text-black" />
              <span className="text-xs text-white dark:text-black font-medium">X</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('copy')}
              className="flex flex-col items-center gap-2 p-3 bg-muted rounded-xl"
            >
              <Copy size={24} className="text-foreground" />
              <span className="text-xs text-foreground font-medium">Copy</span>
            </motion.button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default RecapScreen;
