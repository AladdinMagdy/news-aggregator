import React from 'react'
import SearchIcon from './SearchIcon'

const SearchInput = ({ query, onChangeHandler }) => {
  return (
    <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
      <SearchIcon />
      <input type="name" name="search" className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-7 md:pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Search by keyword" value={query} onChange={(e) => onChangeHandler(e.target.value)} />
    </div>
  )
}

export default SearchInput