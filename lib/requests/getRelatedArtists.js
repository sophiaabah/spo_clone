async function getRelatedArtists() {
  const session_token = localStorage.getItem("session_token");
  const likedArtistId = localStorage.getItem("liked_artist");
  console.log(likedArtistId);

  let relatedArtists = await fetch(
    `https://api.spotify.com/v1/artists/${likedArtistId}/related-artists`,
    {
      headers: {
        Authorization: `Bearer ${session_token}`,
        "Content-Type": "application/json",
      },
    }
  );
  let parsedRelatedArtists = await relatedArtists.json();
  if (parsedRelatedArtists.error) {
    throw Error("User authentication for Spotify failed");
  }
  console.log("related artists", parsedRelatedArtists.artists.slice(0, 6));
  setRelatedArtists(parsedRelatedArtists.artists.slice(0, 6));
}
