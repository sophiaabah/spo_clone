async function getUsersAlbums() {
  const session_token = localStorage.getItem("session_token");

  let usersAlbums = await fetch(`https://api.spotify.com/v1/me/albums`, {
    headers: {
      Authorization: `Bearer ${session_token}`,
      "Content-Type": "application/json",
    },
  });

  let parsedUsersAlbums = await usersAlbums.json();
  if (parsedUsersAlbums.error) {
    throw Error("User authentication for Spotify failed");
  }
  console.log("albums", parsedUsersAlbums.items.slice(0, 6));
  setAlbums(parsedUsersAlbums.items.slice(0, 6));
}
