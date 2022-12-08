import React, { useEffect, useState } from "react";

export function useLoadPlayer() {
  const [player, setPlayer] = useState({});

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

export function usePlayer() {
  const [player, setPlayer] = useState();

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = localStorage.getItem("token");

      const spotifyInstance = new window.Spotify.Player({
        name: "Spotify Clone",
        volume: 0.5,
        getOAuthToken: (cb) => {
          cb(token);
        },
      });

      setPlayer(spotifyInstance);
    };
  }, []);

  useEffect(() => {
    if (!player) return;

    player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
    });

    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    player.addListener("initialization_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("authentication_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("account_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("playback_error", ({ message }) => {
      console.error(message);
    });

    player.connect();

    return () => {
      player.removeListener("ready");
      player.removeListener("not_ready");
      player.removeListener("initialization_error");
      player.removeListener("authentication_error");
      player.removeListener("account_error");
    };
  }, [player]);

  return player;
}
