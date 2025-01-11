'use client';
import React from 'react'
import Link from 'next/link'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'

export default function CallToAction() {
    const {currentUser} = useAuth();

    if(currentUser) {
        return (
            <div className='mx-auto max-w-[600px] w-full'>
                <Link href="/dashboard">
                    <Button text="Go to dashboard" full/>
                </Link>
            </div>
        )
    }

    return (      
        <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
            <Link href="/dashboard">
                <Button text="Sign Up"/>
            </Link>
            <Link href="/dashboard">
                <Button text="Log In" dark/>
            </Link>
        </div>
    )
}
