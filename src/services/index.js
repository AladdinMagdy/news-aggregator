import GuardiansApiClient from './Guardians'
import NewsApiClient from './NewsAPI'
import NewYorkTimesApiClient from './NewYorkTimes'
import { newsAPIsNames } from '../constants'

/* In web applications that consume multiple external APIs or require
  different authentication methods, the Factory Pattern can be
  employed to create API clients with varying configurations and
  implementations. */
export default function SourceApiClientFactory(source, config) {
  switch (source) {
    case newsAPIsNames.GUARDIANS:
      return new GuardiansApiClient(config);
    case newsAPIsNames.NEWS_API:
      return new NewsApiClient(config)
    case newsAPIsNames.NEW_YORK_TIMES:
      return new NewYorkTimesApiClient(config)
    default:
      throw new Error('Invalid API type specified');
  }
}