import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AppContext = createContext();

// Sample data for destinations
const sampleDestinations = [
  {
    id: 1,
    name: 'Costa Rica Rainforest',
    image: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?ixlib=rb-4.0.3',
    rating: 4.8,
    description: 'Experience the lush biodiversity of Costa Rica\'s rainforests while supporting conservation efforts. This eco-friendly destination offers sustainable lodging options and guided tours that respect the natural environment.',
    location: { lat: 10.2751, lng: -84.0750 },
    stays: [
      { id: 1, name: 'Eco Lodge Monteverde', description: 'Solar-powered cabins with rainforest views', price: '$120/night', sustainable: true },
      { id: 2, name: 'Treehouse Resort', description: 'Unique accommodations built using sustainable materials', price: '$150/night', sustainable: true }
    ],
    tips: [
      { id: 1, title: 'Best Time to Visit', content: 'December to April for drier weather' },
      { id: 2, title: 'Eco-Friendly Transportation', content: 'Use shared shuttles between destinations to reduce carbon footprint' }
    ]
  },
  {
    id: 2,
    name: 'Norwegian Fjords',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3',
    rating: 4.9,
    description: 'Explore the stunning Norwegian fjords through eco-conscious tours that prioritize the preservation of these natural wonders. Enjoy breathtaking views while learning about conservation efforts.',
    location: { lat: 60.4720, lng: 5.4700 },
    stays: [
      { id: 3, name: 'Fjord View Hotel', description: 'Energy-efficient hotel with panoramic views', price: '$180/night', sustainable: true },
      { id: 4, name: 'Green Cabin Rentals', description: 'Off-grid cabins with minimal environmental impact', price: '$130/night', sustainable: true }
    ],
    tips: [
      { id: 3, title: 'Sustainable Activities', content: 'Choose electric boat tours over traditional diesel boats' },
      { id: 4, title: 'Local Cuisine', content: 'Try locally sourced seafood at restaurants with sustainable fishing practices' }
    ]
  },
  {
    id: 3,
    name: 'New Zealand Wilderness',
    image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?ixlib=rb-4.0.3',
    rating: 4.7,
    description: 'Discover New Zealand\'s pristine wilderness through eco-tours that emphasize conservation and respect for Maori culture. Experience the country\'s commitment to sustainable tourism.',
    location: { lat: -45.0312, lng: 168.6626 },
    stays: [
      { id: 5, name: 'Eco Glamping Queenstown', description: 'Luxury tents with minimal environmental footprint', price: '$140/night', sustainable: true },
      { id: 6, name: 'Sustainable Farm Stay', description: 'Working organic farm with guest accommodations', price: '$95/night', sustainable: true }
    ],
    tips: [
      { id: 5, title: 'Responsible Hiking', content: 'Stick to marked trails and practice "leave no trace" principles' },
      { id: 6, title: 'Wildlife Viewing', content: 'Choose tour operators that contribute to conservation efforts' }
    ]
  }
];

// Provider component
export const AppProvider = ({ children }) => {
  // State for user authentication
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // State for destinations
  const [destinations, setDestinations] = useState(sampleDestinations);
  
  // State for journals
  const [journals, setJournals] = useState([]);
  
  // State for loading status
  const [loading, setLoading] = useState(false);
  
  // Simulate fetching journals from API
  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll use localStorage to persist journals
        const savedJournals = localStorage.getItem('eco-travel-journals');
        if (savedJournals) {
          setJournals(JSON.parse(savedJournals));
        }
      } catch (error) {
        console.error('Error fetching journals:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJournals();
  }, []);
  
  // Save journals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('eco-travel-journals', JSON.stringify(journals));
  }, [journals]);
  
  // Login function
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('eco-travel-user', JSON.stringify(userData));
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('eco-travel-user');
  };
  
  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('eco-travel-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);
  
  // Add a new journal entry
  const addJournal = (journal) => {
    const newJournal = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...journal
    };
    setJournals([newJournal, ...journals]);
  };
  
  // Update an existing journal entry
  const updateJournal = (id, updatedJournal) => {
    setJournals(journals.map(journal => 
      journal.id === id ? { ...journal, ...updatedJournal } : journal
    ));
  };
  
  // Delete a journal entry
  const deleteJournal = (id) => {
    setJournals(journals.filter(journal => journal.id !== id));
  };
  
  // Get a single destination by ID
  const getDestination = (id) => {
    return destinations.find(destination => destination.id === parseInt(id));
  };
  
  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      destinations,
      getDestination,
      journals,
      addJournal,
      updateJournal,
      deleteJournal,
      loading,
      setLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};