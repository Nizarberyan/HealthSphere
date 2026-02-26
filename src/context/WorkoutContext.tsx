import { desc, eq } from 'drizzle-orm';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { db } from '../db';
import { workouts as workoutsSchema } from '../db/schema';
import { Workout } from '../types/workout';

interface WorkoutContextType {
    workouts: Workout[];
    isLoading: boolean;
    error: string | null;
    addWorkout: (workout: Omit<Workout, 'id'>) => Promise<void>;
    updateWorkout: (workout: Workout) => Promise<void>;
    deleteWorkout: (id: string) => Promise<void>;
}

export const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadWorkouts();
    }, []);

    const loadWorkouts = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const dbWorkouts = await db.select().from(workoutsSchema).orderBy(desc(workoutsSchema.date));

            // Map the parsed database records to match the local Workout type
            const mappedWorkouts: Workout[] = dbWorkouts.map((w: any) => ({
                id: w.id,
                type: w.type as any,
                duration: w.duration,
                intensity: w.intensity as any,
                date: w.date,
                notes: w.notes || undefined
            }));

            setWorkouts(mappedWorkouts);
        } catch (e) {
            console.error('Failed to load workouts from Drizzle', e);
            setError('Failed to load workouts data');
        } finally {
            setIsLoading(false);
        }
    };

    const addWorkout = async (workoutData: Omit<Workout, 'id'>) => {
        try {
            setError(null);
            const id = Date.now().toString(); // Generate simple ID since SQLite auto-increment is on integers, but we use string ID
            const newDate = new Date(workoutData.date).toISOString();

            const newDbWorkout = {
                id,
                type: workoutData.type,
                duration: workoutData.duration,
                intensity: workoutData.intensity,
                date: newDate,
                notes: workoutData.notes || null,
            };

            await db.insert(workoutsSchema).values(newDbWorkout);

            const newWorkout: Workout = {
                id: newDbWorkout.id,
                type: newDbWorkout.type as any,
                duration: newDbWorkout.duration,
                intensity: newDbWorkout.intensity as any,
                date: newDbWorkout.date,
                notes: newDbWorkout.notes || undefined
            };

            setWorkouts([newWorkout, ...workouts]);
        } catch (e) {
            console.error('Failed to save workout to Drizzle', e);
            setError('Failed to save workout data');
        }
    };

    const updateWorkout = async (updatedWorkout: Workout) => {
        try {
            setError(null);
            await db.update(workoutsSchema)
                .set({
                    type: updatedWorkout.type,
                    duration: updatedWorkout.duration,
                    intensity: updatedWorkout.intensity,
                    date: new Date(updatedWorkout.date).toISOString(),
                    notes: updatedWorkout.notes || null
                })
                .where(eq(workoutsSchema.id, updatedWorkout.id));

            const updatedWorkouts = workouts.map(workout =>
                workout.id === updatedWorkout.id ? updatedWorkout : workout
            );
            setWorkouts(updatedWorkouts);
        } catch (e) {
            console.error('Failed to update workout in Drizzle', e);
            setError('Failed to update workout data');
        }
    };

    const deleteWorkout = async (id: string) => {
        try {
            setError(null);
            await db.delete(workoutsSchema).where(eq(workoutsSchema.id, id));
            const updatedWorkouts = workouts.filter(workout => workout.id !== id);
            setWorkouts(updatedWorkouts);
        } catch (e) {
            console.error('Failed to delete workout in Drizzle', e);
            setError('Failed to delete workout data');
        }
    };

    return (
        <WorkoutContext.Provider
            value={{
                workouts,
                isLoading,
                error,
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
