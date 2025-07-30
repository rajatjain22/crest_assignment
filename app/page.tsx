'use client';

import Header from '@/components/Header';
import ServiceTabs from '@/components/ServiceTabs';
import SupportSection from '@/components/SupportSection';
import ShippingSection from '@/components/ShippingSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Main Content */}
      <main className="flex flex-col justify-center items-center bg-gradient-to-b from-purple-700 to-purple-900 min-h-screen">
        {/* <div className="pt-16 pb-20"> */}
          <ServiceTabs />
          <SupportSection />
        {/* </div> */}
      </main>

      <ShippingSection />
      <Footer />
    </div>
  );
}