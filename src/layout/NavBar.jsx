import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormsDropdownOpen, setIsFormsDropdownOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleFormsDropdown = () => {
    setIsFormsDropdownOpen(!isFormsDropdownOpen);
  };

  const toggleLoginDropdown = () => {
    setIsLoginDropdownOpen(!isLoginDropdownOpen);
  };

  const handleMenuItemClick = () => {
    setIsFormsDropdownOpen(false);
    setIsLoginDropdownOpen(false);
  };

  const handleDivClick = (e) => {
    if (!["forms", "login"].includes(e.target.name)) {
      setIsFormsDropdownOpen(false);
      setIsLoginDropdownOpen(false);
    }
  };

  return (
    <nav
      onClick={handleDivClick}
      className="bg-gray-50 text-black p-4 shadow-md sticky top-0 z-50"
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            <img src="/assets/logo/new-logo.png" alt="Logo" class="object-cover object-center w-20 h-12" />
          </Link>
        </div>

        {/* <div class="flex items-center overflow-hidden"> */}
        {/* <img src="/assets/logo/new-logo.png" alt="Logo" class="object-cover object-center w-20 h-12" /> */}
        {/* </div> */}

        {/* Navigation Links */}
        <ul
          className={`pl-4 md:flex space-x-6 font-medium ${isMenuOpen ? "flex" : "hidden"
            } absolute md:static top-full left-0 w-full md:w-auto bg-gray-50 md:bg-transparent py-4 md:py-0`}
        >
          <li>
            <Link
              onClick={handleMenuItemClick}
              to="/"
              className="hover:text-blue-600 transition"
            >
              Home
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={toggleFormsDropdown}
              name="forms"
              className="hover:text-blue-600 transition"
            >
              Forms
            </button>
            {isFormsDropdownOpen && (
              <ul className="absolute left-0 mt-2 bg-gray-50 shadow-lg">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link
                    className="text-nowrap"
                    to="/loan-application-form"
                  >
                    Loan
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              onClick={handleMenuItemClick}
              to="/pages/services"
              className="hover:text-blue-600 transition"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/pages/contact-us"
              className="hover:text-blue-600 transition"
            >
              Contact Us
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={toggleLoginDropdown}
              name="login"
              className="hover:text-blue-600 transition"
            >
              Login
            </button>
            {isLoginDropdownOpen && (
              <ul className="absolute right-0  mt-2 bg-gray-50 shadow-lg ">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link
                    onClick={handleMenuItemClick}
                    to="authentication/users/user-login"
                  >
                    User
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link
                    onClick={handleMenuItemClick}
                    to="authentication/officials/officials-login"
                  >
                    Official
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile Menu (Hamburger Icon) */}
        <div className="md:hidden">
          <button
            className="text-black focus:outline-none"
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
