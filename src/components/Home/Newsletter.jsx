import React from "react";

const Newsletter = () => {
  return (
    <section className="py-20 bg-linear-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-sans text-white">
          Stay Updated with <span className="text-primary">ScholarStream</span>
        </h2>
        <p className="text-lg opacity-80 max-w-2xl mx-auto mb-10">
          Subscribe to our newsletter to receive the latest scholarship updates,
          tips, and deadline reminders directly to your inbox.
        </p>

        <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="grow px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 transition-all font-sans"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary-focus hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Subscribe Now
          </button>
        </form>

        <p className="text-xs mt-4 opacity-50">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
