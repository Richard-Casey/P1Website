import axios from "axios";

const API_KEY = "AIzaSyATc2m3Gc9RVCGxnwOxNUhTsUDpWA5oyWA"; // Replace with your API key
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// Fetch channel details
export const getYoutubeChannelDetails = async (channelId) => {
  const response = await axios.get(`${BASE_URL}/channels`, {
    params: {
      part: "snippet,contentDetails,statistics",
      id: channelId,
      key: API_KEY,
    },
  });
  return response.data.items[0];
};

// Fetch videos from a channel
export const getYoutubeVideos = async (channelId) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: {
      part: "snippet",
      channelId: channelId,
      maxResults: 50, // Fetch up to 50 videos
      type: "video",
      key: API_KEY,
    },
  });
  return response.data.items;
};
