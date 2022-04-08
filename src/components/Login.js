import React from "react"
// import LoginButton from '../src/LoginButton';
// import LoginLink from '../src/LoginLink';

export default function Login(){
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

  return (
    // <LoginButton>
    //   <LoginLink href={AUTH_URL}>Login</LoginLink>
    // </LoginButton>
    <button><a href ={AUTH_URL}>Login</a></button>
  )
}