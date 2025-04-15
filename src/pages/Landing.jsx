import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../lib/theme';

const Landing = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-[#053C5E] dark:text-gray-200 font-sans transition-colors ">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800 z-50 transition-colors duration-200">
        <div className="flex items-center justify-between flex-wrap px-6 sm:px-10 py-4 max-w-7xl mx-auto">
          <h1 className="font-sans font-extrabold text-[#A31621] dark:text-[#FF6B7D] text-3xl">
            me.list
          </h1>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-[#A31621] dark:hover:text-[#FF6B7D] transition">
              Home
            </Link>
            <Link to="#features" className="hover:text-[#A31621] dark:hover:text-[#FF6B7D] transition">
              Features
            </Link>
            <Link to="/login" className="hover:text-[#A31621] dark:hover:text-[#FF6B7D] transition">
              Sign in
            </Link>
            <ThemeToggle />
            <Link
              to="/signup"
              className="py-2 px-6 rounded-md bg-[#A31621] dark:bg-[#FF4757] text-white cursor-pointer hover:bg-opacity-90 transition shadow-md"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-white to-[#F8FAFC] dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
        <div className="max-w-6xl mx-auto flex flex-col items-center mt-[120px] ">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-2 text-center">
            Keep it <span className="text-[#A31621] dark:text-[#FF6B7D]">Simple.</span>
            <br />
            Keep it <span className="text-[#A31621] dark:text-[#FF6B7D]">Done.</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto my-8 text-[#053C5E]/70 dark:text-gray-300 text-center">
            A simple, powerful task management app designed for people who want to get things done without the complexity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link to="/signup">
              <button className="bg-[#A31621] dark:bg-[#FF4757] text-white px-8 py-4 rounded-full text-xl font-bold cursor-pointer hover:bg-opacity-90 transition shadow-lg">
                Get Started — It's Free
              </button>
            </Link>
            <a href="#features">
              <button className="bg-white dark:bg-gray-800 border-2 border-[#053C5E] dark:border-gray-300 text-[#053C5E] dark:text-gray-300 px-8 py-4 rounded-full text-xl font-bold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                Learn More
              </button>
            </a>
          </div>

          {/* Hero Image */}
          <div className="mt-16 w-full max-w-4xl shadow-2xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <img src="/api/placeholder/1200/650" alt="App Interface Preview" className="w-full" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-[#F8FAFC] dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4 text-[#053C5E] dark:text-gray-200">
            How It Works
          </h3>
          <p className="text-xl text-[#053C5E]/70 dark:text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            me.list helps you organize tasks, track progress, and achieve more in less time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {["Create Lists Effortlessly", "Track Your Progress", "Stay Focused"].map((title, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="bg-[#A31621]/10 dark:bg-[#FF4757]/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl">
                    {idx === 0 ? "📝" : idx === 1 ? "✅" : "🧘‍♂️"}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-[#053C5E] dark:text-gray-200 text-center mb-4">
                  {title}
                </h4>
                <p className="text-[#053C5E]/70 dark:text-gray-300 text-center">
                  {idx === 0
                    ? "Create multiple lists for different aspects of your life. Work, personal, shopping - all organized in one place."
                    : idx === 1
                    ? "Visualize your productivity with progress bars and statistics. Stay motivated by seeing how much you've accomplished."
                    : "A clean, distraction-free interface designed for productivity. No unnecessary features to get in your way."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 text-[#053C5E] dark:text-gray-200">
            What Our Users Say
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {["Sarah K.", "Mark T."].map((name, i) => (
              <div key={i} className="bg-[#BFDBF7]/40 dark:bg-blue-900/30 p-8 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#A31621] dark:bg-[#FF4757] rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold dark:text-gray-200">{name}</h4>
                    <p className="text-[#053C5E]/50 dark:text-gray-400 text-sm">
                      {i === 0 ? "Product Manager" : "Freelance Designer"}
                    </p>
                  </div>
                </div>
                <p className="text-[#053C5E]/80 dark:text-gray-300 italic">
                  {i === 0
                    ? `"me.list has completely transformed how I manage my projects. The simplicity is its greatest strength - I can focus on what needs to be done without getting lost in complicated features."`
                    : `"I've tried dozens of to-do apps, but me.list is the only one that stuck. It's fast, intuitive, and helps me stay organized without feeling like a chore."`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-[#053C5E] dark:bg-gray-800 text-white text-center transition-colors duration-200">
        <div className="max-w-4xl mx-auto">
          <h4 className="text-3xl font-bold mb-6">Ready to get organized?</h4>
          <p className="text-xl mb-8 opacity-80">
            Join thousands of users who have transformed their productivity with me.list. Start for free today.
          </p>
          <Link to="/signup">
            <button className="bg-[#A31621] dark:bg-[#FF4757] text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-opacity-90 transition shadow-lg">
              Get Started Now — Free Forever
            </button>
          </Link>
          <p className="mt-6 text-sm opacity-70">
            No credit card required. Free plan available forever.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#053C5E] dark:bg-gray-900 text-[#BFDBF7] py-16 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between mb-12">
            <div className="mb-8 md:mb-0">
              <h3 className="text-[#A31621] dark:text-[#FF6B7D] font-extrabold text-2xl mb-4">
                me.list
              </h3>
              <p className="max-w-xs text-[#BFDBF7]/80 dark:text-gray-400">
                Simple task management for people who want to get things done.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {["Product", "Company", "Legal"].map((section, idx) => (
                <div key={idx}>
                  <h4 className="text-white font-bold mb-4">{section}</h4>
                  <ul className="space-y-2">
                    {(idx === 0
                      ? ["Features", "Pricing", "FAQ"]
                      : idx === 1
                      ? ["About", "Blog", "Careers"]
                      : ["Privacy", "Terms", "Security"]
                    ).map((item, j) => (
                      <li key={j}>
                        <a href="#" className="hover:text-[#A31621] dark:hover:text-[#FF6B7D] transition">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;