
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const AdminDashboard: React.FC = () => {
  const trafficData = [
    { name: 'Mon', visitors: 1200, enrollments: 12 },
    { name: 'Tue', visitors: 1400, enrollments: 18 },
    { name: 'Wed', visitors: 1100, enrollments: 10 },
    { name: 'Thu', visitors: 1900, enrollments: 25 },
    { name: 'Fri', visitors: 2400, enrollments: 32 },
    { name: 'Sat', visitors: 3100, enrollments: 45 },
    { name: 'Sun', visitors: 2800, enrollments: 38 },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 4500000 },
    { name: 'Feb', revenue: 5200000 },
    { name: 'Mar', revenue: 4800000 },
    { name: 'Apr', revenue: 6100000 },
    { name: 'May', revenue: 5500000 },
    { name: 'Jun', revenue: 7200000 },
  ];

  return (
    <div className="py-12 bg-zinc-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 bg-zinc-900 p-8 rounded-3xl border border-white/5 shadow-2xl">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-black">R</div>
              <h1 className="text-3xl font-bold uppercase heading-font tracking-tight">Business <span className="text-red-600">Commander</span></h1>
            </div>
            <p className="text-gray-400">Owner Access Only • Tracking site metrics and gym operations.</p>
          </div>
          <div className="flex space-x-4 mt-6 md:mt-0">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Live Status</p>
              <div className="flex items-center space-x-2 text-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                <span className="text-sm font-bold">System Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Business Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Site Visitors', value: '14,290', change: '+18%', color: 'text-green-500', desc: 'Active this month' },
            { label: 'New Enrollments', value: '158', change: '+22%', color: 'text-green-500', desc: 'Last 30 days' },
            { label: 'Conversion Rate', value: '4.2%', change: '+0.5%', color: 'text-green-500', desc: 'Visitor to Member' },
            { label: 'Active Gym Flow', value: '42', change: 'Normal', color: 'text-blue-500', desc: 'People in gym now' }
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">{stat.label}</p>
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-3xl font-black heading-font">{stat.value}</h3>
                <span className={`text-[10px] font-bold ${stat.color}`}>{stat.change}</span>
              </div>
              <p className="text-[10px] text-gray-600 uppercase">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Traffic Chart */}
          <div className="lg:col-span-2 bg-zinc-900/50 p-8 rounded-3xl border border-white/5">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold uppercase heading-font">Traffic & Enrollment Flow</h3>
              <select className="bg-black border border-white/10 text-[10px] font-bold uppercase rounded px-2 py-1 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', color: '#fff', borderRadius: '12px' }}
                  />
                  <Area type="monotone" dataKey="visitors" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
                  <Area type="monotone" dataKey="enrollments" stroke="#ffffff" strokeWidth={2} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5">
            <h3 className="text-xl font-bold uppercase heading-font mb-8">Revenue Breakdown</h3>
            <div className="space-y-6">
              {[
                { name: 'Memberships', amount: '₦5.2M', perc: 72 },
                { name: 'Supplements', amount: '₦1.4M', perc: 20 },
                { name: 'Online Coaching', amount: '₦0.6M', perc: 8 }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold uppercase tracking-tight">{item.name}</span>
                    <span className="text-sm font-mono text-gray-400">{item.amount}</span>
                  </div>
                  <div className="w-full bg-black h-2 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full rounded-full" style={{ width: `${item.perc}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/5">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Top Selling Supplement</h4>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-lg"></div>
                <div>
                  <p className="text-sm font-bold">Rocky Whey Isolate</p>
                  <p className="text-xs text-red-600">42 Units sold this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Enrollment & Activity Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900/50 rounded-3xl border border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-bold uppercase heading-font">Recent Site Activity</h3>
            </div>
            <div className="p-4 space-y-4">
              {[
                { time: '2 mins ago', msg: 'New membership purchase: Standard Plan (Ibadan Central)', user: 'Ifeoluwa A.' },
                { time: '15 mins ago', msg: 'Website visitor from Lagos viewed "Supplement Shop"', user: 'Guest' },
                { time: '45 mins ago', msg: 'Class booking: HIIT session with Coach Rocky', user: 'Samuel E.' },
                { time: '1 hour ago', msg: 'Bulk order for Powerlifting Gear received', user: 'GymHub Ltd' }
              ].map((log, i) => (
                <div key={i} className="flex items-start space-x-4 p-4 hover:bg-white/5 rounded-2xl transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs">
                    {log.user.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-bold">{log.user}</p>
                      <span className="text-[10px] text-gray-600">• {log.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{log.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/50 rounded-3xl border border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5">
              <h3 className="text-xl font-bold uppercase heading-font">Top Growing Regions</h3>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                {[
                  { region: 'Ibadan, Oyo', score: 92, status: 'Surging' },
                  { region: 'Lagos, Nigeria', score: 78, status: 'Growing' },
                  { region: 'Abuja, FCT', score: 65, status: 'Stable' },
                  { region: 'Abeokuta, Ogun', score: 42, status: 'Emerging' }
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-xl font-bold heading-font text-gray-500">0{i+1}</div>
                      <div>
                        <p className="text-sm font-bold">{r.region}</p>
                        <p className="text-[10px] text-red-600 font-bold uppercase">{r.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono font-bold">{r.score}%</p>
                      <p className="text-[10px] text-gray-500">Market Penetration</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-12 w-full py-4 border border-white/10 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all">
                View Geographic Heatmap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
