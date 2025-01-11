 'use client';

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, {useContext, useState, useEffect} from 'react';
import { auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

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
        setUserDataObj(null);
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
                    console.log("No user found");
                    setLoading(false);
                    return;
                }
            //if user exists, fetch data from firebase
            console.log("User exists, fetching data from firebase");
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            let firebaseData = {};

            if(docSnap.exists()) {
                console.log("Found user data!");
                firebaseData = docSnap.data();
                console.log(firebaseData);
                }
                setUserDataObj(firebaseData);
            }
            
            catch (err) {
                console.log(err.message);
            }
            finally {
                setLoading(false);
            }
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userDataObj,
        signUp,
        login,
        logout,
        loading,
        setLoading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}