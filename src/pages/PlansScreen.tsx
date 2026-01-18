import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Crown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import MobileLayout from '@/components/layout/MobileLayout';
import BottomNav from '@/components/layout/BottomNav';

const PlansScreen: React.FC = () => {
  const navigate = useNavigate();
  const { credits } = useApp();

  const currentPlan = {
    name: 'Free Plan',
    credits: credits,
    maxCredits: 5,
  };

  const features = {
    free: [
      '5 itineraries per month',
      'Basic preferences',
      'Suggested itineraries',
      'Day recap & sharing',
    ],
    premium: [
      'Unlimited itineraries',
      'Advanced filters',
      'Hidden gems access',
      'Priority support',
      'Instagrammable finder',
      'Weather-smart planning',
    ],
  };

  return (
    <MobileLayout showNav>
      <div className="min-h-screen pb-24">
        {/* Header */}
        <div className="px-5 pt-12 pb-6">
          <h1 className="text-2xl font-bold font-heading text-foreground mb-2">Plans & Subscription</h1>
          <p className="text-muted-foreground">Manage your plan and usage</p>
        </div>

        {/* Current Plan */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="px-5 mb-6"
        >
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Plan</p>
                <h3 className="text-xl font-bold font-heading text-foreground">{currentPlan.name}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <Crown className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Monthly credits</span>
                <span className="font-medium text-foreground">
                  {currentPlan.credits}/{currentPlan.maxCredits} remaining
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentPlan.credits / currentPlan.maxCredits) * 100}%` }}
                  className="h-full gradient-primary rounded-full"
                />
              </div>
            </div>

            <Button
              onClick={() => navigate('/paywall')}
              className="w-full h-12 rounded-xl gradient-gold font-semibold"
            >
              Upgrade to Premium
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </motion.div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="px-5"
        >
          <h3 className="font-semibold font-heading mb-4">Compare Plans</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Free Features */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <h4 className="font-semibold text-foreground mb-4">Free</h4>
              <div className="space-y-3">
                {features.free.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Features */}
            <div className="bg-gradient-to-b from-gold/10 to-card rounded-2xl p-5 border border-gold/30">
              <div className="flex items-center gap-2 mb-4">
                <Crown size={16} className="text-gold" />
                <h4 className="font-semibold text-gold-dark">Premium</h4>
              </div>
              <div className="space-y-3">
                {features.premium.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check size={16} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-5 mt-6"
        >
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-sm text-muted-foreground text-center">
              Premium starts at <span className="font-semibold text-foreground">₹299/month</span>
              <br />
              7-day free trial included
            </p>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
};

export default PlansScreen;
