import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import spotifyRoutes from "./routes/spotify.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: [
                    "'self'",
                    "'unsafe-inline'",
                    "https://accounts.spotify.com",
                ],
                scriptSrcAttr: ["'unsafe-inline'"],  
                connectSrc: ["'self'", "https://api.spotify.com"],
                imgSrc: ["'self'", "data:", "https://i.scdn.co"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
        crossOriginEmbedderPolicy: false,
    }),

);

app.use(compression());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://cactro-spotify-ochre.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// app.get("/", (req, res) => res.send("Welcome to the Cactro Spotify API"));
app.use("/api/spotify", spotifyRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(` Server running on port ${port}`));
