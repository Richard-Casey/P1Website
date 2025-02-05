import axios from "axios";

const API_KEY = "AIzaSyATc2m3Gc9RVCGxnwOxNUhTsUDpWA5oyWA"; // Replace with your API key
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// Fetch channel details (unchanged)
export const getYoutubeChannelDetails = async (channelId) => {
  const response = await axios.get(`${BASE_URL}/channels`, {
    params: {
      part: "snippet,brandingSettings,statistics", 
      id: channelId,
      key: API_KEY,
    },
  });
  return response.data.items[0];
};

// Fetch videos from a channel using two API calls
export const getYoutubeVideos = async (channelId, options = {}) => {
  const { maxResults = 5 } = options;

  // Step 1: Get basic video info with the search endpoint
  const searchResponse = await axios.get(`${BASE_URL}/search`, {
    params: {
      part: "snippet",
      channelId: channelId,
      maxResults: maxResults,
      type: "video",
      key: API_KEY,
    },
  });
  
  // Extract video IDs
  const videoIds = searchResponse.data.items
    .map(item => item.id.videoId)
    .join(",");

  // Step 2: Get full video details using the videos endpoint
  const videosResponse = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: "snippet,contentDetails",
      id: videoIds,
      key: API_KEY,
    },
  });
  
  return videosResponse.data.items;
};