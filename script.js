// Icon 1 below open, then close

document.getElementById("info-icon").addEventListener("click", function () {
  document.getElementById("info-window").style.display = "block";
});

document.getElementById("close-btn1").addEventListener("click", function () {
  document.getElementById("info-window").style.display = "none";
});

// Icon 2 below open, then close

document.getElementById("info-icon2").addEventListener("click", function () {
  document.getElementById("info-window2").style.display = "block";
});

document.getElementById("close-btn2").addEventListener("click", function () {
  document.getElementById("info-window2").style.display = "none";
});

// Icon 3 below open, then close

document.getElementById("info-icon3").addEventListener("click", function () {
  document.getElementById("info-window3").style.display = "block";
});

document.getElementById("close-btn3").addEventListener("click", function () {
  document.getElementById("info-window3").style.display = "none";
});
