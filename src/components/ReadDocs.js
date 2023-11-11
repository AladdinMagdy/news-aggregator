import React from 'react'

const ReadDocs = () => {
  return (
    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
      Read the documentation. {' '}
      <a href="https://github.com/AladdinMagdy/news-aggregator" className="font-semibold text-indigo-600">
        <span className="absolute inset-0" aria-hidden="true" />
        here <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  )
}

export default ReadDocs