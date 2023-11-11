import React, { useEffect, useCallback, useRef } from 'react'
import debounce from '../utils/debounce'

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

  // the useAsync hook is a custom hook made for managing async requests
  const { isLoading, run } = useAsync()

  const reset = useCallback(() => {
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

  // throttling the search input field to reduce the numbers api calls being done
  const throttled = useRef(
    debounce((sourceApiClient) =>
      run(sourceApiClient.getCategories()).then(setAllAvailableCategories).catch(console.log), 500)
  )

  const sourceRef = useRef('');

  // if any of these dependencies change then fetch the categories (I wanted to add this extra feature because providers
  // like the Guardians has dynamic categories with every keyword search)
  useEffect(() => {
    // make an instance of the factory pattern that returns the api to make a call to the source to fetch the categories
    const sourceApiClient = SourceApiClientFactory(source, {})
    // this check here is to exit early and not fetch categories from providers that doesn't have an endpoint for fetching categories
    if (sourceApiClient && !sourceApiClient.hasDynamicCategories) {
      // if the source hasn't changed no need to refetch twice
      if (source === sourceRef.current) return;
      sourceRef.current = source
      const categories = sourceApiClient.getCategories();
      return setAllAvailableCategories(categories);
    }
    if (!query.trim()) {
      return setAllAvailableCategories([])

    } else if (query.endsWith(' ')) {
      // don't send request if user only adds a space
      return;
    }
    if (sourceApiClient) {
      throttled.current(sourceApiClient)
    }
  }, [query, source, run])

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
