import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { cn } from "../../lib/utils";
import { useOutsideClick } from "../../hooks/use-outside-click";

const resources = [
  {
    title: "Pink Parents",
    description: "Short description about Pink Parents.",
    content: "Full details about Pink Parents and their mission...",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/pink-parents.png`,
  },
  {
    title: "DadPad",
    description: "Short description about DadPad.",
    content: "Full details about DadPad, including resources for trans parents...",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/dadpad.png`,
  },
  {
    title: "Acacia Family Support",
    description: "Support for LGBTQ+ parents facing perinatal mental health issues.",
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/acacia-family.png`,
    link: "https://www.acacia.org.uk/dads-partners/lgbtq/",
  },
];

export const ExpandableCards = () => {
  const [activeCard, setActiveCard] = useState(null);
  const cardRef = useRef(null);

  useOutsideClick(cardRef, () => setActiveCard(null));

  return (
    <div className="grid gap-6 mt-8">
      {resources.map((resource) => (
        <motion.div
          key={resource.title}
          onClick={() => setActiveCard(resource.title)}
          layout
          className="cursor-pointer rounded-lg shadow-md bg-white dark:bg-gray-900">
          <motion.div layoutId={`card-${resource.title}`}>
            <img src={resource.imgSrc} alt={resource.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{resource.title}</h3>
              <p className="text-sm text-gray-500">{resource.description}</p>
            </div>
          </motion.div>

          {activeCard === resource.title && (
            <motion.div
              ref={cardRef}
              layoutId={`card-${resource.title}`}
              className="absolute inset-0 bg-white p-6 z-10 shadow-lg">
              <p>{resource.content}</p>
              <button
                onClick={() => setActiveCard(null)}
                className="mt-4 text-blue-600 hover:underline">
                Close
              </button>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
