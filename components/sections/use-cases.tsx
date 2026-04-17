// components/use-cases.tsx
import React from 'react';
import Image from 'next/image';

const UseCases = () => {
    const useCases = [
        {
            title: "YouTube Content Creation",
            description: "Create engaging video content with custom backgrounds that match your brand. Perfect for tutorials, vlogs, and educational content.",
            // Using working Picsum images
            image: "https://picsum.photos/id/20/400/300", // Workspace/laptop image
            alt: "YouTube content creation",
        },
        {
            title: "Marketing Campaigns",
            description: "Produce high-quality promotional videos with branded backgrounds. Test different environments to maximize engagements.",
            image: "https://picsum.photos/id/26/400/300", // Marketing/analytics image
            alt: "Marketing campaigns",
        },
        {
            title: "Online Course Production",
            description: "Record professional educational content from home. Add relevant backgrounds that enhance learning without distracting from the material.",
            image: "https://picsum.photos/id/0/400/300", // Online course/workspace image
            alt: "Online course production",
        },
        {
            title: "Social Media Reels",
            description: "Stand out on Instagram, TikTok, and other platforms with eye-catching backgrounds. Create scroll-stopping content that drives engagement.",
            image: "https://picsum.photos/id/96/400/300", // Social media/smartphone image
            alt: "Social media reels creation",
        },
        {
            title: "Product Demonstrations",
            description: "Showcase products with clean, professional backgrounds that highlight features. Perfect for e-commerce and sales presentations.",
            image: "https://picsum.photos/id/42/400/300", // Product showcase image
            alt: "Product demonstrations",
        }
    ];

    return (
        <section className="py-12 md:py-20 px-4 bg-zinc-900">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
                    <div className="lg:sticky lg:top-20">
                        <h3 className="text-sm md:text-base font-semibold bg-gradient-to-r from-purple-500 via-sky-300 to-purple-300 bg-clip-text text-transparent tracking-wide uppercase">
                            REAL-WORLD APPLICATIONS
                        </h3>

                        <div className="mt-4">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
                                Use Cases
                            </h3>
                            <p className="text-sm md:text-base lg:text-lg text-gray-400 tracking-tight">
                                Discover how professionals across industries are using our AI Video Background Changer
                                to create stunning content and streamline their workflows.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        {useCases.map((useCase, index) => (
                            <div
                                key={index}
                                className="bg-zinc-800 rounded-xl md:rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
                            >
                                <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6">
                                    {/* Image */}
                                    <div className="md:w-2/5">
                                        <div className="relative rounded-lg md:rounded-xl overflow-hidden h-32 md:h-32 lg:h-36">
                                            <Image
                                                src={useCase.image}
                                                alt={useCase.alt}
                                                width={400}
                                                height={300}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="md:w-3/5">
                                        <h3 className="text-base md:text-lg lg:text-xl font-medium text-white mb-2 md:mb-3">
                                            {useCase.title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-gray-400 tracking-tight leading-relaxed">
                                            {useCase.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UseCases;