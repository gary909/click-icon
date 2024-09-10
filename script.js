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
  let offsetX, offsetY;

  header.onmousedown = function (event) {
    isDragging = true;
    offsetX = event.clientX - element.getBoundingClientRect().left;
    offsetY = event.clientY - element.getBoundingClientRect().top;

    document.onmousemove = function (event) {
      if (isDragging) {
        element.style.left = event.clientX - offsetX + "px";
        element.style.top = event.clientY - offsetY + "px";
      }
    };

    document.onmouseup = function () {
      isDragging = false;
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
