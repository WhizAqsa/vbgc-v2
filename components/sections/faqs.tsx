// filepath: faq.tsx
"use client";

import { useState } from "react";

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    isChecked?: boolean;
}

const FAQS: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs: FAQItem[] = [
        {
            id: 0,
            question: "What Video Formats are Supported?",
            answer: "We support all major video formats including MP4, MOV, AVI, WEBM, and MKV. For best results, we recommend using MP4 with H.264 encoding. Our platform automatically converts your video to the optimal format for processing, so you don't need to worry about compatibility issues.",
            isChecked: true,
        },
        {
            id: 1,
            question: "How long does it take to Process a Video?",
            answer: "Processing time depends on video length and resolution. Typically, a 1-minute 1080p video takes 2-3 minutes to process. Longer videos or 4K content may take proportionally longer. You can monitor progress in real-time during processing.",
        },
        {
            id: 2,
            question: "Do I need a green screen to use this Tool?",
            answer: "No, you don't need a green screen! Our AI-powered background removal works with any background. The technology uses advanced machine learning models to detect and separate the subject from the background automatically. However, for best results, ensure good lighting and contrast between the subject and background.",
            isChecked: true,
        },
        {
            id: 3,
            question: "Can I use my own Custom Background?",
            answer: "Yes, absolutely! You can upload any image or video as your custom background. We support JPG, PNG, GIF, and even video backgrounds. Simply upload your desired background during the editing process, or choose from our extensive library of pre-made backgrounds.",
            isChecked: true,
        },
        {
            id: 4,
            question: "Is my Video data Secure & Private?",
            answer: "Absolutely. All videos are encrypted during upload and processing. We automatically delete your original and processed videos from our servers after 24 hours. You can also manually delete files immediately after downloading. We never share or use your content for any purpose other than processing.",
        },
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };



    return (
        <section className="bg-zinc-900 py-30 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight font-bold text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-white text-medium max-w-2xl mx-auto mb-6 tracking-tight">
                        Everything you need to know about our video background changer
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className="bg-zinc-900 backdrop-blur-sm rounded-xl border border-zinc-700 overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-zinc-800/70 transition-colors"
                            >
                                <div className="flex items-start gap-4 flex-1">

                                    <span className="text-white tracking-tight text-medium">
                                        {faq.question}
                                    </span>
                                </div>
                                <svg
                                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? "max-h-96" : "max-h-0"
                                    }`}
                            >
                                <div className="px-6 pb-6 pt-0">
                                    <div className="">
                                        <p className="text-gray-400 tracking-tight ">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default FAQS;