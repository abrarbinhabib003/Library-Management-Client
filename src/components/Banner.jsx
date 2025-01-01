import React from "react";

const Banner = () => {
  const slides = [
    {
      title: "Welcome to Our Library",
      description: "Discover, Borrow, and Enjoy Books Anytime.",
    },
    {
      title: "Thousands of Books",
      description: "Explore our vast collection of books to find your next favorite read.",
    },
    {
      title: "Effortless Management",
      description: "Your gateway to efficient library management and user experience.",
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto text-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`py-10 px-6 ${
              index === 0 ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            } rounded-lg mb-6`}
          >
            <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
            <p className="text-lg">{slide.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
