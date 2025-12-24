
import React from 'react';
import { CLASSES } from '../constants';

const Classes: React.FC = () => {
  return (
    <div className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black uppercase heading-font mb-6 tracking-tighter">Elite <span className="text-red-600">Programs</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From heavy-duty lifting to high-octane cardio, our programs are engineered for results. Available in-person in Ibadan and worldwide online.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {CLASSES.map((c) => (
            <div key={c.id} className="group relative bg-zinc-950 border border-white/5 rounded-3xl overflow-hidden hover:border-red-600/30 transition-all flex flex-col sm:flex-row">
              <div className="w-full sm:w-2/5 h-64 sm:h-auto overflow-hidden">
                <img 
                  src={c.image} 
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-1 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-400 rounded">
                    {c.type}
                  </span>
                  <span className="text-red-600 text-xs font-bold uppercase">{c.time}</span>
                </div>
                <h3 className="text-2xl font-bold uppercase heading-font mb-2 group-hover:text-red-600 transition-colors">{c.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow">{c.description}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center mr-3 text-xs font-bold uppercase">
                      {c.instructor.split(' ')[0][0]}
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Instructor</p>
                      <p className="text-xs font-bold text-white">{c.instructor}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {c.days.map(day => (
                      <span key={day} className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded">{day}</span>
                    ))}
                  </div>
                </div>
                
                <button className="mt-8 w-full py-3 border border-white/10 rounded font-bold uppercase text-xs hover:bg-red-600 hover:border-red-600 transition-all">
                  Book This Class
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Schedule Grid Placeholder */}
        <div className="mt-32">
          <h2 className="text-4xl font-bold heading-font uppercase mb-12 text-center">Weekly Schedule</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-6 font-bold uppercase text-xs tracking-widest text-gray-500">Time</th>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                    <th key={day} className="py-6 font-bold uppercase text-xs tracking-widest text-gray-500">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { time: '06:00 AM', classes: ['HIIT', '', 'Yoga', '', 'Cardio', 'Open Gym'] },
                  { time: '10:00 AM', classes: ['', 'Weights', '', 'HIIT', '', 'Mobility'] },
                  { time: '05:00 PM', classes: ['MMA', 'CrossFit', 'Weights', '', 'MMA', ''] },
                  { time: '08:00 PM', classes: ['', 'Recovery', '', 'Weights', '', ''] },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-8 font-black heading-font text-lg text-red-600">{row.time}</td>
                    {row.classes.map((c, j) => (
                      <td key={j} className="py-8">
                        {c ? (
                          <div className="bg-zinc-900 border-l-2 border-red-600 p-2 rounded text-[10px] font-bold uppercase inline-block">
                            {c}
                          </div>
                        ) : (
                          <span className="text-gray-800">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
