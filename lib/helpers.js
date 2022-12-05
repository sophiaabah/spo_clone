import { useRouter } from "next/router";

export function timeToString(time) {
  let diffInMin = time / 60000;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);
  let formattedSS = ss.toString().padStart(2, "0");
  return `${mm}:${formattedSS}`;
}

// export function HandleRouting(object, objectId) {
//   const router = useRouter();

//   console.log("object id", objectId);
//   router.push({
//     pathname: `/${object}`,
//     query: { id: objectId },
//   });
// }

export function renderArtists(arrOfArtists) {
  let artistsPerTrack = arrOfArtists.map((artist) => artist.name);
  return artistsPerTrack.join(", ");
}
