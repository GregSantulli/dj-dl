
const videoUrlPattern = "https://www.youtube.com/watch?v=*"

chrome.contextMenus.create({
  title: "Download MP3",
  contexts: ["page"],
  documentUrlPatterns: [videoUrlPattern],
  type:"normal",
  onclick: info => sendRequest(info.pageUrl)
});


chrome.contextMenus.create({
  title: "Download MP3",
  contexts: ["link"],
  targetUrlPatterns: [videoUrlPattern],
  type:"normal",
  onclick: info => sendRequest(info.linkUrl)
});

chrome.contextMenus.create({
  title: "Download MP3",
  contexts: ["selection"],
  targetUrlPatterns: ["https://open.spotify.com/*"],
  type:"normal",
  onclick: info => console.log(info)
});

const sendRequest = u => {
  const url = new URL(u)
  const params = new URLSearchParams(url.search);
  console.log(params.get("v"))
  fetch(`http://localhost:4567/?url=https://www.youtube.com/watch?v=${params.get("v")}`)
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == 'complete' && tab.active) {
    if(tab.url.startsWith("https://open.spotify.com/")) {
      chrome.tabs.executeScript(tabId, { file: 'inject.js' })
    }
  }
})

