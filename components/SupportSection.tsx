"use client";

export default function SupportSection() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="parcel.png"
            alt="Support Team"
            className="rounded-lg shadow-2xl object-cover w-full "
          />
        </div>

        <div className="text-white">
          <h2 className="text-3xl font-bold mb-6">
            Receive Support from
            <br />
            Ship Cause Pros
          </h2>
          <p className="text-purple-100 mb-6 leading-relaxed">
            With our concierge shipping services, you don't have to be a
            specialist in shipping, your assigned shipping liaison becomes an
            extension of your team. You will be assigned a dedicated concierge
            service representative to assist you with any questions or concerns
            you or your customers may have throughout the entirety of the
            shipping process.
          </p>
          <p className="text-purple-100 mb-8 leading-relaxed">
          Your liaison can assist with any claims, supply
          orders, rerouting of packages and last-minute address changes.
          </p>
          <div className="flex items-center">
            <span className="text-orange-500 font-bold mr-2">
              Learn more about the benefits of Ship Cause
            </span>
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-arrow-right-line text-orange-500 font-bold"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
