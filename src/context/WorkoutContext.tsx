import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { workoutsApi } from '../api/workouts';
import { Workout } from '../types/workout';

interface WorkoutContextType {
    workouts: Workout[];
    isLoading: boolean;
    isRefreshing: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    addWorkout: (workout: Omit<Workout, 'id'>) => Promise<void>;
    updateWorkout: (workout: Workout) => Promise<void>;
    deleteWorkout: (id: string) => Promise<void>;
}

export const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadWorkouts();
    }, []);

    const loadWorkouts = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await workoutsApi.getAll();
            setWorkouts(data);
        } catch (e) {
            console.error('Failed to load workouts', e);
            setError('Failed to load workouts data');
        } finally {
            setIsLoading(false);
        }
    };

    const refresh = async () => {
        try {
            setIsRefreshing(true);
            setError(null);
            const data = await workoutsApi.getAll();
            setWorkouts(data);
        } catch (e) {
            console.error('Failed to refresh workouts', e);
        } finally {
            setIsRefreshing(false);
        }
    };

    const addWorkout = async (workoutData: Omit<Workout, 'id'>) => {
        try {
            setError(null);
            const newWorkout = await workoutsApi.create(workoutData);
            setWorkouts(prev =>
                [newWorkout, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            );
        } catch (e) {
            console.error('Failed to add workout', e);
            setError('Failed to save workout data');
        }
    };

    const updateWorkout = async (updatedWorkout: Workout) => {
        try {
            setError(null);
            const saved = await workoutsApi.update(updatedWorkout);
            setWorkouts(prev => prev.map(w => (w.id === saved.id ? saved : w)));
        } catch (e) {
            console.error('Failed to update workout', e);
            setError('Failed to update workout data');
        }
    };

    const deleteWorkout = async (id: string) => {
        try {
            setError(null);
            await workoutsApi.remove(id);
            setWorkouts(prev => prev.filter(w => w.id !== id));
        } catch (e) {
            console.error('Failed to delete workout', e);
            setError('Failed to delete workout data');
        }
    };

    return (
        <WorkoutContext.Provider
            value={{
                workouts,
                isLoading,
                isRefreshing,
                error,
                refresh,
                addWorkout,
                updateWorkout,
                deleteWorkout,
            }}
        >
            {children}
        </WorkoutContext.Provider>
    );
};

export const useWorkouts = () => {
    const context = useContext(WorkoutContext);
    if (context === undefined) {
        throw new Error('useWorkouts must be used within a WorkoutProvider');
    }
    return context;
};
