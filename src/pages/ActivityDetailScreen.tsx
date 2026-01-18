import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Camera, Check, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/contexts/AppContext';
import MobileLayout from '@/components/layout/MobileLayout';

const ActivityDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { activityId } = useParams();
  const { currentItinerary, completeActivity } = useApp();

  const [experience, setExperience] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const activity = currentItinerary?.activities.find(a => a.id === activityId);

  if (!activity) {
    navigate('/itinerary');
    return null;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    if (imagePreview && experience.trim()) {
      completeActivity(activity.id, imagePreview, experience);
      navigate('/itinerary');
    }
  };

  const canComplete = imagePreview && experience.trim().length > 0;

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
              <h1 className="text-lg font-bold font-heading text-foreground">Activity Details</h1>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        </div>

        {/* Activity Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="px-5 py-6"
        >
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold font-heading text-foreground">{activity.name}</h2>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                  <MapPin size={14} />
                  <span className="text-sm">{activity.area || 'Bengaluru'}</span>
                </div>
              </div>
              {activity.completed && (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary-foreground" />
                </div>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{activity.description}</p>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
              {activity.travelTime !== '-' && (
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock size={14} />
                  {activity.travelTime} from previous
                </span>
              )}
              <span className="text-sm bg-gold/20 text-gold-dark px-3 py-1.5 rounded-full font-medium">
                {activity.reason}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Experience Capture */}
        {!activity.completed && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-5"
          >
            <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-5 h-5 text-gold" />
                <h3 className="font-semibold font-heading">Capture Your Experience</h3>
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {imagePreview ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden cursor-pointer">
                      <img
                        src={imagePreview}
                        alt="Experience"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-background/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-sm font-medium">Tap to change</span>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Upload a photo</span>
                    </div>
                  )}
                </label>
              </div>

              {/* Experience Text */}
              <Textarea
                placeholder="How was your experience here?"
                value={experience}
                onChange={e => setExperience(e.target.value)}
                className="min-h-[100px] rounded-xl border-border resize-none"
              />
            </div>
          </motion.div>
        )}

        {/* Completed Experience View */}
        {activity.completed && activity.image && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-5"
          >
            <div className="bg-card rounded-2xl p-6 border border-primary/30 shadow-soft">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check size={14} className="text-primary-foreground" />
                </div>
                <h3 className="font-semibold font-heading text-primary">Your Experience</h3>
              </div>

              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <img
                  src={activity.image}
                  alt="Experience"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-foreground">{activity.experience}</p>
            </div>
          </motion.div>
        )}

        {/* Fixed CTA */}
        {!activity.completed && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-5 glass border-t border-border">
            <Button
              onClick={handleComplete}
              disabled={!canComplete}
              className={`w-full h-14 text-base font-semibold rounded-2xl shadow-strong ${
                canComplete ? 'gradient-primary' : 'bg-muted text-muted-foreground'
              }`}
            >
              <Check className="mr-2" size={20} />
              Mark as Completed
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default ActivityDetailScreen;
