// // Open and close window 1
// document.getElementById("info-icon").addEventListener("click", function () {
//   document.getElementById("info-window").style.display = "block";
// });

// document.getElementById("close-btn1").addEventListener("click", function () {
//   document.getElementById("info-window").style.display = "none";
// });

// // Open and close window 2
// document.getElementById("info-icon2").addEventListener("click", function () {
//   document.getElementById("info-window2").style.display = "block";
// });

// document.getElementById("close-btn2").addEventListener("click", function () {
//   document.getElementById("info-window2").style.display = "none";
// });

// // Open and close window 3
// document.getElementById("info-icon3").addEventListener("click", function () {
//   document.getElementById("info-window3").style.display = "block";
// });

// document.getElementById("close-btn3").addEventListener("click", function () {
//   document.getElementById("info-window3").style.display = "none";
// });

// Make windows draggable
function makeDraggable(element, header) {
  let isDragging = false;
  let offsetX = 0,
    offsetY = 0;

  // Bring the window to the top when clicking anywhere on the window
  element.addEventListener("mousedown", function (event) {
    // Ensure the close button doesn't trigger the z-index change
    if (!event.target.classList.contains("close-btn")) {
      element.style.zIndex = getNextZIndex();
    }
  });

  header.onmousedown = function (event) {
    isDragging = true;

    // Calculate the offset between the mouse pointer and the window's top-left corner
    offsetX = event.clientX - element.offsetLeft;
    offsetY = event.clientY - element.offsetTop;

    // Ensure the cursor doesn't select text while dragging
    event.preventDefault();

    // Bring the window to the top by setting the highest z-index
    element.style.zIndex = getNextZIndex();

    document.onmousemove = function (event) {
      if (isDragging) {
        // Move the window, maintaining the offset
        element.style.left = event.clientX - offsetX + "px";
        element.style.top = event.clientY - offsetY + "px";
      }
    };

    document.onmouseup = function () {
      isDragging = false;
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}

// Function to get the next highest z-index
function getNextZIndex() {
  const allWindows = document.querySelectorAll(".info-window");
  let highestZIndex = 0;

  allWindows.forEach((window) => {
    const zIndex = parseInt(window.style.zIndex) || 0;
    if (zIndex > highestZIndex) {
      highestZIndex = zIndex;
    }
  });

  return highestZIndex + 1;
}

// Apply draggable functionality
makeDraggable(
  document.getElementById("info-window"),
  document.getElementById("header1")
);
makeDraggable(
  document.getElementById("info-window2"),
  document.getElementById("header2")
);
makeDraggable(
  document.getElementById("info-window3"),
  document.getElementById("header3")
);

//************************shrink open/close window anim******************************* */
function toggleWindow(element) {
  // Set the display to block first, and then use setTimeout to apply the show class
  element.style.display = "block";

  // Trigger a reflow to make sure the transition works
  element.offsetHeight; // This forces a reflow, necessary for the transition to work

  // Add the show class to trigger the grow-out animation
  element.classList.add("show");
}

function closeWindow(element) {
  // Remove the show class to trigger the shrink-down animation
  element.classList.remove("show");

  // Hide the element after the animation completes
  setTimeout(() => {
    element.style.display = "none";
  }, 200); // Match the transition duration (200ms)
}

document.getElementById("info-icon").addEventListener("click", function () {
  toggleWindow(document.getElementById("info-window"));
});

document.getElementById("info-icon2").addEventListener("click", function () {
  toggleWindow(document.getElementById("info-window2"));
});

document.getElementById("info-icon3").addEventListener("click", function () {
  toggleWindow(document.getElementById("info-window3"));
});

document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    closeWindow(this.parentElement);
  });
});

//*************************Make nav bar open upon click****************************** */

// Set a flag to indicate if the navbar is active
let navbarActive = false;

// Select all the nav items
const navItems = document.querySelectorAll(".nav-item");

// Add click event listener to each nav item (initial click activates hover)
navItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevents closing dropdown immediately when clicking inside

    // Activate the navbar if it is not active yet
    if (!navbarActive) {
      navbarActive = true;
      const dropdown = this.querySelector(".dropdown");

      // Close any other open dropdowns and open the clicked one
      closeAllDropdowns();
      dropdown.style.display = "block";

      // Enable hover functionality for all other items
      enableHover();
    }
  });
});

// Enable hover functionality after the first click
function enableHover() {
  navItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      if (navbarActive) {
        const dropdown = this.querySelector(".dropdown");
        // Close any other open dropdowns and show the hovered one
        closeAllDropdowns();
        dropdown.style.display = "block";
      }
    });
  });
}

// Function to close all open dropdowns
function closeAllDropdowns() {
  document.querySelectorAll(".dropdown").forEach((menu) => {
    menu.style.display = "none";
  });
}

// Close the dropdowns and reset navbar when clicking outside
document.addEventListener("click", function (event) {
  const isClickInsideNav = event.target.closest(".nav-bar");

  if (!isClickInsideNav) {
    closeAllDropdowns();
    navbarActive = false; // Reset navbar state when clicking outside
  }
});

//*************************************************************************** */
