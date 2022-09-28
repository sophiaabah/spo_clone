import axios from "axios";
// console.log("when am i executed?");
const Api = () => {
  let token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export async function getPlaylists() {
  let { data } = await Api().get(`me/playlists`);

  console.log("playlists", data.items);
  return data.items;
}

export async function getTopTracks() {
  let { data } = await Api().get(`me/top/tracks`);

  console.log("recently played songs", data.items);
  return data.items;
}

export async function getRelatedArtists(likedArtistId) {
  let { data } = await Api().get(`artists/${likedArtistId}/related-artists`);

  console.log("related artists", data);
  return data;
}

export async function getUsersAlbums() {
  let { data } = await Api().get(`me/albums`);

  console.log("my albums", data.items);
  return data.items;
}
