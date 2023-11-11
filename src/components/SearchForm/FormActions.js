import React from 'react'

const FormActions = ({ resetAction }) => {
  return (
    <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
      <button type='button' onClick={resetAction} className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring">Reset</button>
      <button type='submit' className="rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none hover:opacity-80 focus:ring">Search</button>
    </div>
  )
}

export default FormActions