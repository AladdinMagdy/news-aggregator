import client from '../api/client'
import { newsAPIS } from '../constants'
import { normalizeGuardianApiArticles } from '../utils/normalizeArticles'


const apiKey = process.env.REACT_APP_GUARDIAN_API_KEY

const { GUARDIANS } = newsAPIS

export default class Guardians {
  constructor({ query, category, date }) {
    this.config = {
      ...(query ? { q: query } : {}),
      ...(category ? { section: category } : {}),
      ...(date ? { 'date-from': date } : {}),
      'show-fields': 'all',
      'show-elements': 'all',
      'show-references': 'author',
      'api-key': apiKey
    }
    this.hasDynamicCategories = true
  }
  getArticles = async () => {
    const articles = await client(GUARDIANS, ('search?' + new URLSearchParams({ ...this.config })))
    const { results = [] } = articles?.response
    return normalizeGuardianApiArticles(results)
    // probably will need to normalize the response here by passing it to a function
  }
  getCategories = async () => {
    const categoriesData = await client(GUARDIANS, ('sections?' + new URLSearchParams({ 'api-key': this.config['api-key'] })))
    const { results = [] } = categoriesData?.response
    return results
  }

  // maybe but no time
  getAuthors = async () => {

  }
}