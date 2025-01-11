'use client';

import { Kanit } from "next/font/google";
import { useAuth } from "@/context/AuthContext";
import Login from "@/components/Login";
import Loading from "@/components/Loading"; 
import { useEffect } from "react";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kanit"
});

export default function Dashboard() {
   
    const {currentUser, UserDataObj, loading} = useAuth();

    useEffect(() => {
        if(!currentUser || !UserDataObj) {
            return;
        }
        setData(UserDataObj);
    }, [currentUser, UserDataObj])

    if(loading) {
        return <Loading/>
    }

    if(!currentUser) {
        return <Login/>
    }

    const details = {
    floor: 5,
    room_number: '05A26',
    }

  return (
    <div className="flex flex-col flex-1 gap-4 sm:gap-8 md:gap-12">
        <div className='grid grid-cols-1 md:grid-cols-3 bg-slate-50 text-slate-700 rounded-md p-4 gap-4  custom_shadow'>
            {Object.keys(details).map((detail, detailIndex) => {
                return(
                    <div key={detailIndex} className="flex flex-col gap-1 sm:gap-2">
                        <p className={`font-medium uppercase text-size-xs sm:text-size-sm6 truncate ${kanit.className}`}>{detail.replaceAll('_', ' ')}</p>
                        <p className={` sm:text-lg${kanit.className}`}>{details[detail]}</p>
                    </div> 
                )
            })}
        </div>
    </div>
    )
}
