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
  document.getElementById("info-header")
);
makeDraggable(
  document.getElementById("info-window-hardware"),
  document.getElementById("hrdwr-header")
);
makeDraggable(
  document.getElementById("info-window-webdev"),
  document.getElementById("webdv-header")
);
makeDraggable(
  document.getElementById("info-window-vr"),
  document.getElementById("vr-header")
);
makeDraggable(
  document.getElementById("info-window-aboutMe"),
  document.getElementById("aboutMe-header")
);
makeDraggable(
  document.getElementById("info-window-resume"),
  document.getElementById("resume-header")
);
makeDraggable(
  document.getElementById("info-window-contact"),
  document.getElementById("contact-header")
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

document
  .getElementById("info-iconHrdwr")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-hardware"));
  });

document
  .getElementById("info-iconWebDev")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-webdev"));
  });

document
  .getElementById("info-iconVR")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-vr"));
  });

document
  .getElementById("info-iconBlog")
  .addEventListener("dblclick", function () {
    window.open("https://bloghoskins.blogspot.com/", "_blank"); // Opens BLOG in a new tab
  });

document
  .getElementById("info-iconGit")
  .addEventListener("dblclick", function () {
    window.open("https://github.com/gary909", "_blank"); // Opens GITHUB in a new tab
  });

document
  .getElementById("info-iconLinkIn")
  .addEventListener("dblclick", function () {
    window.open("https://www.linkedin.com/in/gary-white-3a779a51/", "_blank"); // Opens LLINKEDIN in a new tab
  });

document
  .getElementById("info-iconAboutMe")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-aboutMe"));
  });

document
  .getElementById("info-iconResume")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-resume"));
  });

document
  .getElementById("info-iconContact")
  .addEventListener("dblclick", function () {
    toggleWindow(document.getElementById("info-window-contact"));
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

// Function to toggle fullscreen mode
function toggleFullscreen() {
  const elem = document.documentElement; // Target the whole page (document)

  if (!document.fullscreenElement) {
    // If not in fullscreen, request fullscreen mode
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    document.getElementById("fullscreen-icon").src = "fullscreen_exit.png"; // Change to exit icon
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    document.getElementById("fullscreen-icon").src = "fullscreen_button.png"; // Change back to fullscreen icon
  }
}

// Add event listener to the button
document
  .getElementById("fullscreen-btn")
  .addEventListener("click", toggleFullscreen);

// Handle when the user exits fullscreen with Escape or other methods
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    document.getElementById("fullscreen-icon").src = "fullscreen_button.png"; // Change back to fullscreen icon
  }
});

//******************************Close All windows Button************************************ */

// Function to close all open windows
function closeAllWindows() {
  const openWindows = document.querySelectorAll(".info-window.show");
  openWindows.forEach((window) => {
    window.classList.remove("show"); // Hide the window by removing the 'show' class
  });
}

// Add event listener to the close windows button
document
  .getElementById("close-windows-btn")
  .addEventListener("click", closeAllWindows);

//****************************************NAV BAR Links********************************* */

//************* ABOUT ME NAV BAR ****************/
const aboutLink = document.getElementById("about-link");
const aboutWindow = document.getElementById("info-window-aboutMe");

// Function to open the vr window
aboutLink.addEventListener("click", function (event) {
  toggleWindow(document.getElementById("info-window-aboutMe"));
  closeAllDropdowns();
});

//****** RESUME NAV BAR *******/
const resumeLink = document.getElementById("resume-link");
const resumeWindow = document.getElementById("info-window-resume");

// Function to open the vr window
resumeLink.addEventListener("click", function (event) {
  toggleWindow(document.getElementById("info-window-resume"));
  closeAllDropdowns();
});

//****** CONTACT NAV BAR *******/
const contactLink = document.getElementById("contact-link");
const contactWindow = document.getElementById("info-window-contact");

// Function to open the vr window
contactLink.addEventListener("click", function (event) {
  toggleWindow(document.getElementById("info-window-contact"));
  closeAllDropdowns();
});

//****** VR NAV BAR *******/
const vrLink = document.getElementById("vr-link");
const vrWindow = document.getElementById("info-window-vr");

// Function to open the vr window
vrLink.addEventListener("click", function (event) {
  toggleWindow(document.getElementById("info-window-vr"));
  closeAllDropdowns();
});

//****** WEB DEV NAV BAR *******/
const webdevLink = document.getElementById("webdev-link");
const webdevWindow = document.getElementById("info-window-webdev");

