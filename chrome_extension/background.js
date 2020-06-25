
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

const sendRequest = u => {
  const url = new URL(u)
  const params = new URLSearchParams(url.search);
  console.log(params.get("v"))
}
