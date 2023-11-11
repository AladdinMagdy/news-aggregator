import React from 'react'
import { newsAPIsNames } from '../../constants'
import { useSearchDialog } from '../../contexts/search-dialog'

import SearchInput from './SearchInput'
import Dropdown from './Dropdown'
import DateInput from './DateInput'
import FormActions from './FormActions'

const SearchForm = ({ onFormSubmit }) => {
  const { query, source, date, category, allAvailableCategories, changeSearchQuery, changeSearchDate,
    changeSearchCategory, changeSearchSource, reset } = useSearchDialog()

  return (
    <div className="mx-auto my-10 w-4/5 max-w-screen-md">

      <div className="flex flex-col">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
          <form className="" onSubmit={(e) => {
            e.preventDefault()
            onFormSubmit({ query, source, date, category })
          }}>
            <SearchInput onChangeHandler={changeSearchQuery} query={query} />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Dropdown label='Source' onChangeHandler={changeSearchSource} >
                <option value={newsAPIsNames.NEWS_API}>News Api</option>
                <option value={newsAPIsNames.GUARDIANS}>Guardians</option>
                <option value={newsAPIsNames.NEW_YORK_TIMES}>New York Times</option>
              </Dropdown>

              <DateInput onChangeHandler={changeSearchDate} />

              <Dropdown label='Category' onChangeHandler={changeSearchCategory} disabled={!allAvailableCategories?.length}>
                {!allAvailableCategories?.length ? (
                  <option>Please type in search..</option>
                ) : (
                  <>
                    <option value={''}>All</option>
                    {allAvailableCategories.map(cat => (
                      <option key={cat.id} value={cat.webTitle}>{cat.webTitle}</option>
                    ))}
                  </>
                )}
              </Dropdown>
            </div>

            <FormActions resetAction={reset} />

          </form>
        </div>
      </div>

    </div>
  )
}

export default SearchForm