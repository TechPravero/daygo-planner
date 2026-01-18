import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Filter, Clock, MapPin, Heart, Camera, Sun, CloudRain, Dumbbell, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useApp } from '@/contexts/AppContext';
import MobileLayout from '@/components/layout/MobileLayout';

const exclusions = [
  { id: 'galleries', label: 'Galleries' },
  { id: 'museums', label: 'Museums' },
  { id: 'monuments', label: 'Monuments' },
  { id: 'religious', label: 'Religious places' },
  { id: 'shopping', label: 'Shopping areas' },
];

const activityTypes = [
  { id: 'outdoor', label: 'Outdoor (treks, walks)', icon: Sun },
  { id: 'indoor', label: 'Indoor (cafes, lounges)', icon: Filter },
];

const sportsActivities = [
  { id: 'pickleball', label: 'Pickleball' },
  { id: 'badminton', label: 'Badminton' },
  { id: 'cricket', label: 'Cricket nets' },
  { id: 'bowling', label: 'Bowling' },
  { id: 'gokarting', label: 'Go-karting' },
];

const artCulture = [
  { id: 'art-galleries', label: 'Galleries' },
  { id: 'theatres', label: 'Theatres' },
  { id: 'live', label: 'Live performances' },
];

const weatherPrefs = [
  { id: 'sunny', label: 'Sunny-preferred', icon: Sun },
  { id: 'rainy', label: 'Rainy-preferred', icon: CloudRain },
  { id: 'agnostic', label: 'Weather agnostic', icon: Filter },
];

const CustomPlanScreen: React.FC = () => {
  const navigate = useNavigate();
  const { credits, useCredit } = useApp();

  const [selectedExclusions, setSelectedExclusions] = useState<string[]>([]);
  const [selectedActivityTypes, setSelectedActivityTypes] = useState<string[]>([]);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedArt, setSelectedArt] = useState<string[]>([]);
  const [weatherPref, setWeatherPref] = useState('agnostic');
  const [timeWindow, setTimeWindow] = useState([10, 18]);
  const [maxDistance, setMaxDistance] = useState([15]);
  const [romanticBias, setRomanticBias] = useState(false);
  const [avoidCrowded, setAvoidCrowded] = useState(false);
  const [instagrammable, setInstagrammable] = useState(false);

  const toggleSelection = (id: string, current: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleGenerate = () => {
    if (credits > 0) {
      useCredit();
      navigate('/generating');
    } else {
      navigate('/paywall');
    }
  };

  const formatTime = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}${period}`;
  };

  return (
    <MobileLayout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 glass border-b border-border px-5 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold font-heading text-foreground">Custom Plan</h1>
              <p className="text-sm text-muted-foreground">Deep personalization</p>
            </div>
          </div>
        </div>

        <div className="px-5 py-6 pb-32 space-y-8">
          {/* Activity Exclusions */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h2 className="font-semibold font-heading text-lg mb-3">Exclude from plan</h2>
            <div className="flex flex-wrap gap-2">
              {exclusions.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleSelection(item.id, selectedExclusions, setSelectedExclusions)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedExclusions.includes(item.id)
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-card border border-border text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.section>

          {/* Activity Type */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-semibold font-heading text-lg mb-3">Activity preference</h2>
            <div className="space-y-3">
              {activityTypes.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleSelection(item.id, selectedActivityTypes, setSelectedActivityTypes)}
                  className={`w-full p-4 rounded-xl font-medium transition-all flex items-center gap-3 ${
                    selectedActivityTypes.includes(item.id)
                      ? 'bg-primary text-primary-foreground shadow-medium'
                      : 'bg-card border border-border text-foreground'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.section>

          {/* Sports Activities */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Dumbbell className="w-5 h-5 text-gold" />
              <h2 className="font-semibold font-heading text-lg">Sports Activities</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {sportsActivities.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleSelection(item.id, selectedSports, setSelectedSports)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedSports.includes(item.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.section>

          {/* Art & Culture */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-5 h-5 text-gold" />
              <h2 className="font-semibold font-heading text-lg">Art & Culture</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {artCulture.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleSelection(item.id, selectedArt, setSelectedArt)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedArt.includes(item.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.section>

          {/* Weather Preference */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-semibold font-heading text-lg mb-3">Weather preference</h2>
            <div className="grid grid-cols-3 gap-3">
              {weatherPrefs.map(item => (
                <button
                  key={item.id}
                  onClick={() => setWeatherPref(item.id)}
                  className={`p-4 rounded-xl font-medium transition-all text-center ${
                    weatherPref === item.id
                      ? 'bg-primary text-primary-foreground shadow-medium'
                      : 'bg-card border border-border text-foreground'
                  }`}
                >
                  <item.icon size={24} className="mx-auto mb-2" />
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.section>

          {/* Time Window */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-gold" />
              <h2 className="font-semibold font-heading text-lg">Time window</h2>
            </div>
            <div className="bg-card rounded-2xl p-5 border border-border">
              <div className="text-center mb-4">
                <span className="text-xl font-bold text-primary">
                  {formatTime(timeWindow[0])} - {formatTime(timeWindow[1])}
                </span>
              </div>
              <Slider
                value={timeWindow}
                onValueChange={setTimeWindow}
                min={6}
                max={23}
                step={1}
                className="w-full"
              />
            </div>
          </motion.section>

          {/* Max Distance */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-gold" />
              <h2 className="font-semibold font-heading text-lg">Max travel distance</h2>
            </div>
            <div className="bg-card rounded-2xl p-5 border border-border">
              <div className="text-center mb-4">
                <span className="text-xl font-bold text-primary">{maxDistance[0]} km</span>
              </div>
              <Slider
                value={maxDistance}
                onValueChange={setMaxDistance}
                min={5}
                max={50}
                step={5}
                className="w-full"
              />
            </div>
          </motion.section>

          {/* Toggle Options */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-medium">Romantic / date bias</span>
              </div>
              <Switch checked={romanticBias} onCheckedChange={setRomanticBias} />
            </div>

            <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-primary" />
                <span className="font-medium">Avoid crowded places</span>
              </div>
              <Switch checked={avoidCrowded} onCheckedChange={setAvoidCrowded} />
            </div>

            <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-gold" />
                <span className="font-medium">Instagrammable places</span>
              </div>
              <Switch checked={instagrammable} onCheckedChange={setInstagrammable} />
            </div>
          </motion.section>
        </div>

        {/* Fixed CTA */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-5 glass border-t border-border">
          <Button
            onClick={handleGenerate}
            className="w-full h-14 text-base font-semibold rounded-2xl shadow-strong gradient-primary"
          >
            <Sparkles className="mr-2" size={20} />
            Generate Custom Itinerary
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Uses 1 credit • {credits} remaining
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default CustomPlanScreen;
