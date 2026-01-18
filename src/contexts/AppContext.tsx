import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserPreferences {
  city: string;
  budget: number;
  interests: string[];
  groupType: string;
  numberOfPeople: number;
  travelMode: string;
}

interface Activity {
  id: string;
  time: string;
  name: string;
  description: string;
  travelTime: string;
  reason: string;
  completed: boolean;
  image?: string;
  experience?: string;
  area?: string;
  category?: string;
}

interface Itinerary {
  id: string;
  title: string;
  description: string;
  duration: string;
  activityCount: number;
  activities: Activity[];
  image: string;
}

interface AppState {
  isLoggedIn: boolean;
  isFirstTime: boolean;
  user: { name: string; email: string } | null;
  preferences: UserPreferences;
  credits: number;
  currentItinerary: Itinerary | null;
  savedItineraries: Itinerary[];
  darkMode: boolean;
}

interface AppContextType extends AppState {
  login: (user: { name: string; email: string }) => void;
  logout: () => void;
  setPreferences: (prefs: UserPreferences) => void;
  completeOnboarding: () => void;
  useCredit: () => boolean;
  setCurrentItinerary: (itinerary: Itinerary | null) => void;
  completeActivity: (activityId: string, image: string, experience: string) => void;
  toggleDarkMode: () => void;
  suggestedItineraries: Itinerary[];
}

const defaultPreferences: UserPreferences = {
  city: 'Bengaluru',
  budget: 5000,
  interests: [],
  groupType: 'Solo',
  numberOfPeople: 1,
  travelMode: 'Walk + Cab',
};

const mockItineraries: Itinerary[] = [
  {
    id: '1',
    title: 'Cafés & Culture Trail',
    description: 'Explore the best cafés and cultural spots in Indiranagar',
    duration: 'Half Day',
    activityCount: 5,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
    activities: [
      { id: '1a', time: '10:00 AM', name: 'Third Wave Coffee', description: 'Start your day with artisanal coffee', travelTime: '-', reason: 'Highly rated', completed: false, area: 'Indiranagar' },
      { id: '1b', time: '11:30 AM', name: 'Rangoli Metro Art Center', description: 'Contemporary art exhibitions', travelTime: '15 min', reason: 'Close by', completed: false, area: 'MG Road' },
      { id: '1c', time: '1:00 PM', name: 'Koshy\'s Restaurant', description: 'Iconic Bangalore eatery', travelTime: '10 min', reason: 'Heritage spot', completed: false, area: 'St. Marks Road' },
      { id: '1d', time: '3:00 PM', name: 'Cubbon Park', description: 'Green oasis in the city', travelTime: '5 min', reason: 'Perfect weather', completed: false, area: 'Cubbon Park' },
      { id: '1e', time: '5:00 PM', name: 'Church Street Social', description: 'End with craft cocktails', travelTime: '10 min', reason: 'Good for groups', completed: false, area: 'Church Street' },
    ],
  },
  {
    id: '2',
    title: 'Nature & Serenity',
    description: 'Escape the city buzz with parks and gardens',
    duration: 'Full Day',
    activityCount: 4,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400',
    activities: [
      { id: '2a', time: '8:00 AM', name: 'Lalbagh Botanical Garden', description: 'Historic garden with glass house', travelTime: '-', reason: 'Early morning serenity', completed: false, area: 'Lalbagh' },
      { id: '2b', time: '11:00 AM', name: 'Sankey Tank', description: 'Peaceful lake for walks', travelTime: '30 min', reason: 'Hidden gem', completed: false, area: 'Sadashivanagar' },
      { id: '2c', time: '2:00 PM', name: 'Nandi Hills Base', description: 'Scenic drive and nature trails', travelTime: '1 hr', reason: 'Great views', completed: false, area: 'Nandi Hills' },
      { id: '2d', time: '6:00 PM', name: 'Ulsoor Lake', description: 'Sunset by the water', travelTime: '45 min', reason: 'Romantic spot', completed: false, area: 'Ulsoor' },
    ],
  },
  {
    id: '3',
    title: 'Food Lover\'s Paradise',
    description: 'A culinary journey through Bangalore\'s best',
    duration: '2 hrs',
    activityCount: 3,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
    activities: [
      { id: '3a', time: '12:00 PM', name: 'MTR - Mavalli Tiffin Rooms', description: 'Legendary South Indian breakfast', travelTime: '-', reason: 'Must visit', completed: false, area: 'Lalbagh Road' },
      { id: '3b', time: '2:30 PM', name: 'VV Puram Food Street', description: 'Street food heaven', travelTime: '10 min', reason: 'Local favorite', completed: false, area: 'VV Puram' },
      { id: '3c', time: '5:00 PM', name: 'Corner House', description: 'Death by Chocolate ice cream', travelTime: '15 min', reason: 'Sweet ending', completed: false, area: 'Residency Road' },
    ],
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    isLoggedIn: false,
    isFirstTime: true,
    user: null,
    preferences: defaultPreferences,
    credits: 5,
    currentItinerary: null,
    savedItineraries: [],
    darkMode: false,
  });

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  const login = (user: { name: string; email: string }) => {
    setState(prev => ({ ...prev, isLoggedIn: true, user }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, isLoggedIn: false, user: null, isFirstTime: true }));
  };

  const setPreferences = (preferences: UserPreferences) => {
    setState(prev => ({ ...prev, preferences }));
  };

  const completeOnboarding = () => {
    setState(prev => ({ ...prev, isFirstTime: false }));
  };

  const useCredit = () => {
    if (state.credits > 0) {
      setState(prev => ({ ...prev, credits: prev.credits - 1 }));
      return true;
    }
    return false;
  };

  const setCurrentItinerary = (itinerary: Itinerary | null) => {
    setState(prev => ({ ...prev, currentItinerary: itinerary }));
  };

  const completeActivity = (activityId: string, image: string, experience: string) => {
    if (!state.currentItinerary) return;
    
    const updatedActivities = state.currentItinerary.activities.map(activity =>
      activity.id === activityId
        ? { ...activity, completed: true, image, experience }
        : activity
    );
    
    setState(prev => ({
      ...prev,
      currentItinerary: prev.currentItinerary
        ? { ...prev.currentItinerary, activities: updatedActivities }
        : null,
    }));
  };

  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        setPreferences,
        completeOnboarding,
        useCredit,
        setCurrentItinerary,
        completeActivity,
        toggleDarkMode,
        suggestedItineraries: mockItineraries,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
