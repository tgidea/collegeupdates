const showData = (articles) => {
    const artitem = articles;
    
    var items_list = document.getElementById('items-list');
    for (var i = 0; i < artitem.length; i++) {
        var output = "";
        output += `
    <div class="card text-center border-warning">
     <div class="card-body ">
     <p class="card-text text-warning font-weight-bold card-header ">${artitem[i].name}</p>
     <p class="card-text card-header ">${artitem[i].day} ${artitem[i].month} ${artitem[i].time}</p>
    <a href="${artitem[i].link}" class="btn btn-warning">Set reminder</a>
       </div>
     </div>`
     items_list.innerHTML += output;
    }
}
const fetching = () => {
    try {
        fetch("codechef.json")
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
