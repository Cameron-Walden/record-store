import React, { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import SpotifyPlayer from "./SpotifyPlayer"
import SearchResults from "./SearchResults"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
})

export default function Dashboard({ code }){
  const accessToken = useAuth(code)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState('')

  const chooseTrack = track => {
    setPlayingTrack(track)
    setSearch('')
    setLyrics('')
  }

  useEffect(() => {
    if (!playingTrack) return;
    (async () => {
      const {
        data: { lyrics },
      } = await axios.get(`${process.env.REACT_APP_BASE_URL}/lyrics`, {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      setLyrics(lyrics)
    })()
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return;

    let cancel = false;
    (async () => {
      const { body } = await spotifyApi.searchTracks(search)
      if (cancel) return
      setSearchResults(
        body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })()

    return () => (cancel = true)
  }, [search, accessToken])

  return (
    <div className="dashboardContainer">
      <input
        type="search"
        placeholder="Search for a song or artist"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="resultsContainer">
        {searchResults.map(track => (
          <SearchResults
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="lyricsConatiner">{lyrics}</div>
        )}
      </div>
      <div className="spotifyPlayerContainer">
        <SpotifyPlayer accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  )
}
