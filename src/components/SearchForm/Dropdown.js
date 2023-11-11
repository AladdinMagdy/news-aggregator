import React from 'react'

const Dropdown = ({ label, onChangeHandler, children, ...props }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="text-sm font-medium text-stone-600">{label}</label>

      <select onChange={(e) => onChangeHandler(e.target.value)} id={label} className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" {...props}>
        {children}
      </select>
    </div>
  )
}

export default Dropdown