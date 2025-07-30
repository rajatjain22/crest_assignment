"use client";

import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "../lib/store";
import { logout } from "../lib/slices/authSlice";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Ship Tips", href: "/ship-tips" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Contact Us", href: "/contact" },
  { label: "Quick Quote", href: "/quick-quote" },
];  

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-purple-700 font-medium whitespace-nowrap cursor-pointer"
              >
                {item.label}
              </Link>
            ))}

            {user?.role === "admin" && (
              <Link
                href="/users"
                className="text-gray-700 hover:text-purple-700 font-medium whitespace-nowrap cursor-pointer"
              >
                Users
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={user.role === "admin" ? "/users" : "/profile"}
                  className="text-gray-700 hover:text-purple-700 font-medium whitespace-nowrap cursor-pointer flex items-center"
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-user-line"></i>
                  </div>
                  {user.firstName}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-purple-700 font-medium whitespace-nowrap cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-purple-700 font-medium whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition whitespace-nowrap cursor-pointer"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-menu-line text-xl"></i>
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-700 font-medium cursor-pointer"
                >
                  {item.label}
                </Link>
              ))}
              {user?.role === "admin" && (
                <Link
                  href="/users"
                  className="text-gray-700 hover:text-purple-700 font-medium cursor-pointer"
                >
                  Users
                </Link>
              )}
              {user ? (
                <>
                  <Link
                    href={user.role === "admin" ? "/users" : "/profile"}
                    className="text-gray-700 hover:text-purple-700 font-medium cursor-pointer"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-purple-700 font-medium cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-purple-700 font-medium cursor-pointer"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="text-purple-700 hover:text-purple-800 font-medium cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
