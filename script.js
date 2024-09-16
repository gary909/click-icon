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

//************************Make Open Windows Draggable******************************* */

// Make windows draggable with a drag threshold
function makeDraggable(element, header) {
  let isDragging = false;
  let offsetX = 0,
    offsetY = 0;
  let startX = 0,
    startY = 0;
  const dragThreshold = 5;

  // Bring the window to the top when clicking anywhere on the window
  element.addEventListener("mousedown", function (event) {
    if (!event.target.classList.contains("close-btn")) {
      element.style.zIndex = getNextZIndex();
    }
  });

  header.addEventListener("mousedown", function (event) {
    startX = event.clientX;
    startY = event.clientY;
    offsetX = event.clientX - element.offsetLeft;
    offsetY = event.clientY - element.offsetTop;
    isDragging = false;

    function onMouseMove(event) {
      const diffX = Math.abs(event.clientX - startX);
      const diffY = Math.abs(event.clientY - startY);

      // Only start dragging if the mouse has moved beyond the threshold
      if (!isDragging && (diffX > dragThreshold || diffY > dragThreshold)) {
        isDragging = true;
      }

      if (isDragging) {
        // Move the window, maintaining the offset
        element.style.left = event.clientX - offsetX + "px";
        element.style.top = event.clientY - offsetY + "px";
        element.style.position = "absolute"; // Ensure absolute positioning
      }
    }

    function onMouseUp() {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    // Add mousemove and mouseup listeners
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    // Prevent default behavior (e.g., text selection)
    event.preventDefault();
  });
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
makeDraggable(
  document.getElementById("info-window4"),
  document.getElementById("header4")
);
makeDraggable(
  document.getElementById("info-window5"),
  document.getElementById("header5")
);
makeDraggable(
  document.getElementById("info-window6"),
  document.getElementById("header6")
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

document.getElementById("info-icon").addEventListener("dblclick", function () {
  toggleWindow(document.getElementById("info-window"));
});

document.getElementById("info-icon2").addEventListener("dblclick", function () {
  toggleWindow(document.getElementById("info-window2"));
});

document.getElementById("info-icon3").addEventListener("dblclick", function () {
  toggleWindow(document.getElementById("info-window3"));
});

document.getElementById("info-icon4").addEventListener("dblclick", function () {
  toggleWindow(document.getElementById("info-window4"));
});

document.getElementById("info-icon5").addEventListener("dblclick", function () {
  toggleWindow(document.getElementById("info-window5"));
});

document.getElementById("info-icon6").addEventListener("dblclick", function () {
  toggleWindow(document.getElementById("info-window6"));
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

//*******************************Make Icons Draggable******************************** */

// Function to make icon containers draggable
function makeIconDraggable(iconContainer) {
  let isDragging = false;
  let offsetX = 0,
    offsetY = 0;

  iconContainer.addEventListener("mousedown", function (event) {
    let startX = event.clientX;
    let startY = event.clientY;
    isDragging = false;

    offsetX = event.clientX - iconContainer.offsetLeft;
    offsetY = event.clientY - iconContainer.offsetTop;

    function onMouseMove(event) {
      const diffX = Math.abs(event.clientX - startX);
      const diffY = Math.abs(event.clientY - startY);

      if (!isDragging && (diffX > 5 || diffY > 5)) {
        isDragging = true;
      }

      if (isDragging) {
        iconContainer.style.left = event.clientX - offsetX + "px";
        iconContainer.style.top = event.clientY - offsetY + "px";
        iconContainer.style.position = "absolute";
      }
    }

    function onMouseUp() {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    event.preventDefault();
  });
}

// Apply draggable functionality to each icon
const iconContainers = document.querySelectorAll(".icon-container");
iconContainers.forEach((container) => makeIconDraggable(container));

//***************************Add time and date to top Nav**************************** */

function updateTime() {
  const timeDateElement = document.getElementById("time-date");
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();

  // Display format: HH:MM:SS - DD/MM/YYYY
  timeDateElement.textContent = `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
}

// Update time every second
setInterval(updateTime, 1000);

// Initialize the time immediately
updateTime();

//********************************Fullscreen Button********************************** */

const fullscreenBtn = document.getElementById("fullscreen-btn");

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen(); // Enter fullscreen
  } else if (document.exitFullscreen) {
    document.exitFullscreen(); // Exit fullscreen
  }
});

//********************************************************************************* */

//********************************************************************************* */

//********************************************************************************* */
