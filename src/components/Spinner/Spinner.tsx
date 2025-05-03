import React from 'react'

const Spinner = () => {
  return (
    <span
    role='status'
    aria-label='loading'
    className='animate-spin inline-block size-6 border-[3px] border-t-transparent text-blue-600 dark:text-blue-700 rounded-full'
    >

    </span>
  )
}

export default Spinner