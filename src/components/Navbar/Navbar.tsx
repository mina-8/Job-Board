'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import ToggelTheme from '../Theme/ToggelTheme'
import { RxHamburgerMenu } from 'react-icons/rx'
import { MdClose } from 'react-icons/md'

const Navbar = () => {
    const [menubar, setmenubar] = useState(false);
    return (
        <header>
            <div
                className='lg:flex justify-between items-center hidden py-4 px-8 bg-white dark:bg-gray-700 shadow'
            >
                <div>
                    <Link
                        href='/'
                    >
                        <span
                            className='font-bold text-blue-500 text-2xl'
                        >
                            Job board
                        </span>
                    </Link>
                </div>

                <div
                    className='flex gap-2'
                >
                    <Link
                        href='/create-job'
                        className='bg-green-500 p-2 rounded-md text-white shadow-sm hover:bg-green-600 active:bg-green-700  active:shadow-[0_0_8px_2px_rgba(16,185,129,0.6)] active:!shadow-green-200 transition-colors duration-200 dark:bg-green-800'
                    >
                        New Job
                    </Link>

                    <ToggelTheme />
                </div>
            </div>

            <div
                className='flex justify-between items-center lg:hidden relative py-4 px-8 bg-white dark:bg-gray-700 shadow'
            >
                <div>
                    <Link
                        href='/'
                    >
                        <span
                            className='font-bold text-blue-500 text-2xl'
                        >
                            Job board
                        </span>
                    </Link>
                </div>

                <button
                    onClick={() => setmenubar(prev => !prev)}
                    className="lg:hidden px-4 "
                >
                    {
                        menubar ?
                            <MdClose />
                            :
                            <RxHamburgerMenu />
                    }
                </button>

                <div className=" gap-4 items-center flex flex-col bg-inherit w-full p-4 absolute top-10 right-0 duration-500"
                    style={{
                        clipPath: menubar ? 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' : 'polygon(0 0, 100% 0, 100% 0, 0 0)'
                    }}
                >
                    <Link
                        href='/create-job'
                        className='bg-green-500 p-2 rounded-md text-white shadow-sm hover:bg-green-600 active:bg-green-700  active:shadow-[0_0_8px_2px_rgba(16,185,129,0.6)] active:!shadow-green-200 transition-colors duration-200 dark:bg-green-800'
                    >
                        New Job
                    </Link>

                    <ToggelTheme />

                </div>

            </div>
        </header>
    )
}

export default Navbar