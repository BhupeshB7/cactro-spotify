import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import spotifyRoutes from "./routes/spotify.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.send("Welcome to the Cactro Spotify API"));
app.use("/api/spotify", spotifyRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
