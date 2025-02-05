import React, { useState, useEffect, useRef } from "react";
import {
  getYoutubeChannelDetails,
  getYoutubeVideos,
} from "../../services/youtubeservice";
import globalStyles from "../../styles/globalstyle.module.css";
import styles from "../../styles/customscrollbar.module.css";
import {
  IconArrowBigLeftLinesFilled,
  IconArrowBigRightLinesFilled,
  IconBrandYoutube,
} from "@tabler/icons-react";

// YouTube channel data
const youtubeChannels = [
  {
    title: "ANDY'S MAN CLUB",
    description: "",
    imgSrc: `${process.env.PUBLIC_URL}/images/yt/profile/AndysManClub.png`,
    bannerSrc: `${process.env.PUBLIC_URL}/images/yt/banner/andysmanclubbanner.png`,
    channelId: "UC8mJx0-NFRJerTgTreJ2U7w",
  },
  {
    title: "Developing Dads",
    description: "",
    imgSrc: `${process.env.PUBLIC_URL}/images/yt/profile/developing-dads.png`,
    bannerSrc: `${process.env.PUBLIC_URL}/images/yt/banner/devdadsbanner.png`,
    channelId: "UCqhvC4YTuK9OWkIGrlrZ4dA",
  },
  {
    title: "Dope Black Dads",
    description: "",
    imgSrc: `${process.env.PUBLIC_URL}/images/yt/profile/dopeblackdads.png`,
    bannerSrc: `${process.env.PUBLIC_URL}/images/yt/banner/dopeblackdadsban.png`,
    channelId: "UCfCiQnkjxUgg4G2WkVnX7qQ",
  },
  {
    title: "Dad Matters UK",
    description: "",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/developing-dads.png`,
    channelId: "UCB94in41rWboL3ejwRHo6DQ",
  },
  {
    title: "Fatherhood Institute",
    description: "",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/developing-dads.png`,
    channelId: "UCzi2TdZ2ANuGie8G82P8M3A",
  },
  {
    title: "DigiDad",
    description: "",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/developing-dads.png`,
    channelId: "UCkAeSuiuO3JJpef71p7uxhA",
  },
  {
    title: "MFF: Music Football Fatherhood",
    description: "",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/developing-dads.png`,
    channelId: "UCliRtN3_P96BnwHRn2r6L4A",
  },
  {
    title: "DadsNet",
    description: "",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/developing-dads.png`,
    channelId: "UCF6ULfwMzELbu7WsIUKwXcA",
  },
];

const Youtube = ({ isMinimal }) => {
  const [activeChannel, setActiveChannel] = useState(youtubeChannels[0]);
  const [channelDetails, setChannelDetails] = useState({});
  const [videos, setVideos] = useState([]);
  const [fetchedChannelsData, setFetchedChannelsData] = useState({});

  // Debounced channel data fetching with caching
  useEffect(() => {
    const fetchChannelData = async () => {
      if (fetchedChannelsData[activeChannel.channelId]) {
        setChannelDetails(fetchedChannelsData[activeChannel.channelId].details);
        setVideos(fetchedChannelsData[activeChannel.channelId].videos);
        return;
      }

      try {
        console.log("Fetching data for channel:", activeChannel.channelId);

        const details = await getYoutubeChannelDetails(activeChannel.channelId);
        const fetchedVideos = await getYoutubeVideos(activeChannel.channelId, {
          maxResults: 5,
        });

        const channelData = {
          details: {
            description:
              details.snippet?.description || "No description available.",
            logo:
              details.snippet?.thumbnails?.high?.url ||
              details.snippet?.thumbnails?.default?.url ||
              activeChannel.imgSrc,
            bannerImage:
              details.brandingSettings?.image?.bannerExternalUrl ||
              activeChannel.imgSrc,
            youtubeUrl: `https://www.youtube.com/channel/${activeChannel.channelId}`,
          },
          videos: fetchedVideos.map((video) => ({
            title: video.snippet?.title || "Untitled Video",
            description: video.snippet?.description || "",
            date: video.snippet?.publishedAt || "Unknown Date",
            thumbnail: video.snippet?.thumbnails?.medium?.url || "",
            youtubeUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`,
          })),
        };

        setFetchedChannelsData((prev) => ({
          ...prev,
          [activeChannel.channelId]: channelData,
        }));

        // Check if the images are already the same to prevent unnecessary updates
        if (
          channelDetails.logo !== channelData.details.logo ||
          channelDetails.bannerImage !== channelData.details.bannerImage
        ) {
          setChannelDetails(channelData.details);
        }

        setVideos(channelData.videos);
      } catch (error) {
        console.error("Error fetching YouTube data:", error);
      }
    };

    const debounceTimer = setTimeout(fetchChannelData, 500);
    return () => clearTimeout(debounceTimer);
  }, [activeChannel, fetchedChannelsData, channelDetails]);

  const handleChannelSelect = (index) => {
    setActiveChannel(youtubeChannels[index]);
  };

  return (
    <div
      className={
        isMinimal ? globalStyles["container-minimal"] : globalStyles.container
      }
    >
      <h1 className={isMinimal ? globalStyles["h1-minimal"] : globalStyles.h1}>
        YouTube Channels
      </h1>

      {/* Channel Header */}
      <ChannelHeader
        channels={youtubeChannels}
        activeChannel={activeChannel}
        onSelect={handleChannelSelect}
        channelDetails={channelDetails}
      />

      {/* Videos Section */}
      <ChannelVideos videos={videos} />
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
        border: "3px solid rgb(0, 0, 0)",
        borderRadius: "44px",
        position: "relative",
        marginBottom: "2rem",
      }}
    >
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center"
        style={{ outline: "3px solid rgb(255, 0, 0)", zIndex: 9999 }}
      >
        <IconArrowBigLeftLinesFilled className="h-9 w-9 text-red-600" />
      </button>

      {/* Content Section */}
      <div className="relative flex flex-col items-center justify-center gap-4">
        <img
          src={activeChannel.imgSrc}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = activeChannel.imgSrc;
          }}
          alt={activeChannel.title}
          style={{
            width: "13.875rem",
            height: "13.813rem",
            borderRadius: "36px",
            border: "4px solid #d92727",
            objectFit: "cover",
            marginTop: "0.3rem",
          }}
        />

        {/* Title and Description Container */}
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
            border: "2px solid rgb(255, 0, 0)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
          }}
        >
          {/* Title Section */}
          <h3 style={{ color: "#000", fontSize: "1.2rem", margin: "0rem", textAlign: "center", }}>
            <strong><u>{activeChannel.title}</u></strong>
          </h3>

          {/* Scrollable Description Section */}
          <div
            ref={descriptionRef}
            className={`${styles.customScrollbarRed}`}
            style={{
              maxHeight: "4.5rem", // Constrain to fit within the 8.8rem container
              overflowY: isScrollbarVisible ? "auto" : "hidden",
              padding: "0 1rem",
            }}
          >
            <p style={{ color: "#000", fontSize: "0.9rem", lineHeight: "1.4", marginBottom: "0rem", }}>
            {channelDetails.description}
            </p>
          </div>
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center"
        style={{ outline: "3px solid rgb(255, 0, 0)", zIndex: 9999 }}
      >
        <IconArrowBigRightLinesFilled className="h-9 w-9 text-red-600" />
      </button>
    </div>
  );
};


const ChannelVideos = ({ videos }) => (
  <div>
    {videos.map((video, index) => (
      <div key={index} className={styles.videoCard}>
        <img src={video.thumbnail} alt={video.title}
        style={{
          marginTop: "0.5rem",
        }} />
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
          <IconBrandYoutube />
          Watch on YouTube
        </a>
      </div>
    ))}
  </div>
);

export default Youtube;
