'use client';

import React from 'react'
import Link from 'next/link'
import Button from './Button'
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'
import { Kanit } from "next/font/google";

const kanit = Kanit({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-kanit"
  });

export default function Header() {

    const { logout, currentUser } = useAuth();
    const pathname = usePathname();

    let logoutButton = (
        <div className="flex items-center justify-between">
            <Button text="LOG OUT" clickHandler={logout}/>
        </div>
    )

    if(!currentUser || pathname === '/') {
        logoutButton = null;
    }

    return (
        <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
        <Link href="/">
            <h1 className={`text-base sm:text-lg textGradient ${kanit.className}`} >PLEQ</h1> 
        </Link>
        {logoutButton}
        </header>
    )
}
