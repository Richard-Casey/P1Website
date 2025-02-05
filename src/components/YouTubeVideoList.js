import React, { useState, useEffect } from "react";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/customscrollbar.module.css";


const YouTubeVideoList = ({ videos, isLoading, channelBanner }) => {
  const [sortType, setSortType] = useState("newest");
  const [sortedVideos, setSortedVideos] = useState([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 10;

  useEffect(() => {
    let sortedArray = [...videos];
    switch (sortType) {
      case "newest":
        sortedArray.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        sortedArray.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "longest":
        sortedArray.sort((a, b) => b.durationSeconds - a.durationSeconds);
        break;
      case "shortest":
        sortedArray.sort((a, b) => a.durationSeconds - b.durationSeconds);
        break;
      default:
        break;
    }
    setSortedVideos(sortedArray);
  }, [sortType, videos]);

  const paginatedVideos = sortedVideos.slice(
    (currentPage - 1) * videosPerPage,
    currentPage * videosPerPage
  );

  const handleSortChange = (value) => {
    setSortType(value);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(videos.length / videosPerPage);
    return Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`px-2 py-1 ${
          currentPage === i + 1 ? "bg-gray-800 text-white" : "bg-gray-300"
        }`}
      >
        {i + 1}
      </button>
    ));
  };

  return (
    <div
      className="w-full flex flex-col items-center gap-1 py-4"
      style={{
        backgroundColor: "#333",
        border: "3px solid #d92727",
        borderRadius: "36px",
      }}
    >
      {isLoading && (
        <div style={{ color: "#fff", marginBottom: "1rem" }}>
          Fetching videos from YouTube...
        </div>
      )}

      <div className="sorting-controls" style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="sort-select"
          style={{ marginRight: "0.5rem", color: "#fff", fontWeight: "600" }}
        >
          Sort by:
        </label>
        <select
          id="sort-select"
          onChange={(e) => handleSortChange(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "8px",
            fontWeight: "600",
            border: "1px solid #d3d3d3",
          }}
        >
          <option value="newest">Date (Newest First)</option>
          <option value="oldest">Date (Oldest First)</option>
          <option value="longest">Duration (Longest to Shortest)</option>
          <option value="shortest">Duration (Shortest to Longest)</option>
        </select>
      </div>

      {paginatedVideos.map((video, index) => (
 <React.Fragment key={index}>
 <motion.div
   className="w-[80%] flex flex-col p-6 rounded-xl relative"
   style={{
     backgroundColor: "black",
     boxShadow: "0 6px 18px rgba(255, 255, 255, 0.5)",
     border: "4px solid #d3d3d3",
     borderRadius: "12px",
     position: "relative",
     overflow: "hidden",
     marginBottom: "1rem",
   }}
   onClick={() =>
     setActiveVideoIndex(activeVideoIndex === index ? null : index)
   }
   whileHover={{
     scale: 1.01,
     boxShadow: "0 6px 18px rgba(255, 255, 255, 1)"
   }}
   transition={{ type: "spring", stiffness: 300, damping: 20 }}
 >
            {/* Greyscale Background with Opacity */}
            <div
              style={{
                backgroundImage: `url(${channelBanner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "grayscale(1)",
                opacity: 0.5, // Reduce opacity of the greyscale image
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
              }}
            />

            {/* Red Gradient Overlay */}
            <div
              style={{
                background: `linear-gradient(to right, 
                  rgba(0, 0, 0, 1) 0%, 
                  rgba(0, 0, 0, 0.6) 20%, 
                  rgba(0, 0, 0, 0.3) 40%, 
                  rgba(255, 0, 0, 0.3) 60%, 
                  rgba(255, 0, 0, 0.7) 80%, 
                  rgba(255, 0, 0, 1) 100%
                )`,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex justify-between items-center">
              <div style={{ width: "65%", textAlign: "center" }}>
                <h3
                  style={{
                    color: "#fff",
                    fontSize: "1.5rem",
                    margin: "0",
                    lineHeight: "1.2",
                  }}
                >
                  {video.title}
                </h3>
                <p style={{ color: "#ffffff", fontWeight: "600", fontSize: "0.9rem", marginTop: "5px" }}>
                  {new Date(video.date).toLocaleDateString("en-GB")} |{" "}
                  {video.duration}
                </p>
              </div>
              <img
                src={video.thumbnail}
                alt={video.title}
                style={{
                  width: "188px",
                  height: "125px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "2px solid #d3d3d3",
                  marginLeft: "10px",
                  marginBottom: "1rem",
                }}
              />
            </div>

            <AnimatePresence>
  {activeVideoIndex === index && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className={`${styles.customScrollbarRed}`}
      style={{
        maxHeight: "150px",
        overflowY: "auto",
        padding: "0.1rem",
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 11,
      }}
      onClick={(e) => e.stopPropagation()} // Prevents collapse when clicking inside
    >
      <p style={{ marginBottom: "0rem" }}>{video.description}</p>
    </motion.div>
  )}
</AnimatePresence>


            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  textDecoration: "none",
                  gap: "5px",
                  zIndex: 10, // Ensure it is clickable
                }}
              >
                <IconBrandYoutubeFilled /> Watch on YouTube
              </a>
            </div>
          </motion.div>

          {index < paginatedVideos.length - 1 && (
            <hr style={{ borderColor: "#444" }} />
          )}
        </React.Fragment>
      ))}

      <div style={{ marginTop: "1rem" }}>{renderPagination()}</div>
    </div>
  );
};

export default YouTubeVideoList;
