'use client'
import React, { useState } from 'react'
import { CiLocationOn, CiSearch } from 'react-icons/ci'
import Spinner from '../Spinner/Spinner'
import { useRouter } from 'next/navigation'
import { Searchjobs } from '@/utils/ValidationSchema'
import Alert from '../Alert/Alert'


const SearchForm =  () => {
    const [jobs, setjobs] = useState('')
    const [location, setlocation] = useState('')
    const [loading, setLoading] = useState(false);
    const [errormessage , seterrormessage] = useState('');
    const [alertTriger , setalertTriger] = useState(0);
    const router = useRouter();
    const HandelFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        seterrormessage('')
        const validation = Searchjobs.safeParse({job: jobs , location});
        if(!validation.success){
            const Errormessange = validation.error.errors.map((err) => err.message).join(", ");
            seterrormessage(Errormessange)
            setalertTriger(prev => prev + 1);
            setLoading(false);
            return;
        }
        try{

            const query =new URLSearchParams({
                "job" : jobs,
                "location" : location
            }).toString();
            
            router.push(`/search/search-job?${query}`);
        }catch(error :unknown){
            throw new Error("Failed to fetch jobs");
        }finally{
            setLoading(false)
        }
        

    }
    return (
        <div
            className='mt-5 mb-10 '
        >
          {errormessage &&  <Alert triger={alertTriger} message={errormessage} />}
            <form
                onSubmit={HandelFormSubmit}
                className='flex  w-full'
            >

                <div className="relative w-[60%]">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <CiSearch />
                    </span>
                    <input
                        disabled={loading}
                        type="text"
                        placeholder="What position are you looking for?"
                        className="pl-8 pr-2 py-2 border border-gray-300 w-full focus:outline-none"
                        value={jobs}
                        onChange={(e) => setjobs(e.target.value)}
                    />
                    
                </div>

                <div className="relative w-[30%]">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <CiLocationOn />
                    </span>

                    <input
                        disabled={loading}
                        type='text'
                        placeholder='Location'
                        className="pl-8 pr-2 py-2 border border-gray-300 w-full focus:outline-none"
                        value={location}
                        onChange={(e) => setlocation(e.target.value)}
                    />
                </div>


                <button
                    disabled={loading}
                    type='submit'
                    className='bg-sky-500 text-white p-2 hover:bg-blue-600 focus:bg-blue-400 cursor-pointer w-[10%] flex justify-center items-center'
                >
                    {
                        loading ?
                            <Spinner />
                            :
                            <>
                                Search job
                            </>
                    }
                </button>


            </form>

        </div>
    )
}

export default SearchForm