import React from 'react'
import NoPreview from '../assets/no-preview.png'

const ArticleCard = ({ article }) => {

  return (
    <article key={article.id} className="flex max-w-xl flex-col items-start justify-start">
      <div className='my-8 w-full'>
        <img src={article.thumbnail || NoPreview} className='rounded-3xl w-full' alt="" srcSet="" />
      </div>
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={article.publishedAt} className="text-gray-500">
          {article.publishedAt}
        </time>
        <a
          href={article.url}
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          {article.category}
        </a>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href={article.url}>
            <span className="absolute inset-0" />
            {article.title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{article.description}</p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img src={article.author?.imageUrl} alt="" className="h-10 w-10 rounded-full bg-blue-100" />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a href={article.author}>
              <span className="absolute inset-0" />
              {article.author}
            </a>
          </p>
          <p className="text-gray-600">{article.source}</p>
        </div>
      </div>
    </article>
  )
}

export default ArticleCard