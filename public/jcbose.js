
const showTime = function (data) {
    
    const setTime = setInterval(function () {
        const tim = 900 - Math.ceil((Date.now() - data) / 1000);
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
const changeSize=function(size){
    var s=size/4;
    
    const p1=document.getElementsByClassName('card-header');
    const p2=document.getElementsByClassName('date-text');
    const a=document.getElementsByClassName('btn-danger');
    for (var i = 0; i < p1.length; i++) {
         p1[i].style.fontSize=s+"vw";
         p2[i].style.fontSize=s+"vw";
         a[i].style.fontSize=s+"vw";
    }
}
const showData = (articles) => {
    const artitem = articles;
    showTime(articles[0].clgPrevUpd);

    var items_list = document.getElementById('items-list');
    for (var i = 0; i < artitem.length; i++) {
        var output = "";
        output += `
    <div class="card text-center border-danger">
     <div class="card-body ">
     <p class="card-text card-header text-danger">${artitem[i].title}</p>
    <p class="card-text date-text ">${artitem[i].date}</p>
    <a href="${artitem[i].url}" class="btn btn-danger">PDF</a>
       </div>
     </div>`
     items_list.innerHTML += output;
    }
}
const fetching = () => {
    try {
        //remove . from here
        fetch("jcbose.json")
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
// document.addEventListener('DOMCONTENTLOADED', fetching());
fetching();
