import { useState, useEffect } from 'react';
import { auth, db } from '../../services/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export const useAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
                    setIsAdmin(userDoc.data()?.isAdmin || false);
                }
            } catch (error) {
                console.error('Erro ao verificar status de admin:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, []);

    return { isAdmin, loading };
};