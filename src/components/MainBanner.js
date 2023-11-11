import React from 'react'
import ReadDocs from './ReadDocs'

const MainBanner = () => {
  return (
    <div className="mx-auto max-w-2xl pt-20 sm:pt-25 lg:pt-32">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <ReadDocs />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          News Aggregator
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          A news aggregator website that pulls articles from various sources and displays them in a clean,
          easy-to-read format.
        </p>
      </div>
    </div>
  )
}

export default MainBanner