export const getArtistNames = async () => {
  const response = await fetch('http://localhost:3000/api/v1/musicians')
  try {
    const artists = await response.json()
    return artists
  } catch(error) {
    throw `${error.status} ${error.statusText}`
  }
}