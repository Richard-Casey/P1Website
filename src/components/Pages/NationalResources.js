import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "../../styles/NationalResources.module.css";
import resources from "../nationalinputs";  // Importing the resources data

const NationalResources = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getCategoriesWithResources = () => {
    const categoryMap = {};
    resources.forEach((resource) => {
      const combinedCategories = new Set([
        ...resource.category.map((c) => c.toLowerCase()),
        ...resource.tags.map((t) => t.toLowerCase()),
      ]);
      combinedCategories.forEach((cat) => {
        if (!categoryMap[cat]) {
          categoryMap[cat] = [];
        }
        categoryMap[cat].push(resource);
      });
    });
    return Object.entries(categoryMap)
      .map(([category, resources]) => [
        category.charAt(0).toUpperCase() + category.slice(1),
        resources,
      ])
      .sort(([a], [b]) => a.localeCompare(b));
  };

  const getPrioritizedResources = (category) => {
    const focusAreaResources = [];
    const tagBasedResources = [];

    resources.forEach((resource) => {
      const lowerCategory = category.toLowerCase();
      const isFocusArea = resource.category.some(
        (cat) => cat.toLowerCase() === lowerCategory
      );
      const isTag = resource.tags.some(
        (tag) => tag.toLowerCase() === lowerCategory
      );

      if (isFocusArea) {
        focusAreaResources.push(resource);
      } else if (isTag) {
        tagBasedResources.push(resource);
      }
    });

    focusAreaResources.sort((a, b) => a.name.localeCompare(b.name));
    tagBasedResources.sort((a, b) => a.name.localeCompare(b.name));

    return [...focusAreaResources, ...tagBasedResources];
  };

  const categoriesWithResources = getCategoriesWithResources();

  return (
    <div className={styles.container}>
      <h1>National Resources Directory</h1>

      <input
        type="text"
        placeholder="Search by keyword..."
        className={styles.searchBar}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {categoriesWithResources.map(([category]) => (
        <div key={category} className={styles.categoryContainer}>
          <button
            className={styles.categoryButton}
            onClick={() =>
              setExpandedCategory(
                expandedCategory === category ? null : category
              )
            }
          >
            {category}
          </button>

          <CSSTransition
            in={expandedCategory === category}
            timeout={400}
            classNames={{
              enter: styles["slide-enter"],
              enterActive: styles["slide-enter-active"],
              exit: styles["slide-exit"],
              exitActive: styles["slide-exit-active"],
            }}
            unmountOnExit
          >
            <div className={styles.resourceList}>
              {getPrioritizedResources(category).map((resource) => (
                <div key={resource.name} className={styles.resourceCard}>
                  <img
                    src={resource.image}
                    alt={resource.name}
                    className={styles.resourceImage}
                  />
                  <div className={styles.divider}></div>
                  <div className={styles.resourceDetails}>
                    <h3>
                      <strong>{resource.name}</strong>
                    </h3>
                    <p>{resource.description}</p>
                    {resource.extraInfo && (
                      <p>
                        <strong>Additional Info:</strong> {resource.extraInfo}
                      </p>
                    )}
                    <p>
                      <strong>Email:</strong>{" "}
                      <a href={`mailto:${resource.email}`}>{resource.email}</a>
                    </p>
                    <p>
                      <strong>Website:</strong>{" "}
                      <a
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {resource.website}
                      </a>
                    </p>
                    <p>
                      <strong>Focus Area:</strong>{" "}
                      {resource.category.join(", ")}
                    </p>
                    <p>
                      <strong>Tags:</strong> {resource.tags.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CSSTransition>
        </div>
      ))}
    </div>
  );
};

export default NationalResources;
