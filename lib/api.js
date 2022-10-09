import axios from "axios";
import shuffle from "lodash.shuffle";
import Router from "next/router";

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

export async function getArtistsAlbums(id) {
  const { data } = await Api().get(`artists/${id}/albums`);

  return data;
}

export async function getArtistsTopTracks(id) {
  const { data } = await Api().get(`artists/${id}/top-tracks`);

  return data;
}
