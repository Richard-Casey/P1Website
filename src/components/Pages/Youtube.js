import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getYoutubeChannelDetails, getYoutubeVideos } from "../../services/youtubeservice";
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
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/andys-man-club.png`,
    channelId: "UC8mJx0-NFRJerTgTreJ2U7w", // YouTube Channel ID
  },
  {
    title: "Developing Dads",
    description: "",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/developing-dads.png`,
    channelId: "UCqhvC4YTuK9OWkIGrlrZ4dA", // YouTube Channel ID
  },
  {
    title: "Dope Black Dads",
    description: "",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/developing-dads.png`,
    channelId: "UCfCiQnkjxUgg4G2WkVnX7qQ", // YouTube Channel ID
  },
  {
    title: "Dad Matters UK",
    description: "",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/developing-dads.png`,
    channelId: "UCB94in41rWboL3ejwRHo6DQ", // YouTube Channel ID
  },
  {
    title: "Fatherhood Institute",
    description: "",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/developing-dads.png`,
    channelId: "UCzi2TdZ2ANuGie8G82P8M3A", // YouTube Channel ID
  },
  {
    title: "DigiDad",
    description: "",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/developing-dads.png`,
    channelId: "UCkAeSuiuO3JJpef71p7uxhA", // YouTube Channel ID
  },
  {
    title: "MFF: Music Football Fatherhood",
    description: "",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/developing-dads.png`,
    channelId: "UCliRtN3_P96BnwHRn2r6L4A", // YouTube Channel ID
  },
  {
    title: "DadsNet",
    description: "",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/developing-dads.png`,
    channelId: "UCF6ULfwMzELbu7WsIUKwXcA", // YouTube Channel ID
  },
];

const Youtube = ({ isMinimal }) => {
    const [activeChannel, setActiveChannel] = useState(youtubeChannels[0]);
    const [channelDetails, setChannelDetails] = useState({});
    const [videos, setVideos] = useState([]);
  
    // Fetch details and videos for the active channel
    // Fetch details and videos for the active channel
useEffect(() => {
    const fetchChannelData = async () => {
      try {
        console.log("Fetching data for channel:", activeChannel.channelId);
  
        // Fetch YouTube channel details
        const details = await getYoutubeChannelDetails(activeChannel.channelId);
        console.log("YouTube Channel Details:", details);
  
        // Set channel details
        setChannelDetails({
          description: details.snippet?.description || "No description available.",
          logo: details.snippet?.thumbnails?.default?.url || "",
          bannerImage: details.brandingSettings?.image?.bannerExternalUrl || "",
          youtubeUrl: `https://www.youtube.com/channel/${activeChannel.channelId}`,
        });
  
        // Fetch YouTube videos for the channel
        const fetchedVideos = await getYoutubeVideos(activeChannel.channelId);
        console.log("YouTube Channel Videos:", fetchedVideos);
  
        // Map videos to desired structure
        setVideos(
          fetchedVideos.map((video) => ({
            title: video.snippet?.title || "Untitled Video",
            description: video.snippet?.description || "",
            date: video.snippet?.publishedAt || "Unknown Date",
            thumbnail: video.snippet?.thumbnails?.medium?.url || "",
            youtubeUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`,
          }))
        );
      } catch (error) {
        console.error("Error fetching YouTube data:", error);
      }
    };
  
    fetchChannelData();
  }, [activeChannel]);
  
  
    // Select a channel based on index
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
        />
  
        {/* Videos Section */}
        <ChannelVideos videos={videos} />
      </div>
    );
  };
  
  const ChannelHeader = ({ channels, activeChannel, onSelect }) => {
    const [activeIndex, setActiveIndex] = useState(0);
  
    useEffect(() => {
      onSelect(activeIndex);
    }, [activeIndex, onSelect]);
  
    const handleNext = () =>
      setActiveIndex((prev) => (prev + 1) % channels.length);
    const handlePrev = () =>
      setActiveIndex((prev) => (prev - 1 + channels.length) % channels.length);
  
    return (
        <div
          className="relative w-full max-w-6xl mx-auto py-6 rounded-3xl shadow-lg"
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(17, 25, 40, 0.75)",
            backgroundImage: `url(${activeChannel.bannerImage || activeChannel.imgSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            marginBottom: "1.5rem",
          }}
        >
         <div className="relative flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          className="absolute left-0 transform -translate-y-1/2 h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center"
          style={{
            top: "50%",
            outline: "3px solid white",
            zIndex: 9999,
          }}
        >
          <IconArrowBigLeftLinesFilled className="h-9 w-9 text-red-600" />
        </button>

        {/* Main Thumbnail and Description */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={activeChannel.logo || activeChannel.imgSrc}
            alt={activeChannel.title}
            style={{
              width: "13.875rem",
              height: "13.813rem",
              borderRadius: "36px",
              border: "4px solid #d92727",
              marginBottom: "1rem",
            }}
          />
          <h3 style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            {activeChannel.title}
          </h3>
          <p style={{ color: "#fff", textAlign: "center", maxWidth: "28rem" }}>
            {activeChannel.description || "No description available."}
          </p>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 transform -translate-y-1/2 h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center"
          style={{
            top: "50%",
            outline: "3px solid white",
            zIndex: 9999,
          }}
        >
          <IconArrowBigRightLinesFilled className="h-9 w-9 text-red-600" />
        </button>
      </div>
    </div>
  );
};
  
  const ChannelVideos = ({ videos }) => (
    <div>
      {videos.map((video, index) => (
        <div key={index} className={styles.videoCard}>
          <img src={video.thumbnail} alt={video.title} />
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