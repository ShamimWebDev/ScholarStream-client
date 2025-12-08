import React from "react";

const Faq = () => {
  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="join join-vertical w-full">
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            How can I apply for a scholarship?
          </div>
          <div className="collapse-content">
            <p>
              Simply create an account on ScholarStream, browse the available
              scholarships, select one that matches your eligibility, and click
              the 'Apply' button to pay the fees and submit your application.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">
            Is there an application fee?
          </div>
          <div className="collapse-content">
            <p>
              Yes, each university sets its own application fee. Additionally,
              there may be a small service charge for processing the application
              through our platform.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">
            Can I track my application status?
          </div>
          <div className="collapse-content">
            <p>
              Absolutely! Once you've applied, you can track the real-time
              status of your application (Pending, Processing, Completed) from
              your Student Dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
