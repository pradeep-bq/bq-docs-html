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

// Sample data to populate dropdown
const data = [
  "Dashboard",
  "Favorites",
  "Files",
  "History",
  "Add",
  "Settings",
  "Profile",
  "Logout",
];

// Show dropdown when search icon or input is clicked
function showDropdown() {
  const dropdown = document.getElementById("searchDropdown");
  dropdown.classList.remove("hidden");
  populateDropdown(data); // Populate dropdown with all data initially
}

// Populate the dropdown with items
function populateDropdown(items) {
  const dropdown = document.getElementById("searchDropdown");
  dropdown.innerHTML = ""; // Clear existing items
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.onclick = () => handleItemClick(item); // Handle click event
    dropdown.appendChild(li);
  });
}

// Filter results based on input value
function filterResults() {
  const searchInput = document.querySelector(".txtSearch").value.toLowerCase();
  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchInput)
  );
  populateDropdown(filteredData);
}

// Handle item click
function handleItemClick(item) {
  alert(`You selected: ${item}`);
  const dropdown = document.getElementById("searchDropdown");
  dropdown.classList.add("hidden"); // Hide dropdown after selection
}

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  const searchContainer = document.querySelector(".search-container");
  const dropdown = document.getElementById("searchDropdown");

  // Check if the click occurred outside the search-container
  if (!searchContainer.contains(event.target)) {
    dropdown.classList.add("hidden"); // Hide the dropdown
  }
});
