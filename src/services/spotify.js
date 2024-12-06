import axios from "axios";

const CLIENT_ID = "7e23987ff7944bcfbbd0257555df1da6";
const CLIENT_SECRET = "f7762322e3984d74a0d77edd00eac8d1";
const BASE_URL = "https://api.spotify.com/v1";

let accessToken = null;

// Fetch Access Token
const getAccessToken = async () => {
  if (!accessToken) {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    accessToken = response.data.access_token;
  }
  return accessToken;
};

// Fetch Podcast Episodes by Show ID
export const getPodcastEpisodes = async (showId) => {
  const token = await getAccessToken();
  const response = await axios.get(`${BASE_URL}/shows/${showId}/episodes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      market: "US", // Use your preferred market
      limit: 50, // Fetch up to 50 episodes
    },
  });
  return response.data.items;
};
