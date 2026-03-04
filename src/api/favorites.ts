import api from './api';

export const favoritesApi = {
    /** GET /favorites – returns all favorite records */
    getAll: async (): Promise<{ exerciseId: string }[]> => {
        const { data } = await api.get('/favorites');
        return data;
    },

    /** POST /favorites – add an exercise to favorites */
    add: async (exerciseId: string): Promise<void> => {
        await api.post('/favorites', { exerciseId });
    },

    /** DELETE /favorites/:exerciseId – remove from favorites */
    remove: async (exerciseId: string): Promise<void> => {
        await api.delete(`/favorites/${exerciseId}`);
    },
};
