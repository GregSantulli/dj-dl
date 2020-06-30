require 'sinatra'
require "sinatra/cors"
require 'json'
require 'nokogiri'
require 'open-uri'
require 'rspotify'
require 'yaml'
require 'byebug'
require 'pry'
require 'watir'

creds = YAML.load_file('backend/secrets.yml')
RSpotify.authenticate(
  creds["CLIENT_ID"],
  creds["CLIENT_SECRET"]
)

set :allow_origin, "chrome-extension://plbgichlmbklkcgikffefahffahefkpn"
set :allow_origin, "https://open.spotify.com"

YOUTUBE = "https://www.youtube.com"
get '/' do

  id = params[:url].split("/").last
  track = RSpotify::Track.find(id)
  name = track.name
  artists = track.artists.map(&:name).join(", ")

  query = "#{artists} #{name} audio"
  params = URI.encode_www_form({
    search_query: query,
    sp: "EgIQAQ%253D%253D" # videos only param
  })

  url = "#{YOUTUBE}/results?#{params}"

  puts "Searching for #{query}"
  browser = Watir::Browser.new :chrome, headless: true
  browser.goto url
  doc = Nokogiri::HTML(browser.html)

  video_endpoint = doc.css('a#video-title')
    .first.attributes["href"].value

  title = "#{artists} - #{name}".gsub("/", "-")
  command = [
    "youtube-dl",
    "#{YOUTUBE}#{video_endpoint}",
    "-x",
    "-o '~/Music/youtube-dl/#{title}.%(ext)s'",
    "--audio-format mp3",
    "--audio-quality 320k"
  ].join(" ")
  puts "running:"
  puts command

  `#{command}`

  puts "done!"

  { id: id, name: name, artists: artists }.to_json
end


