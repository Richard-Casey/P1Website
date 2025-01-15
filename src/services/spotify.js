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

// Fetch podcast details by Show ID
export const getPodcastDetails = async (showId) => {
  const token = await getAccessToken();
  const response = await axios.get(`${BASE_URL}/shows/${showId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Includes description, external_urls, etc.
};

// Fetch Podcast Episodes by Show ID with Pagination
export const getPodcastEpisodes = async (showId) => {
  const token = await getAccessToken();
  let allEpisodes = [];
  let nextPage = `${BASE_URL}/shows/${showId}/episodes`;
  let params = {
    market: "GB", // Set the market to Great Britain
    limit: 50, // Fetch up to 50 episodes per request
  };

  while (nextPage) {
    const response = await axios.get(nextPage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    allEpisodes = [...allEpisodes, ...response.data.items];
    nextPage = response.data.next; // Spotify API provides a `next` URL if more data is available
  }

  return allEpisodes;
};

