import axios from "axios";
import shuffle from "lodash.shuffle";

// console.log("when am i executed?");
const Api = () => {
  const token = localStorage.getItem("token");

  const instance = axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
  );

  const responseHandler = (response) => {
    console.log("working");
    return response;
  };

  const errorHandler = (error) => {
    // consider what to do here
    console.error("something went wrong", error);
    // Router.push({
    //   pathname: "/",
    //   // query: { pid: linkInput, inputPlatform: platform },
    // });

    return Promise.reject(error);
  };
  return instance;
};

export async function getPlaylists() {
  const { data } = await Api().get(`me/playlists`);

  return data.items;
}

export async function getTopTracks() {
  const { data } = await Api().get(`me/top/tracks`);

  return data.items;
}

export async function getRelatedArtists(likedArtistId) {
  const { data } = await Api().get(`artists/${likedArtistId}/related-artists`);

  return data;
}

export async function getLikedAlbums() {
  const { data } = await Api().get(`me/albums`);

  return shuffle(data.items);
}

export async function getCategories() {
  const { data } = await Api().get(`browse/categories`);

  console.log("category", shuffle(data.categories.items)[0].name);
  const categoryId = shuffle(data.categories.items)[0].name;
  const response = await Api().get(
    `browse/categories/${categoryId.toLowerCase()}/playlists`
  );
  console.log("category playlist", response.data);

  return response.data;
}

export async function getAlbumInfo(id) {
  const { data } = await Api().get(`albums/${id}`);
  return data;
}

export async function getPlaylistInfo(id) {
  const { data } = await Api().get(`playlists/${id}`);

  return data;
}

export async function getArtist(id) {
  const { data } = await Api().get(`artists/${id}`);

  return data;
}

export async function getArtistsTopTracks(id) {
  const { data } = await Api().get(`artists/${id}/top-tracks?market=DE`);

  return data;
}

export async function getArtistsAlbums(id) {
  const { data } = await Api().get(`artists/${id}/albums`);

  return data;
}

export async function playNewContext(uri) {
  const { data } = await Api().put(`me/player/play`, { context_uri: uri });
  // from spotify {"uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr"}, the key needs to be named context_uri here
  return data;
}

export async function changeRepeatMode(currentMode, deviceId) {
  if (!deviceId) return;
  let response;
  switch (currentMode) {
    case 0:
      response = await Api().put(`me/player/repeat?state=context&${deviceId}`);
      break;
    case 1:
      response = await Api().put(`me/player/repeat?state=track&${deviceId}`);
      break;
    case 2:
      response = await Api().put(`me/player/repeat?state=off&${deviceId}`);
      break;
  }
  return response?.data;
}

export async function handlePlay(mode) {
  const { data } = await Api().put(`me/player/${mode}`);

  return data;
}

export async function newPlaylist() {
  const {
    data: { id },
  } = await Api().get(`me`);
  const { data } = await Api().post(`users/${id}/playlists`, {
    name: "New playlist",
  });
  return data;
}

export async function toggleShuffle(state) {
  const { data } = await Api().put(`me/player/shuffle?state=${state}`);

  return data;
}

export async function getUsersQueue() {
  const { data } = await Api().get(`me/player/queue`);

  return data;
}

export async function getLikedSongs() {
  const { data } = await Api().get(`me/tracks`);

  return data;
}
