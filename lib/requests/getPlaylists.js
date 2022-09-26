async function getUserPlaylists() {
  const session_token = localStorage.getItem("session_token");

  let userPlaylists = await fetch(`https://api.spotify.com/v1/me/playlists`, {
    headers: {
      Authorization: `Bearer ${session_token}`,
      "Content-Type": "application/json",
    },
  });
  let parsedUserPlaylists = await userPlaylists.json();
  if (parsedUserPlaylists.error) {
    throw Error("User authentication for Spotify failed");
  }

  // console.log("User playlists", parsedUserPlaylists);
  setPlaylists(parsedUserPlaylists.items);
}
