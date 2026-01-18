import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Compass, label: 'Explore', path: '/explore' },
  { icon: Calendar, label: 'Plans', path: '/plans' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
      <div className="glass border-t border-border px-2 py-2 safe-area-bottom">
        <nav className="flex justify-around items-center">
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <motion.button
                key={path}
                onClick={() => navigate(path)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors min-w-[64px] ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    />
                  )}
                </div>
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {label}
                </span>
              </motion.button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default BottomNav;
