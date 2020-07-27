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

if (
  window.location.hostname.includes("youtube") &&
  window.location.pathname.includes("playlist")
)
  console.log(
    Array.from(
      document.querySelectorAll(
        "#contents > ytd-playlist-video-list-renderer #overlays > ytd-thumbnail-overlay-time-status-renderer > span"
      )
    ).reduce((sum, v) => addTimes(sum, v.innerText), 0)
  );
