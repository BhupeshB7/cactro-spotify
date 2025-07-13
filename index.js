import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import spotifyRoutes from "./routes/spotify.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "public" });
});

// app.get("/", (req, res) => res.send("Welcome to the Cactro Spotify API"));
app.use("/api/spotify", spotifyRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
