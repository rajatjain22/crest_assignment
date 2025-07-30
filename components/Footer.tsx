'use client';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          <div>
            <p className="text-gray-600 text-sm mb-4">
              Top shipping is shipping down<br />
              that they are up over fifty-five years
            </p>
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <i className="ri-facebook-fill text-gray-600"></i>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <i className="ri-twitter-fill text-gray-600"></i>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <i className="ri-instagram-line text-gray-600"></i>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-purple-700 cursor-pointer">About</a></li>
              <li><a href="#" className="hover:text-purple-700 cursor-pointer">Services</a></li>
              <li><a href="#" className="hover:text-purple-700 cursor-pointer">Portfolio</a></li>
              <li><a href="#" className="hover:text-purple-700 cursor-pointer">Features</a></li>
              <li><a href="#" className="hover:text-purple-700 cursor-pointer">Tools</a></li>
              <li><a href="#" className="hover:text-purple-700 cursor-pointer">Quick Quote</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-purple-700 cursor-pointer">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-700 cursor-pointer">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-700 cursor-pointer">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Activities</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-purple-700 cursor-pointer">Sign Up</a></li>
              <li><a href="#" className="hover:text-purple-700 cursor-pointer">Log In</a></li>
              <li><a href="#" className="hover:text-purple-700 cursor-pointer">Centers</a></li>
            </ul>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 inline-block mb-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-customer-service-2-line text-purple-700 text-xl"></i>
              </div>
            </div>
            <h4 className="font-semibold text-purple-700 text-sm">JOIN OUR</h4>
            <h4 className="font-semibold text-purple-700 text-sm">FACEBOOK</h4>
            <h4 className="font-semibold text-purple-700 text-sm">COMMUNITY</h4>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-gray-500">
          <p>© 2024 Ship Cause</p>
        </div>
      </div>
    </footer>
  );
}