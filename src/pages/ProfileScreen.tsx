import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Settings, CreditCard, Moon, Sun, LogOut, ChevronRight, MapPin, Wallet, Users, Car, Heart } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/contexts/AppContext';
import MobileLayout from '@/components/layout/MobileLayout';
import BottomNav from '@/components/layout/BottomNav';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, preferences, logout, darkMode, toggleDarkMode, credits } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      icon: CreditCard,
      label: 'Plans & Subscription',
      value: `${credits} credits`,
      onClick: () => navigate('/plans'),
    },
    {
      icon: Settings,
      label: 'Edit Preferences',
      value: '',
      onClick: () => navigate('/preferences'),
    },
  ];

  return (
    <MobileLayout showNav>
      <div className="min-h-screen pb-24">
        {/* Header */}
        <div className="px-5 pt-12 pb-6">
          <h1 className="text-2xl font-bold font-heading text-foreground">Profile</h1>
        </div>

        {/* User Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="px-5 mb-6"
        >
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-medium">
                <span className="text-2xl font-bold text-primary-foreground">
                  {user?.name?.[0] || 'D'}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold font-heading text-foreground">
                  {user?.name || 'Diksha'}
                </h2>
                <p className="text-muted-foreground">{user?.email || 'diksha@example.com'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preferences Summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="px-5 mb-6"
        >
          <h3 className="font-semibold font-heading mb-3">Your Preferences</h3>
          <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">City</p>
                  <p className="font-medium text-foreground">{preferences.city}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Budget</p>
                  <p className="font-medium text-foreground">
                    ₹{preferences.budget >= 1000 ? `${(preferences.budget / 1000).toFixed(0)}K` : preferences.budget}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Group</p>
                  <p className="font-medium text-foreground">{preferences.groupType}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                  <Car className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Travel</p>
                  <p className="font-medium text-foreground text-sm">{preferences.travelMode.split(' ')[0]}</p>
                </div>
              </div>
            </div>

            {preferences.interests.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Interests</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {preferences.interests.map(interest => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-5 space-y-3"
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.value && (
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                )}
                <ChevronRight size={18} className="text-muted-foreground" />
              </div>
            </button>
          ))}

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Sun className="w-5 h-5 text-muted-foreground" />
              )}
              <span className="font-medium text-foreground">Dark Mode</span>
            </div>
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="px-5 mt-6"
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-4 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </motion.div>

        {/* App Version */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">DayGo v1.0.0</p>
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
};

export default ProfileScreen;
