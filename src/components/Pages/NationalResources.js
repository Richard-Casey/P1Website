import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "../../styles/NationalResources.module.css";
import resources from "../nationalinputs";
import InputNational from "../inputnational"; 

// Helper function to capitalize field names
const capitalizeField = (field) => {
  return field
    .replace(/([A-Z])/g, " $1") // Split camelCase into words
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
};

// Highlight matching text with a yellow background
const highlightMatch = (text, searchTerm) => {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span key={index} className={styles.highlight}>{part}</span>
    ) : (
      part
    )
  );
};

const NationalResources = () => {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Filter resources by search term with a minimum character check
  const filteredResources =
    searchTerm.length >= 2
      ? resources.filter((resource) => {
          const lowerSearchTerm = searchTerm.toLowerCase();
          return (
            resource.name.toLowerCase().includes(lowerSearchTerm) ||
            resource.description.toLowerCase().includes(lowerSearchTerm) ||
            resource.tags.some((tag) => tag.toLowerCase().includes(lowerSearchTerm)) ||
            resource.category.some((cat) => cat.toLowerCase().includes(lowerSearchTerm))
          );
        })
      : [];

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

  const categoriesWithResources = getCategoriesWithResources();

  const excludedFields = ["name", "image", "description", "website", "category", "tags", "extraInfo"];

  // Function to render resource cards (with highlighted matches)
  const renderResourceCard = (resource) => (
    <div
      key={resource.name}
      className={styles.resourceCard}
      style={{ position: "relative" }}
    >
      <div
        className={styles.backgroundBlur}
        style={{ backgroundImage: `url(${resource.image})` }}
      ></div>
      <div className={styles.overlay}></div>

      <img
        src={resource.image}
        alt={resource.name}
        className={styles.resourceImage}
      />
      <div className={styles.resourceDetails}>
        <h3>
          <strong>{highlightMatch(resource.name, searchTerm)}</strong>
        </h3>
        <p>{highlightMatch(resource.description, searchTerm)}</p>
        <p>
          <strong>Website:</strong>{" "}
          <a href={resource.website} target="_blank" rel="noopener noreferrer">
            {resource.website}
          </a>
        </p>

        {Object.entries(resource)
          .filter(([key, value]) => !excludedFields.includes(key) && value)
          .map(([key, value]) => {
            const isEmail = value.includes("@");
            const isLink = value.startsWith("http");
            return (
              <p key={key}>
                <strong>{capitalizeField(key)}:</strong>{" "}
                {isEmail ? (
                  <a href={`mailto:${value}`}>{highlightMatch(value, searchTerm)}</a>
                ) : isLink ? (
                  <a href={value} target="_blank" rel="noopener noreferrer">
                    {highlightMatch(value, searchTerm)}
                  </a>
                ) : (
                  highlightMatch(value, searchTerm)
                )}
              </p>
            );
          })}

        <p>
          <strong>Focus Area:</strong>
          <div className={styles.tagContainer}>
            {resource.category.map((cat) => (
              <span key={cat} className={styles.tagBox}>
                {highlightMatch(cat.toUpperCase(), searchTerm)}
              </span>
            ))}
          </div>
        </p>

        <p>
          <strong>Tags:</strong>
          <div className={styles.tagContainer}>
            {resource.tags.map((tag) => (
              <span key={tag} className={styles.tagBox}>
                {highlightMatch(tag.toUpperCase(), searchTerm)}
              </span>
            ))}
          </div>
        </p>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1>National Resources Directory</h1>

      {/* Group Submission Form */}
      <InputNational />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by keyword..."
        className={styles.searchBar}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Search Results Section */}
      {searchTerm.length >= 2 && filteredResources.length > 0 && (
        <div className={styles.categoryContainer}>
          <h2>Search Results for "{searchTerm}"</h2>
          <div className={styles.resourceList}>
            {filteredResources.map((resource) => renderResourceCard(resource))}
          </div>
        </div>
      )}

      {searchTerm.length >= 2 && filteredResources.length === 0 && (
        <p>No resources found for the search term "{searchTerm}".</p>
      )}

      {/* Category List */}
      {categoriesWithResources.map(([category, categoryResources]) => (
        <div key={category} className={styles.categoryContainer}>
          <button
            className={styles.categoryButton}
            onClick={() => toggleCategory(category)}
          >
            <span>{category}</span>
            <span className={styles.resourceCount}>({categoryResources.length})</span>
          </button>

          <CSSTransition
            in={expandedCategories.includes(category)}
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
              {categoryResources.map((resource) => renderResourceCard(resource))}
            </div>
          </CSSTransition>
        </div>
      ))}
    </div>
  );
};

export default NationalResources;
