import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            number: "1",
            title: "Advanced AI Detection",
            description: "Our neural network analyzes each frame of your video, identifying the main subject with pixel-perfect accuracy."
        },
        {
            number: "2",
            title: "Intelligent Segmentation",
            description: "The system creates precise masks to separate subjects from backgrounds, accurately handling transparency and motion blur."
        },
        {
            number: "3",
            title: "Seamless Processing",
            description: "The system maintains temporal coherence across frames, ensuring smooth transitions and clean, consistent edges."
        }
    ];

    return (
        <div className="py-16 md:py-24 bg-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-2">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
                        How the AI Works
                    </span>
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-medium md:text-lg lg:text-xl tracking-tight text-gray-400 mb-4">
                        Understanding the technology behind intelligent background removal
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {steps.map((step) => (
                        <div key={step.number} className="text-center border border-gray-500 rounded-2xl p-6">
                            <div className="w-10 h-10 bg-zinc-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-lg text-gray-400">{step.number}</span>
                            </div>
                            <h3 className="text-2xl font-medium tracking-tight text-white mb-3">
                                {step.title}
                            </h3>
                            <p className="text-gray-400 text-medium tracking-tight">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-b from-purple-950 to-cyan-800 rounded-2xl max-w-6xl mx-auto">
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-4 justify-end">
                            No Green Screen Required
                        </h3>
                        <p className="text-gray-300 text-lg justify-end">
                            Unlike traditional video editing that requires expensive green screen setups, professional lighting
                            and complex post-production work, our AI-powered solution works with any video recorded in any
                            environment. Simply upload your footage, and let the AI handle the rest.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HowItWorks;