let initial, final;
chrome.runtime.sendMessage({ todo: "showPageAction" });
chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  if (req.todo === "changeValues") {
    initial = req.values.initial - 1;
    final = req.values.final - 1;
  }
});

const addTimes = (startTime, endTime) => {
  var times = [0, 0, 0];
  var max = times.length;

  var a = (startTime || "").split(":");
  if (a.length == 2) a.unshift(0);
  var b = (endTime || "").split(":");
  if (b.length == 2) b.unshift(0);

  for (var i = 0; i < max; i++) {
    a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
    b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i]);
  }

  for (var i = 0; i < max; i++) {
    times[i] = a[i] + b[i];
  }

  var hours = times[0];
  var minutes = times[1];
  var seconds = times[2];

  if (seconds >= 60) {
    var m = (seconds / 60) << 0;
    minutes += m;
    seconds -= 60 * m;
  }

  if (minutes >= 60) {
    var h = (minutes / 60) << 0;
    hours += h;
    minutes -= 60 * h;
  }

  return (
    hours + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2)
  );
};

let prevTotal = null,
  flag = 0,
  isAppended = false;

var timer = setInterval(() => {
  var initialarr = Array.from(
    document.querySelectorAll(
      "#contents > ytd-playlist-video-list-renderer #overlays > ytd-thumbnail-overlay-time-status-renderer > span"
    )
  );
  if (
    (initial && final) ||
    (initial === 0 && final) ||
    (initial === 0 && final === 0)
  )
    var arr = initialarr.slice(initial, final + 1);
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
        if (!isAppended) {
          let playlistDuration = document.createElement("h3");
          playlistDuration.setAttribute("id", "playlistDuration");
          var t = prevTotal.split(":");
          playlistDuration.textContent = `Playlist Duration (${
            initial ? initial + 1 : 1
          }-${final ? final + 1 : arr.length}) : ${t[0]}h ${t[1]}m ${t[2]}s`;
          document.querySelector("#stats").appendChild(playlistDuration);
          isAppended = true;
        } else {
          t = newTotal.split(":");
          document.getElementById(
            "playlistDuration"
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
}, 50);
