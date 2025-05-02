import React from 'react'
import SearchForm from '../SearchJob/SearchForm'

const JobBoard = () => {
  return (
    <div
      className="bg-white px-8 py-12 dark:bg-gray-900"
      >
        <div>
          <p className="capitalize text-2xl font-semibold mb-5">find your <span className="text-blue-500">new job</span> today</p>
          <p>Thousan of jobs in the computer , engineering and technology sectors are waiting for you.</p>
        </div>
        <SearchForm/>
      </div>
  )
}

export default JobBoard