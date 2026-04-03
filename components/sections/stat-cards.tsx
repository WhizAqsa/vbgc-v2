import React from 'react';

const StatCards = () => {
    const stats = [
        {
            value: "98%",
            suffix: "",
            label: "Accuracy Rate",
        },
        {
            value: "10x",
            suffix: "",
            label: "Faster Than Manual",
        },
        {
            value: "4K",
            suffix: "",
            label: "Resolution Support",
        }
    ];

    return (
        <div className="py-16 md:py-20 bg-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            {/* <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div> */}

                            <div className="relative rounded-2xl p-8 text-center border border-gray-500">

                                <div className="mb-3">
                                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-sky-300">
                                        {stat.value}
                                    </span>
                                    {stat.suffix && (
                                        <span className="text-3xl md:text-4xl font-bold text-sky-400">
                                            {stat.suffix}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-sm text-gray-400 mb-2">
                                    {stat.label}
                                </h3>


                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default StatCards;