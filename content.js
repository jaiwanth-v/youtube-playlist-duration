var initial, final, arr;
chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  if (req.todo === "changeValues") {
    initial = req.values.initial - 1;
    final = req.values.final - 1;
  }
});

const addTimes = (startTime, endTime) => {
  let times = [0, 0, 0];
  let max = times.length;

  let a = (startTime || "").split(":");
  if (a.length == 2) a.unshift(0);
  let b = (endTime || "").split(":");
  if (b.length == 2) b.unshift(0);

  for (let i = 0; i < max; i++) {
    a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
    b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i]);
    times[i] = a[i] + b[i];
  }

  let [hours, minutes, seconds] = times;

  if (seconds >= 60) {
    let m = (seconds / 60) << 0;
    minutes += m;
    seconds -= 60 * m;
  }

  if (minutes >= 60) {
    let h = (minutes / 60) << 0;
    hours += h;
    minutes -= 60 * h;
  }

  return (
    hours + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2)
  );
};

let prevTotal = null,
  flag = 0;

const isMobile = window.location.href.includes("m.youtube");

var timer = setInterval(() => {
  if (!window.location.href.includes("playlist")) return;
  var initialarr = Array.from(
    document.querySelectorAll(
      `yt${isMobile ? "m" : "d"}-playlist-video-list-renderer yt${
        isMobile ? "m" : "d"
      }-thumbnail-overlay-time-status-renderer > span`
    )
  );
  if (
    (initial && final) ||
    (initial === 0 && final) ||
    (initial === 0 && final === 0)
  )
    arr = initialarr.slice(initial, final + 1);
  else arr = initialarr;
  if (arr.length > 0) {
    let newTotal;
    if (!prevTotal) {
      prevTotal = arr.reduce((sum, v) => addTimes(sum, v.innerText), 0);
      flag = 1;
    }
    if (flag === 1) flag++;
    else {
      newTotal = arr.reduce((sum, v) => addTimes(sum, v.innerText), 0);
      if (newTotal === prevTotal) {
        if (!document.getElementById("playlist-duration")) {
          let playlistDuration = document.createElement("h3");
          playlistDuration.setAttribute("id", "playlist-duration");

          var t = prevTotal.split(":");

          playlistDuration.textContent = `Playlist Duration (${
            initial ? initial + 1 : 1
          }-${final ? final + 1 : arr.length}) : ${t[0]}h ${t[1]}m ${t[2]}s`;

          document
            .querySelector(isMobile ? "div.playlist-header-stats" : "#stats")
            .appendChild(playlistDuration);
        } else {
          t = newTotal.split(":");
          document.getElementById(
            "playlist-duration"
          ).textContent = `Playlist Duration (${
            initial < initialarr.length ? initial + 1 : 1
          }-${final < initialarr.length ? final + 1 : initialarr.length}) : ${
            t[0]
          }h ${t[1]}m ${t[2]}s`;
        }
      } else prevTotal = newTotal;
    }
  } else {
    return;
  }
}, 100);
