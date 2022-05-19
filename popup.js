window.onload = function () {
  chrome.tabs.query({ active: true }, (tabs) => {
    const tab = tabs[0];
    const url = new URL(tab.url);
    if (!url.href.includes("playlist")) {
      const content = document.createElement("body");
      content.innerHTML = "<h2>Current page is not a playlist</h2>";
      document.body = content;
    }
  });
  document.getElementById("submit").onclick = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        todo: "changeValues",
        values: {
          initial: Number(document.getElementById("start").value),
          final: Number(document.getElementById("end").value),
        },
      });
    });
    document.querySelector(".updated-text").innerHTML =
      "Playlist duration updated";
  };
};

document.getElementById("end").addEventListener("change", () => {
  document
    .getElementById("start")
    .setAttribute("max", document.getElementById("end").value);
});
