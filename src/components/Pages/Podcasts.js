import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPodcastEpisodes } from "../../services/spotify";
import {
  IconArrowBigLeftLinesFilled,
  IconArrowBigRightLinesFilled,
} from "@tabler/icons-react";

// Mock podcast data
const mockPodcasts = [
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
  const [activePodcast, setActivePodcast] = useState(mockPodcasts[0]);
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
    setActivePodcast(mockPodcasts[index]);
  };

  return (
    <div className="podcasts-page">
      {/* Podcast Header */}
      <PodcastHeader
        podcasts={mockPodcasts}
        onSelect={handlePodcastSelect}
      />

      {/* Podcast Episodes */}
      <PodcastEpisodes episodes={episodes} />
    </div>
  );
};

// PodcastHeader Component (replacing AnimatedCards for Podcasts)
const PodcastHeader = ({ podcasts, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle left and right navigation
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % podcasts.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + podcasts.length) % podcasts.length);

  // Trigger the callback when the active podcast changes
  useEffect(() => {
    onSelect(activeIndex);
  }, [activeIndex, onSelect]);

  return (
    <div className="podcast-header">
      <div className="flex justify-center items-center relative">
        <button
          onClick={handlePrev}
          className="h-9 w-9 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center"
          style={{
            outline: "2px solid orange",
            outlineOffset: "4px",
          }}
        >
          <IconArrowBigLeftLinesFilled className="h-7 w-7 text-white" />
        </button>
        <div className="relative w-full max-w-md mx-4">
          <AnimatePresence>
            {podcasts.map((podcast, index) => (
              <motion.div
                key={podcast.title}
                className={`absolute inset-0 ${index === activeIndex ? "block" : "hidden"}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={podcast.imgSrc}
                  alt={podcast.title}
                  className="w-64 h-64 rounded-lg object-cover shadow-lg mx-auto"
                />
                <h3 className="text-center text-lg font-bold mt-4">{podcast.title}</h3>
                <p className="text-center text-sm">{podcast.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <button
          onClick={handleNext}
          className="h-9 w-9 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center"
          style={{
            outline: "2px solid orange",
            outlineOffset: "4px",
          }}
        >
          <IconArrowBigRightLinesFilled className="h-7 w-7 text-white" />
        </button>
      </div>
    </div>
  );
};

// PodcastEpisodes Component (replacing ExpandableCards for Podcasts)
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
