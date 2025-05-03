
'use client'
import { Errorpage } from '@/types/Jobs'
import Link from 'next/link'
import React from 'react'

const ErrorPage = ({error} : Errorpage) => {
  return (
    <div 
    className="p-4 m-4"
    >
        <h2
        className="text-center text-2xl font-bold text-red-500"
        >ErrorPage</h2>
        <div 
        className="flex justify-center items-center flex-col gap-4 p-4 m-4"
        >
            <div>
                Somenting went Wrong {error.message}
            </div>
            
        <Link
        className="rounded-lg bg-blue-400 hover:drop-shadow-lg p-2 hover:text-white"
        href={'/'}
        >
            Return Home page
        </Link>
        </div>
    </div>
  )
}

export default ErrorPage