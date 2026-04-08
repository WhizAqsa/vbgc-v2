import React from 'react';
export interface SidebarItem {
    label: string;
    icon: React.ReactNode;
    comingSoon?: boolean;
    path?: string;
    action?: string;
}

export type FloatingCard = {
    title: string;
    gradient: string;
    positionClass: string;
};

export type ShowcaseCard = {
    badge: string;
    title: string;
    description: string;
    gradient: string;
};