import React from 'react'

const Header = () => {
  return (
    <header className='flex items-center py-6 border-b-2 border-[#D0CFCF]'>
        <button className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <h1 className='ml-2 text-xl font-semibold'>
                Shopping Continue
            </h1>
        </button>
    </header>
  )
}

export default Header
