'use client';

import { useAuth } from "@/context/AuthContext";
import { useClassrooms } from "@/context/ClassroomContext";
import Login from "@/components/Login";
import Loading from "@/components/Loading"; 
import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import Modal from "./Modal";
import Button from "./Button";

export default function Dashboard() {
    const { currentUser, UserDataObj, loading: authLoading } = useAuth();
    const { classrooms, loading: classroomsLoading, error } = useClassrooms();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (currentUser && UserDataObj) {
            setUserData(UserDataObj);
        }
    }, [currentUser, UserDataObj]);

    const handleDelete = () => {
        console.log("Deleted room:", selectedRoom);
        setIsConfirmModalOpen(false);
    };

    const openConfirmModal = (room) => {
        setSelectedRoom(room);
        setIsConfirmModalOpen(true);
    };

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
            <div className="flex items-center justify-between mb-6">
                <Button full text="Add Classroom" clickHandler={() => setIsModalOpen(true)} />
            </div>
            {/* Modal to add a classroom */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-6 text-center">Add Classrooms</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="field1" className="block text-sm font-medium text-gray-700">
                                Classroom Name
                            </label>
                            <input
                                id="field1"
                                type="text"
                                placeholder="Enter classroom name"
                                className="w-full mx-auto px-3 duration-200 hover:border-slate-600 focus:border-slate-600 py-2 sm:py-3 border border-solid border-slate-400 rounded-sm outline-none" 
                            />
                        </div>
                        <div>
                            <label htmlFor="field2" className="block text-sm font-medium text-gray-700">
                                Room Number
                            </label>
                            <input
                                id="field2"
                                type="text"
                                placeholder="Enter room number"
                                className="w-full mx-auto px-3 duration-200 hover:border-slate-600 focus:border-slate-600 py-2 sm:py-3 border border-solid border-slate-400 rounded-sm outline-none" 
                            />
                        </div>
                        <div>
                            <label htmlFor="field3" className="block text-sm font-medium text-gray-700">
                                Floor Number
                            </label>
                            <input
                                id="field4"
                                type="text"
                                placeholder="I.e. 5"
                                className="w-full mx-auto px-3 duration-200 hover:border-slate-600 focus:border-slate-600 py-2 sm:py-3 border border-solid border-slate-400 rounded-sm outline-none" 
                            />
                        </div>
                        <div>
                            <label htmlFor="field4" className="block text-sm font-medium text-gray-700">
                                Building
                            </label>
                            <input
                                id="field5"
                                type="text"
                                placeholder="i.e. 05A03"
                                className="w-full mx-auto px-3 duration-200 hover:border-slate-600 focus:border-slate-600 py-2 sm:py-3 border border-solid border-slate-400 rounded-sm outline-none" 
                            />
                        </div>
                        <div className="text-white">
                            <Button type='submit' text="Submit" dark full />
                        </div>
                    </form>
                </Modal>
            )}

            {/* Confirmation modal for deletion of classroom */}
            {isConfirmModalOpen && (
                <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
                    <h2 className="text-lg font-semibold text-center">
                        Are you sure you want to delete classroom {selectedRoom?.room_number}?
                    </h2>
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={() => setIsConfirmModalOpen(false)}
                            className="mx-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="mx-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Confirm
                        </button>
                    </div>
                </Modal>
            )}

    
            {/* Room Cards*/}
            <div className="w-full mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {classrooms.map((room) => (
                        <div key={room.id} className="relative">
                            <RoomCard
                                image={room.image}
                                details={{
                                    building: room.building,
                                    floor: room.floor,
                                    room_number: room.room_number,
                                    availability: room.availability,
                                }}
                                onDelete={() => openConfirmModal(room)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
