import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight, Users, Car, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const PreferencesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setPreferences, completeOnboarding } = useApp();

  const [budget, setBudget] = useState([5000]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [groupType, setGroupType] = useState('Solo');
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [travelMode, setTravelMode] = useState('Walk + Cab');

  const formatBudget = (value: number) => {
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
    return `₹${value}`;
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    setPreferences({
      city: 'Bengaluru',
      budget: budget[0],
      interests: selectedInterests,
      groupType,
      numberOfPeople,
      travelMode,
    });
    completeOnboarding();
    navigate('/dashboard');
  };

  const showPeopleCount = groupType === 'Friends' || groupType === 'Family';

  return (
    <MobileLayout>
      <div className="min-h-screen px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold font-heading text-foreground mb-2">
            Let's personalize your experience
          </h1>
          <p className="text-muted-foreground">
            Tell us what you love, and we'll craft the perfect day
          </p>
        </motion.div>

        {/* City Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8"
        >
          <MapPin size={16} />
          <span className="font-medium">Bengaluru</span>
        </motion.div>

        {/* Budget Slider */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5 text-gold" />
            <h2 className="font-semibold font-heading text-lg">Budget for the day</h2>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <div className="text-center mb-4">
              <span className="text-3xl font-bold text-primary">{formatBudget(budget[0])}</span>
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
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="font-semibold font-heading text-lg mb-4">What interests you?</h2>
          <div className="flex flex-wrap gap-3">
            {interests.map(interest => (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
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
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-gold" />
            <h2 className="font-semibold font-heading text-lg">Who's coming along?</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {groupTypes.map(type => (
              <button
                key={type}
                onClick={() => setGroupType(type)}
                className={`p-4 rounded-xl font-medium transition-all text-center ${
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
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Car className="w-5 h-5 text-gold" />
            <h2 className="font-semibold font-heading text-lg">How will you travel?</h2>
          </div>
          <div className="space-y-3">
            {travelModes.map(mode => (
              <button
                key={mode}
                onClick={() => setTravelMode(mode)}
                className={`w-full p-4 rounded-xl font-medium transition-all flex items-center justify-between ${
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

        {/* Continue Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={handleContinue}
            className="w-full h-14 text-base font-semibold rounded-2xl shadow-medium gradient-primary"
          >
            Continue to Dashboard
            <ChevronRight className="ml-2" size={20} />
          </Button>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default PreferencesScreen;
