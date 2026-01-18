import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MobileLayout from '@/components/layout/MobileLayout';
import BottomNav from '@/components/layout/BottomNav';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'cafes', label: 'Cafés' },
  { id: 'parks', label: 'Parks' },
  { id: 'culture', label: 'Culture' },
  { id: 'markets', label: 'Markets' },
  { id: 'hidden', label: 'Hidden Gems' },
  { id: 'sports', label: 'Sports' },
  { id: 'art', label: 'Art & Theatre' },
];

const places = [
  { id: '1', name: 'Third Wave Coffee', area: 'Indiranagar', category: 'cafes', rating: 4.5, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400', description: 'Specialty coffee in a cozy setting' },
  { id: '2', name: 'Cubbon Park', area: 'MG Road', category: 'parks', rating: 4.7, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400', description: 'Historic green oasis in the heart of the city' },
  { id: '3', name: 'Rangoli Metro Art Center', area: 'MG Road', category: 'culture', rating: 4.3, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', description: 'Contemporary art exhibitions and workshops' },
  { id: '4', name: 'Commercial Street', area: 'Shivajinagar', category: 'markets', rating: 4.2, image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400', description: 'Bustling market for shopping enthusiasts' },
  { id: '5', name: 'Sankey Tank', area: 'Sadashivanagar', category: 'hidden', rating: 4.6, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', description: 'Peaceful lake away from the crowds' },
  { id: '6', name: 'SMASH Pickleball', area: 'Koramangala', category: 'sports', rating: 4.8, image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=400', description: 'Premium pickleball courts' },
  { id: '7', name: 'Ranga Shankara', area: 'JP Nagar', category: 'art', rating: 4.9, image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400', description: 'Renowned theatre for plays and performances' },
  { id: '8', name: 'Dyu Art Cafe', area: 'Koramangala', category: 'cafes', rating: 4.4, image: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400', description: 'Art gallery meets artisanal cafe' },
  { id: '9', name: 'Lalbagh Botanical Garden', area: 'Lalbagh', category: 'parks', rating: 4.8, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400', description: 'Historic garden with glass house' },
];

const ExploreScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaces = places.filter(place => {
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.area.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MobileLayout showNav>
      <div className="min-h-screen pb-24">
        {/* Header */}
        <div className="px-5 pt-12 pb-4">
          <h1 className="text-2xl font-bold font-heading text-foreground mb-2">Explore Bengaluru</h1>
          <p className="text-muted-foreground">Discover amazing places around you</p>
        </div>

        {/* Search */}
        <div className="px-5 mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search places..."
              className="pl-12 h-12 rounded-xl border-border bg-card"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-5 mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-medium'
                    : 'bg-card border border-border text-foreground hover:border-primary'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Places Grid */}
        <div className="px-5 grid gap-4">
          {filteredPlaces.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-soft"
            >
              <div className="flex">
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold font-heading text-foreground">{place.name}</h3>
                    <div className="flex items-center gap-1 mt-1 text-muted-foreground text-sm">
                      <MapPin size={12} />
                      <span>{place.area}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {place.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-gold fill-gold" />
                      <span className="text-sm font-medium">{place.rating}</span>
                    </div>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      <Plus size={14} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="text-muted-foreground">No places found matching your search</p>
          </div>
        )}
      </div>

      <BottomNav />
    </MobileLayout>
  );
};

export default ExploreScreen;
