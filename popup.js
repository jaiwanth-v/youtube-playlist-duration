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

let max = document.getElementById("end");

const getMaxValueForRequest = () => {
  let start = document.getElementById("start");
  var maxEnd = max.value;
  start.setAttribute("max", maxEnd);
};

max.addEventListener("change", function (event) {
  getMaxValueForRequest();
});
