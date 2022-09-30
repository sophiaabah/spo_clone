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

  const errorHandler = (error) => { // consider what to do here
    console.error("something went wrong", error);

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
