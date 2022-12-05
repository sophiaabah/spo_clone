import dayjs from "dayjs";

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

export function formatDate(date) {
  if (date.includes("1970")) {
    return;
  }
  return dayjs(date.slice(0, 10)).format("MMM D, YYYY");
}
