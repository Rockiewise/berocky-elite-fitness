
import React, { useState, useMemo } from 'react';
import { MOCK_WORKOUT_HISTORY } from '../constants';
import { WorkoutLog, ExerciseEntry, ExerciseSet } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const UserDashboard: React.FC = () => {
  const [workouts, setWorkouts] = useState<WorkoutLog[]>(MOCK_WORKOUT_HISTORY);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState<{
    date: string;
    duration: string;
    exercises: { name: string; weight: string; reps: string; sets: string }[];
  }>({
    date: new Date().toISOString().split('T')[0],
    duration: '',
    exercises: [{ name: '', weight: '', reps: '', sets: '1' }]
  });

  // Calculate Personal Bests for Bench Press as an example
  const benchPressProgress = useMemo(() => {
    return workouts
      .map(w => {
        const bench = w.exercises.find(e => e.name.toLowerCase().includes('bench'));
        if (!bench) return null;
        const maxWeight = Math.max(...bench.sets.map(s => s.weight));
        return { date: w.date.split('-').slice(1).join('/'), weight: maxWeight };
      })
      .filter(Boolean) as { date: string, weight: number }[];
  }, [workouts]);

  const totalVolumeProgress = useMemo(() => {
    return workouts.map(w => {
      let volume = 0;
      w.exercises.forEach(e => {
        e.sets.forEach(s => {
          volume += s.weight * s.reps;
        });
      });
      return { date: w.date.split('-').slice(1).join('/'), volume };
    });
  }, [workouts]);

  const handleAddExercise = () => {
    setNewWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, { name: '', weight: '', reps: '', sets: '1' }]
    }));
  };

  const handleUpdateExercise = (index: number, field: string, value: string) => {
    const updated = [...newWorkout.exercises];
    updated[index] = { ...updated[index], [field]: value };
    setNewWorkout(prev => ({ ...prev, exercises: updated }));
  };

  const handleSaveWorkout = () => {
    const log: WorkoutLog = {
      id: `w${Date.now()}`,
      date: newWorkout.date || new Date().toISOString().split('T')[0],
      durationMinutes: parseInt(newWorkout.duration) || 0,
      exercises: newWorkout.exercises.map(e => {
        const setsCount = parseInt(e.sets) || 1;
        const weight = parseInt(e.weight) || 0;
        const reps = parseInt(e.reps) || 0;
        
        // Generate multiple identical sets if requested
        const setsArray: ExerciseSet[] = Array.from({ length: setsCount }, () => ({
          weight,
          reps
        }));

        return {
          name: e.name || 'Unnamed Exercise',
          sets: setsArray
        };
      })
    };
    
    setWorkouts(prev => [...prev, log]);
    setIsLogModalOpen(false);
    // Reset state
    setNewWorkout({ 
      date: new Date().toISOString().split('T')[0], 
      duration: '', 
      exercises: [{ name: '', weight: '', reps: '', sets: '1' }] 
    });
  };

  return (
    <div className="py-12 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-red-600 to-red-900 flex items-center justify-center text-3xl font-bold shadow-xl shadow-red-600/20">
              TO
            </div>
            <div>
              <h1 className="text-3xl font-bold heading-font uppercase">Welcome back, <span className="text-red-600">Tunde</span></h1>
              <p className="text-gray-400">Elite Member | {workouts.length + 10} day streak 🔥</p>
            </div>
          </div>
          <div className="mt-8 md:mt-0 flex gap-4">
            <button 
              onClick={() => setIsLogModalOpen(true)}
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-600/20"
            >
              Log Workout
            </button>
            <button className="px-6 py-3 bg-zinc-800 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-zinc-700 transition-all">My Stats</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Workout Stats */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Workouts', val: workouts.length.toString(), unit: 'sessions', icon: '🏋️' },
                { label: 'Est. Calories', val: (workouts.length * 450).toLocaleString(), unit: 'kcal', icon: '🔥' },
                { label: 'Total Volume', val: totalVolumeProgress.reduce((acc, curr) => acc + curr.volume, 0).toLocaleString(), unit: 'kg', icon: '⚡' }
              ].map((s, i) => (
                <div key={i} className="bg-zinc-900/40 p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center backdrop-blur-sm">
                  <span className="text-4xl mb-4">{s.icon}</span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{s.label}</p>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-black heading-font">{s.val}</span>
                    <span className="text-xs text-gray-400">{s.unit}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Progress Visualization */}
            <div className="bg-zinc-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h3 className="text-xl font-bold uppercase heading-font tracking-tight">Strength Progress <span className="text-red-600 ml-2">Bench Press</span></h3>
                <div className="flex space-x-2">
                  <span className="text-[10px] font-bold text-white bg-red-600 px-3 py-1 rounded-full uppercase tracking-widest">Max Weight</span>
                </div>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={benchPressProgress}>
                    <defs>
                      <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="date" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} label={{ value: 'kg', angle: -90, position: 'insideLeft', fill: '#52525b' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '12px' }}
                      itemStyle={{ color: '#dc2626', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="weight" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" dot={{ r: 4, fill: '#dc2626', strokeWidth: 2, stroke: '#18181b' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent History Table */}
            <div className="bg-zinc-900/40 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-sm">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xl font-bold uppercase heading-font">Recent Activity</h3>
                <button className="text-xs text-red-600 font-bold hover:underline uppercase tracking-widest">Full History</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-zinc-950/30">
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Date</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Duration</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Main Lifts</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {workouts.slice().reverse().slice(0, 5).map((w, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="px-8 py-6 font-medium text-sm">{w.date}</td>
                        <td className="px-8 py-6 text-sm text-gray-400">{w.durationMinutes} min</td>
                        <td className="px-8 py-6">
                          <div className="flex gap-2 flex-wrap">
                            {w.exercises.map((e, idx) => (
                              <span key={idx} className="px-2 py-1 bg-zinc-800 rounded text-[10px] text-white font-medium whitespace-nowrap">{e.name}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-8 py-6 font-mono text-xs text-red-600 font-bold text-right">
                          {w.exercises.reduce((acc, curr) => acc + curr.sets.reduce((sAcc, s) => sAcc + (s.weight * s.reps), 0), 0).toLocaleString()} kg
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-zinc-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
              <h3 className="text-lg font-bold uppercase heading-font mb-6">Upcoming Class</h3>
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-red-600/20 flex items-center justify-center font-bold text-red-600">
                  MON
                </div>
                <div>
                  <h4 className="font-bold">Advanced HIIT</h4>
                  <p className="text-xs text-gray-400">07:00 AM with Coach Rocky</p>
                </div>
              </div>
              <button className="w-full py-3 bg-zinc-800 rounded-xl font-bold uppercase text-xs text-white hover:bg-zinc-700 transition-all">Cancel Booking</button>
            </div>

            <div className="bg-zinc-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
              <h3 className="text-lg font-bold uppercase heading-font mb-6">Personal Bests</h3>
              <div className="space-y-4">
                {[
                  { name: 'Deadlift', weight: '150 kg', date: 'Nov 27' },
                  { name: 'Squat', weight: '125 kg', date: 'Nov 24' },
                  { name: 'Bench Press', weight: '85 kg', date: 'Nov 24' }
                ].map((pb, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-black/30 rounded-xl border border-white/5">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">{pb.name}</p>
                      <p className="text-lg font-black heading-font text-white">{pb.weight}</p>
                    </div>
                    <span className="text-[10px] font-bold text-red-600 bg-red-600/10 px-2 py-1 rounded">{pb.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:scale-110 text-white">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold uppercase heading-font mb-4">Elite Rocky Tip</h3>
              <p className="text-sm text-gray-300 mb-6 italic leading-relaxed">
                "Consistency beats intensity in the long run. Aim for 3 heavy sessions this week, Tunde."
              </p>
              <button className="text-red-600 text-xs font-bold uppercase hover:underline">Read Nutrition Guide →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Log Workout Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsLogModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-white/5 bg-zinc-950 flex justify-between items-center">
              <h3 className="text-xl font-bold uppercase heading-font">Record New Session</h3>
              <button onClick={() => setIsLogModalOpen(false)} className="text-gray-500 hover:text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Workout Date</label>
                  <input 
                    type="date" 
                    value={newWorkout.date}
                    onChange={(e) => setNewWorkout(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Duration (Min)</label>
                  <input 
                    type="number" 
                    value={newWorkout.duration}
                    onChange={(e) => setNewWorkout(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                    placeholder="e.g. 60"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500">Exercises</label>
                  <button onClick={handleAddExercise} className="text-[10px] font-bold text-red-600 uppercase hover:underline">+ Add Exercise</button>
                </div>
                {newWorkout.exercises.map((ex, idx) => (
                  <div key={idx} className="p-4 bg-black/20 rounded-2xl border border-white/5 space-y-3">
                    <div>
                      <label className="block text-[8px] font-bold uppercase tracking-widest text-gray-600 mb-1">Exercise Name</label>
                      <input 
                        type="text" 
                        value={ex.name}
                        onChange={(e) => handleUpdateExercise(idx, 'name', e.target.value)}
                        className="w-full bg-zinc-800/50 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                        placeholder="e.g. Bench Press"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[8px] font-bold uppercase tracking-widest text-gray-600 mb-1">Sets</label>
                        <input 
                          type="number" 
                          value={ex.sets}
                          onChange={(e) => handleUpdateExercise(idx, 'sets', e.target.value)}
                          className="w-full bg-zinc-800/50 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold uppercase tracking-widest text-gray-600 mb-1">Weight (kg)</label>
                        <input 
                          type="number" 
                          value={ex.weight}
                          onChange={(e) => handleUpdateExercise(idx, 'weight', e.target.value)}
                          className="w-full bg-zinc-800/50 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold uppercase tracking-widest text-gray-600 mb-1">Reps</label>
                        <input 
                          type="number" 
                          value={ex.reps}
                          onChange={(e) => handleUpdateExercise(idx, 'reps', e.target.value)}
                          className="w-full bg-zinc-800/50 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-zinc-950 flex gap-4">
              <button 
                onClick={() => setIsLogModalOpen(false)}
                className="flex-1 py-4 bg-zinc-800 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-zinc-700 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveWorkout}
                className="flex-1 py-4 bg-red-600 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
              >
                Save Workout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
