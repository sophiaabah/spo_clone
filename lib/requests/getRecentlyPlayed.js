async function getRecentlyPlayed() {
  const session_token = localStorage.getItem("session_token");

  let recentlyPlayed = await fetch(`https://api.spotify.com/v1/me/top/tracks`, {
    headers: {
      Authorization: `Bearer ${session_token}`,
      "Content-Type": "application/json",
    },
  });
  let parsedRecentlyPlayed = await recentlyPlayed.json();
  if (parsedRecentlyPlayed.error) {
    throw Error("User authentication for Spotify failed");
  }
  // console.log("recently played songs", parsedRecentlyPlayed);
  // console.log(
  //   "liked artist",
  //   parsedRecentlyPlayed.items[1].album.artists[0].id
  // );

  localStorage.setItem(
    "liked_artist",
    parsedRecentlyPlayed.items[1].album.artists[0].id
  );

  setRecentlyPlayedTracks(parsedRecentlyPlayed.items);
}
