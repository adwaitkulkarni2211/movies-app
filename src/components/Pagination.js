import React from 'react'

function Pagination() {
  return (
    <div className='mb-8 w-full flex justify-center'>
        <button className='p-2 border-2 border-r-0 border-indigo-500 text-indigo-500 rounded-l-xl'>Previous</button>
        <button className='p-2 border-2 border-r-0 border-indigo-500 text-indigo-500'>2</button>
        <button className='p-2 border-2 border-indigo-500 text-indigo-500 rounded-r-xl'>Next</button>
    </div>
  )
}

export default Pagination