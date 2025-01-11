'use client';

import { useAuth } from "@/context/AuthContext";
import { useClassrooms } from "@/context/ClassroomContext";
import Login from "@/components/Login";
import Loading from "@/components/Loading"; 
import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import Button from "./Button";

export default function Dashboard() {
    const { currentUser, UserDataObj, loading: authLoading } = useAuth();
    const { classrooms, loading: classroomsLoading, error } = useClassrooms();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (currentUser && UserDataObj) {
            setUserData(UserDataObj);
        }
    }, [currentUser, UserDataObj]);

    if (authLoading || classroomsLoading) {
        return <Loading />;
    }

    if (!currentUser) {
        return <Login />;
    }

    if (error) {
        console.log(error);
    }

    return (
        <div className="w-full mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {classrooms.map((room) => (
                    <RoomCard 
                        key={room.id} 
                        image={room.image} 
                        details={{
                            building: room.building,
                            floor: room.floor,
                            room_number: room.room_number,
                            availability: room.availability,
                        }} 
                    />
                ))}
                
            </div>
        </div>
    );
}
