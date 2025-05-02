import React from 'react'

import JobForm from './JobForm'

const CreateJob = () => {
  return (
    <div
    className='px-12 py-12'
    >
      <div 
      className='text-center font-bold text-2xl'
      >Add a job</div>
      <JobForm />
    </div>
  )
}

export default CreateJob