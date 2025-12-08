import React from "react";

const SuccessStories = () => {
  return (
    <div className="my-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Static Testimonial 1 */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p>
              "ScholarStream made my dream of studying in Canada a reality. The
              process was seamless and transparent."
            </p>
            <div className="flex items-center mt-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    alt="Student"
                  />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-bold">Jane Doe</h4>
                <span className="text-sm text-gray-500">
                  Studying at Univ of Toronto
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Static Testimonial 2 */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p>
              "I found the perfect scholarship for my Master's degree. The
              dashboard helped me keep track of everything."
            </p>
            <div className="flex items-center mt-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    alt="Student"
                  />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-bold">John Smith</h4>
                <span className="text-sm text-gray-500">Studying at MIT</span>
              </div>
            </div>
          </div>
        </div>
        {/* Static Testimonial 3 */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p>
              "Highly recommended for anyone looking for financial aid. The
              support team is also very helpful."
            </p>
            <div className="flex items-center mt-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    alt="Student"
                  />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-bold">Sarah Lee</h4>
                <span className="text-sm text-gray-500">
                  Studying at Oxford
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
