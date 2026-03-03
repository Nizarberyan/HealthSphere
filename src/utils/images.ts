import { WorkoutType } from '@/src/types/workout';

export const getWorkoutImage = (type: WorkoutType | 'All') => {
    switch (type) {
        case 'course': return 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop';
        case 'musculation': return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop';
        case 'vélo': return 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop';
        case 'natation': return 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800&auto=format&fit=crop';
        case 'yoga': return 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop';
        case 'autre':
        case 'All':
        default: return 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop';
    }
};
