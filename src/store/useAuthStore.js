import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    setUser: (user) => set({
        user,
        isAuthenticated: !!user,
        isLoading: false
    }),

    setLoading: (loading) => set({ isLoading: loading }),

    logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, isAuthenticated: false });
    },

    initialize: () => {
        // Obtener sesión inicial
        supabase.auth.getSession().then(({ data: { session } }) => {
            set({
                user: session?.user ?? null,
                isAuthenticated: !!session,
                isLoading: false
            });
        });

        // Escuchar cambios en tiempo real
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            set({
                user: session?.user ?? null,
                isAuthenticated: !!session,
                isLoading: false
            });
        });

        return () => subscription.unsubscribe();
    }
}));
