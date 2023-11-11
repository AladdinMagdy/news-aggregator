import client from '../api/client'
import { newsAPIS } from '../constants'
import { normalizeNewYorkTimesApiArticles } from '../utils/normalizeArticles'

const apiKey = process.env.REACT_APP_NEW_YORK_TIMES_KEY

const { NEW_YORK_TIMES } = newsAPIS

export default class NewYorkTimes {
  constructor({ query, category, date }) {
    // fq=news_desk:("Sports", "Foreign") AND pub_date:("NEW YORK CITY")
    this.config = {
      ...(query ? { q: query } : {}),
      ...(category && date ? { fq: `news_desk:("${category}") AND pub_date:("${date}")` } : {}),
      ...(category && !date ? { fq: `news_desk:("${category}")` } : {}),
      ...(!category && date ? { fq: `pub_date:("${date}"))` } : {}),
      "api-key": apiKey
    }


    this.categories = [
      { id: 1, webTitle: 'Arts' },
      { id: 2, webTitle: 'Business' },
      { id: 3, webTitle: 'Education' },
      { id: 4, webTitle: 'Health' },
      { id: 5, webTitle: 'Science' },
      { id: 6, webTitle: 'Sports' },
      { id: 7, webTitle: 'Technology' },
      { id: 8, webTitle: 'Fashion' },
      { id: 9, webTitle: 'Style' },
      { id: 10, webTitle: 'Politics' },
      { id: 11, webTitle: 'Media' },
      { id: 12, webTitle: 'Food' },
      { id: 13, webTitle: 'Travel' },
      { id: 14, webTitle: 'Television' },
      { id: 15, webTitle: 'Weather' },
      { id: 16, webTitle: 'Wealth' },
    ]
    this.hasDynamicCategories = false
  }

  getArticles = async () => {
    const response = await client(NEW_YORK_TIMES, ('articlesearch.json?' + new URLSearchParams({ ...this.config })))
    const { docs = [] } = response?.response
    return normalizeNewYorkTimesApiArticles(docs)
    // probably will need to normalize the response here by passing it to a function
  }

  getCategories = () => {
    // the NewYorkTimes does not provide an endpoint to fetch the categories as they only have 16 categories unlike the Guardians
    return this.categories
  }

  // maybe but no time
  getAuthors = async () => {

  }
}