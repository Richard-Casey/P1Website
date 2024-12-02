import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";

const resources = [
  {
    title: "Pink Parents",
    description: "Dedicated to supporting gay and lesbian parents in the UK.",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/pink-parents.png`,
    link: "https://www.pinkparents.org.uk/",
  },
  {
    title: "DadPad",
    description: "Guidance for trans and non-binary parents navigating parenthood.",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/dadpad.png`,
    link: "https://thedadpad.co.uk/lgbtqi-parents/ask-dadpad-trans-and-non-binary-parents/",
  },
  {
    title: "Acacia Family Support",
    description: "Support for LGBTQ+ parents facing perinatal mental health issues.",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/acacia-family.png`,
    link: "https://www.acacia.org.uk/dads-partners/lgbtq/",
  },
];

export const AnimatedCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % resources.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + resources.length) % resources.length);

  const isActive = (index) => index === activeIndex;

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative h-[300px] w-full">
          <AnimatePresence>
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                }}
                animate={{
                    opacity: isActive(index) ? 1 : 0.3, // Lower opacity for inactive cards
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -10, // Ensure inactive cards don't stack over active
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : -index, // Active card gets max zIndex
                    y: isActive(index) ? [0, -20, 0] : 10, // Slight upward bounce for active
                  }}
                  
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className={`absolute inset-0 rounded-lg overflow-hidden shadow-lg ${
                  isActive(index) ? "z-20" : "z-10"
                }`}
              >
                <img
                  src={resource.imgSrc}
                  alt={resource.title}
                  className="w-[221px] h-[222px] rounded-3xl object-cover mx-auto"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center">
          <motion.div
            key={activeIndex}
            initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {resources[activeIndex].title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
              {resources[activeIndex].description}
            </p>
            <a
              href={resources[activeIndex].link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              Visit Website
            </a>
          </motion.div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
      </div>
    </div>
  );
};


