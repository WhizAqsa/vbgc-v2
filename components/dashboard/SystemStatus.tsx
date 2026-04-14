'use client';

import React from 'react';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

interface SystemService {
    id: string;
    name: string;
    status: 'operational' | 'warning' | 'down';
    uptime?: string;
}

interface SystemStatusProps {
    services?: SystemService[];
}

const defaultServices: SystemService[] = [
    { id: '1', name: 'Upload service', status: 'operational', uptime: '99.9%' },
    { id: '2', name: 'Processing workers', status: 'operational', uptime: '99.7%' },
    { id: '3', name: 'Stripe webhook', status: 'warning', uptime: '98.5%' },
    { id: '4', name: 'Email service', status: 'operational', uptime: '99.8%' },
    { id: '5', name: 'Auth service', status: 'operational', uptime: '99.9%' },
];

const statusConfig = {
    operational: {
        icon: FiCheckCircle,
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
        badgeBg: 'bg-green-100',
    },
    warning: {
        icon: FiAlertCircle,
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-700',
        badgeBg: 'bg-yellow-100',
    },
    down: {
        icon: FiX,
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        badgeBg: 'bg-red-100',
    },
};

export default function SystemStatus({ services = defaultServices }: SystemStatusProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-2">
                {services.map((service) => {
                    const config = statusConfig[service.status];
                    const Icon = config.icon;

                    return (
                        <div key={service.id} className={`flex items-center justify-between p-3 rounded-lg border border-gray-200 ${config.bgColor}`}>
                            <div className="flex items-center space-x-3">
                                <Icon className={`w-5 h-5 ${config.textColor}`} />
                                <span className={`font-medium ${config.textColor}`}>{service.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {service.uptime && (
                                    <span className={`text-xs font-semibold px-2 py-1 rounded ${config.badgeBg} ${config.textColor}`}>
                                        {service.uptime}
                                    </span>
                                )}
                                <span className={`w-2 h-2 rounded-full ${service.status === 'operational' ? 'bg-green-500' : service.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
