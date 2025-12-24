
export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'supplement' | 'gear' | 'equipment';
  image: string;
  description: string;
}

export interface GymClass {
  id: string;
  title: string;
  instructor: string;
  time: string;
  days: string[];
  type: 'online' | 'offline' | 'hybrid';
  description: string;
  image: string;
}

export interface UserStats {
  weight: number[];
  sessions: number;
  streak: number;
  caloriesBurned: number;
}

export interface ExerciseSet {
  reps: number;
  weight: number;
}

export interface ExerciseEntry {
  name: string;
  sets: ExerciseSet[];
}

export interface WorkoutLog {
  id: string;
  date: string;
  durationMinutes: number;
  exercises: ExerciseEntry[];
}
