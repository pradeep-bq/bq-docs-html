document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav_links");
  const subLinks = document.querySelectorAll(".nav_sub_links");

  // Highlight active menu/submenu based on the current page
  const highlightActiveMenu = () => {
    const currentPage = window.location.href.split("/").pop();

    // Submenu links
    subLinks.forEach((link) => {
      if (link.href.split("/").pop() === currentPage) {
        link.classList.add("active");
        const parentAccordion = link.closest(".accordion-collapse");
        if (parentAccordion) {
          parentAccordion.classList.add("show");
          parentAccordion.previousElementSibling.classList.add("active");
        }
      }
    });

    // Main menu links
    navLinks.forEach((link) => {
      if (link.href.split("/").pop() === currentPage) {
        link.classList.add("active");
      }
    });
  };

  // Save the state of the accordion in localStorage
  const saveMenuState = (id) => {
    localStorage.setItem("activeAccordion", id);
  };

  // Restore the active accordion from localStorage
  const restoreMenuState = () => {
    const activeAccordion = localStorage.getItem("activeAccordion");
    if (activeAccordion) {
      const element = document.querySelector(activeAccordion);
      if (element) {
        element.classList.add("show");
        const button = element.previousElementSibling;
        if (button) {
          button.classList.add("active");
        }
      }
    }
  };

  // Save accordion state on click
  document.querySelectorAll(".accordion-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const target = button.getAttribute("data-bs-target");
      saveMenuState(target);
    });
  });

  // Initialize
  restoreMenuState();
  highlightActiveMenu();
});
function navigateToLink(event, url) {
  event.stopPropagation();
  window.location.href = url;
}

// Sample data split into two categories
const category1 = ["Dashboard", "Favorites", "Files", "History"];
const category2 = ["Add", "Settings", "Profile", "Logout"];

// Show search results when input is clicked or typed
function showDropdown() {
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.classList.remove("hidden");
  populateCategories(category1, category2); // Populate all data initially
}

// Populate the categories with items
function populateCategories(cat1, cat2) {
  const category1Content = document.getElementById("category1Content");
  const category2Content = document.getElementById("category2Content");

  category1Content.innerHTML = ""; // Clear existing items for Category 1
  category2Content.innerHTML = ""; // Clear existing items for Category 2

  cat1.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item;
    div.classList.add("category-item");
    div.onclick = () => handleItemClick(item); // Handle click event
    category1Content.appendChild(div);
  });

  cat2.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item;
    div.classList.add("category-item");
    div.onclick = () => handleItemClick(item); // Handle click event
    category2Content.appendChild(div);
  });
}

// Filter results based on input value
function filterResults() {
  const searchInput = document.querySelector(".txtSearch").value.toLowerCase();

  // Filter each category
  const filteredCat1 = category1.filter((item) =>
    item.toLowerCase().includes(searchInput)
  );
  const filteredCat2 = category2.filter((item) =>
    item.toLowerCase().includes(searchInput)
  );

  // Repopulate categories with filtered results
  populateCategories(filteredCat1, filteredCat2);

  // Show/hide category containers based on results
  document.getElementById("category1Container").style.display =
    filteredCat1.length > 0 ? "block" : "none";
  document.getElementById("category2Container").style.display =
    filteredCat2.length > 0 ? "block" : "none";
}

// Handle item click
function handleItemClick(item) {
  alert(`You selected: ${item}`);
}

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  const searchContainer = document.querySelector(".search-container");
  const resultsContainer = document.getElementById("searchResults");

  // Check if the click occurred outside the search-container
  if (!searchContainer.contains(event.target)) {
    resultsContainer.classList.add("hidden"); // Hide the results container
  }
});
