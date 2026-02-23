export type WorkoutType = 'course' | 'musculation' | 'vélo' | 'natation' | 'yoga' | 'autre';
export type IntensityLevel = 'faible' | 'moyenne' | 'élevée';

export interface Workout {
    id: string;
    type: WorkoutType;
    duration: number; // in minutes
    intensity: IntensityLevel;
    date: string; // ISO 8601 format
    notes?: string;
}
