import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPodcastEpisodes, getPodcastDetails } from "../../services/spotify";
import styles from "../../styles/customscrollbar.module.css";
import {
  IconArrowBigLeftLinesFilled,
  IconArrowBigRightLinesFilled,
  IconBrandSpotifyFilled,
} from "@tabler/icons-react";

// Podcast data
const dynamicPodcasts = [
  {
    title: "Developing Dads",
    description: "A podcast for dads navigating fatherhood.",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/developing-dads.png`,
    showId: "1BI9lY2envJJJlGXUGknqR", // Spotify Show ID
  },
  {
    title: "First Time Dads",
    description: "A podcast for new dads learning the ropes.",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/first-time-dads.png`,
    showId: "5GYBrz9tC8kaoMcmNyLU0j", // Spotify Show ID
  },
];

const Podcasts = () => {
  const [activePodcast, setActivePodcast] = useState(dynamicPodcasts[0]);
  const [episodes, setEpisodes] = useState([]); // Store fetched episodes

  // Fetch episodes whenever a new podcast is selected
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const fetchedEpisodes = await getPodcastEpisodes(activePodcast.showId);
        setEpisodes(
          fetchedEpisodes.map((episode) => ({
            title: episode.name,
            description: episode.description,
            date: episode.release_date,
            duration: new Date(episode.duration_ms).toISOString().substr(11, 8), // Format duration
          }))
        );
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
  }, [activePodcast]);

  // Select a podcast based on index
  const handlePodcastSelect = (index) => {
    setActivePodcast(dynamicPodcasts[index]);
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          margin: "0 auto",
          width: "80%",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        {/* Title for the Podcasts Page */}
        <h1
          className="text-4xl font-bold text-center mb-8"
          style={{
            color: "#03969b",
            textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
          }}
        >
          Podcasts
        </h1>

        {/* Podcast Header */}
        <PodcastHeader
          podcasts={dynamicPodcasts}
          onSelect={handlePodcastSelect}
        />

        {/* Podcast Episodes */}
        <PodcastEpisodes episodes={episodes} />
      </div>
    </div>
  );
};

