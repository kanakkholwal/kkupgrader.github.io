"use strict";
const tabs = Array.from(document.querySelectorAll("#switch-type>li"));
const timerPath = document.getElementById("timer_path");
const timerLabel = document.getElementById("timer_label");
const timerPause = document.getElementById("timer_pause");
const shortTab = document.getElementById("short");
const longTab = document.getElementById("long");
const pomodoroTab = document.getElementById("pomodoro");
const shortInput = document.getElementById("shortInput");
const longInput = document.getElementById("longInput");
const pomodoroInput = document.getElementById("pomodoroInput");
const applyBtn = document.getElementById("apply-btn");
const indicator = document.getElementById("indicator");
const settingBtn = document.getElementById("setting-btn");
settingBtn.addEventListener("click", () => {
  document.getElementById("modal-area").classList.add("open");
  document.getElementById("settings").classList.add("show");
  settingBtn.classList.add("active");
});
const CloseModal = () => {
  document.getElementById("settings").classList.remove("show");
  setTimeout(() => {
    document.getElementById("modal-area").classList.remove("open");
    setTimeout(() => {
      settingBtn.classList.remove("active");
    }, 100);
    console.log("Settings Updated......");
  }, 150);
};
document.getElementById("modal-area").addEventListener("mouseup", function (e) {
  if (!document.getElementById("settings").contains(e.target)) {
    CloseModal();
  }
});
document.getElementById("close-modal").addEventListener("click", function () {
  CloseModal();
});
applyBtn.addEventListener("click", () => {
  UpdateLength();
  CloseModal();
});
const getSiblings = (TargetNode) =>
  [...TargetNode.parentNode.children].filter(
    (siblings) => siblings !== TargetNode
  );
let notificationPermission = false;
const grantPermission = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      notificationPermission = true;
    } else if (permission === "default") {
      grantPermission();
    } else {
      if (window.confirm("Do you want to use Notification Alert Feature?")) {
        grantPermission();
      } else {
        alert("Use normal alert");
      }
    }
  });
};
grantPermission();
// Variables Set up
const FULL_DASH_ARRAY = 283; // Svg Full
const btnState = {
  pause: "Pause",
  play: "Play",
  start: "Start",
  reset: "Reset",
  stop: "Stop",
};
const defaultLength = {
  pomodoro: 900,
  short: 300,
  long: 1500,
};
var currentLength = defaultLength;

var TIME_LIMIT = currentLength.pomodoro; // Total Time

let timePassed = 0; // Initial Time Passed
let timeLeft = TIME_LIMIT;
let timerInterval = null;

timerPause.innerText = btnState.start;
timerLabel.innerText = formatTime(TIME_LIMIT);

const Title = document.title;
let TimeLeftWhenPaused = TIME_LIMIT;
let TimePassedWhenPaused = 0;
// Timer functions

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}
// How much completed
function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}
// Update Svg Dasharray
function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  timerPath.setAttribute("stroke-dasharray", circleDasharray);
}
function ResetTimer() {
  clearInterval(timerInterval);
  timePassed = 0; // Initial Time Passed
  timeLeft = TIME_LIMIT;
  timerInterval = null;
  setCircleDasharray();
  timerPause.innerText = btnState.start;
}

