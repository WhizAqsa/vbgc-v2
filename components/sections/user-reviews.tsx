"use client";


import Image from 'next/image';
import { useState } from 'react';


const UserReviews: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const reviews = [
        {
            id: 1,
            name: "John Doe",
            location: "Brooklyn, NYC",
            rating: 5,
            review: "This tool has completely transformed my video production workflow. I can now create professional-looking videos in minutes instead of hours. The AI background removal is incredibly accurate!",
            avatar: "https://ui-avatars.com/api/?name=John+Doe&background=0D9488&color=fff&rounded=true&bold=true&size=40",
        },
        {
            id: 2,
            name: "Sarah Johnson",
            location: "Los Angeles, CA",
            rating: 5,
            review: "The AI background removal is magic! I've saved hundreds of hours of manual editing. This platform is a game-changer for content creators like me.",
            avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D9488&color=fff&rounded=true&bold=true&size=40",
        },
        {
            id: 3,
            name: "Mike Chen",
            location: "Austin, TX",
            rating: 5,
            review: "Finally, a video tool that actually delivers on its promises. The quality is outstanding and the speed is incredible. Highly recommended!",
            avatar: "https://ui-avatars.com/api/?name=Mike+Chen&background=0D9488&color=fff&rounded=true&bold=true&size=40",
        },
    ];

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="bg-zinc-900 py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-2 tracking-tight">
                        What Our Users Say
                    </h2>
                    <p className="text-medium text-white max-w-2xl mx-auto mb-20 tracking-tight">
                        Join thousands of satisfied customers who trust our platform
                    </p>
                </div>

                <div className="relative flex items-center gap-4">
                    <button
                        onClick={handlePrev}
                        className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-cyan-800/50 transition-colors duration-200 flex-shrink-0"
                        aria-label="Previous review"
                    >
                        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-zinc-900 rounded-xl border border-zinc-700 p-6 transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(0,51,102,0.3)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(0,102,204,0.5)]"
                            >
                                <div className="mb-3">{renderStars(review.rating)}</div>

                                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
                                    &quot;{review.review}&quot;
                                </p>

                                <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
                                    <Image
                                        src={review.avatar}
                                        width={100}
                                        height={100}
                                        alt={review.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-cyan-400 text-sm">
                                            {review.name}
                                        </p>
                                        <p className="text-xs text-cyan-400/70">{review.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-cyan-800/50 transition-colors duration-200 flex-shrink-0"
                        aria-label="Next review"
                    >
                        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div className="flex justify-center items-center gap-2 mt-8">
                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`transition-all duration-200 ${index === activeIndex
                                ? "w-8 h-2 bg-cyan-500 rounded-full"
                                : "w-2 h-2 bg-gray-600 rounded-full hover:bg-gray-500"
                                }`}
                            aria-label={`Go to review ${index + 1}`}
                        />
                    ))}
                    <span className="w-2 h-2 bg-gray-600 rounded-full opacity-50" />
                </div>
            </div>
        </section>
    );
};

export default UserReviews;