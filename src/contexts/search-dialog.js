import React, { useEffect, useCallback } from 'react'
import debounceFn from 'debounce-fn'
import pDebounce from 'p-debounce';

import { newsAPIsNames } from '../constants'
import { useAsync } from '../hooks/use-async'
import SourceApiClientFactory from '../services'

const SearchDialogContext = React.createContext()
SearchDialogContext.displayName = 'SearchDialogContext'

function SearchDialogProvider({ children }) {
  const [query, setQuery] = React.useState('')
  const [date, setDate] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [source, setSource] = React.useState(newsAPIsNames.GUARDIANS)

  const [allAvailableCategories, setAllAvailableCategories] = React.useState('')

  const { isLoading, run } = useAsync()

  const reset = useCallback((value) => {
    setQuery('')
    setDate('')
    setCategory('')
    setSource(newsAPIsNames.GUARDIANS)
  }, [])

  const changeSearchQuery = useCallback((value) => setQuery(value), [setQuery])
  const changeSearchDate = useCallback((value) => setDate(value), [setDate])
  const changeSearchCategory = useCallback((value) => setCategory(value), [setCategory])
  const changeSearchSource = useCallback((value) => setSource(value), [setSource])

  const value = React.useMemo(() => ({
    query,
    date,
    category,
    source,
    reset,
    allAvailableCategories,
    changeSearchQuery,
    changeSearchDate,
    changeSearchCategory,
    changeSearchSource
  }), [query, date, category, source, reset, allAvailableCategories, changeSearchQuery, changeSearchDate, changeSearchCategory, changeSearchSource])


  // if any of these dependencies change then fetch the categories (that's how most of the mentioned apis work, you can't fetch all the categories at once. You must provide some keyword)
  useEffect(() => {
    // make an instance of the factory pattern that returns the api to make a call to the source to fetch the categories
    if (!query.trim()) {
      return setAllAvailableCategories([])
    } else if (query.endsWith(' ')) {
      // don't send request if user only adds a space
      return
    }
    const sourceApiClient = SourceApiClientFactory(source, {})
    if (sourceApiClient) {
      const debouncedFn = pDebounce(sourceApiClient.getCategories, 1000);
      run(debouncedFn()).then(data => setAllAvailableCategories([data])).catch(console.log)
    }
  }, [query, date, source, run])

  return (
    <SearchDialogContext.Provider value={value}>
      {children}
    </SearchDialogContext.Provider>
  )
}

function useSearchDialog() {
  const context = React.useContext(SearchDialogContext)
  if (context === undefined) {
    throw new Error('useSearchDialog must be used within a <SearchDialogProvider />')
  }
  return context
}


export { SearchDialogProvider, useSearchDialog }
