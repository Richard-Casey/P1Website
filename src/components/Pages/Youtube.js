import React, { useState, useEffect, useRef } from "react";
import {
  getYoutubeChannelDetails,
  getYoutubeVideos,
} from "../../services/youtubeservice";
import styles from "../../styles/customscrollbar.module.css";
import globalStyles from "../../styles/globalstyle.module.css";
import youtubeChannels from "../youtubechannels";
import YouTubeVideoList from "../YouTubeVideoList";
import { IconArrowBigLeftLinesFilled, IconArrowBigRightLinesFilled } from "@tabler/icons-react";

const Youtube = ({ isMinimal }) => {
  const [activeChannel, setActiveChannel] = useState(youtubeChannels[0]);
  const [channelDetails, setChannelDetails] = useState({});
  const [videos, setVideos] = useState([]);
  const [fetchedChannelsData, setFetchedChannelsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch YouTube data when channel changes
  useEffect(() => {
    const fetchChannelData = async () => {
      setIsLoading(true);
      if (fetchedChannelsData[activeChannel.channelId]) {
        setChannelDetails(fetchedChannelsData[activeChannel.channelId].details);
        setVideos(fetchedChannelsData[activeChannel.channelId].videos);
        setIsLoading(false);
        return;
      }

      try {
        const details = await getYoutubeChannelDetails(activeChannel.channelId);
        const fetchedVideos = await getYoutubeVideos(activeChannel.channelId, {
          maxResults: 10,
        });

        const channelData = {
          details: {
            description: details.snippet?.description || "No description available.",
            logo: details.snippet?.thumbnails?.high?.url || activeChannel.imgSrc,
            bannerImage: details.brandingSettings?.image?.bannerExternalUrl || activeChannel.bannerSrc,
            youtubeUrl: `https://www.youtube.com/channel/${activeChannel.channelId}`,
          },
          videos: fetchedVideos.map((video) => ({
            title: video.snippet?.title || "Untitled Video",
            description: video.snippet?.description || "", // full description now
            date: video.snippet?.publishedAt || "Unknown Date",
            durationSeconds: video.contentDetails?.duration || 0,
            duration: formatDuration(video.contentDetails?.duration),
            thumbnail: video.snippet?.thumbnails?.medium?.url || "",
            // Note: update the URL construction based on the new structure
            youtubeUrl: `https://www.youtube.com/watch?v=${video.id}`,
          })),
        };
        

        setFetchedChannelsData((prev) => ({
          ...prev,
          [activeChannel.channelId]: channelData,
        }));

        setChannelDetails(channelData.details);
        setVideos(channelData.videos);
      } catch (error) {
        console.error("Error fetching YouTube data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannelData();
  }, [activeChannel]);

  const handleChannelSelect = (index) => {
    setActiveChannel(youtubeChannels[index]);
  };

  return (
    <div className={isMinimal ? globalStyles["container-minimal"] : globalStyles.container}>
      <h1 className={isMinimal ? globalStyles["h1-minimal"] : globalStyles.h1}>YouTube Channels</h1>

      <ChannelHeader
        channels={youtubeChannels}
        activeChannel={activeChannel}
        onSelect={handleChannelSelect}
        channelDetails={channelDetails}
      />

      {/* Render video list */}
      <YouTubeVideoList videos={videos} isLoading={isLoading} channelBanner={activeChannel.bannerSrc} />

    </div>
  );
};

const ChannelHeader = ({ channels, activeChannel, onSelect, channelDetails }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    onSelect(activeIndex);
  }, [activeIndex, onSelect]);

  useEffect(() => {
    if (descriptionRef.current) {
      const isOverflowing = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
      setIsScrollbarVisible(isOverflowing);
    }
  }, [channelDetails.description]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % channels.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + channels.length) % channels.length);

  return (
    <div
      className="relative w-full max-w-6xl mx-auto py-6 rounded-3xl shadow-lg"
      style={{
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        backgroundColor: "rgba(17, 25, 40, 0.75)",
        backgroundImage: `url(${activeChannel.bannerSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "400px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        border: "3px solid #d92727",
        borderRadius: "44px",
        paddingTop: "0rem",
        marginBottom: "2rem",
      }}
    >
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center"
        style={{ outline: "3px solid #d92727", zIndex: 9999 }}
      >
        <IconArrowBigLeftLinesFilled className="h-9 w-9 text-red-600" />
      </button>

      {/* Channel Information */}
      <div className="relative flex flex-col items-center justify-center gap-4">
        <img
          src={activeChannel.imgSrc}
          alt={activeChannel.title}
          style={{
            width: "13.875rem",
            height: "13.813rem",
            borderRadius: "36px",
            border: "3px solid #d92727",
            objectFit: "cover",
            marginTop: "0.3rem",
          }}
        />
        <div
          style={{
            height: "7.7rem",
            width: "90%",
            maxWidth: "800px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "36px",
            padding: "0.2rem",
            border: "2px solid #d92727",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#000", fontSize: "1.2rem", margin: "0rem", textAlign: "center" }}>
            <strong><u>{activeChannel.title}</u></strong>
          </h3>

          {/* Scrollable Description Section */}
          <div
            ref={descriptionRef}
            className={styles.customScrollbarRed}
            style={{
              maxHeight: "4.5rem",
              overflowY: isScrollbarVisible ? "auto" : "hidden",
              padding: "0 1rem",
            }}
          >
            <p style={{ color: "#000", fontSize: "0.9rem", lineHeight: "1.4", marginBottom: "0rem" }}>
              {channelDetails.description}
            </p>
          </div>
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center"
        style={{ outline: "3px solid #d92727", zIndex: 9999 }}
      >
        <IconArrowBigRightLinesFilled className="h-9 w-9 text-red-600" />
      </button>
    </div>
  );
};

const formatDuration = (isoDuration) => {
  if (!isoDuration) return "Unknown Duration";

  const durationMatch = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = durationMatch[1] ? parseInt(durationMatch[1]) : 0;
  const minutes = durationMatch[2] ? parseInt(durationMatch[2]) : 0;
  const seconds = durationMatch[3] ? parseInt(durationMatch[3]) : 0;

  return `${hours ? `${hours}:` : ""}${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};


export default Youtube;
