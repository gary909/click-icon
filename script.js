// Open and close window 1
document.getElementById("info-icon").addEventListener("click", function () {
  document.getElementById("info-window").style.display = "block";
});

document.getElementById("close-btn1").addEventListener("click", function () {
  document.getElementById("info-window").style.display = "none";
});

// Open and close window 2
document.getElementById("info-icon2").addEventListener("click", function () {
  document.getElementById("info-window2").style.display = "block";
});

document.getElementById("close-btn2").addEventListener("click", function () {
  document.getElementById("info-window2").style.display = "none";
});

// Open and close window 3
document.getElementById("info-icon3").addEventListener("click", function () {
  document.getElementById("info-window3").style.display = "block";
});

document.getElementById("close-btn3").addEventListener("click", function () {
  document.getElementById("info-window3").style.display = "none";
});

// Make windows draggable
function makeDraggable(element, header) {
  let isDragging = false;
  let offsetX = 0,
    offsetY = 0;

  header.onmousedown = function (event) {
    isDragging = true;

    // Calculate the offset between the mouse pointer and the window's top-left corner
    offsetX = event.clientX - element.offsetLeft;
    offsetY = event.clientY - element.offsetTop;

    // Ensure the cursor doesn't select text while dragging
    event.preventDefault();

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
