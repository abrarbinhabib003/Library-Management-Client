import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseApp from '../firebase/firebase.config';  

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(firebaseApp);

    useEffect(() => {
     
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
             
                const token = await user.getIdToken();
                try {
                    const res = await axios.post('https://library-management-backend-beta.vercel.app/api/auth/google-login', { idToken: token }, { withCredentials: true });
                    setUser(res.data.user);
                } catch (err) {
                    console.error('Error fetching user data:', err);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    const googleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

    
            const token = await user.getIdToken();
            await axios.post('https://library-management-backend-beta.vercel.app/api/auth/google-login', { idToken: token }, { withCredentials: true });

            setUser(user);
        } catch (error) {
            console.error('Google login error:', error);
        }
    };

    const emailPasswordLogin = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;

     
            const token = await user.getIdToken();
            await axios.post('https://library-management-backend-beta.vercel.app/api/auth/login', { email, password }, { withCredentials: true });

            setUser(user);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const emailPasswordRegister = async (name, email, password, photoURL) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;

     
            const res = await axios.post('https://library-management-backend-beta.vercel.app/api/auth/register', { name, email, password, photoURL }, { withCredentials: true });

            setUser(user);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            await axios.post('https://library-management-backend-beta.vercel.app/api/auth/logout', {}, { withCredentials: true });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, googleLogin, emailPasswordLogin, emailPasswordRegister, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
