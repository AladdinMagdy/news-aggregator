import sanitizeHtml from 'sanitize-html';
import { nyTimesPrefixURL } from '../constants';

export function normalizeNewsApiArticles(articles) {
  return articles.map((article) => (
    {
      "id": article.url,
      "source": article.source?.name,
      "author": article.author,
      "title": article.title,
      "description": article.description,
      "url": article.url,
      "thumbnail": article.urlToImage,
      "publishedAt": article.publishedAt,
      "content": article.content,
      // "category": article.sectionName
    }
  ))
}
export function normalizeNewYorkTimesApiArticles(articles) {
  return articles.map((article) => {
    const image = article.multimedia.filter(image => image.subType === 'thumbLarge')[0]
    return {
      "id": article._id,
      "source": article.source,
      "author": article.byline?.original,
      "title": article.headline?.main,
      "description": article.snippet,
      "url": article.web_url,
      "thumbnail": image ? `${nyTimesPrefixURL}${image.url}` : '',
      "publishedAt": article.pub_date,
      "content": article.abstract,
      "category": article.section_name
    }
  })
}
export function normalizeGuardianApiArticles(articles) {
  return articles.map((article) => {
    const sanitizedArticleBody = sanitizeHtml(article.fields?.trailText, {
      allowedTags: [],
      allowedAttributes: {}
    })

    return {
      "id": article.id,
      "source": article.fields?.publication,
      "author": article.fields?.byline,
      "title": article.webTitle,
      "description": sanitizedArticleBody,
      "url": article.webUrl,
      "thumbnail": article.fields?.thumbnail,
      "publishedAt": article.webPublicationDate,
      "content": article.content,
      "category": article.sectionName
    }
  }
  )
}