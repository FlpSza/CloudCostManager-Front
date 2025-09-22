import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'viewer' | 'analyst';
}

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // UI state
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
  
  // Dashboard state
  selectedPeriod: '7d' | '30d' | '90d' | '1y';
  selectedCloudProvider: 'aws' | 'azure' | 'gcp' | 'all';
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLoading: (loading: boolean) => void;
  setSelectedPeriod: (period: '7d' | '30d' | '90d' | '1y') => void;
  setSelectedCloudProvider: (provider: 'aws' | 'azure' | 'gcp' | 'all') => void;
  
  // Computed
  toggleSidebar: () => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      sidebarOpen: false,
      theme: 'light',
      loading: false,
      selectedPeriod: '30d',
      selectedCloudProvider: 'all',
      
      // Actions
      setUser: (user) => set({ user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setTheme: (theme) => set({ theme }),
      setLoading: (loading) => set({ loading }),
      setSelectedPeriod: (selectedPeriod) => set({ selectedPeriod }),
      setSelectedCloudProvider: (selectedCloudProvider) => set({ selectedCloudProvider }),
      
      // Computed actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'app-store',
    }
  )
);
