export default async function client(authURL, endpoint, data) {
  console.log("🚀 ~ file: client.js:2 ~ client ~ authURL, endpoint, data:", authURL, endpoint, data)
  const config = {}
  if (data) {
    config.headers = { ...data }
  }

  return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}