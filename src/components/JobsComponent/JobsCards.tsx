import { Jobs } from '@/types/Jobs'
import React from 'react'
import { BsCurrencyDollar } from 'react-icons/bs'
import { CiClock2 } from 'react-icons/ci'
import { IoCalendar, IoLocationOutline } from 'react-icons/io5'
import { formatTimeAgo } from './formatTimeAgo'
import TipTapViewer from '../RichText/TipTapViewer'

interface JobsCardsProps {
  jobs: Jobs[]
}
const JobsCards: React.FC<JobsCardsProps> = ({ jobs }) => {
  return (
    <div className="flex flex-col items-center  gap-3 ">
      {jobs.length > 0 ? (
        jobs.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-900 p-4 rounded-md w-full max-w-2xl shadow-lg flex"
          >
            <div className="w-12 flex justify-center items-start">
              <div className="border rounded-full p-1 text-sm font-medium">
                Job
              </div>
            </div>
            <div className="flex flex-col w-full pl-4">
              <h3 className="font-bold text-xl">{item.title}</h3>
              <div className="flex justify-between items-center my-2 gap-4">
                <p className="flex items-center gap-1 text-sm">
                  <IoLocationOutline />
                  {item.location}
                </p>
                <p className="flex items-center gap-1 text-sm">
                  <CiClock2 />
                  {item.type}
                </p>
                <p className="flex items-center gap-1 text-sm">
                  <BsCurrencyDollar />
                  {item.salary}
                </p>
                <p className="flex items-center gap-1 text-sm">
                  <IoCalendar />
                  {formatTimeAgo(new Date(item.created_at))}
                </p>
              </div>
              
              <TipTapViewer content={item.description} />
              
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500 dark:text-gray-400">No jobs found</div>
      )}
    </div>
  )
}

export default JobsCards