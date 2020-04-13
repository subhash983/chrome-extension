let saveHeaders = document.getElementById("saveHeaders");

saveHeaders.onclick = function (element) {
  var header1 = document.getElementById("header1").value;
  var header2 = document.getElementById("header2").value;
  var value1 = document.getElementById("value1").value;
  var value2 = document.getElementById("value2").value;
  chrome.storage.sync.set({
    customHeaders: [
      {
        name: header1,
        value: value1,
      },
      {
        name: header2,
        value: value2,
      },
    ],
  });
  console.log("Headers Saved");
};
