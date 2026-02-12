export type Role = 'user' | 'interpreter' | 'admin';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Profile {
    id: string;
    email: string | null;
    role: Role;
    full_name: string | null;
    avatar_url: string | null;
    bio: string | null;
    languages: string[] | null;
    specializations: string[] | null;
    hourly_rate: number | null;
    location: string | null;
    created_at: string;
}

export interface Booking {
    id: string;
    user_id: string;
    interpreter_id: string;
    date: string;
    start_time: string;
    duration_minutes: number;
    status: BookingStatus;
    location: string | null;
    notes: string | null;
    created_at: string;

    // Joins
    interpreter?: Profile;
    user?: Profile;
}
