import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useOutsideClick } from "../../hooks/use-outside-click";

const resources = [
  {
    title: "Pink Parents",
    description: "Gay and Lesbian Parenting Issues.",
    content: `Pink Parents is dedicated to supporting gay and lesbian parents in the UK, providing resources and information on the unique challenges they face. 
        The website addresses concerns such as potential bullying of children, exclusion from activities, and difficult questions about family dynamics. It emphasises the 
        importance of being prepared for these challenges and offering unconditional love and support to children. Pink Parents aims to create a more inclusive environment 
        for same-sex families.`,
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/pink-parents.png`,
    link: "https://www.pinkparents.org.uk/",
  },
  {
    title: "DadPad",
    description: "Ask Dadpad: Trans and non-binary parents - Ask Dadpad LGBTQI+ Parents Q&A",
    content: `The article \"Ask DadPad: Trans and Non-Binary Parents\" offers guidance and support for trans and non-binary parents navigating parenthood. It discusses 
        the importance of creating inclusive environments, addresses common concerns, and provides practical advice on pregnancy, birth, and parenting. The article also 
        highlights the need for open communication with healthcare providers to ensure respectful and appropriate care. It aims to empower trans and non-binary individuals 
        with knowledge and resources to confidently embrace their parenting.`,
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/dadpad.png`,
    link: "https://thedadpad.co.uk/lgbtqi-parents/ask-dadpad-trans-and-non-binary-parents/",
  },
  {
    title: "Acacia Family Support",
    description: "Support for LGBTQ+ parents facing perinatal mental health issues.",
    content: `The Acacia Family Support's LGBTQ+ Partners page provides a comprehensive guide for LGBTQ+ parents dealing with perinatal mental health issues. 
        This page offers a wealth of resources, including self-help guides, local and national support services, and advice on recognising and managing mental health 
        problems. It emphasises the importance of early intervention, supporting one's partner, and self-care. `,
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/acacia-family.png`,
    link: "https://www.acacia.org.uk/dads-partners/lgbtq/",
  },
  {
    title: "Feed Play Love",
    description: "One Dads choice to parent from a different rulebook.",
    content: `Spotify/Podcast: Sean Szeps shares his story of overcoming the challenges of being a gay man with 
        dreams of becoming a parent. Sean discusses his early struggles, his fascination with diverse mothers, and the obstacles he and his husband Josh faced on their path 
        to parenthood. He also reflects on why he believes he is the best father for his daughter.`,
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/different-rule-book.png`,
    link: "https://open.spotify.com/episode/7woJNDoJlAcbkRGte4kBRu?si=-jKiYGadSlC_u1ljgpQ5SA&nd=1&dlsi=dc4d7ce6e1b24ab1",
  },
  {
    title: "Kim & Andi",
    description: "A Journey with Postnatal Anxiety & Depression through the Lesbian Lens.",
    content: `Youtube: In this personal video, Kim and Andi share their journey through postnatal 
        anxiety and depression from a lesbian perspective. They discuss the emotional challenges, the vivid and distressing, and the vital role of community support. It 
        highlights the importance of language and inclusivity in healthcare, while emphasising the societal need for better support for all mothers, especially those 
        facing mental health issues.`,
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/kim-andi.png`,
    link: "https://www.youtube.com/watch?v=1t02frctzkY",
  },
  {
    title: "ManUp!",
    description: "Man Up! is a UK-based men's mental health podcast hosted by Andy Richardson and Tommy Danquah. ",
    content: `Spotify/Podcast: The podcast aims to encourage open conversations about 
        mental health among men. Each episode features discussions with various guests, including celebrities and experts, on topics ranging from personal mental health 
        experiences to broader issues in mental health advocacy.`,
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/manup.png`,
    link: "https://open.spotify.com/show/2ahFYl1h4tkXrjIYiA6mXZ",
  },
  {
    title: "Feed Play Love",
    description: "When Dads Get PND.",
    content:`Spotify/Podcast: In this 14-minute episode from June 2022, Dave Edwards, a father of two, shares his experience with perinatal depression and 
        anxiety (PND) following the birth of his son. Despite PND affecting one in ten dads, over half do not seek help. Dave hopes that by telling his story, he can 
        encourage other dads to reach out for support.`,
    imgSrc: `${process.env.PUBLIC_URL}/images/tileimages/when-dads-get-pnd.png`,
    link: "https://open.spotify.com/episode/5tUODv7C44U0KJ2wphKbLt",
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
            {/* Encapsulate the Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white text-sm font-semibold rounded-full px-4 py-2 hover:bg-orange-500 transition-all duration-300"
              >
                Visit Website
              </a>
            </motion.div>
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
              <div className="mt-4 text-gray-700 dark:text-gray-300 text-sm">
                {activeCard.content}
              </div>

              {/* Buttons Container */}
              <div className="mt-6">
                {/* Visit Website Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "1rem",
                  }}
                >
                  <a
                    href={activeCard.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white text-sm font-semibold rounded-full px-4 py-2 hover:bg-orange-500 transition-all duration-300"
                  >
                    Visit Website
                  </a>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  onClick={() => setActiveCard(null)}
                  className="mt-4 bg-blue-500 text-white text-sm font-semibold rounded-full px-4 py-2 hover:bg-black-500 transition-all duration-10"
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
