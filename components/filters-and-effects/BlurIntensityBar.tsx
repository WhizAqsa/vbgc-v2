"use client";


interface BlurIntensityBarProps {
    value: number;
    onChange: (value: number) => void;
    showValue?: boolean;
}

export function BlurIntensityBar({
    value,
    onChange,
    showValue = true,
}: BlurIntensityBarProps) {
    return (
        <div className="flex items-center gap-3 w-full">
            <div className="flex-1 space-y-2">
                <div className="relative w-full h-2 bg-gradient-to-r from-gray-700 via-gray-600 to-purple-600 rounded-full overflow-hidden">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => onChange(parseInt(e.target.value))}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-purple-500 cursor-pointer transition-all"
                        style={{ left: `${(value / 100) * 100}%` }}
                    />
                    <div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all"
                        style={{ width: `${value}%` }}
                    />
                </div>
            </div>
            {showValue && (
                <div className="bg-gray-800 border border-purple-600 rounded-lg px-3 py-1.5 min-w-[50px] text-center">
                    <span className="text-white font-semibold text-sm">{value}</span>
                </div>
            )}
        </div>
    );
}
