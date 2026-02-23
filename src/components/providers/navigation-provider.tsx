'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type NavigationContextType = {
    hasVisitedLanding: boolean;
    markLandingVisited: () => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    const [hasVisitedLanding, setHasVisitedLanding] = useState(false);

    const markLandingVisited = () => {
        setHasVisitedLanding(true);
    };

    return (
        <NavigationContext.Provider value={{ hasVisitedLanding, markLandingVisited }}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    const context = useContext(NavigationContext);
    if (context === undefined) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
}
