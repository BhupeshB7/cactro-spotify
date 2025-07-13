import axios from "axios";
import {
  getTopTracks,
  getCurrentlyPlaying,
  stopPlayback,
  startPlayback,
} from "../models/spotify.model.js";
import dotenv from "dotenv";
import qs from "querystring";
dotenv.config();
export const loginSpotify = (req, res) => {
  const scope = [
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-top-read",
    "streaming",
  ].join(" ");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  });

  res.redirect("https://accounts.spotify.com/authorize?" + params.toString());
};

export const spotifyCallback = async (req, res, next) => {
  const code = req.query.code;
  try {
    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    res
      .cookie("access_token", data.access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600 * 1000,
      })
      .cookie("refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 3600 * 1000,
      })
      .redirect("/spotify");
  } catch (err) {
    next(err);
  }
};

export const getDashboard = async (req, res, next) => {
  try {
    const userToken = req.userToken;
    if (!userToken)
      return res.status(401).json({ error: "Access token required" });

    const [topTracks, currentSong] = await Promise.all([
      getTopTracks(userToken),
      getCurrentlyPlaying(userToken),
    ]);

    res.status(200).json({
      topTracks: topTracks.map((t) => ({
        id: t.id,
        name: t.name,
        artist: t.artists[0]?.name,
        uri: t.uri,
        preview_url: t.preview_url,
      })),
      currentSong: currentSong
        ? {
            name: currentSong.item?.name,
            artist: currentSong.item?.artists[0]?.name,
            is_playing: currentSong.is_playing,
          }
        : null,
    });
  } catch (err) {
    next(err);
  }
};

export const stopPlaybackController = async (req, res, next) => {
  try {
    const userToken = req.userToken;
    if (!userToken)
      return res.status(401).json({ error: "Access token required" });

    await stopPlayback(userToken);
    res.status(200).json({ message: "Playback stopped" });
  } catch (err) {
    next(err);
  }
};

export const startPlaybackController = async (req, res, next) => {
  try {
    const userToken = req.userToken;
    const { trackUri } = req.body;

    if (!userToken)
      return res.status(401).json({ error: "Access token required" });
    if (!trackUri)
      return res.status(400).json({ error: "trackUri is required" });

    await startPlayback(userToken, trackUri);
    res.status(200).json({ message: "Playback started" });
  } catch (err) {
    next(err);
  }
};
