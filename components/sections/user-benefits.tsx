import React from 'react';

const UserBenefits = () => {
    const userTypes = [
        {
            title: "Content Creators",
            subtitle: "Elevate Your Content",
            benefits: [
                "Create professional-looking videos without expensive equipment",
                "Stand out on YouTube, TikTok, and Instagram with unique backgrounds",
                "Save hours of editing time and focus on creating more content"
            ],
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            ),
            position: "normal"
        },
        {
            title: "Educators",
            subtitle: "Enhance Learning",
            benefits: [
                "Produce consistent branded video content at scale",
                "A/B test different backgrounds for optimal engagement",
                "Maintain student engagement with dynamic, distraction-free content"
            ],
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            position: "up"
        },
        {
            title: "Marketers",
            subtitle: "Boost Campaign Impact",
            benefits: [
                "Produce consistent branded video content at scale",
                "A/B test different backgrounds for optimal engagement",
                "Create localized content by changing backgrounds for different markets"
            ],
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
            ),
            position: "normal"
        }
    ];

    return (
        <div className="py-16 md:py-24 bg-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-4">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
                        Benefits for Different Users
                    </span>
                </div>

                <div className="text-center mb-24">
                    <h2 className="text-medium md:text-lg lg:text-xl text-gray-400 tracking-tight">
                        Tailored solutions for every type of video creator
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {userTypes.map((user, index) => (
                        <div
                            key={index}
                            className={`transform transition-all duration-300 ${user.position === 'up'
                                ? 'lg:-translate-y-8'
                                : ''
                                }`}
                        >
                            <div className="group relative rounded-2xl bg-zinc-800 border border-gray-600 hover:border-sky-500 transition-all duration-300 hover:transform hover:-translate-y-2 overflow-hidden h-full">

                                <div className="relative p-6">
                                    <div className="flex justify-left mb-6">
                                        <div className="bg-sky-300 px-5 py-1.5 rounded-full">
                                            <h3 className="text-sm text-black tracking-tight">
                                                {user.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex justify-center mb-5">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-900 flex items-center justify-center text-white shadow-lg">
                                            {user.icon}
                                        </div>
                                    </div>

                                    {/* Subtitle */}
                                    <div className="text-center mb-6">
                                        <h4 className="text-xl font-bold text-white tracking-tight">
                                            {user.subtitle}
                                        </h4>
                                    </div>


                                    <ul className="space-y-3">
                                        {user.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-300">
                                                <svg className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm leading-relaxed">
                                                    {benefit}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-8 mb-24"></div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserBenefits;