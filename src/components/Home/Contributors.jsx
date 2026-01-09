import React from "react";
import { BsArrowRight } from "react-icons/bs";

const Contributors = () => {
  const contributors = [
    {
      name: "Harvard University",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/1200px-Harvard_University_coat_of_arms.svg.png",
    },
    {
      name: "Stanford University",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/1200px-Seal_of_Leland_Stanford_Junior_University.svg.png",
    },
    {
      name: "MIT",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1024px-MIT_logo.svg.png",
    },
    {
      name: "Oxford University",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Arms_fo_the_University_of_Oxford.svg/1200px-Arms_fo_the_University_of_Oxford.svg.png",
    },
  ];

  return (
    <section className="py-20 bg-base-100 border-t border-base-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold text-neutral mb-4">
              Sponsors & <br />
              <span className="text-primary">Partners</span>
            </h2>
            <p className="text-neutral/60 mb-6">
              We collaborate with world-renowned universities and organizations
              to bring you the best scholarship opportunities.
            </p>
            <button className="btn btn-outline btn-primary rounded-full group">
              Become a Partner{" "}
              <BsArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {contributors.map((partner, idx) => (
              <div
                key={idx}
                className="flex justify-center p-4 hover:scale-110 transition-transform duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contributors;
