
import { MembershipPlan, Product, GymClass, WorkoutLog } from './types';

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'basic',
    name: 'Standard',
    price: 15000,
    period: 'month',
    features: ['Gym Access', 'Locker Room', 'Standard Equipment', '1 Group Class/Week'],
  },
  {
    id: 'pro',
    name: 'Pro Athlete',
    price: 35000,
    period: 'month',
    features: ['24/7 Access', 'All Group Classes', 'Sauna & Steam', 'Nutrition Plan', '1 PT Session'],
    isPopular: true,
  },
  {
    id: 'elite',
    name: 'Elite Rocky',
    price: 150000,
    period: 'year',
    features: ['Unlimited Access', 'Private Locker', 'Personal Trainer', 'Monthly Supplement Pack', 'Guest Passes'],
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Rocky Whey Isolate',
    price: 45000,
    category: 'supplement',
    image: 'https://picsum.photos/seed/whey/400/400',
    description: 'Ultra-pure protein for maximum muscle recovery.',
  },
  {
    id: '2',
    name: 'Pre-Workout Ignite',
    price: 28000,
    category: 'supplement',
    image: 'https://picsum.photos/seed/pre/400/400',
    description: 'Explosive energy and focus for your toughest sessions.',
  },
  {
    id: '3',
    name: 'Heavy Duty Lifting Straps',
    price: 8500,
    category: 'gear',
    image: 'https://picsum.photos/seed/straps/400/400',
    description: 'Premium grip support for heavy pulls.',
  }
];

export const CLASSES: GymClass[] = [
  {
    id: 'c1',
    title: 'High Intensity Interval Training (HIIT)',
    instructor: 'Coach Rocky',
    time: '07:00 AM',
    days: ['Mon', 'Wed', 'Fri'],
    type: 'hybrid',
    description: 'Burn maximum fat in minimum time.',
    image: 'https://picsum.photos/seed/hiit/600/400',
  },
  {
    id: 'c2',
    title: 'Powerlifting Essentials',
    instructor: 'Big T',
    time: '05:00 PM',
    days: ['Tue', 'Thu'],
    type: 'offline',
    description: 'Master the squat, bench, and deadlift.',
    image: 'https://picsum.photos/seed/lift/600/400',
  }
];

export const MOCK_WORKOUT_HISTORY: WorkoutLog[] = [
  {
    id: 'w1',
    date: '2023-11-20',
    durationMinutes: 45,
    exercises: [
      { name: 'Bench Press', sets: [{ reps: 10, weight: 60 }, { reps: 8, weight: 70 }, { reps: 5, weight: 80 }] },
      { name: 'Squat', sets: [{ reps: 12, weight: 80 }, { reps: 10, weight: 100 }, { reps: 8, weight: 120 }] }
    ]
  },
  {
    id: 'w2',
    date: '2023-11-22',
    durationMinutes: 60,
    exercises: [
      { name: 'Deadlift', sets: [{ reps: 5, weight: 100 }, { reps: 5, weight: 120 }, { reps: 3, weight: 140 }] },
      { name: 'Overhead Press', sets: [{ reps: 10, weight: 40 }, { reps: 8, weight: 50 }] }
    ]
  },
  {
    id: 'w3',
    date: '2023-11-24',
    durationMinutes: 50,
    exercises: [
      { name: 'Bench Press', sets: [{ reps: 10, weight: 65 }, { reps: 8, weight: 75 }, { reps: 4, weight: 85 }] },
      { name: 'Squat', sets: [{ reps: 12, weight: 85 }, { reps: 10, weight: 105 }, { reps: 6, weight: 125 }] }
    ]
  },
  {
    id: 'w4',
    date: '2023-11-27',
    durationMinutes: 55,
    exercises: [
      { name: 'Deadlift', sets: [{ reps: 5, weight: 110 }, { reps: 5, weight: 130 }, { reps: 2, weight: 150 }] }
    ]
  }
];
