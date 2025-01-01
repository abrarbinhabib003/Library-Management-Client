import React from "react";

const FAQ = () => {
  const faqs = [
    { question: "How do I borrow a book?", answer: "Log in, find a book, and click the 'Borrow' button. Fill in the return date, and you're done!" },
    { question: "What happens if the quantity is 0?", answer: "The 'Borrow' button will be disabled, and you can’t borrow that book until it's returned." },
    { question: "Can I borrow multiple books?", answer: "Yes, but a maximum of 3 books at a time per user is allowed." },
    { question: "How do I return a book?", answer: "Go to the 'Borrowed Books' section and click the 'Return' button next to the book." },
  ];

  return (
    <div className="bg-white py-12">
      <h2 className="text-3xl font-bold text-center mb-6">FAQs</h2>
      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
