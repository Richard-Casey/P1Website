import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "../../styles/NationalResources.module.css";
import resources from "../nationalinputs";

// Helper function to capitalize field names
const capitalizeField = (field) => {
  return field
    .replace(/([A-Z])/g, " $1")  // Split camelCase into words
    .replace(/_/g, " ")          // Replace underscores with spaces
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
};


const NationalResources = () => {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomTestimonial, setRandomTestimonial] = useState("Support is always just a click away.");

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    setTestimonialForCategory(category);
  };

  const setTestimonialForCategory = (category) => {
    const categoryResources = resources.filter(
      (resource) =>
        resource.category.map((c) => c.toLowerCase()).includes(category.toLowerCase()) ||
        resource.tags.map((t) => t.toLowerCase()).includes(category.toLowerCase())
    );

    const testimonials = categoryResources
      .map((resource) => resource.testimonial)
      .filter((testimonial) => testimonial); // Ignore empty testimonials

    if (testimonials.length > 0) {
      const randomIndex = Math.floor(Math.random() * testimonials.length);
      setRandomTestimonial(testimonials[randomIndex]);
    } else {
      setRandomTestimonial("Support is always just a click away.");
    }
  };

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

  const getRandomRotation = () => {
    return `${Math.floor(Math.random() * 90 - 45)}deg`; // Random rotation between -45 and 45 degrees
  };

  // Excluded fields we don't want to render automatically (can be customized)
  const excludedFields = [
    "name",
    "image",
    "description",
    "website",
    "category",
    "tags",
    "extraInfo",
  ];

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
              {getPrioritizedResources(category).map((resource) => (
                <div
                  key={resource.name}
                  className={styles.resourceCard}
                  style={{
                    backgroundImage: `url(${resource.image})`,
                  }}
                >
                  <div className={styles.overlay}></div>
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

  <p>
    <strong>Website:</strong>{" "}
    <a href={resource.website} target="_blank" rel="noopener noreferrer">
      <strong>{resource.website}</strong>
    </a>
  </p>

  {/* Dynamically render all additional fields */}
  {Object.entries(resource)
  .filter(([key, value]) => 
    !excludedFields.includes(key) && value) // Exclude core fields and empty values
  .map(([key, value]) => {
    // Check if the value is an email or a URL
    const isEmail = value.includes("@");
    const isLink = value.startsWith("http");

    return (
      <p key={key}>
        <strong>{capitalizeField(key)}:</strong>{" "}
        {isEmail ? (
          <a href={`mailto:${value}`}>{value}</a>
        ) : isLink ? (
          <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
        ) : (
          value
        )}
      </p>
    );
  })}


  <p>
    <strong>Focus Area:</strong>
    <div className={styles.tagContainer}>
      {resource.category.map((cat) => (
        <span key={cat} className={styles.tagBox}>
          {cat.toUpperCase()}
        </span>
      ))}
    </div>
  </p>

  <p>
    <strong>Tags:</strong>
    <div className={styles.tagContainer}>
      {resource.tags.map((tag) => (
        <span key={tag} className={styles.tagBox}>
          {tag.toUpperCase()}
        </span>
      ))}
    </div>
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
}

export default NationalResources;
