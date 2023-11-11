import React, { useEffect } from 'react'

import SearchForm from "../components/SearchForm";
import Header from "../components/Header";
import Logo from "../components/Logo";
import MainBanner from "../components/MainBanner";
import ArticleCard from "../components/ArticleCard";
import Layout from "../components/Layout";

import { useAsync } from '../hooks/use-async'
import SourceApiClientFactory from '../services'
export default function SearchScreen() {
  const { data: articles, error, isLoading, isSuccess, run } = useAsync()
  console.log("🚀 ~ file: search-page.js:14 ~ SearchScreen ~ error:", error)
  const mainView = React.useRef(null)



  const onFormSubmit = ({ source, ...data }) => {
    const sourceApiClient = SourceApiClientFactory(source, data)
    if (sourceApiClient) {
      run(sourceApiClient.getArticles()).catch(console.log)
    }
  }
  useEffect(() => {
    //if it's first call return and don't scroll into view
    if (!articles) return
    mainView.current.scrollIntoView({ behavior: 'smooth' })
  }, [articles])

  return (
    <div className="bg-white">
      <Header />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <Logo />
        <MainBanner />
        <SearchForm onFormSubmit={onFormSubmit} />
        <div ref={mainView}>
          {isLoading ? 'Loading...' : null}
          {error ? <p>Error retrieving data from news API <br />{error.error ? error.error?.message : error.message}</p> : null}
          {articles?.length ? (
            <div className="bg-white py-24 sm:py-32 text-left">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  {articles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            </div>
          ) : isSuccess ? (
            <p>
              Looks like no results for this search
            </p>
          ) : null}
        </div>
        {/* Background */}
        <Layout />
      </div>
    </div>
  )
}
