 'use client';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, {useContext, useState, useEffect} from 'react';
import { auth} from '../firebase';


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userDataObj, setUserDataObj] = useState({});
    const [loading, setLoading] = useState(true);
    
    //AUTH HANDLERS
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        setUserDataObj({});
        setCurrentUser(null);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                //Set user to our current local context state 
                setLoading(true);
                setCurrentUser(user);
                if(!user) {
                    return;
                }

            }
            //if user exists, fetch data from firebase
            catch (err) {
                console.log(err.message);
            }
            finally {
                setLoading(false);
            }
            return unsubscribe;
        }, []);
    }

    const value = {

    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}