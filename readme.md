#   Spotify Dashboard API

A  Express.js API that integrates with Spotify Web API to display your top  tracks and control playback.

##  Features

-   View your top 10 tracks
-   See currently playing song
-   Pause/Resume playback
-   Play specific tracks
-   Secure OAuth authentication
 
##   API Endpoints

### Authentication
- `GET /api/spotify/login` - Initiate Spotify login
- `GET /api/spotify/callback` - Handle Spotify OAuth callback

### Main Features
- `GET /api/spotify/` - Get dashboard (top tracks + currently playing)
- `POST /api/spotify/stop` - Pause current playback
- `POST /api/spotify/play` - Start playing a track

## 📁 Project Structure

```
spotify/
│
├── controllers/
│   └── spotify.controller.js    # Handles API logic
├── models/
│   └── spotify.model.js         # API service calls to Spotify
├── middlewares/
│   ├── error.middleware.js      # Error handler
│   └── require.token.js         # Middleware to extract access token
├── routes/
│   └── spotify.routes.js        # All API endpoints
├── public/
│   └── index.html               # Frontend file
├── .env                         # Environment variables
└── index.js                     # Main Express app
```

##   Tech Stack

- **Backend**: Express.js
- **Authentication**: Spotify OAuth 2.0
- **HTTP Client**: Axios
- **Security**: Helmet, CORS
- **Other**: Cookie Parser, Compression

##   Example Response

```json
{
  "topTracks": [
    {
      "id": "4iV5W9uYEdYUVa79Axb7Rh",
      "name": "Song Name",
      "artist": "Artist Name",
      "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
      "preview_url": "https://..."
    }
  ],
  "currentSong": {
    "name": "Current Song",
    "artist": "Current Artist",
    "is_playing": true
  }
}
```

 
--- 