require 'sinatra'
require "sinatra/cors"

set :allow_origin, "http://localhost:5000"

get '/' do
  command = [
    "youtube-dl",
    params[:url],
    "-x",
    "-o '~/Desktop/music/%(title)s.%(ext)s'",
    "--audio-format mp3",
    "--audio-quality 320k"
  ].join(" ")

  puts command

  `#{command}`

  200
end
