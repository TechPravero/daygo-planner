import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import LoginScreen from "./pages/LoginScreen";
import PreferencesScreen from "./pages/PreferencesScreen";
import DashboardScreen from "./pages/DashboardScreen";
import CustomPlanScreen from "./pages/CustomPlanScreen";
import GeneratingScreen from "./pages/GeneratingScreen";
import ItineraryScreen from "./pages/ItineraryScreen";
import ActivityDetailScreen from "./pages/ActivityDetailScreen";
import RecapScreen from "./pages/RecapScreen";
import ExploreScreen from "./pages/ExploreScreen";
import PaywallScreen from "./pages/PaywallScreen";
import PlansScreen from "./pages/PlansScreen";
import ProfileScreen from "./pages/ProfileScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/preferences" element={<PreferencesScreen />} />
            <Route path="/dashboard" element={<DashboardScreen />} />
            <Route path="/custom-plan" element={<CustomPlanScreen />} />
            <Route path="/generating" element={<GeneratingScreen />} />
            <Route path="/itinerary" element={<ItineraryScreen />} />
            <Route path="/activity/:activityId" element={<ActivityDetailScreen />} />
            <Route path="/recap" element={<RecapScreen />} />
            <Route path="/explore" element={<ExploreScreen />} />
            <Route path="/paywall" element={<PaywallScreen />} />
            <Route path="/plans" element={<PlansScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
