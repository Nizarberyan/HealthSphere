import { Workout } from '../types/workout';
import api from './api';

export const workoutsApi = {
    /** GET /workouts – fetch all workouts sorted by date desc */
    getAll: async (): Promise<Workout[]> => {
        const { data } = await api.get<Workout[]>('/workouts');
        return data;
    },

    /** POST /workouts – create a new workout session */
    create: async (workoutData: Omit<Workout, 'id'>): Promise<Workout> => {
        const { data } = await api.post<Workout>('/workouts', {
            ...workoutData,
            date: new Date(workoutData.date).toISOString(),
            status: workoutData.status || 'prévu',
            notes: workoutData.notes || null,
        });
        return data;
    },

    /** PUT /workouts/:id – update an existing workout */
    update: async (workout: Workout): Promise<Workout> => {
        const { data } = await api.put<Workout>(`/workouts/${workout.id}`, {
            ...workout,
            date: new Date(workout.date).toISOString(),
            notes: workout.notes || null,
        });
        return data;
    },

    /** DELETE /workouts/:id – remove a workout */
    remove: async (id: string): Promise<void> => {
        await api.delete(`/workouts/${id}`);
    },
};
