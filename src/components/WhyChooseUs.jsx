import React from "react";

const WhyChooseUs = () => {
  const benefits = [
    { icon: "📚", title: "Efficient Book Management", description: "Organize and track books seamlessly." },
    { icon: "🌟", title: "Diverse Collection", description: "Access thousands of books across various genres." },
    { icon: "🔒", title: "Secure and Reliable", description: "Protect user data and ensure safe transactions." },
    { icon: "🌐", title: "24/7 Availability", description: "Your library is always open." },
  ];

  return (
    <div className="min-h-screen bg-base-100 text-base-content ">
      <h2 className="text-3xl font-bold text-center mb-6">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {benefits.map((benefit, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
