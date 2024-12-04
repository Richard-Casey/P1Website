import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useOutsideClick } from "../../hooks/use-outside-click";

const resources = [
  {
    title: "Pink Parents",
    description: "Short description about Pink Parents.",
    content: "Full details about Pink Parents and their mission...",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/pink-parents.png`,
    link: "https://www.acacia.org.uk/dads-partners/lgbtq/",
  },
  {
    title: "DadPad",
    description: "Short description about DadPad.",
    content:
      "Full details about DadPad, including resources for trans parents...",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/dadpad.png`,
    link: "https://www.acacia.org.uk/dads-partners/lgbtq/",
  },
  {
    title: "Acacia Family Support",
    description:
      "Support for LGBTQ+ parents facing perinatal mental health issues.",
    content:
      "Full details about DadPad, including resources for trans parents...",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/acacia-family.png`,
    link: "https://www.acacia.org.uk/dads-partners/lgbtq/",
  },
];

export const ExpandableCards = () => {
  const [activeCard, setActiveCard] = useState(null);
  const cardRef = useRef(null);

  // Close on outside click
  useOutsideClick(cardRef, () => setActiveCard(null));

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveCard(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative">
      {/* Backdrop */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-10"
            onClick={() => setActiveCard(null)}
          />
        )}
      </AnimatePresence>

     {/* Cards */}
     <div className="grid gap-6 mt-8 relative z-20">
        {resources.map((resource) => (
          <motion.div
            key={resource.title}
            layoutId={`card-${resource.title}`}
            onClick={() => setActiveCard(resource)}
            className={`cursor-pointer rounded-lg shadow-md ${
              activeCard?.title === resource.title
                ? "bg-blue-500 text-white"
                : "bg-white dark:bg-gray-900"
            } flex items-center p-4 gap-4`}
          >
            <motion.img
              layoutId={`image-${resource.title}`}
              src={resource.imgSrc}
              alt={resource.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <motion.h3
                layoutId={`title-${resource.title}`}
                className="text-lg font-bold text-gray-900 dark:text-white"
              >
                {resource.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${resource.description}`}
                className="text-sm text-gray-500"
              >
                {resource.description}
              </motion.p>
            </div>
            <motion.a
              layoutId={`button-${resource.title}`}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white text-sm font-semibold rounded-full px-4 py-2 hover:bg-orange-500 transition-all duration-300"
            >
              Visit Website
            </motion.a>
          </motion.div>
        ))}
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <motion.div
              ref={cardRef}
              layoutId={`card-${activeCard.title}`}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl max-w-lg w-full relative"
            >
              {/* Expanded Image */}
              <motion.img
                layoutId={`image-${activeCard.title}`}
                src={activeCard.imgSrc}
                alt={activeCard.title}
                className="w-full h-64 rounded-lg object-cover"
              />
              <motion.h3
                layoutId={`title-${activeCard.title}`}
                className="text-xl font-bold mt-4 text-gray-900 dark:text-white"
              >
                {activeCard.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${activeCard.description}`}
                className="text-sm text-gray-500 dark:text-gray-400 mt-2"
              >
                {activeCard.description}
              </motion.p>
              <div className="mt-40 text-gray-700 dark:text-gray-300 text-sm">
                {activeCard.content}
              </div>

              {/* Buttons Container */}
              <div className="mt-6">
                {/* Visit Website Button */}
                <motion.a
                  layoutId={`button-${activeCard.title}`}
                  href={activeCard.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white text-sm font-semibold rounded-full px-4 py-2 hover:bg-orange-500 transition-all duration-300"
                  style={{
                    minWidth: "100px", // Matches width
                    position: "absolute",
                    bottom: "1rem",
                    left: "1rem",
                  }}
                >
                  Visit Website
                </motion.a>

                {/* Close Button */}
                <motion.button
                  onClick={() => setActiveCard(null)}
                  className="mt-4 bg-blue-500 text-white text-sm font-semibold rounded-full px-4 py-2 hover:bg-black-500 transition-all duration-300"
                  whileHover={{
                    backgroundColor: "#0392a2", // Cyan on hover
                  }}
                  style={{
                    backgroundColor: "#d27a14",
                    position: "absolute",
                    bottom: "1rem",
                    right: "1rem",
                  }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};