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

const changeTime = function(str){
    var num="",num2="",carry=0,actual="",i;
    const len=str.length;
    for(i=len-1;i>len-5;i--){
        if(str[i]==':'){
            for(var j=i-1;j>=i-2;j--){
                num2+=str[j];
            }
            break;
        }
        else{
            num+=str[i];
        }
    }
    var minute=parseInt(num.split('').reverse().join(''));
    var hour=parseInt(num2.split('').reverse().join(''));
    minute+=30;
    if(minute>60){
        minute=minute-60;
        hour+=3;
    }
    else{
        hour+=2;
    }
    for(var j=0;j<i-2;j++){
        actual+=str[j];
    }
    actual+=" "+hour+":"+minute;
    return actual;
}

const showData = (articles) => {
    const artitem = articles;
    showTime(articles[0].codePrevUpd);
    var items_list = document.getElementById('items-list');
    for (var i = 0; i < artitem.length; i++) {
        var time=changeTime(artitem[i].time.toString());
        var output = "";
        output += `
    <div class="card text-center border-primary">
     <div class="card-body ">
     <p class="card-text font-weight-bold text-primary card-header ">${artitem[i].name}</p>
     <p class="card-text card-header ">Duration : ${artitem[i].duration}</p>
     <p class="card-text card-header "> ${artitem[i].toStart}</p>
     <p class="card-text card-header "><a href="${artitem[i].link}" class="btn btn-primary">${time}</a></p>
       </div>
     </div>`
     items_list.innerHTML += output;
    }
}
const fetching = () => {
    try {
        fetch("codeforces.json")
            .then(function (resp) {
                return resp.json();
            })
            .then(function(data){
                showData(data)
            });
    }
    catch (err) {
        console.log(err);
    }
}
document.addEventListener('DOMCONTENTLOADED', fetching());
// fetch();
