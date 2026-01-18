import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
  showNav?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, className = '', showNav = false }) => {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className={`w-full max-w-[430px] min-h-screen bg-background relative ${className}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`${showNav ? 'pb-20' : ''}`}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default MobileLayout;
