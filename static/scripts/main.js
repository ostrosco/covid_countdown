var endDate;
var hasEndDate;

function getEndDate() {
  var choice = document.getElementById("state-names").value;
  if (choice == null) {
    return;
  }
  const url =
    window.location.protocol + "//" + window.location.host + "/state/" + choice;
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = function () {
    if (request.status == 200) {
      const data = JSON.parse(request.responseText);
      if (data.end_date === null) {
        endDate = null;
      } else {
        endDate = new Date(data.end_date);
      }
      hasEndDate = data.has_end_date;
    } else {
      console.log("Error getting state");
    }
  };
  request.send();
}

function getStates() {
  var list = document.getElementById("state-names");
  option = document.createElement("option");
  option.text = "-----";
  option.value = null;
  list.add(option);
  const url =
    window.location.protocol + "//" + window.location.host + "/states";
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = function () {
    if (request.status === 200) {
      var data = JSON.parse(request.responseText);
      data.forEach((item) => {
        option = document.createElement("option");
        option.text = item;
        option.value = item;
        list.add(option);
      });
    }
  };
  request.send();
}

getStates();
var timer = setInterval(function () {
  let now = new Date().getTime();
  if (endDate !== null) {
    let t = endDate - now;
    if (t >= 0) {
      let days = Math.floor(t / (1000 * 60 * 60 * 24));
      let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      let secs = Math.floor((t % (1000 * 60)) / 1000);
      document.getElementById("timer").style.display = "";
      document.getElementById("end-message").style.display = "none";
      document.getElementById("timer-days").innerHTML =
        days + "<span class='label'>DAY(S)</span>";
      document.getElementById("timer-hours").innerHTML =
        ("0" + hours).slice(-2) + "<span class='label'>HR(S)</span>";
      document.getElementById("timer-mins").innerHTML =
        ("0" + mins).slice(-2) + "<span class='label'>MIN(S)</span>";
      document.getElementById("timer-secs").innerHTML =
        ("0" + secs).slice(-2) + "<span class='label'>SEC(S)</span>";
    } else if (hasEndDate) {
      document.getElementById("timer").style.display = "none";
      document.getElementById("end-message").style.display = "";
      document.getElementById("end-message").innerHTML = "Lockdown is over!";
    }
  } else if (hasEndDate) {
    document.getElementById("timer").style.display = "none";
    document.getElementById("end-message").style.display = "";
    document.getElementById("end-message").innerHTML =
      "Your state has not initiatiated a lockdown.";
  } else {
    document.getElementById("timer").style.display = "none";
    document.getElementById("end-message").style.display = "";
    document.getElementById("end-message").innerHTML =
      "Your state has not indicated when lockdown will end.";
  }
}, 100);
