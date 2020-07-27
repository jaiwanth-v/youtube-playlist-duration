if (document.readyState !== "complete") {
  window.addEventListener("load", afterWindowLoaded);
} else {
  afterWindowLoaded();
}

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

var prevTotal = null,
  flag = 0;
let isAppended = false;

function afterWindowLoaded() {
  var timer = setInterval(() => {
    var arr = Array.from(
      document.querySelectorAll(
        "#contents > ytd-playlist-video-list-renderer #overlays > ytd-thumbnail-overlay-time-status-renderer > span"
      )
    );
    if (arr.length > 0) {
      var newTotal;
      if (!prevTotal) {
        prevTotal = arr.reduce((sum, v) => addTimes(sum, v.innerText), 0);
        flag = 1;
      }

      if (flag === 1) flag++;
      else {
        newTotal = arr.reduce((sum, v) => addTimes(sum, v.innerText), 0);
        if (newTotal === prevTotal) {
          if (!isAppended) {
            var playlistDuration = document.createElement("h6");
            playlistDuration.setAttribute("id", "playlistDuration");
            playlistDuration.textContent = `Playlist Duration (1-${arr.length}) : ${prevTotal}`;
            document.querySelector("#title").appendChild(playlistDuration);
            isAppended = true;
          } else {
            document.getElementById(
              "playlistDuration"
            ).textContent = `Playlist Duration (1-${arr.length}) : ${prevTotal}`;
          }
        } else prevTotal = newTotal;
      }
    } else {
      return;
    }
  }, 1000);
}
