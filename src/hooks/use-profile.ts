'use client';

import { useState, useEffect } from 'react';
import { authMock } from '@/lib/auth-mock';

export function useProfile() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check mock authentication status
        if (authMock.isLoggedIn()) {
            setUser(authMock.getUser());
        } else {
            setUser(null);
        }
        setLoading(false);
    }, []);

    return { user, loading };
}
