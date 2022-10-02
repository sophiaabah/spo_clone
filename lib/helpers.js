export function timeToString(time) {
  let diffInMin = time / 60000;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);
  let formattedSS = ss.toString().padStart(2, "0");
  return `${mm}:${formattedSS}`;
}
