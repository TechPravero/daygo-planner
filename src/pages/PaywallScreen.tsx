import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Sparkles, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';

const plans = [
  {
    id: 'daily',
    name: 'Day Pass',
    price: '₹49',
    period: 'day',
    credits: 3,
    popular: false,
  },
  {
    id: 'monthly',
    name: 'Explorer',
    price: '₹299',
    period: 'month',
    credits: 'Unlimited',
    popular: true,
  },
  {
    id: 'yearly',
    name: 'Pro Traveler',
    price: '₹1,999',
    period: 'year',
    credits: 'Unlimited',
    popular: false,
    savings: 'Save 44%',
  },
];

const features = [
  'Unlimited custom itineraries',
  'Advanced filters & preferences',
  'Priority support',
  'Exclusive hidden gems',
  'Instagrammable spots finder',
  'Weather-smart planning',
];

const PaywallScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="min-h-screen pb-8">
        {/* Header */}
        <div className="sticky top-0 z-10 glass border-b border-border px-5 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold font-heading text-foreground">Upgrade</h1>
          </div>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="px-5 pt-8 text-center"
        >
          <div className="w-20 h-20 mx-auto gradient-gold rounded-2xl flex items-center justify-center shadow-strong mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-foreground mb-2">
            Unlock Unlimited Adventures
          </h2>
          <p className="text-muted-foreground">
            Get unlimited custom itineraries and premium features
          </p>
        </motion.div>

        {/* Free vs Paid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="px-5 mt-8"
        >
          <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Free Plan</span>
              </div>
              <span className="text-muted-foreground">5 itineraries/month</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="font-medium text-gold-dark">Premium</span>
              </div>
              <span className="font-semibold text-primary">Unlimited everything</span>
            </div>
          </div>
        </motion.div>

        {/* Plans */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-5 mt-6 space-y-4"
        >
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-5 border-2 transition-all cursor-pointer ${
                plan.popular
                  ? 'border-primary bg-primary/5 shadow-medium'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              {plan.savings && (
                <div className="absolute -top-3 right-4 bg-gold text-white px-3 py-1 rounded-full text-xs font-medium">
                  {plan.savings}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold font-heading text-lg text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.credits} {typeof plan.credits === 'number' ? 'itineraries' : 'itineraries'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/{plan.period}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="px-5 mt-8"
        >
          <h3 className="font-semibold font-heading mb-4">Premium includes</h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check size={14} className="text-primary" />
                </div>
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="px-5 mt-8"
        >
          <Button className="w-full h-14 text-base font-semibold rounded-2xl shadow-strong gradient-gold">
            Start Free Trial
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-3">
            7-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default PaywallScreen;
