# dj-dl

[youtube-dl](https://github.com/ytdl-org/youtube-dl) is a command line tool for downloading youtube videos

This project lets a user browse youtube and downlod videos to mp3 via a right-click menu option (known as a chrome extension `context menu`)

This project is comprised of:
- a sinatra webserver endpoint that uses `youtube-dl`
- a chrome extension that sends requests to the sinatra endpoint 

