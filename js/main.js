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
