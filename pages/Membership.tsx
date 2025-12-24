
import React from 'react';
import { MEMBERSHIP_PLANS } from '../constants';

const Membership: React.FC = () => {
  return (
    <div className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-7xl font-black uppercase heading-font mb-6 tracking-tighter">Choose Your <span className="text-red-600">Legacy</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Flexible plans designed for your goals. Whether you're a beginner or a pro athlete, we have a tier for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative p-8 rounded-2xl border ${
                plan.isPopular 
                  ? 'bg-zinc-900 border-red-600 ring-1 ring-red-600' 
                  : 'bg-zinc-900/40 border-white/5'
              } flex flex-col`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold uppercase heading-font mb-2">{plan.name}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-black heading-font">₦{plan.price.toLocaleString()}</span>
                  <span className="text-gray-500 uppercase text-xs font-bold">/ {plan.period}</span>
                </div>
              </div>

              <ul className="flex-grow space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-300">
                    <svg className="h-5 w-5 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded font-bold uppercase transition-all ${
                plan.isPopular 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-white text-black hover:bg-gray-200'
              }`}>
                Join {plan.name}
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-24 p-12 bg-zinc-900/40 border border-white/5 rounded-2xl flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-3xl font-bold heading-font uppercase mb-2">Need a Custom Corporate Plan?</h3>
            <p className="text-gray-400">Transform your team's productivity with our workplace wellness programs.</p>
          </div>
          <button className="px-8 py-4 border border-white text-white font-bold uppercase rounded hover:bg-white hover:text-black transition-all">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Membership;
