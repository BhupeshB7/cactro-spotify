 import express from "express";
import {
    getDashboard,
    stopPlaybackController,
    startPlaybackController,
} from "../controllers/spotify.controller.js";

const router = express.Router();

// GET /spotify  → top 10 tracks + now‑playing
router.get("/", getDashboard);

// POST /spotify/stop → pause playback
router.post("/stop", stopPlaybackController);

// POST /spotify/play → start a track
router.post("/play", startPlaybackController);

export default router;
