import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Filter, Clock, MapPin, Heart, Camera, Sun, CloudRain, Dumbbell, Palette, Wallet, Users, Car, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useApp } from '@/contexts/AppContext';
import MobileLayout from '@/components/layout/MobileLayout';

const interests = [
  { id: 'food', label: 'Food & Drinks', emoji: '🍽️' },
  { id: 'cafes', label: 'Cafés', emoji: '☕' },
  { id: 'parks', label: 'Parks & Nature', emoji: '🌳' },
  { id: 'culture', label: 'Culture & Heritage', emoji: '🏛️' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
];

const groupTypes = ['Solo', 'Couple', 'Friends', 'Family'];
const travelModes = ['Walk + Cab', 'Public Transport', 'Personal Vehicle'];

const exclusions = [
  { id: 'galleries', label: 'Galleries' },
  { id: 'museums', label: 'Museums' },
  { id: 'monuments', label: 'Monuments' },
  { id: 'religious', label: 'Religious places' },
  { id: 'shopping-areas', label: 'Shopping areas' },
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
  const { credits, useCredit, preferences } = useApp();

  // Preference filters (from PreferencesScreen)
  const [budget, setBudget] = useState([preferences?.budget || 5000]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(preferences?.interests || []);
  const [groupType, setGroupType] = useState(preferences?.groupType || 'Solo');
  const [numberOfPeople, setNumberOfPeople] = useState(preferences?.numberOfPeople || 2);
  const [travelMode, setTravelMode] = useState(preferences?.travelMode || 'Walk + Cab');

  // Custom filters
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

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    if (credits > 0) {
      useCredit();
      navigate('/generating');
    } else {
      navigate('/paywall');
    }
  };

  const formatBudget = (value: number) => {
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
    return `₹${value}`;
  };

  const formatTime = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}${period}`;
  };

  const showPeopleCount = groupType === 'Friends' || groupType === 'Family';

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
              <p className="text-sm text-muted-foreground">Personalize your perfect day</p>
            </div>
          </div>
        </div>

        <div className="px-5 py-6 pb-32 space-y-8">
          {/* Budget Slider */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="w-5 h-5 text-gold" />
              <h2 className="font-semibold font-heading text-lg">Budget for the day</h2>
            </div>
            <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-primary">{formatBudget(budget[0])}</span>
              </div>
              <Slider
                value={budget}
                onValueChange={setBudget}
                min={500}
                max={500000}
                step={500}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>₹500</span>
                <span>₹5L</span>
              </div>
            </div>
          </motion.section>

          {/* Interests */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            <h2 className="font-semibold font-heading text-lg mb-3">What interests you?</h2>
            <div className="flex flex-wrap gap-2">
              {interests.map(interest => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                    selectedInterests.includes(interest.id)
                      ? 'bg-primary text-primary-foreground shadow-medium'
                      : 'bg-card text-foreground border border-border hover:border-primary'
                  }`}
                >
                  <span className="mr-2">{interest.emoji}</span>
                  {interest.label}
                </button>
              ))}
            </div>
          </motion.section>

          {/* Group Type */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-gold" />
              <h2 className="font-semibold font-heading text-lg">Who's coming along?</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {groupTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setGroupType(type)}
                  className={`p-3.5 rounded-xl font-medium transition-all text-center ${
                    groupType === type
                      ? 'bg-primary text-primary-foreground shadow-medium'
                      : 'bg-card text-foreground border border-border hover:border-primary'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* People Count */}
            {showPeopleCount && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-4"
              >
                <div className="bg-card rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Number of people</span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setNumberOfPeople(Math.max(2, numberOfPeople - 1))}
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold"
                      >
                        −
                      </button>
                      <span className="text-xl font-bold w-8 text-center">{numberOfPeople}</span>
                      <button
                        onClick={() => setNumberOfPeople(Math.min(20, numberOfPeople + 1))}
                        className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.section>

          {/* Travel Mode */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Car className="w-5 h-5 text-gold" />
              <h2 className="font-semibold font-heading text-lg">How will you travel?</h2>
            </div>
            <div className="space-y-2">
              {travelModes.map(mode => (
                <button
                  key={mode}
                  onClick={() => setTravelMode(mode)}
                  className={`w-full p-3.5 rounded-xl font-medium transition-all flex items-center justify-between ${
                    travelMode === mode
                      ? 'bg-primary text-primary-foreground shadow-medium'
                      : 'bg-card text-foreground border border-border hover:border-primary'
                  }`}
                >
                  <span>{mode}</span>
                  {travelMode === mode && <ChevronRight size={20} />}
                </button>
              ))}
            </div>
          </motion.section>

          {/* Divider */}
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground text-center">Advanced Filters</p>
          </div>

          {/* Activity Exclusions */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
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
            transition={{ delay: 0.25 }}
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
            transition={{ delay: 0.3 }}
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
            transition={{ delay: 0.35 }}
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
            transition={{ delay: 0.45 }}
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
            transition={{ delay: 0.5 }}
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
            transition={{ delay: 0.55 }}
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
