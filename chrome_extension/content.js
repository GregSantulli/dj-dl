const localhost = "http://localhost:4567"

let link; 

$(document).arrive(".react-contextmenu-wrapper button", function() {
  // 'this' refers to the newly created element

  $(this).click(() => {
    link = $('.react-contextmenu--visible textarea').text()

    let elm = $(".ytdl")[0]
    if (!elm) {
      elm = $("<div></div>")
      elm.text("Search and Download")
      elm.addClass("react-contextmenu-item ytdl")
      $('.react-contextmenu--visible').append(elm)
      console.log("Sss")
      elm.click(async () => {
        const resp = await fetch(`${localhost}/?url=${link}`)
        const json = await resp.json()
        console.log(json)
      })
    }

  })
});
