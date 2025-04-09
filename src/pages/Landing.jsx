import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="bg-white text-[#283D3B] mt-[60px]">
      <header className="flex items-center justify-between flex-wrap px-6 sm:px-10 py-6 max-w-7xl mx-auto mt-[-40px]">
        <h1 className="font-sans font-extrabold text-[#FF1654] text-[32px]">
          me.list
        </h1>

        <nav className="flex items-center gap-4 mt-4 sm:mt-0 text-sm">
          <Link to="/login" className="hover:text-[#FF1654] transition">
            Sign in
          </Link>
          <Link
            to="/signup"
            className="py-[10px] px-[25px] rounded-md bg-[#FF1654] text-white cursor-pointer hover:bg-[#e6144b] transition"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-24 px-6 font-sans">
        <h2 className="text-[80px] font-extrabold mb-[-20px] text-[#283D3B]">
          Keep it <span className="text-[#FF1654]">Simple.</span>
        </h2>
        <h2 className="text-[80px] font-extrabold text-[#283D3B]">
          Keep it <span className="text-[#FF1654]">Done.</span>
        </h2>
        <p className="text-lg max-w-xl mx-auto mb-8 text-[#283D3B]">
          Organize your day with ease. List everything, get everything done.
        </p>
        <Link to="/signup">
          <button className="bg-[#FF1654] text-white px-8 py-3 rounded-[50px] text-[30px] cursor-pointer hover:bg-[#e6144b] transition">
            Get Started
          </button>
        </Link>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-12 text-[#283D3B]">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">
          <div className="space-y-4">
            <div className="text-4xl">📝</div>
            <h4 className="text-xl font-semibold text-[#283D3B]">
              Create a List in Seconds
            </h4>
            <p className="text-gray-600">
              Add tasks effortlessly with one click or tap.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-4xl">✅</div>
            <h4 className="text-xl font-semibold text-[#283D3B]">
              Track Your Progress
            </h4>
            <p className="text-gray-600">
              Check off completed tasks and stay on track.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-4xl">🧘‍♂️</div>
            <h4 className="text-xl font-semibold text-[#283D3B]">
              Stay Focused
            </h4>
            <p className="text-gray-600">
              A clean, distraction-free interface for better productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Mid-Page Call to Action */}
      <section className="text-center py-20 px-6">
        <h4 className="text-2xl font-bold mb-4 text-[#283D3B]">
          Ready to get organized?
        </h4>
        <p className="text-gray-600 mb-6">
          Start using ListAll and manage your life with ease.
        </p>
        <Link to="/signup">
          <button className="bg-[#FF1654] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#e6144b] transition">
            Try ListItAll Now
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-10 text-sm">
        <div className="space-x-4 mb-2">
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Terms
          </a>
          <a href="#" className="hover:text-white">
            Support
          </a>
        </div>
        <p className="text-[#283D3B]">© 2025 ListItAll. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
