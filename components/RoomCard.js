'use client';

import React from 'react';
import Image from 'next/image';
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kanit"
});

export default function RoomCard(props) {
    const { details, onDelete, onEdit } = props;
    let availability = 'Unavailable';

    if (details.availability) {
        availability = "Available";
    }

    return (
        <div className={`flex flex-col gap-2 bg-slate-100 text-slate-800 rounded-sm p-4 max-w-[500px] mx-auto ${kanit.className}`}>
            <div className="relative">
                <Image
                    src='/images/class1.jpg'
                    alt="room image"
                    width={500}
                    height={300}
                    objectFit="cover"
                    className="rounded-sm"
                />
                <button 
                    className="absolute top-0 right-0 translate-x-[80%] translate-y-[-80%] bg-slate-700 text-white w-10 h-10 rounded-full shadow-lg hover:opacity-60"
                    onClick={onDelete}
                >
                    X
                </button>
                <button 
                    className="absolute top-0 right-0 translate-x-[80%] translate-y-[25%] bg-slate-700 text-white w-10 h-10 rounded-full shadow-lg hover:opacity-60"
                    onClick={onEdit}
                >
                    E
                </button>
            </div>

            <div className="flex flex-col items-center mx-auto">
                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-4 sm:grid-rows-1 sm:gap-8 justify-items-center">
                    <div className="flex flex-col items-center justify-center">
                        <p className="font-medium text-lg">Building</p>
                        <p className="font-bold text-lg">{details.building}</p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <p className="font-medium text-lg">Floor</p>
                        <p className="font-bold text-lg">{details.floor}</p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <p className="font-medium text-lg">Room Nr.</p>
                        <p className="font-bold text-lg">{details.room_number}</p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <p className="font-medium text-lg">Availability</p>
                        <p className="font-bold text-lg">{availability}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
