import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fallback local/demo tracks (20 slots, ready for you to replace with real FMA songs)
const fallbackTracks = [
  {
    "id": "local-1",
    "title": "Night Owl",
    "artist": "Broke For Free (FMA Demo)",
    "src": "/songs/track1.mp3",
    "cover": "/covers/cover1.jpg",
    "length": "3:10"
  },
  {
    "id": "local-2",
    "title": "Synthetic Dreams",
    "artist": "Ketsa (FMA Demo)",
    "src": "/songs/track2.mp3",
    "cover": "/covers/cover2.jpg",
    "length": "3:11"
  },
  {
    "id": "local-3",
    "title": "Lo-Fi Gateway",
    "artist": "Komiku (FMA Demo)",
    "src": "/songs/track3.mp3",
    "cover": "/covers/cover3.jpg",
    "length": "3:12"
  },
  {
    "id": "local-4",
    "title": "Neon City",
    "artist": "Scott Holmes (FMA Demo)",
    "src": "/songs/track4.mp3",
    "cover": "/covers/cover4.jpg",
    "length": "3:13"
  },
  {
    "id": "local-5",
    "title": "Midnight Drive",
    "artist": "Loyalty Freak Music (FMA Demo)",
    "src": "/songs/track5.mp3",
    "cover": "/covers/cover5.jpg",
    "length": "3:14"
  },
  {
    "id": "local-6",
    "title": "Ocean Echoes",
    "artist": "Audiobinger (FMA Demo)",
    "src": "/songs/track6.mp3",
    "cover": "/covers/cover6.jpg",
    "length": "3:15"
  },
  {
    "id": "local-7",
    "title": "Solar Drift",
    "artist": "Jahzzar (FMA Demo)",
    "src": "/songs/track7.mp3",
    "cover": "/covers/cover7.jpg",
    "length": "3:16"
  },
  {
    "id": "local-8",
    "title": "Pixel Dust",
    "artist": "Kai Engel (FMA Demo)",
    "src": "/songs/track8.mp3",
    "cover": "/covers/cover8.jpg",
    "length": "3:17"
  },
  {
    "id": "local-9",
    "title": "Skyline Bounce",
    "artist": "Chris Zabriskie (FMA Demo)",
    "src": "/songs/track9.mp3",
    "cover": "/covers/cover9.jpg",
    "length": "3:18"
  },
  {
    "id": "local-10",
    "title": "Aurora Flow",
    "artist": "Poldoore (FMA Demo)",
    "src": "/songs/track10.mp3",
    "cover": "/covers/cover10.jpg",
    "length": "3:19"
  },
  {
    "id": "local-11",
    "title": "Soft Circuit",
    "artist": "Broke For Free (FMA Demo)",
    "src": "/songs/track11.mp3",
    "cover": "/covers/cover11.jpg",
    "length": "3:20"
  },
  {
    "id": "local-12",
    "title": "Retro Future",
    "artist": "Ketsa (FMA Demo)",
    "src": "/songs/track12.mp3",
    "cover": "/covers/cover12.jpg",
    "length": "3:21"
  },
  {
    "id": "local-13",
    "title": "Midnight Caffeine",
    "artist": "Komiku (FMA Demo)",
    "src": "/songs/track13.mp3",
    "cover": "/covers/cover13.jpg",
    "length": "3:22"
  },
  {
    "id": "local-14",
    "title": "Binary Sunset",
    "artist": "Scott Holmes (FMA Demo)",
    "src": "/songs/track14.mp3",
    "cover": "/covers/cover14.jpg",
    "length": "3:23"
  },
  {
    "id": "local-15",
    "title": "Cloud Runner",
    "artist": "Loyalty Freak Music (FMA Demo)",
    "src": "/songs/track15.mp3",
    "cover": "/covers/cover15.jpg",
    "length": "3:24"
  },
  {
    "id": "local-16",
    "title": "Afterglow",
    "artist": "Audiobinger (FMA Demo)",
    "src": "/songs/track16.mp3",
    "cover": "/covers/cover16.jpg",
    "length": "3:25"
  },
  {
    "id": "local-17",
    "title": "Analog Heart",
    "artist": "Jahzzar (FMA Demo)",
    "src": "/songs/track17.mp3",
    "cover": "/covers/cover17.jpg",
    "length": "3:26"
  },
  {
    "id": "local-18",
    "title": "Signal Waves",
    "artist": "Kai Engel (FMA Demo)",
    "src": "/songs/track18.mp3",
    "cover": "/covers/cover18.jpg",
    "length": "3:27"
  },
  {
    "id": "local-19",
    "title": "Hidden Streets",
    "artist": "Chris Zabriskie (FMA Demo)",
    "src": "/songs/track19.mp3",
    "cover": "/covers/cover19.jpg",
    "length": "3:28"
  },
  {
    "id": "local-20",
    "title": "Distant Lights",
    "artist": "Poldoore (FMA Demo)",
    "src": "/songs/track20.mp3",
    "cover": "/covers/cover20.jpg",
    "length": "3:29"
  }
];

// Async thunk to TRY fetching tracks from Free Music Archive API (if key exists)
export const fetchFmaTracks = createAsyncThunk(
  "playlist/fetchFmaTracks",
  async (_, { rejectWithValue }) => {
    const apiKey = import.meta.env.VITE_FMA_API_KEY;
    if (!apiKey) {
      return rejectWithValue("Missing FMA API key. Using fallback local tracks.");
    }

    try {
      const url =
        "https://freemusicarchive.org/api/get/tracks.json?api_key=" +
        apiKey +
        "&limit=20";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch FMA tracks");
      }
      const data = await res.json();

      const raw =
        data?.dataset?.tracks ||
        data?.tracks ||
        data?.dataset ||
        data?.results ||
        [];

      const mapped = raw
        .map((track, index) => ({
          id: track.track_id || track.id || `fma-${index}`,
          title: track.track_title || track.title || "Unknown title",
          artist: track.artist_name || track.artist || "Unknown artist",
          src:
            track.track_listen_url ||
            track.audio ||
            track.track_url ||
            "",
          cover:
            track.track_image_file ||
            track.album_image_file ||
            "/covers/cover1.jpg",
          length: track.track_duration || "0:00"
        }))
        .filter((t) => t.src);

      if (!mapped.length) {
        throw new Error("API returned no playable tracks");
      }

      return mapped;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to load FMA tracks");
    }
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    tracks: fallbackTracks,
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFmaTracks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFmaTracks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tracks = action.payload;
      })
      .addCase(fetchFmaTracks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error?.message;
      });
  }
});

export default playlistSlice.reducer;
