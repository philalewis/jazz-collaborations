export const getAlbumIdFromURL = (url) => {
  return url.pathname.split('/')[2]
}

export const sortAlbums = albums => {
  return albums.sort((a, b) => a.releaseYear - b.releaseYear)
}

export const findCollaborations = (setOne, setTwo) => {
  const collabs = []
  const setTwoIds = setTwo.map(album => album.id)

  setOne.forEach(album => {
    return setTwoIds.includes(album.id) ? collabs.push(album) : null
  })

  return collabs
}