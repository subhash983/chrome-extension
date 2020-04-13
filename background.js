var customHeaders;
chrome.storage.sync.set({
  customHeaders: [],
});

chrome.storage.sync.get("customHeaders", function (result) {
  customHeaders = result.customHeaders;
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (var key in changes) {
    if (key === "customHeaders") {
      customHeaders = changes[key].newValue;
    }
  }
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: "#3aa757" }, function () {
    console.log("The color is green.");
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [new chrome.declarativeContent.PageStateMatcher({})],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    var requestHeaders = details.requestHeaders;
    requestHeaders = requestHeaders.concat(customHeaders);
    return { requestHeaders: requestHeaders };
  },
  { urls: ["*://*/*"] },
  ["blocking", "requestHeaders"]
);

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if(details.url.indexOf('developer.chrome.com/extensions/webRequest')!==-1){
      details.url = 'https://developer.chrome.com/home';
    }
    return { redirectUrl: details.url };
  },
  { urls: ["*://*/*"] },
  ["blocking"]
);
