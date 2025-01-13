'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
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

    async function addClassroom(classroomData) {
        try {
            const classroomsCollectionRef = collection(db, 'Classrooms');
            const docRef = await addDoc(classroomsCollectionRef, classroomData);
            console.log("Classroom added with ID:", docRef.id);
            fetchClassrooms();
        } catch (err) {
            console.error('Error adding classroom:', err);
            setError(err.message);
        }
    }

    async function deleteClassroom(classroomId) {
        try {
            const classroomDocRef = doc(db, 'Classrooms', classroomId);
            await deleteDoc(classroomDocRef);
            console.log(`Classroom with ID ${classroomId} deleted`);
            fetchClassrooms();
        } catch (err) {
            console.error('Error deleting classroom:', err);
            setError(err.message);
        }
    }

    async function editClassroom(classroomId, updatedData) {
        try {
            const classroomDocRef = doc(db, 'Classrooms', classroomId);
            await updateDoc(classroomDocRef, updatedData);
            console.log(`Classroom with ID ${classroomId} updated`);
            fetchClassrooms();
        } catch (err) {
            console.error('Error updating classroom:', err);
            setError(err.message);
        }
    }

    useEffect(() => {
        fetchClassrooms();
    }, []);

    const value = {
        classrooms,
        loading,
        error,
        fetchClassrooms,
        addClassroom,
        deleteClassroom,
        editClassroom,
    };

    return (
        <ClassroomsContext.Provider value={value}>
            {children}
        </ClassroomsContext.Provider>
    );
}
