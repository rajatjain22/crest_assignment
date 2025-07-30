'use client';

import { useState } from 'react';

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState('Ship Price');

  const tabs = ['Ship Price', 'Latest News', 'E-superTool Network', 'Easy Connection'];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white rounded-lg p-4 mx-auto w-fit">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer whitespace-nowrap ${
            activeTab === tab
              ? 'bg-purple-100 text-purple-700 shadow-md'
              : 'text-gray-700'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}