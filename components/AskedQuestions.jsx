import React from "react";
import Accordion from "./Accordion";

const faqData = [
  {
    question: "What types of events do you organize?",
    answer:
      "We organize a wide range of events including corporate events, weddings, birthday parties, conferences, and more.",
  },
  {
    question: "How far in advance should I book an event?",
    answer:
      "We recommend booking your event at least 3-6 months in advance to ensure availability and ample time for planning.",
  },
  {
    question: "Do you provide catering services?",
    answer:
      "Yes, we offer a variety of catering options tailored to your event’s needs, including vegetarian, vegan, and gluten-free options.",
  },
  {
    question: "Can you help with event promotion?",
    answer:
      "Absolutely! We offer a range of promotional services including social media marketing, email campaigns, and flyer distribution to help promote your event.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Our cancellation policy varies depending on the type of event and the notice period. Generally, a full refund is provided if the event is canceled at least 30 days in advance.",
  },
];
const AskedQuestions = () => {
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <p className="font-[600]  md:text-[47.78px] text-[19.04px] text-center text-[#171717]">
        Frequently Asked Questions
      </p>
      <Accordion data={faqData} />
    </div>
  );
};

export default AskedQuestions;
