import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation2, Thermometer, Droplets, Wind, Loader2, AlertCircle } from 'lucide-react';
import { useGeolocation, calculateDistance, formatDistance } from '@/hooks/useGeolocation';
import { useWeather } from '@/hooks/useWeather';

interface LocationWeatherCardProps {
  activityLat: number;
  activityLng: number;
  activityName: string;
}

const LocationWeatherCard: React.FC<LocationWeatherCardProps> = ({
  activityLat,
  activityLng,
  activityName,
}) => {
  const { latitude, longitude, error: locationError, loading: locationLoading } = useGeolocation();
  const { weather, loading: weatherLoading, error: weatherError } = useWeather(activityLat, activityLng);

  const distance = latitude && longitude
    ? calculateDistance(latitude, longitude, activityLat, activityLng)
    : null;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.05 }}
      className="px-5 py-2"
    >
      <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
        <div className="grid grid-cols-2 divide-x divide-border">
          {/* Location Section */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Navigation2 className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Your Location</span>
            </div>
            
            {locationLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Locating...</span>
              </div>
            ) : locationError ? (
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs">{locationError}</span>
              </div>
            ) : distance !== null ? (
              <div className="space-y-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground">{formatDistance(distance)}</span>
                  <span className="text-sm text-muted-foreground">away</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>from {activityName}</span>
                </div>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">Location unavailable</span>
            )}
          </div>

          {/* Weather Section */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                <Thermometer className="w-4 h-4 text-gold" />
              </div>
              <span className="text-sm font-medium text-foreground">Weather</span>
            </div>
            
            {weatherLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Loading...</span>
              </div>
            ) : weatherError ? (
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs">{weatherError}</span>
              </div>
            ) : weather ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{weather.icon}</span>
                  <span className="text-2xl font-bold text-foreground">{weather.temperature}°C</span>
                </div>
                <p className="text-xs text-muted-foreground">{weather.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3 h-3" />
                    {weather.humidity}%
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="w-3 h-3" />
                    {weather.windSpeed} km/h
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">Weather unavailable</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationWeatherCard;
