window.onload = function () {
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
  };
};

document.getElementById("end").addEventListener("change", () => {
  document
    .getElementById("start")
    .setAttribute("max", document.getElementById("end").value);
});
