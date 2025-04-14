import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
const AppContext = createContext();

// API base URL
const API_BASE_URL = 'https://eco-friendly-travel-guide.onrender.com';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Sample data for destinations (fallback data)
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
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('eco-travel-user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('eco-travel-user'));
  const [token, setToken] = useState(() => localStorage.getItem('eco-travel-token') || null);
  

  // State for destinations
  const [destinations, setDestinations] = useState([]);

  // State for journals
  const [journals, setJournals] = useState([]);

  // State for loading status
  const [loading, setLoading] = useState(false);

  // State for error handling
  const [error, setError] = useState(null);

  // Fetch destinations from API
  useEffect(() => {
    let isMounted = true;
    const fetchDestinations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/destinations');
        if (isMounted) {
          setDestinations(response.data);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
        if (isMounted) {
          setError('Failed to load destinations. Using sample data instead.');
          setDestinations(sampleDestinations); // Fallback to sample data
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDestinations();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch journals from localStorage
  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true);
      try {
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

  // Signup function
  const signup = async ({ username, email, password }) => {
    try {
      await axios.post('https://eco-friendly-travel-guide.onrender.com/register', {
        username,
        email,
        password,
      });
  
      // Log the user in immediately after signup
      return await login(username, password);
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Signup failed',
      };
    }
  };
  

  // Login function
  const login = async (username, password) => {
    try {
      const res = await axios.post('https://eco-friendly-travel-guide.onrender.com/login', {
        username,
        password,
      });
  
      const token = res.data.access_token;
      localStorage.setItem('token', token);
      localStorage.setItem('eco-travel-token', token);
  
      const newUser = { username };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('eco-travel-user', JSON.stringify(newUser));
      
      // Set token as default header for axios
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Login failed',
      };
    }
  };
  //Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('eco-travel-token');
    localStorage.removeItem('eco-travel-user');
    setUser(null);
    setIsAuthenticated(false);
    delete api.defaults.headers.common['Authorization'];
  };
  

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('eco-travel-user');
    const savedToken = localStorage.getItem('eco-travel-token');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
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
    const updatedJournals = journals.map(journal =>
      journal.id === id ? { ...journal, ...updatedJournal } : journal
    );
    setJournals(updatedJournals);
    localStorage.setItem('eco-travel-journals', JSON.stringify(updatedJournals)); // Directly update localStorage
  };
  

  // Delete a journal entry
  const deleteJournal = (id) => {
    setJournals(journals.filter(journal => journal.id !== id));
  };

  // Get a single destination by ID
  const getDestination = async (id) => {
    // First check if we already have it in state
    const cachedDestination = destinations.find(destination => destination.id === parseInt(id));
    if (cachedDestination) return cachedDestination;

    // If not found in state, try to fetch it from API
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/destinations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching destination ${id}:`, error);
      setError('Failed to load destination details.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      token,
      isAuthenticated,
      signup,
      login,
      logout,
      destinations,
      getDestination,
      journals,
      addJournal,
      updateJournal,
      deleteJournal,
      loading,
      setLoading,
      error
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