const startTimer = () => {
  timerInterval = setInterval(() => {
    timerPause.innerText = btnState.pause;

    timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;

    timerLabel.innerHTML = formatTime(timeLeft);

    if (document.hidden) {
      document.title = `Remaining : ${formatTime(timeLeft)}  | ${Title}`;
    } else {
      document.title = Title;
    }

    setCircleDasharray();

    if (timeLeft <= 0) {
      ResetTimer();
      if (notificationPermission) {
        var notify = new Notification("Pomodoro App", {
          body: "Time Completed !!",
          icon: "favicon.png",
        });
        window.navigator.vibrate(800);

        notify.onclick = function () {
          window.parent.focus();
          notify.close();
        };
      }
    } else if (timeLeft == 10) {
      if (notificationPermission) {
        var notify = new Notification("Pomodoro App", {
          body: `10 Seconds Remaining`,
          icon: "favicon.png",
        });
        window.navigator.vibrate([200, 100, 200]);

        notify.onclick = function () {
          window.parent.focus();
          notify.close();
        };
      }
    } else if (timeLeft > 0 && timeLeft <= 10) {
      indicator.style.stroke = "#df0f00";
    } else if (timeLeft > 10 && timeLeft <= 30) {
      indicator.style.stroke = "#FFEB3B";
    } else {
      indicator.removeAttribute("stroke");
    }
  }, 1000);
};
const PauseTimer = () => {
  TimeLeftWhenPaused = timeLeft;
  TimePassedWhenPaused = timePassed;
  clearInterval(timerInterval);
  timerPause.innerText = btnState.play;
};
const PlayTimer = () => {
  timeLeft = TimeLeftWhenPaused;
  timePassed = TimePassedWhenPaused;
  timerInterval = setInterval(() => {
    timerPause.innerText = btnState.pause;

    timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;

    timerLabel.innerHTML = formatTime(timeLeft);

    if (document.hidden) {
      document.title = `Remaining : ${formatTime(timeLeft)}  | ${Title}`;
    } else {
      document.title = Title;
    }

    setCircleDasharray();

    if (timeLeft <= 0) {
      ResetTimer();
      if (notificationPermission) {
        var notify = new Notification("Pomodoro App", {
          body: "Time Completed !!",
          icon: "favicon.png",
        });
        window.navigator.vibrate(800);

        notify.onclick = function () {
          window.parent.focus();
          notify.close();
        };
      }
    } else if (timeLeft == 10) {
      if (notificationPermission) {
        var notify = new Notification("Pomodoro App", {
          body: `10 Seconds Remaining`,
          icon: "favicon.png",
        });
        window.navigator.vibrate([200, 100, 200]);

        notify.onclick = function () {
          window.parent.focus();
          notify.close();
        };
      }
    } else if (timeLeft > 0 && timeLeft <= 10) {
      indicator.style.stroke = "#df0f00";
    } else if (timeLeft > 10 && timeLeft <= 30) {
      indicator.style.stroke = "#FFEB3B";
    }
  }, 1000);
};
// function setRemainingPathColor(timeLeft) {
//   const { alert, warning, info } = COLOR_CODES;
//   if (timeLeft <= alert.threshold) {
//     timerPath.classList.remove(warning.color);
//     timerPath.classList.add(alert.color);
//   } else if (timeLeft <= warning.threshold) {
//     timerPath.classList.remove(info.color);
//     timerPath.classList.add(warning.color);
//   }
// }

function UpdateType() {
  timerPause.innerText = btnState.start;
  timePassed = 0;
  timeLeft = TIME_LIMIT;
}

timerPause.addEventListener("click", function () {
  var currentState = timerPause.innerText;
  switch (currentState) {
    case btnState.start:
      startTimer();
      break;
    case btnState.reset:
      stopTimer();
      break;
    case btnState.play:
      PlayTimer();
      break;
    case btnState.pause:
      PauseTimer();
      break;
  }
});

tabs.forEach((tab) => {
  tab.onclick = (e) => {
    getSiblings(e.target).forEach((sibling) => {
      sibling.classList.remove("active");
    });
    TIME_LIMIT = currentLength[`${e.target.id}`];
    timerLabel.innerHTML = formatTime(TIME_LIMIT);
    ResetTimer();
    console.log(TIME_LIMIT);
    e.target.classList.add("active");
    // UpdateType();
  };
});

// Settings

const UpdateLength = () => {
  (currentLength.pomodoro = pomodoroInput.value * 60),
    (currentLength.short = shortInput.value * 60),
    (currentLength.long = longInput.value * 60);
  timerLabel.innerHTML = formatTime(
    currentLength[
      tabs.filter((element) => element.classList.contains("active"))[0].id
    ]
  );
  TIME_LIMIT =
    currentLength[
      tabs.filter((element) => element.classList.contains("active"))[0].id
    ];

  ResetTimer();

  console.log(currentLength);
};

// Change timer length
// document.querySelectorAll(".form-input").forEach((input) => {
//   input.addEventListener("change", UpdateLength);
//   input.addEventListener("input", UpdateLength);
//   input.addEventListener("keyup", UpdateLength);
// });
// Change Font
document.querySelectorAll("[data-font]").forEach((font) => {
  font.addEventListener("click", (e) => {
    document.body.style.setProperty("--font", `"${e.target.dataset.font}"`);
    getSiblings(e.target).forEach((sibling) => {
      sibling.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});
// Change Theme
document.querySelectorAll("[data-theme]").forEach((theme) => {
  theme.addEventListener("click", (e) => {
    document.body.style.setProperty("--primary", e.target.dataset.theme);
    getSiblings(e.target).forEach((sibling) => {
      sibling.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});
