import client from '../api/client'
import { newsAPIS } from '../constants'

const apiKey = process.env.REACT_APP_GUARDIAN_API_KEY

const { GUARDIANS } = newsAPIS

export default class Guardians {
  constructor({ query, category, date }) {
    this.config = {
      ...(query ? { q: query } : {}),
      ...(category ? { section: category } : {}),
      ...(date ? { 'date-from': date } : {}),
      'api-key': apiKey
    }
  }
  getArticles = async () => {
    const articles = await client(GUARDIANS, ('todos/1?' + new URLSearchParams({ ...this.config })))
    return articles
    // probably will need to normalize the response here by passing it to a function
  }
  getCategories = async () => {
    const categoriesData = await client(GUARDIANS, ('todos/1?' + new URLSearchParams({ 'api-key': this.config['api-key'] })))
    return categoriesData
  }
  getAuthors = async () => {

  }
}