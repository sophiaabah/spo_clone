import React, { useEffect, useState } from "react";

export function useLoadPlayer() {
  const [player, setPlayer] = useState([]);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = localStorage.getItem("token");

      const spotifyInstance = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(spotifyInstance);
    };
  }, []);

  return player;
}
