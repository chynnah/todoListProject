import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../lib/theme';

const Landing = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg z-50 transition-colors duration-200">
        <div className="flex items-center justify-between px-6 sm:px-10 py-5 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <h1 className="font-sans font-extrabold text-[#A31621] dark:text-[#FF6B7D] text-3xl tracking-tight">
              me.list
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-[#A31621] dark:hover:text-[#FF6B7D] transition font-medium relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A31621] dark:bg-[#FF6B7D] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <a href="#features" className="hover:text-[#A31621] dark:hover:text-[#FF6B7D] transition scroll-smooth font-medium relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A31621] dark:bg-[#FF6B7D] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#testimonials" className="hover:text-[#A31621] dark:hover:text-[#FF6B7D] transition scroll-smooth font-medium relative group">
              Testimonials
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A31621] dark:bg-[#FF6B7D] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <Link to="/login" className="hover:text-[#A31621] dark:hover:text-[#FF6B7D] transition font-medium">
              Sign in
            </Link>
            <ThemeToggle />
            <Link
              to="/signup"
              className="py-2 px-6 rounded-lg bg-[#A31621] dark:bg-[#FF4757] text-white font-medium hover:bg-opacity-90 transition shadow-md"
            >
              Sign Up
            </Link>
          </nav>
          
          <button className="md:hidden bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section with enhanced background effects */}
      <section className="pt-32 pb-24 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200 overflow-hidden relative">
        {/* Grid Pattern Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        
        {/* Animated background shapes */}
        <div className="absolute top-40 -left-32 w-64 h-64 bg-[#A31621]/20 dark:bg-[#FF6B7D]/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 -right-32 w-64 h-64 bg-[#A31621]/10 dark:bg-[#FF6B7D]/5 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
        
        {/* Additional floating circles */}
        <div className="absolute top-20 right-20 w-12 h-12 bg-[#A31621]/40 dark:bg-[#FF6B7D]/20 rounded-full animate-bounce" style={{animationDuration: "6s"}}></div>
        <div className="absolute top-60 left-1/4 w-8 h-8 bg-[#A31621]/30 dark:bg-[#FF6B7D]/15 rounded-full animate-bounce" style={{animationDuration: "4s"}}></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-[#A31621]/25 dark:bg-[#FF6B7D]/10 rounded-full animate-bounce" style={{animationDuration: "7s"}}></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 border-2 border-[#A31621]/20 dark:border-[#FF6B7D]/10 rounded-lg transform rotate-45 animate-spin" style={{animationDuration: "15s"}}></div>
        <div className="absolute bottom-1/3 left-1/5 w-32 h-32 border border-[#A31621]/10 dark:border-[#FF6B7D]/5 rounded-full transform animate-spin" style={{animationDuration: "20s"}}></div>
        
        <div className="max-w-6xl mx-auto flex flex-col items-center mt-24 relative z-10">
          <div className="inline-block px-6 py-2 bg-[#A31621]/10 dark:bg-[#FF6B7D]/20 rounded-full text-[#A31621] dark:text-[#FF6B7D] font-medium text-sm mb-8">
            🚀 Your Tasks, Your Way, Every Day
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-4 text-center leading-tight">
            Turn <span className="text-[#A31621] dark:text-[#FF6B7D]">Chaos</span> into
            <br />
            Effortless <span className="text-[#A31621] dark:text-[#FF6B7D]">Clarity</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto my-8 text-gray-600 dark:text-gray-300 text-center leading-relaxed">
            Not just another task app. me.list transforms how you organize your life—bringing calm to your busy world with beautifully simple task management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 mt-6">
            <Link to="/signup">
              <button className="group bg-[#A31621] dark:bg-[#FF4757] text-white px-8 py-4 rounded-lg text-lg font-semibold cursor-pointer hover:bg-opacity-90 transition shadow-lg flex items-center gap-2">
                Get Started — It's Free
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transform group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </Link>
            <a href="#features">
              <button className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </a>
          </div>

          {/* Stats with decorative elements */}
          <div className="flex flex-wrap justify-center gap-8 mt-16">
            {[
              { number: "10k+", label: "Active Users" },
              { number: "4.9/5", label: "App Store Rating" },
              { number: "99.9%", label: "Uptime" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center relative group">
                <div className="absolute inset-0 bg-[#A31621]/5 dark:bg-[#FF6B7D]/5 rounded-lg -z-10 transform scale-90 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="text-3xl font-bold text-[#A31621] dark:text-[#FF6B7D]">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Hero Image with enhanced floating elements */}
          <div className="mt-20 w-full max-w-5xl shadow-2xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#A31621]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img src="/api/placeholder/1200/650" alt="App Interface Preview" className="w-full" />
            
            {/* Enhanced Floating UI Elements */}
            <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 transform rotate-3 transition-transform group-hover:rotate-0 hover:scale-110">
              <div className="w-4 h-4 rounded-full bg-[#A31621] dark:bg-[#FF6B7D] mb-2"></div>
              <div className="w-16 h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 transform -rotate-2 transition-transform group-hover:rotate-0 hover:scale-110">
              <div className="w-16 h-2 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="w-12 h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            
            {/* Additional UI elements for more liveliness */}
            <div className="absolute top-1/4 left-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 transform rotate-6 transition-all duration-300 group-hover:translate-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="w-12 h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
            <div className="absolute bottom-1/3 right-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 transform -rotate-3 transition-all duration-300 group-hover:translate-y-2">
              <div className="w-10 h-10 rounded-md bg-[#A31621]/20 dark:bg-[#FF6B7D]/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#A31621] dark:text-[#FF6B7D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-28 px-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-200 relative">
        {/* Background effects */}
        <div className="absolute top-40 -right-32 w-64 h-64 bg-[#A31621]/10 dark:bg-[#FF6B7D]/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 left-10 w-40 h-40 bg-[#A31621]/15 dark:bg-[#FF6B7D]/5 rounded-full filter blur-2xl"></div>
        
        {/* Abstract geometric shapes */}
        <div className="absolute top-20 left-1/4 w-20 h-20 border border-[#A31621]/10 dark:border-[#FF6B7D]/5 transform rotate-45"></div>
        <div className="absolute bottom-40 right-1/4 w-16 h-16 border-2 border-[#A31621]/15 dark:border-[#FF6B7D]/10 rounded-full"></div>
        <div className="absolute top-1/3 right-20 w-24 h-6 bg-[#A31621]/5 dark:bg-[#FF6B7D]/5 rounded-full"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-block px-6 py-2 bg-[#A31621]/10 dark:bg-[#FF6B7D]/20 rounded-full text-[#A31621] dark:text-[#FF6B7D] font-medium text-sm mb-8 mx-auto text-center block">
            ✨ Powerful yet simple
          </div>
          
          <h3 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
            How It Works
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-20 max-w-3xl mx-auto leading-relaxed">
            me.list helps you organize tasks, track progress, and achieve more in less time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Create Lists Effortlessly",
                icon: "📝",
                description: "Create multiple lists for different aspects of your life. Work, personal, shopping - all organized in one place."
              },
              {
                title: "Track Your Progress",
                icon: "✅",
                description: "Visualize your productivity with progress bars and statistics. Stay motivated by seeing how much you've accomplished."
              },
              {
                title: "Stay Focused",
                icon: "🧘‍♂️",
                description: "A clean, distraction-free interface designed for productivity. No unnecessary features to get in your way."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-700 p-10 rounded-xl shadow-lg group hover:translate-y-1 transition-all duration-300 border border-transparent hover:border-[#A31621]/20 dark:hover:border-[#FF6B7D]/20">
                <div className="bg-[#A31621]/10 dark:bg-[#FF4757]/20 w-16 h-16 rounded-full flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform">
                  <span className="text-3xl">
                    {feature.icon}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 text-center mb-5">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* App Features Grid */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "🔔", title: "Smart Notifications" },
              { icon: "🔄", title: "Cross-device Sync" },
              { icon: "🔒", title: "Secure Data" },
              { icon: "🎨", title: "Customizable Themes" },
              { icon: "📊", title: "Progress Analytics" },
              { icon: "🔗", title: "Integrations" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="mr-4 bg-[#A31621]/10 dark:bg-[#FF4757]/20 w-12 h-12 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h5 className="font-semibold text-lg">{item.title}</h5>
                  <p className="text-gray-600 dark:text-gray-400">Everything you need to stay organized.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-28 px-6 bg-white dark:bg-gray-900 transition-colors duration-200 relative">
        {/* Background effects */}
        <div className="absolute top-40 -left-32 w-64 h-64 bg-[#A31621]/10 dark:bg-[#FF6B7D]/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#A31621]/15 dark:bg-[#FF6B7D]/10 rounded-full filter blur-xl"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/3 w-8 h-8 border-4 border-[#A31621]/10 dark:border-[#FF6B7D]/10 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/4 w-16 h-4 bg-[#A31621]/5 dark:bg-[#FF6B7D]/5 rounded-full"></div>
        <div className="absolute top-2/3 right-1/4 w-12 h-12 border border-[#A31621]/10 dark:border-[#FF6B7D]/5 transform rotate-45"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-block px-6 py-2 bg-[#A31621]/10 dark:bg-[#FF6B7D]/20 rounded-full text-[#A31621] dark:text-[#FF6B7D] font-medium text-sm mb-8 mx-auto text-center block">
            💬 From our users
          </div>
          
          <h3 className="text-4xl font-bold text-center mb-20 text-gray-800 dark:text-gray-200">
            What Our Users Say
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                name: "Sarah K.",
                role: "Product Manager",
                quote: "me.list has completely transformed how I manage my projects. The simplicity is its greatest strength - I can focus on what needs to be done without getting lost in complicated features."
              },
              {
                name: "Mark T.",
                role: "Freelance Designer",
                quote: "I've tried dozens of to-do apps, but me.list is the only one that stuck. It's fast, intuitive, and helps me stay organized without feeling like a chore."
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 p-10 rounded-xl border border-gray-100 dark:border-gray-700 shadow-lg relative group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#A31621]/5 dark:bg-[#FF6B7D]/5 rounded-bl-full"></div>
                <div className="absolute -top-5 -left-5">
                  <div className="bg-[#A31621] dark:bg-[#FF4757] text-white w-10 h-10 rounded-full flex items-center justify-center text-xl">
                    "
                  </div>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-[#A31621] dark:bg-[#FF4757] rounded-full mr-5 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg dark:text-gray-200">{testimonial.name}</h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                <div className="mt-6 flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-24 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Trusted by individuals and teams worldwide</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-70">
              {["Company A", "Company B", "Company C", "Company D", "Company E"].map((company, idx) => (
                <div key={idx} className="font-bold text-xl text-gray-400">{company}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-[#053C5E] dark:bg-gray-800 text-white text-center transition-colors duration-200 relative overflow-hidden">
        {/* Background pattern and effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A31621]/20 dark:bg-[#FF6B7D]/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#A31621]/30 dark:bg-[#FF6B7D]/20 rounded-full filter blur-2xl"></div>
        
        {/* Floating objects */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-white/10 rounded-full animate-bounce" style={{animationDuration: "4s"}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-white/5 rounded-full animate-bounce" style={{animationDuration: "5s", animationDelay: "1s"}}></div>
        <div className="absolute top-2/3 left-10 w-4 h-4 bg-white/10 rounded-full animate-bounce" style={{animationDuration: "3s"}}></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-6 py-2 bg-white/10 rounded-full text-white font-medium text-sm mb-8">
            🎉 Limited time offer
          </div>
          
          <h4 className="text-4xl font-bold mb-8">Ready to get organized?</h4>
          <p className="text-xl mb-10 text-gray-100 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who have transformed their productivity with me.list. Start for free today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <div className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free Forever Plan</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Cancel Anytime</span>
            </div>
          </div>
          
          <Link to="/signup">
            <button className="group bg-[#A31621] dark:bg-[#FF4757] text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition shadow-lg flex items-center mx-auto gap-2">
              Get Started Now — Free Forever
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transform group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
          <p className="mt-8 text-sm text-gray-200 dark:text-gray-400">
            No credit card required. Free plan available forever.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#053C5E] dark:bg-gray-900 text-gray-300 pt-24 pb-16 transition-colors duration-200 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-40 right-20 w-80 h-80 bg-[#A31621]/10 dark:bg-[#FF6B7D]/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#A31621]/15 dark:bg-[#FF6B7D]/10 rounded-full filter blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
            {/* Brand column (larger width) */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#A31621] dark:bg-[#FF6B7D] rounded-md flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">m</span>
                </div>
                <h3 className="text-[#A31621] dark:text-[#FF6B7D] font-extrabold text-3xl tracking-tight">
                  me.list
                </h3>
              </div>
              
              <p className="text-gray-400 dark:text-gray-300 mb-8 text-lg max-w-md leading-relaxed">
                Simple, beautiful task management for people who want to get things done without the complexity.
              </p>
              
              <div className="mb-10">
                <p className="text-white font-medium mb-4">Download our app:</p>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="flex items-center px-5 py-3 bg-gray-800 hover:bg-gray-700 transition rounded-lg group">
                    <svg className="w-7 h-7 text-white mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.76 1.16 0 1.88-.73 3.57-.78 1.36.03 2.58.53 3.31 1.53-3.08 1.83-2.56 5.41.26 6.58-.67 1.85-1.59 3.69-2.22 4.88zm-3.19-18c.15 1.28-.37 2.55-1.12 3.41-.71.91-1.97 1.6-3.18 1.53-.16-1.25.38-2.52 1.12-3.33C11.43 2.89 12.74 2.22 13.86 2.28z"></path>
                    </svg>
                    <div>
                      <div className="text-xs">Download on the</div>
                      <div className="text-sm font-medium group-hover:text-[#FF6B7D] transition">App Store</div>
                    </div>
                  </a>
                  <a href="#" className="flex items-center px-5 py-3 bg-gray-800 hover:bg-gray-700 transition rounded-lg group">
                    <svg className="w-7 h-7 text-white mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 0 1-.293-.707V2.521c0-.256.098-.512.293-.707zM14.208 12l4.686 4.686-9.978 5.582 5.292-10.268zm4.686-4.686L14.208 12l-5.292-10.268 9.978 5.582zM3.316 1.101c.034-.014.07-.022.106-.033a1 1 0 0 1 .778.054l9.978 5.582L9.316 12 3.316 1.101z"></path>
                    </svg>
                    <div>
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-sm font-medium group-hover:text-[#FF6B7D] transition">Google Play</div>
                    </div>
                  </a>
                </div>
              </div>
              
              <div>
                <p className="font-medium text-white mb-4">Connect with us:</p>
                <div className="flex flex-wrap gap-5">
                  {[
                    { name: "Twitter", icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" },
                    { name: "GitHub", icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
                    { name: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                    { name: "Instagram", icon: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" }
                  ].map((social, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#A31621] dark:hover:bg-[#FF6B7D] transition-colors group">
                      <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Quick links columns */}
            {[
              {
                title: "Product",
                links: [
                  { name: "Features", url: "#features" },
                  { name: "Pricing", url: "#" },
                  { name: "FAQ", url: "#" },
                  { name: "Updates", url: "#" },
                  { name: "Integrations", url: "#" }
                ]
              },
              {
                title: "Company",
                links: [
                  { name: "About Us", url: "#" },
                  { name: "Blog", url: "#" },
                  { name: "Careers", url: "#" },
                  { name: "Press", url: "#" },
                  { name: "Contact", url: "#" }
                ]
              },
              {
                title: "Resources",
                links: [
                  { name: "Help Center", url: "#" },
                  { name: "Community", url: "#" },
                  { name: "Tutorials", url: "#" },
                  { name: "Webinars", url: "#" },
                  { name: "Documentation", url: "#" }
                ]
              }
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="text-white font-bold mb-6 text-xl">
                  {section.title}
                  <div className="w-8 h-1 bg-[#A31621] dark:bg-[#FF6B7D] mt-2 rounded-full"></div>
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href={link.url} className="text-gray-400 hover:text-[#A31621] dark:hover:text-[#FF6B7D] transition group flex items-center">
                        <svg className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Newsletter */}
          <div className="border-t border-gray-700 pt-12 pb-8">
            <div className="max-w-3xl mx-auto text-center">
              <h4 className="text-xl font-bold text-white mb-4">Stay in the loop</h4>
              <p className="text-gray-400 mb-6">Subscribe to our newsletter for the latest updates, tips, and exclusive offers.</p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 text-white px-4 py-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-[#A31621] dark:focus:ring-[#FF6B7D]"
                />
                <button className="bg-[#A31621] dark:bg-[#FF4757] hover:bg-opacity-90 text-white font-medium px-6 py-3 rounded-lg transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          {/* Bottom section with copyright and legal links */}
          <div className="border-t border-gray-700 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} me.list. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500">
              <a href="#" className="hover:text-[#A31621] dark:hover:text-[#FF6B7D] transition">Privacy Policy</a>
              <a href="#" className="hover:text-[#A31621] dark:hover:text-[#FF6B7D] transition">Terms of Service</a>
              <a href="#" className="hover:text-[#A31621] dark:hover:text-[#FF6B7D] transition">Cookie Policy</a>
              <a href="#" className="hover:text-[#A31621] dark:hover:text-[#FF6B7D] transition">Accessibility</a>
            </div>
            
            <div className="flex items-center text-gray-500 text-sm">
              <span className="mr-2">Made with</span>
              <svg className="w-4 h-4 text-[#A31621] dark:text-[#FF6B7D] mx-1 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="ml-2">for productive people</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;