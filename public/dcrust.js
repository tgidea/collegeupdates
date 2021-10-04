const showData = (articles) => {
    const artitem = articles;
    
    var items_list = document.getElementById('items-list');
    for (var i = 0; i < artitem.length; i++) {
        var output = "";
        output += `
    <div class="card text-center border-info">
     <div class="card-body ">
     <p class="card-text card-header ">${artitem[i].title}</p>
    <a href="${artitem[i].url}" class="btn btn-info">PDF</a>
       </div>
     </div>`
     items_list.innerHTML += output;
    }
}
const fetching = () => {
    try {
        fetch("dcrust.json")
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
