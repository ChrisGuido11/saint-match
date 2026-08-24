/* Compline — screen flow, candle, wake lock, service worker. */

(function () {
  "use strict";

  var ORDER = ["s-home", "s-opening", "s-psalm", "s-hands", "s-nunc", "s-blessing", "s-candle"];
  var current = "s-home";
  var wakeLock = null;

  var progressFill = document.getElementById("progress-fill");
  var backBtn = document.getElementById("back");

  function show(id) {
    var from = document.getElementById(current);
    var to = document.getElementById(id);
    if (!to || from === to) return;

    from.classList.remove("active");
    to.classList.add("active");
    to.querySelector(".scroll") && (to.querySelector(".scroll").scrollTop = 0);
    current = id;

    var step = ORDER.indexOf(id);
    progressFill.style.width = (step / (ORDER.length - 1)) * 100 + "%";
    document.getElementById("progress").classList.toggle("gone", id === "s-candle");
    backBtn.classList.toggle("hidden", id === "s-home" || id === "s-candle");

    if (id === "s-home") {
      releaseWakeLock();
      resetCandle();
    } else if (id === "s-candle") {
      startCandle();
    }
  }

  document.querySelectorAll("[data-next]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.dataset.next === "s-opening") requestWakeLock();
      show(btn.dataset.next);
    });
  });

  backBtn.addEventListener("click", function () {
    var i = ORDER.indexOf(current);
    if (i > 0) show(ORDER[i - 1]);
  });

  /* ---------- wake lock: keep the screen lit while praying ---------- */

  function requestWakeLock() {
    if (!("wakeLock" in navigator)) return;
    navigator.wakeLock.request("screen").then(function (lock) {
      wakeLock = lock;
    }).catch(function () { /* fine without it */ });
  }

  function releaseWakeLock() {
    if (wakeLock) {
      wakeLock.release().catch(function () {});
      wakeLock = null;
    }
  }

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && current !== "s-home" && current !== "s-candle") {
      requestWakeLock();
    }
  });

  /* ---------- candle ---------- */

  var candle = document.getElementById("candle");
  var video = document.getElementById("candle-video");
  var line = document.getElementById("candle-line");
  var hint = document.getElementById("candle-hint");
  var goodnight = document.getElementById("goodnight");
  var again = document.getElementById("again");
  var candleOut = false;

  function startCandle() {
    releaseWakeLock();
    var p = video.play();
    if (p && p.then) {
      p.then(function () {
        video.classList.add("ready");
        candle.classList.add("video-ok");
      }).catch(function () {
        video.classList.remove("ready");
        candle.classList.remove("video-ok");
      });
    }
  }

  function resetCandle() {
    candleOut = false;
    candle.classList.remove("out");
    line.classList.remove("fading");
    hint.classList.remove("fading");
    goodnight.classList.add("hidden");
    again.classList.add("hidden");
    video.pause();
  }

  candle.addEventListener("click", function () {
    if (candleOut) return;
    candleOut = true;
    candle.classList.add("out");
    line.classList.add("fading");
    hint.classList.add("fading");
    setTimeout(function () { video.pause(); }, 2300);
    setTimeout(function () {
      goodnight.classList.remove("hidden");
      again.classList.remove("hidden");
    }, 1800);
  });

  again.addEventListener("click", function () { show("s-home"); });

  /* ---------- service worker ---------- */

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
