'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const ClassroomsContext = createContext();

export function useClassrooms() {
    return useContext(ClassroomsContext);
}

export function ClassroomsProvider({ children }) {
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchClassrooms() {
        try {
            setLoading(true);
            const classroomsCollectionRef = collection(db, 'Classrooms');
            const querySnapshot = await getDocs(classroomsCollectionRef);

            const fetchedClassrooms = [];
            querySnapshot.forEach((doc) => {
                fetchedClassrooms.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });

            setClassrooms(fetchedClassrooms);
        } catch (err) {
            console.error('Error fetching classrooms:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchClassrooms();
    }, []);

    const value = {
        classrooms,
        loading,
        error,
        fetchClassrooms
    };

    return (
        <ClassroomsContext.Provider value={value}>
            {children}
        </ClassroomsContext.Provider>
    );
}
