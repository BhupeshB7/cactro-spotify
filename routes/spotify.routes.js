import express from "express";
import {
  getDashboard,
  stopPlaybackController,
  startPlaybackController,
  loginSpotify,
  spotifyCallback,
} from "../controllers/spotify.controller.js";
import { requireToken } from "../middlewares/require.toke.js";

const router = express.Router();

router.get("/login", loginSpotify);
router.get("/callback", spotifyCallback);

// GET /spotify  → top 10 tracks + now‑playing
router.get("/", requireToken, getDashboard);

// POST /spotify/stop → pause playback
router.post("/stop", requireToken, stopPlaybackController);

// POST /spotify/play → start a track
router.post("/play", requireToken, startPlaybackController);

export default router;
