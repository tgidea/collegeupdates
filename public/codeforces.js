const showData = (articles) => {
    const artitem = articles;
    
    var items_list = document.getElementById('items-list');
    for (var i = 0; i < artitem.length; i++) {
        var output = "";
        output += `
    <div class="card text-center border-primary">
     <div class="card-body ">
     <p class="card-text font-weight-bold text-primary card-header ">${artitem[i].name}</p>
     <p class="card-text card-header ">Duration : ${artitem[i].duration}</p>
     <p class="card-text card-header "><a href="${artitem[i].link}" class="btn btn-primary">${artitem[i].time}</a></p>
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
