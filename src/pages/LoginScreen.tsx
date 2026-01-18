import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import MobileLayout from '@/components/layout/MobileLayout';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login, isFirstTime } = useApp();

  const handleGoogleLogin = () => {
    login({ name: 'Diksha', email: 'diksha@example.com' });
    if (isFirstTime) {
      navigate('/preferences');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col px-6 py-12">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="mb-8"
          >
            <div className="w-24 h-24 gradient-primary rounded-3xl flex items-center justify-center shadow-strong mb-6 mx-auto">
              <MapPin className="w-12 h-12 text-primary-foreground" />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold font-heading mb-3 text-foreground">
              Day<span className="text-primary">Go</span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-gold" />
              Your Local Day Planner
            </p>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-muted-foreground max-w-xs leading-relaxed"
          >
            Plan perfect day trips in minutes. Personalized itineraries that match your vibe.
          </motion.p>
        </div>

        {/* Features Preview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          {[
            { icon: '🎯', label: 'Personalized' },
            { icon: '⚡', label: 'Instant Plans' },
            { icon: '📍', label: 'Local Gems' },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-surface-subtle rounded-2xl p-4 text-center"
            >
              <span className="text-2xl mb-2 block">{feature.icon}</span>
              <span className="text-sm font-medium text-foreground">{feature.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Login Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4"
        >
          <Button
            onClick={handleGoogleLogin}
            className="w-full h-14 text-base font-semibold rounded-2xl shadow-medium gradient-primary hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full h-14 text-base font-medium rounded-2xl border-2 hover:bg-muted"
          >
            Continue with Email
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          By continuing, you agree to our Terms & Privacy Policy
        </motion.p>
      </div>
    </MobileLayout>
  );
};

export default LoginScreen;
