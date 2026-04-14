'use client';


interface UserSubscriptionTabProps {
    userId: string;
}

export default function UserSubscriptionTab({ }: UserSubscriptionTabProps) {
    const subscription = {
        planName: 'Premium Pro',
        stripeCustomerId: 'cus_1a2b3c4d5e6f7g8h',
        stripeSubscriptionId: 'sub_9h8g7f6e5d4c3b2a',
        paymentStatus: 'Success',
        startDate: '2023-06-15',
        renewalDate: '2024-05-15',
        cancelAtPeriodEnd: false,
        lastPayment: '2024-04-15 - $29.99',
        failedPaymentsCount: 0,
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                        <p className="text-gray-900 font-semibold">{subscription.planName}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                        <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                            {subscription.paymentStatus}
                        </span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <p className="text-gray-900">{subscription.startDate}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Renewal Date</label>
                        <p className="text-gray-900">{subscription.renewalDate}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cancel At Period End</label>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${subscription.cancelAtPeriodEnd ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {subscription.cancelAtPeriodEnd ? 'Yes' : 'No'}
                        </span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Failed Payments</label>
                        <p className="text-gray-900">{subscription.failedPaymentsCount}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stripe Information</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Customer ID</label>
                        <div className="flex items-center space-x-2">
                            <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-xs text-gray-900 break-all">{subscription.stripeCustomerId}</code>
                            <button className="px-3 py-2 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition-colors">
                                Copy
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subscription ID</label>
                        <div className="flex items-center space-x-2">
                            <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-xs text-gray-900 break-all">{subscription.stripeSubscriptionId}</code>
                            <button className="px-3 py-2 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition-colors">
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="text-sm font-medium text-gray-900">{subscription.lastPayment}</p>
                            <p className="text-xs text-gray-600">Most recent payment</p>
                        </div>
                        <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                            Success
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                        Refresh Subscription
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm">
                        Open Stripe Dashboard
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                        Force Feature Sync
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm">
                        Cancel Plan
                    </button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm">
                        Extend Renewal Date
                    </button>
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium text-sm">
                        Apply/Remove Discount
                    </button>
                </div>
            </div>
        </div>
    );
}
