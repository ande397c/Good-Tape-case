export const dadJokeService = async (term: string) => {
  // if (!term) return

  const DAD_JOKE_API_URL = `https://icanhazdadjoke.com/search?term=${term}`

  try {
    const response = await fetch(DAD_JOKE_API_URL, {
      headers: { Accept: 'application/json' }
    })
    const reponse = await response.json()
    return reponse
  } catch (error) {
    console.log(`Error occurred when fetching story data:`, error)
  }
}
