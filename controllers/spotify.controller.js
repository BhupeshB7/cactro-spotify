// --- controllers/spotify.controller.js ------------------------
import {
    getTopTracks,
    getCurrentlyPlaying,
    stopPlayback,
    startPlayback,
} from "../models/spotify.model.js";

/* helper ----------------------------------------------------- */
const pickBearer = (req) => req.headers.authorization?.split(" ")[1];

/* GET /spotify ------------------------------------------------ */
export const getDashboard = async (req, res, next) => {
    try {
        const userToken = pickBearer(req);
        if (!userToken) return res.status(401).json({ error: "Access token required" });

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

/* POST /spotify/stop ----------------------------------------- */
export const stopPlaybackController = async (req, res, next) => {
    try {
        const userToken = pickBearer(req);
        if (!userToken) return res.status(401).json({ error: "Access token required" });

        await stopPlayback(userToken);
        res.status(200).json({ message: "Playback stopped" });
    } catch (err) {
        next(err);
    }
};

/* POST /spotify/play ----------------------------------------- */
export const startPlaybackController = async (req, res, next) => {
    try {
        const userToken = pickBearer(req);
        const { trackUri } = req.body;

        if (!userToken) return res.status(401).json({ error: "Access token required" });
        if (!trackUri) return res.status(400).json({ error: "trackUri is required" });

        await startPlayback(userToken, trackUri);
        res.status(200).json({ message: "Playback started" });
    } catch (err) {
        next(err);
    }
};
