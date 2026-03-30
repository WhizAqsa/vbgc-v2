import type { ReactNode } from "react";

export type SidebarItem = {
    label: string;
    icon: ReactNode;
    comingSoon?: boolean;
};

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