// PodcastHeader Component (replacing AnimatedCards for Podcasts)
const PodcastHeader = ({ podcasts, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // State to hold podcast details
  const [podcastDetails, setPodcastDetails] = useState({
    description: "",
    spotifyUrl: "",
  });

  // Fetch metadata for the active podcast
  useEffect(() => {
    const fetchPodcastDetails = async () => {
      const selectedPodcast = podcasts[activeIndex];
      try {
        const details = await getPodcastDetails(selectedPodcast.showId);
        setPodcastDetails({
          description: details.description, // Dynamically fetched description
          spotifyUrl: details.external_urls.spotify, // Spotify link
        });
      } catch (error) {
        console.error("Error fetching podcast details:", error);
      }
    };

    fetchPodcastDetails();
  }, [activeIndex, podcasts]);

  // Handle navigation buttons
  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % podcasts.length);
  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + podcasts.length) % podcasts.length);

  // Trigger the callback when the active podcast changes
  useEffect(() => {
    onSelect(activeIndex);
  }, [activeIndex, onSelect]);

  return (
    <div
      className="relative w-full max-w-6xl mx-auto py-6 rounded-3xl shadow-lg"
      style={{
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        backgroundColor: "rgba(17, 25, 40, 0.75)",
        borderRadius: "36px",
        border: "4px solid #03969b",
        backgroundImage: `url(${podcasts[activeIndex].imgSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        marginBottom: "1.5rem",
      }}
    >
      {/* Content Section */}
      <div
        className="relative grid grid-cols-2 -space-x-20"
        style={{
          paddingTop: "0", // Remove extra padding
        }}
      >
        {/* Image Section */}
        <div
          className="absolute inset-0 origin-center flex justify-center items-center"
          style={{
            position: "relative", // Ensure cards overlap each other
            height: "222px", // Adjust height to align better
            marginLeft: "10rem",
            width: "15rem",
            //border: "4px solid red",
          }}
        >
          <AnimatePresence>
            {podcasts.map((podcast, index) => (
              <motion.div
                key={podcast.title}
                className="absolute flex justify-center items-center"
                style={{
                  width: "13.875rem",
                  height: "13.813rem",
                  borderRadius: "36px",
                  zIndex: index === activeIndex ? 999 : index, // Active card is on top
                  transform:
                    index === activeIndex ? "none" : "translateX(-50px)", // Shift inactive card slightly
                }}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: Math.floor(Math.random() * 21) - 10, // Randomized rotation
                }}
                animate={{
                  opacity: index === activeIndex ? 1 : 0.3, // Check if active
                  scale: index === activeIndex ? 1 : 0.95, // Slightly smaller for inactive
                  z: index === activeIndex ? 0 : -10, // Z-index layering
                  rotate:
                    index === activeIndex
                      ? 0
                      : Math.floor(Math.random() * 21) - 10,
                  zIndex: index === activeIndex ? 999 : -index, // Ensure proper stacking
                  y: index === activeIndex ? [0, -20, 0] : 10, // Active card bounces slightly
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: Math.floor(Math.random() * 21) - 10, // Randomized rotation for exit
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={podcast.imgSrc}
                  alt={podcast.title}
                  style={{
                    width: "222px",
                    height: "221px",
                    borderRadius: "24px",
                    objectFit: "cover",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                    border: "4px solid #03969b",
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-start items-start">
          <motion.div
            key={activeIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="h-full flex flex-col justify-start"
          >
            {/* Glassmorphism Section */}
            <div
              className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-lg p-4 shadow-md relative"
              style={{
                height: "14rem", // Reduced height for better fit
                width: "28rem", // Reduce width to align closer to the image
                backdropFilter: "blur(16px) saturate(180%)",
                WebkitBackdropFilter: "blur(16px) saturate(180%)",
                backgroundColor: "rgba(255, 255, 255, 0.63)",
                borderRadius: "12px",
                border: "4px solid #03969b",
              }}
            >
              <h3
                className="text-3xl font-bold mb-2"
                style={{
                  color: "#03969b",
                }}
              >
                {podcasts[activeIndex].title}
              </h3>
              <div
  className={`overflow-y-auto pr-2 ${styles.customScrollbar}`}
  style={{
    maxHeight: "6.5rem", // Set a max height to trigger scrolling for long descriptions
    marginBottom: "2rem", // Add space between description and the button
  }}
>
  <p className="text-sm" style={{ color: "black" }}>
    {podcastDetails.description}
  </p>
</div>


              {/* Visit on Spotify Button */}
              <a
                href={podcastDetails.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white text-sm font-semibold rounded-full px-4 py-2 flex items-center gap-2 hover:bg-green-700 transition-all duration-300"
                style={{
                    position: "absolute",
    bottom: "0.5rem",
    left: "50%",
    transform: "translateX(-50%)",
                  width: "fit-content",
                  outline: "2px solid white",
                }}
              >
                <IconBrandSpotifyFilled className="h-5 w-5 text-white" />
                Visit on Spotify
              </a>
            </div>
          </motion.div>
        </div>

        {/* Left Navigation Button */}
        <button
          onClick={handlePrev}
          className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 h-14 w-14 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center"
          style={{
            outline: "3px solid white",
          }}
        >
          <IconArrowBigLeftLinesFilled className="h-9 w-9 text-white group-hover:rotate-12 transition-transform duration-300" />
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={handleNext}
          className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 h-14 w-14 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center"
          style={{
            outline: "3px solid white",
          }}
        >
          <IconArrowBigRightLinesFilled className="h-9 w-9 text-white group-hover:-rotate-12 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

// PodcastEpisodes Component
const PodcastEpisodes = ({ episodes }) => {
  return (
    <div className="podcast-episodes grid gap-6 mt-8">
      {episodes.map((episode, index) => (
        <motion.div
          key={index}
          className="flex flex-col p-4 gap-4 border border-gray-300 rounded-lg shadow-lg"
          whileHover={{ scale: 1.02 }}
        >
          <h4 className="text-lg font-bold">{episode.title}</h4>
          <p className="text-sm text-gray-500">
            {episode.date} | {episode.duration}
          </p>
          <p className="text-sm">{episode.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Podcasts;