// Function to open the webdev window
webdevLink.addEventListener("click", function (event) {
  toggleWindow(document.getElementById("info-window-webdev"));
  closeAllDropdowns();
});

//****** Hardware NAV BAR ***/
// Get the "Projects" link and hardware window elements
const projectsLink = document.getElementById("hardware-link");
const hardwareWindow = document.getElementById("info-window-hardware");

// Function to open the hardware window
projectsLink.addEventListener("click", function (event) {
  toggleWindow(document.getElementById("info-window-hardware"));
  closeAllDropdowns();
});

//**************************Pixelated Image Code************************************ */

// const image = document.getElementById("image");
// const images = ["images/Ghck4.jpg", "images/Ghck3.jpg", "images/Ghck2.jpg"];

// let index = 0;
// const delay = 500; // Adjust the delay in milliseconds as needed

// function transitionImage() {
//   if (index < images.length) {
//     image.src = images[index];
//     index++;
//     setTimeout(transitionImage, delay);
//   }
// }

// // Start the transition on page load
// setTimeout(transitionImage, delay);

//********************************************************************************* */

// const infoWindow = document.getElementById("info-window-aboutMe");
// const image = document.getElementById("image");
// const images = ["images/GHck4.jpg", "images/GHck3.jpg", "images/GHck2.jpg"];

// let index = 0;
// const delay = 500; // Adjust the delay in milliseconds as needed

// function transitionImage() {
//   if (index < images.length) {
//     image.src = images[index];
//     index++;
//     setTimeout(transitionImage, delay);
//   }
// }

// // Add an event listener to the window to check if it's visible
// infoWindow.addEventListener("click", () => {
//   if (infoWindow.style.display !== "none") {
//     // Start the transition when the window is visible
//     setTimeout(transitionImage, delay);
//   }
// });

// // Initially hide the window
// infoWindow.style.display = "none";

//*************************Pixelated Bio Image reveal****************************** */

const infoWindow = document.getElementById("info-window-aboutMe");
const image = document.getElementById("image");
const images = ["images/GHck4.jpg", "images/GHck3.jpg", "images/GHck2.jpg"];

let index = 0;
const delay = 500; // Adjust the delay in milliseconds as needed

function transitionImage() {
  if (index < images.length) {
    image.src = images[index];
    index++;
    setTimeout(transitionImage, delay);
  }
}

// Function to trigger when the window is opened
function handleWindowOpen() {
  if (infoWindow.style.display !== "none") {
    // Reset index and start image transition
    index = 0;
    setTimeout(transitionImage, delay);
  }
}

// Observe changes in the display style of the window
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (
      mutation.attributeName === "style" &&
      infoWindow.style.display === "block"
    ) {
      handleWindowOpen();
    }
  });
});

// Start observing the info window for style changes
observer.observe(infoWindow, { attributes: true });

// Initially hide the window
infoWindow.style.display = "none";

//********************Blog Text Carousel***************************/

document.addEventListener("DOMContentLoaded", function () {
  const sentences = [
    '"I found your Blog Hoskins site, and well.. what a wonderful thing youve done"',
    '"Your explanations were so useful and Ive certainly learnt a lot more than I knew before I found your site!"',
    '"OH MAN I JUST GOT IT WORKING! THE SHEER JOY! Thanks for your work!"',
    '"Just a quick note to say thanks for the Helios project article. It started me off down a fantastic rabbit hole.."',
  ];
  let currentIndex = 0;

  const sentenceElement = document.getElementById("sentence");

  function showNextSentence() {
    // Fade out first
    sentenceElement.classList.remove("fade-in");

    // Wait for the fade-out to complete before changing the text
    setTimeout(() => {
      // Update the text content
      currentIndex = (currentIndex + 1) % sentences.length;
      sentenceElement.textContent = sentences[currentIndex];

      // Force reflow: this ensures the class change is registered properly
      void sentenceElement.offsetWidth; // Forces the browser to reflow, so it registers the class re-adding

      // Fade the new sentence in
      sentenceElement.classList.add("fade-in");
    }, 1000); // Match the fade-out duration (1s)
  }

  // Initial fade-in for the first sentence
  sentenceElement.classList.add("fade-in");

  // Cycle through sentences every 3 seconds
  setInterval(showNextSentence, 3000);
});

//********************Collapsible Certs***************************/
document.addEventListener("DOMContentLoaded", function () {
  const collapsibles = document.querySelectorAll(".collapsible");

  collapsibles.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("active");

      const content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });
});
