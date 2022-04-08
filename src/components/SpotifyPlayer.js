import { useEffect, useState } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";

export default function SpotifyPLayer({ accessToken, trackUri }){
  const [play, setPlay] = useState(false)

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if(!accessToken){
    return null;
  }

  return(
    <>
    <SpotifyWebPlayer
      toke={accessToken}
      callback={state => !state.isPlaying && setPlay(false)}
      play={play}
      uris={trackUri ? trackUri : []}
      />
      </>
  )
}