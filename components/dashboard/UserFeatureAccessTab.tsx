'use client';
import { FiCheck, FiX } from 'react-icons/fi';

interface FeatureEntitlement {
    id: string;
    name: string;
    enabled: boolean;
    disabledReason?: string;
    lastChecked: string;
}

interface UserFeatureAccessTabProps {
    userId: string;
}

const features: FeatureEntitlement[] = [
    { id: '1', name: 'Background Removal', enabled: true, lastChecked: '2024-04-14' },
    { id: '2', name: 'Custom Background', enabled: true, lastChecked: '2024-04-14' },
    { id: '3', name: 'Green Screen', enabled: true, lastChecked: '2024-04-14' },
    { id: '4', name: 'Blur', enabled: true, lastChecked: '2024-04-14' },
    { id: '5', name: 'Black & White', enabled: true, lastChecked: '2024-04-14' },
    { id: '6', name: 'HD Export', enabled: true, lastChecked: '2024-04-14' },
    { id: '7', name: 'Watermark-free Export', enabled: true, lastChecked: '2024-04-14' },
    { id: '8', name: 'AI Background Generation', enabled: false, disabledReason: 'Free plan limitation', lastChecked: '2024-04-14' },
    { id: '9', name: 'Video Background Upload', enabled: false, disabledReason: 'Pro plan exclusive', lastChecked: '2024-04-14' },
];

export default function UserFeatureAccessTab({ }: UserFeatureAccessTabProps) {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Entitlements</h3>
                <div className="space-y-3">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className={`flex items-start justify-between p-4 rounded-lg border ${feature.enabled ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                        >
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    {feature.enabled ? (
                                        <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    ) : (
                                        <FiX className="w-5 h-5 text-red-600 flex-shrink-0" />
                                    )}
                                    <p className={`font-medium ${feature.enabled ? 'text-green-900' : 'text-red-900'}`}>
                                        {feature.name}
                                    </p>
                                </div>
                                {feature.disabledReason && (
                                    <p className="text-xs text-red-700 ml-7 mt-1">{feature.disabledReason}</p>
                                )}
                                <p className="text-xs text-gray-600 ml-7 mt-1">Last checked: {feature.lastChecked}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${feature.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {feature.enabled ? 'Enabled' : 'Disabled'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                        Recalculate Access
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                        Force Unlock All
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm">
                        Reset Entitlements
                    </button>
                </div>
            </div>
        </div>
    );
}
