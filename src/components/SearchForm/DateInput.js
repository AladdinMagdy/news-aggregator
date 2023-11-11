import React from 'react'

const DateInput = ({ onChangeHandler }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="date" className="text-sm font-medium text-stone-600">Date of Entry</label>
      <input onChange={e => onChangeHandler(e.target.value)} type="date" id="date" className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
    </div>

  )
}

export default DateInput