var endDate;

function getEndDate() {
    var choice = document.getElementById("stateList").value;
    const url = window.location.protocol + "//" +  window.location.host +
        "/state/" + choice;
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
        if (request.status == 200) {
            const data = JSON.parse(request.responseText);
            endDate = new Date(data.stay_at_home_end);
        } else {
            console.log("Error getting state");
        }
    }
    request.send();
}

function getStates() {
    var list = document.getElementById("stateList");
    option = document.createElement('option');
    option.text = "-----"
    list.add(option);
    const url = window.location.protocol + "//" +  window.location.host + "/states";
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
        if (request.status == 200) {
            const data = JSON.parse(request.responseText);
            for (let i = 0; i < data.length; i++) {
                option = document.createElement('option');
                option.text = data[i];
                option.value = data[i];
                list.add(option);
            }
        }
    }
    request.send();
}

getStates();
var timer = setInterval(function() {
    let now = new Date().getTime();
    if (endDate != null) {
        console.log(endDate);
        let t = endDate - now;
        if (t >= 0) {
            let days = Math.floor(t / (1000 * 60 * 60 * 24));
            let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            let secs = Math.floor((t % (1000 * 60)) / 1000);
            document.getElementById("timer-days").innerHTML = days +
                "<span class='label'>DAY(S)</span>";
            document.getElementById("timer-hours").innerHTML= ("0" + hours).slice(-2) +
                "<span class='label'>HR(S)</span>";
            document.getElementById("timer-mins").innerHTML= ("0" + mins).slice(-2) +
                "<span class='label'>MIN(S)</span>";
            document.getElementById("timer-secs").innerHTML= ("0" + secs).slice(-2) +
                "<span class='label'>SEC(S)</span>";
        } else {
            document.getElementById("timer").innerHTML = "The countdown is over!";
        }
    }
}, 1000);
