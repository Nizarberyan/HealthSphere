import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { favoritesApi } from '../api/favorites';

interface FavoritesContextType {
    favoriteIds: Set<string>;
    isRefreshing: boolean;
    isFavorite: (workoutId: string) => boolean;
    toggleFavorite: (workoutId: string) => Promise<void>;
    refresh: () => Promise<void>;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const records = await favoritesApi.getAll();
            setFavoriteIds(new Set(records.map(r => r.exerciseId)));
        } catch (e) {
            console.error('Failed to load favorites', e);
        }
    };

    const refresh = async () => {
        try {
            setIsRefreshing(true);
            await loadFavorites();
        } finally {
            setIsRefreshing(false);
        }
    };

    const isFavorite = (workoutId: string) => favoriteIds.has(workoutId);

    const toggleFavorite = async (workoutId: string) => {
        const already = favoriteIds.has(workoutId);
        // Optimistic update
        setFavoriteIds(prev => {
            const next = new Set(prev);
            already ? next.delete(workoutId) : next.add(workoutId);
            return next;
        });
        try {
            if (already) {
                await favoritesApi.remove(workoutId);
            } else {
                await favoritesApi.add(workoutId);
            }
        } catch (e) {
            // Rollback on error
            setFavoriteIds(prev => {
                const next = new Set(prev);
                already ? next.add(workoutId) : next.delete(workoutId);
                return next;
            });
            console.error('Failed to toggle favorite', e);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favoriteIds, isRefreshing, isFavorite, toggleFavorite, refresh }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
    return ctx;
};
