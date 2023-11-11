import client from '../api/client'
import { newsAPIS } from '../constants'
import { normalizeNewsApiArticles } from '../utils/normalizeArticles'

const apiKey = process.env.REACT_APP_NEWS_API_KEY

const { NEWS_API } = newsAPIS

export default class NewsAPI {
  constructor({ query, category, date }) {
    this.config = {
      ...(query ? { q: query } : {}),
      ...(category ? { category } : {}),
      ...(date ? { 'from': date } : {}),
      apiKey
    }
    this.categories = [
      { id: 1, webTitle: 'business' },
      { id: 2, webTitle: 'entertainment' },
      { id: 3, webTitle: 'general' },
      { id: 4, webTitle: 'health' },
      { id: 5, webTitle: 'science' },
      { id: 6, webTitle: 'sports' },
      { id: 7, webTitle: 'technology' }
    ]
    this.hasDynamicCategories = false
  }

  getArticles = async () => {
    const response = await client(NEWS_API, ('top-headlines?' + new URLSearchParams({ ...this.config })))
    const { articles = [] } = response
    return normalizeNewsApiArticles(articles)
    // probably will need to normalize the response here by passing it to a function
  }

  getCategories = () => {
    // the newsAPI does not provide an endpoint to fetch the categories as they only have 7 categories unlike the Guardians
    return this.categories
  }

  // maybe but no time
  getAuthors = async () => {

  }
}