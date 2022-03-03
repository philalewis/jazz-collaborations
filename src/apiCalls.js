export const getArtistNames = async () => {
  const response = await fetch('http://localhost:3000/api/v1/musicians')

  try {
    const artists = await response.json()
    return artists
  } catch(error) {
    throw `${error.status} ${error.statusText}`
  }
}

export const getSingleArtist = async (id) => {
  const response = await fetch(`http://localhost:3000/api/v1/musicians/${id}`)

  try {
    const data = await response.json()
    return data
  } catch(error) {
    throw `${error.status} ${error.statusText}`
  }
}

export const getAlbum = async (id) => {
  const response = await fetch(`http://localhost:3000/api/v1/album/${id}`)

  try {
    const data = await response.json()
    return data
  } catch(error) {
    throw `${error.status} ${error.statusText}`
  }
}