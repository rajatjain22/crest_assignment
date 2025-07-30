'use client';

export default function ShippingSection() {
  return (
    <div className="py-20 bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-16 h-16 bg-orange-400 rounded transform rotate-12"></div>
        <div className="absolute top-20 right-20 w-12 h-12 bg-orange-500 rounded transform -rotate-12"></div>
        <div className="absolute bottom-20 left-20 w-14 h-14 bg-orange-400 rounded transform rotate-45"></div>
        <div className="absolute bottom-32 right-32 w-10 h-10 bg-orange-500 rounded transform -rotate-45"></div>
        <div className="absolute top-40 left-1/4 w-12 h-12 bg-orange-400 rounded transform rotate-12"></div>
        <div className="absolute bottom-40 right-1/4 w-16 h-16 bg-orange-500 rounded transform -rotate-12"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Next Day Shipping is<br />our "Sweet Spot."
        </h2>
        
        <button className="bg-purple-700 text-white px-8 py-3 rounded-full hover:bg-purple-800 transition font-medium whitespace-nowrap cursor-pointer">
          Get Started
        </button>
      </div>
    </div>
  );
}