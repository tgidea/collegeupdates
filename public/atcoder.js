const showTime = function (data) {

    const setTime = setInterval(function () {
        const tim = 180 - Math.ceil((Date.now() - data) / 1000);
        var ans;
        if (tim == NaN || tim == undefined) {
            ans = "";
            return;
        }
        else if (tim < 1) {
            ans = "Refresh Now";
            clearInterval(setTime);
        }
        else if (tim < 5 && tim > 0) {
            ans = `Refreshing in ${tim} seconds `;
        }
        else {
            ans = `Time left to update :  ${tim} seconds `
        }
        if (ans != undefined && ans != NaN) {
            const timeStamp = document.getElementById('lastupd').innerHTML = ans;
        }
    }, 1000);
}

const changeTime = function (str) {
    var num1 = "", num2 = "", date = "", carry = 0, actual = "", i, j;
    const len = str.length;
    for (i = 0; i < 8; i++) {
        actual += str[i];
    }
    // console.log(actual);
    for (d = i; d < 11; d++) {
        date += str[d];
    }
    console.log('date', date);
    for (j = d; j < d + 2; j++) {
        num1 += str[j];
    }
    // console.log('num1',num1);
    for (k = j + 1; k < j + 3; k++) {
        num2 += str[k];
    }
    // console.log('num2',num2);

    var hour = parseInt(num1);
    var minute = parseInt(num2);

    if (hour >= 0 && hour <= 3) {
        date = date - 1;
    }
    console.log(minute);
    minute = minute - 30;
    console.log(minute);
    if (minute <= 0) {
        carry = 1;
        minute = Math.abs(minute)
    }
    // console.log('min',minute);

    if (carry == 1) {
        hour = 20 + hour;
        console.log('carry 1 hour:', hour);
    }
    else {
        hour = 21 + hour;
        console.log('carry 0 hour:', hour);
    }
    if (hour >= 24) {
        hour = hour - 24;
    }
    console.log('final hour:', hour);
    if (hour != NaN && minute != NaN && hour != undefined && minute != undefined) {
        actual += date + " " + hour + ":" + minute + `<sup>IST</sup>`;
    }
    if (actual.indexOf(NaN) != -1) {
        actual = "Timing Not available.";
    }
    console.log(actual);
    return actual;
}

const showData = (articles) => {
    const artitem = articles;
    var items_list = document.getElementById('items-list');
    if (artitem.length > 0) {
        showTime(articles[0].codePrevUpd);
        for (var i = 0; i < artitem.length; i++) {
            var time = changeTime(artitem[i].time.toString());
            var output = "";
            output += `
    <div class="card text-center border-color">
     <div class="card-body ">
     <p class="card-text font-weight-bold color card-header ">${artitem[i].name}</p>
     <p class="card-text card-header "><a href="${artitem[i].timeLink}" class="btn ">${time} </a></p>
     <a href="${artitem[i].nameLink}" class="btn btn-color text-white">Contest Page</a>
       </div>
     </div>`
            items_list.innerHTML += output;
        }
    }
    else {
        items_list.innerHTML = `
        <div class="container text-center"><h5>No eventes are scheduled for now</h5></div>
        `
    }
}
const fetching = () => {
    try {
        fetch("atcoder.json")
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                showData(data)
            });
    }
    catch (err) {
        console.log(err);
    }
}
document.addEventListener('DOMCONTENTLOADED', fetching());
// fetch();
