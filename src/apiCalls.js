export const getArtistNames = async () => {
  const response = await fetch('http://localhost:3000/api/v1/musicians')

  try {
    const artists = await response.json()
    return artists
  } catch(error) {
    throw 'Sorry, something went wrong. Please try again later.'
  }
}

export const getSingleArtist = async (id) => {
  const response = await fetch(`http://localhost:3000/api/v1/musicians/${id}`)

  try {
    const data = await response.json()
    return data
  } catch(error) {
    throw 'Sorry, something went wrong. Please try again later.'
  }
}

export const getAlbum = async (id) => {
  const response = await fetch(`http://localhost:3000/api/v1/album/${id}`)

  try {
    const data = await response.json()
    return data
  } catch(error) {
    throw 'Sorry, something went wrong. Please try again later.'
  }
}

export const getAlbumsByName = async (name) => {
  const response = await fetch(`http://localhost:3000/api/v1/appearances/${name}`)

  try {
    const data = await response.json()
    return data
  } catch(error) {
    throw 'Sorry, something went wrong. Please try again later.'
  }
}