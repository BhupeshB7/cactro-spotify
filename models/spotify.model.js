import axios from "axios";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

let cachedAccessToken = null;

export const getAccessToken = async () => {
  if (cachedAccessToken) return cachedAccessToken;

  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  cachedAccessToken = data.access_token;
  return cachedAccessToken;
};

export const getTopTracks = async (userToken) => {
  const { data } = await axios.get(
    "https://api.spotify.com/v1/me/top/tracks?limit=10",
    { headers: { Authorization: `Bearer ${userToken}` } }
  );
  return data.items;
};

export const getCurrentlyPlaying = async (userToken) => {
  try {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
    return data;
  } catch {
    return null;
  }
};

export const stopPlayback = async (userToken) =>
  axios.put(
    "https://api.spotify.com/v1/me/player/pause",
    {},
    { headers: { Authorization: `Bearer ${userToken}` } }
  );

export const startPlayback = async (userToken, trackUri) =>
  axios.put(
    "https://api.spotify.com/v1/me/player/play",
    { uris: [trackUri] },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    }
  );
